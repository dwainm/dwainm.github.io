---
title: "Pesky Neovim Rails LSP migration popup. "
pubDate: 2025-07-07
tags: rails, ruby, lsp, popup, migration, neovim
---

For the last while I've had this annoying lsp popup that shows up when I add a migration:

"Migrations are pending. To resolve this issue, run: bin/rails"

I tried hard to find a solution, but it was tricky, I was sweating cash and prompts while Claude made the tokens rain.


![alt](/images/blog/migration-popup.png){: width="500px" }


### The Fix
After multiple debugging attempts we narrowed it down to the ruby_lsp and found a targeted solution to intercept the popup and auto cancel it automatically.
<hr />

```lua
...

    config = function()
        ...
        -- Block migration-related modal popups only
        vim.lsp.handlers["window/showMessageRequest"] = function(err, result, ctx, config)
            if result and result.message and result.message:match("Migrations are pending") then
                -- For migration prompts, always return "Cancel" action
                if result.actions then
                    for _, action in ipairs(result.actions) do
                        if action.title and action.title:match("Cancel") then
                            return action
                        end
                    end
                    -- If no Cancel found, return the last action (usually Cancel)
                    return result.actions[#result.actions]
                end
                return { title = "Cancel" }
            end
            -- Pass through other message requests normally
            return vim.lsp.handlers["window/showMessageRequest"](err, result, ctx, config)
        end

        lspconfig.ruby_lsp.setup({
            capabilities = capabilities,
            filetypes = { "ruby" },
            root_dir = require('lspconfig.util').root_pattern("Gemfile", ".git"),
            on_attach = function(client, bufnr)
                -- Disable command execution to prevent auto-running migrations
                client.server_capabilities.executeCommandProvider = false
            end
        })

        ...

    end,
...

```

