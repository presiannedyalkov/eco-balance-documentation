# Serving Locally (WSL/Windows)

When serving Docusaurus locally, especially from WSL to a Windows browser, you need to adjust the baseUrl.

## Quick Fix

The issue is that `baseUrl` is set to `/eco-balance-documentation/` for GitHub Pages, but locally it should be `/`.

### Option 1: Use Development Server (Recommended)

```bash
npm start
```

This automatically uses `baseUrl: '/'` and opens at `http://localhost:3000`

To use port 3023:
```bash
npm start -- --port 3023 --host 0.0.0.0
```

### Option 2: Temporarily Modify baseUrl for Local Serving

1. Edit `docusaurus.config.js`
2. Change `baseUrl: '/eco-balance-documentation/',` to `baseUrl: '/',`
3. Run: `npm run serve`
4. Access at: `http://localhost:3023` (or `http://<wsl-ip>:3023` from Windows)
5. **Remember to change it back** before committing!

### Option 3: Use Environment Variable (if supported)

Some Docusaurus versions support environment-based config, but the classic preset doesn't easily support this.

## WSL Network Access

To access from Windows browser:

1. **Find WSL IP:**
   ```bash
   hostname -I | awk '{print $1}'
   ```

2. **Access from Windows:**
   - `http://<wsl-ip>:3023` (replace `<wsl-ip>` with actual IP)
   - Or use `localhost:3023` if WSL2 port forwarding is configured

3. **If localhost doesn't work:**
   - Use the WSL IP address directly
   - Or configure Windows port forwarding

## Recommended Workflow

For local development, use:
```bash
npm start -- --port 3023 --host 0.0.0.0
```

This uses the development server which handles baseUrl correctly.

For production testing:
```bash
npm run build
npm run serve
```

Then manually change `baseUrl` to `/` in config, or use the workaround above.

