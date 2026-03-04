-- Neovim keymap for frictionless blog post creation
-- Add this to your neovim config (e.g., ~/.config/nvim/lua/blog.lua)
-- Then require('blog') in your init.lua

local M = {}

local blog_path = vim.fn.expand('~/projects/dwain.maralack.com-astro/src/content/blog/')

-- Convert title to slug: lowercase, spaces to hyphens, strip punctuation
local function slugify(title)
  return title
    :lower()
    :gsub('%s+', '-')        -- spaces to hyphens
    :gsub('[^%w%-]', '')     -- remove non-alphanumeric (except hyphens)
    :gsub('%-+', '-')        -- collapse multiple hyphens
    :gsub('^%-', '')         -- trim leading hyphen
    :gsub('%-$', '')         -- trim trailing hyphen
end

-- Create a new blog post
function M.new_post()
  local title = vim.fn.input('Post title: ')
  if title == '' then
    print('Cancelled')
    return
  end

  local slug = slugify(title)
  local filepath = blog_path .. slug .. '.md'

  -- Check if file exists
  if vim.fn.filereadable(filepath) == 1 then
    print('File already exists: ' .. filepath)
    return
  end

  -- Open the file
  vim.cmd('edit ' .. filepath)

  -- Insert the title as first heading
  vim.api.nvim_buf_set_lines(0, 0, 0, false, {
    '# ' .. title,
    '',
    ''
  })

  -- Move cursor to end and enter insert mode
  vim.cmd('normal! G')
  vim.cmd('startinsert')
end

-- Set up the keymap
function M.setup()
  vim.keymap.set('n', '<leader>bn', M.new_post, { desc = 'New blog post' })
end

return M

-- Usage:
-- 1. Copy this file to ~/.config/nvim/lua/blog.lua
-- 2. In your init.lua, add:
--    require('blog').setup()
-- 3. Press <leader>bn to create a new post
