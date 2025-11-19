# Homepage Fix

The homepage was showing "page not found" because of a conflict between the custom homepage component and the docs routing.

## Solution Applied

1. **Removed custom homepage** (`website/src/pages/index.js`) - moved to `.bak` files
2. **Set `slug: /` in `docs/intro.md`** - This makes the intro page the homepage

## How It Works Now

- Homepage (`/eco-balance-documentation/`) → Shows the Project Hub content from `docs/intro.md`
- All other docs work as before

## To Restore Custom Homepage (if needed later)

If you want the custom React homepage back:

1. Restore the files:
   ```bash
   mv website/src/pages/index.js.bak website/src/pages/index.js
   mv website/src/pages/index.module.css.bak website/src/pages/index.module.css
   ```

2. Remove `slug: /` from `docs/intro.md`

3. Fix the homepage component to work with baseUrl

## Current Status

The homepage should now work at:
- `http://localhost:3023/eco-balance-documentation/`
- `http://172.20.161.172:3023/eco-balance-documentation/`

It will show the Project Hub content from `docs/intro.md`.

