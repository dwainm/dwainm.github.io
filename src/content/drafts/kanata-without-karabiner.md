# Setting Up Kanata Without Karabiner-Elements on macOS

I recently switched from skhd/yabai to Kanata for keyboard customization, but ran into the common issue of needing Karabiner-Elements just for its driver. Here's how I set up Kanata with only the minimal driver needed.

## The Problem

Kanata requires the Karabiner VirtualHIDDevice driver to function on macOS, but installing the full Karabiner-Elements application can cause conflicts and unnecessary overhead. The solution is to use only the standalone driver.

## Solution: Standalone VirtualHIDDevice Driver

### 1. Remove Karabiner-Elements (if installed)
```bash
# Remove any existing Karabiner launch agents
launchctl unload ~/Library/LaunchAgents/com.koekeishiya.skhd.plist
launchctl unload ~/Library/LaunchAgents/com.koekeishiya.yabai.plist
rm ~/Library/LaunchAgents/com.koekeishiya.skhd.plist
rm ~/Library/LaunchAgents/com.koekeishiya.yabai.plist

# Uninstall Karabiner-Elements if present
brew uninstall --cask karabiner-elements
```

### 2. Install Standalone VirtualHIDDevice Driver
```bash
# Download the standalone driver
curl -LO https://github.com/pqrs-org/Karabiner-DriverKit-VirtualHIDDevice/releases/download/v6.0.0/Karabiner-DriverKit-VirtualHIDDevice-6.0.0.pkg

# Install it
sudo installer -pkg Karabiner-DriverKit-VirtualHIDDevice-6.0.0.pkg -target /
```

### 3. Configure Kanata
My Kanata config with home row mods and CapsLock tap-hold (full config available in my [dotfiles](https://github.com/dwainm/dotfiles/tree/master/.config/kanata)):

```lisp
;; Kanata config for Colemak home row mods
;; Only remap home row keys, leave everything else as-is

(defcfg
  process-unmapped-keys yes
  danger-enable-cmd yes
)

(defsrc
  caps
  a s d f
  j k l ;
  f1 f2 f3 f4 f5 f6 f7 f8 f9 f10 f11 f12
)

(defvar
  tap-time 225
  hold-time 225
)

(defalias
  ;; Physical key positions (QWERTY home row)
  a (tap-hold $tap-time $hold-time a lmet)  ;; A -> Cmd
  s (tap-hold $tap-time $hold-time s lalt)  ;; S -> Alt  
  d (tap-hold $tap-time $hold-time d lsft)  ;; D -> Shift
  f (tap-hold $tap-time $hold-time f lctl)  ;; F -> Ctrl
  
  ;; CapsLock as tap-hold
  caps (tap-hold $tap-time $hold-time esc lctl)  ;; CapsLock -> tap Esc, hold Ctrl
  
  ;; Right hand physical positions
  j (tap-hold $tap-time $hold-time j rctl)  ;; J -> Ctrl
  k (tap-hold $tap-time $hold-time k rsft)  ;; K -> Shift
  l (tap-hold $tap-time $hold-time l ralt)  ;; L -> Alt
  ; (tap-hold $tap-time $hold-time ; rmet)  ;; ; -> Cmd
)

(deflayer base
  @caps
  @a @s @d @f
  @j @k @l @;
  brdn brup f3 f4 f5 f6 prev pp next mute vold volu
)
```

### 4. Set Up LaunchDaemon
Create a LaunchDaemon for automatic startup:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.kanata</string>
    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/bin/kanata</string>
        <string>--cfg</string>
        <string>/Users/dwain/.config/kanata/kanata.kbd</string>
        <string>--nodelay</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/kanata.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/kanata.log</string>
</dict>
</plist>
```

Save this to `/Library/LaunchDaemons/com.kanata.plist` and load it:

```bash
sudo chown root:wheel /Library/LaunchDaemons/com.kanata.plist
sudo chmod 644 /Library/LaunchDaemons/com.kanata.plist
sudo launchctl enable system/com.kanata
sudo launchctl bootstrap system /Library/LaunchDaemons/com.kanata.plist
```

## Function Keys Issue and Solution

A common issue when using Kanata is that function keys (F1/F2 for brightness, volume keys) stop working because Kanata intercepts all input. The solution is to explicitly map function keys to their media key equivalents in your configuration.

Add a section after the config for handling function keys properly:

```bash
# Create a management script for easy service control
#!/bin/bash
# Usage: ./kanata.sh [start|stop|status|restart]

PLIST_PATH="/Library/LaunchDaemons/com.kanata.plist"
SERVICE_NAME="system/com.kanata"
CONFIG_PLIST="/Users/dwain/.config/kanata/com.kanata.plist"

case "$1" in
    start|stop|status|restart)
        # Service management commands
        ;;
    *)
        echo "Usage: $0 {start|stop|status|restart}"
        ;;
esac
```

## Results

This setup gives you:
- **CapsLock tap-hold**: Tap for Escape, hold for Control
- **Home row mods**: ASDF and JKL; keys become modifiers when held
- **Function keys working**: Brightness, volume, and media keys function properly
- **Optimal timing**: 225ms tap-hold timing for responsive feel
- **Minimal overhead**: Only the driver, no GUI application
- **No conflicts**: Clean separation from other keyboard tools
- **Automatic startup**: Runs on boot via LaunchDaemon
- **Easy management**: Service control script for start/stop/restart operations

The key insights:
1. The VirtualHIDDevice driver is essential for Kanata on macOS, but the full Karabiner-Elements application is not
2. Function keys need explicit mapping to media key aliases (brdn, brup, vold, volu, etc.) to work properly
3. Modern macOS requires `launchctl enable` before `bootstrap` for proper service loading
4. Fine-tuning tap-hold timing (225ms vs default 250ms) significantly improves responsiveness

This approach gives you the best of both worlds: full Kanata functionality without the bloat, and all your function keys continue to work as expected.

## Integration with AeroSpace and Sketchybar

Kanata works seamlessly with other macOS productivity tools:

### AeroSpace Window Manager
The home row modifiers work perfectly with AeroSpace keybindings. For example:
- `alt-q/w/f/p/g` for workspace switching (using Kanata's alt from S/L keys)
- `alt-shift-q/w/f/p/g` for moving windows between workspaces
- `cmd-alt-[/]` for cycling windows within spaces (using Kanata's cmd from A/; keys)

Since Kanata handles the low-level keyboard remapping, AeroSpace sees the modifier keys naturally and all shortcuts work as expected.

### Sketchybar Integration
Sketchybar continues to function normally with Kanata running. The status bar responds to:
- Workspace changes triggered by AeroSpace shortcuts using Kanata modifiers
- Volume/brightness changes from the function key mappings
- All system events and app switching

The key advantage is that this stack (Kanata + AeroSpace + Sketchybar) provides a complete keyboard-driven workflow without any conflicts between tools. Each handles its specific domain:
- **Kanata**: Low-level key remapping and modifiers
- **AeroSpace**: Window management and workspace organization  
- **Sketchybar**: System status and workspace visualization

Complete configuration files for all three tools are available in my [dotfiles repository](https://github.com/dwainm/dotfiles).