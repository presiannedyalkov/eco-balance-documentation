# Quick Start - Local Testing

## The Problem

When serving the built site locally, Docusaurus uses the `baseUrl` from the config (`/eco-balance-documentation/`), which causes "Cannot GET /eco-balance-documentation/" errors.

## Solution: Use Development Server (Easiest)

The development server automatically handles baseUrl correctly:

```bash
npm start -- --port 3023 --host 0.0.0.0
```

Then access from Windows browser:
- `http://localhost:3023`
- Or `http://172.20.161.172:3023` (your WSL IP)

## Alternative: Serve Built Site Locally

If you need to test the production build:

### Option 1: Use the Script
```bash
./scripts/serve-local.sh
```

This automatically:
1. Changes baseUrl to `/` temporarily
2. Rebuilds the site
3. Serves on port 3023
4. Restores original config on exit

### Option 2: Manual Steps

1. **Edit `docusaurus.config.js`:**
   ```javascript
   baseUrl: '/',  // Change from '/eco-balance-documentation/'
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Serve:**
   ```bash
   npm run serve
   ```

4. **Access:** `http://localhost:3023` or `http://<wsl-ip>:3023`

5. **Remember to change baseUrl back** before committing!

## Recommended Workflow

For local development and testing:
```bash
npm start -- --port 3023 --host 0.0.0.0
```

This is the easiest and doesn't require config changes.

