#!/bin/bash
# Serve Docusaurus locally with baseUrl set to / for WSL/Windows access
# This script temporarily modifies baseUrl for local serving

echo "🔧 Preparing local server configuration..."
echo ""

# Backup original config
cp docusaurus.config.js docusaurus.config.js.backup

# Temporarily change baseUrl to / for local serving
sed -i "s|baseUrl: '/eco-balance-documentation/',|baseUrl: '/',|g" docusaurus.config.js

echo "✅ Configuration updated for local serving"
echo "🚀 Starting server on port 3023..."
echo "📡 Access from Windows:"
echo "   - http://localhost:3023"
echo "   - http://$(hostname -I | awk '{print $1}'):3023"
echo ""
echo "⚠️  Note: baseUrl has been temporarily changed to '/'"
echo "   Original config backed up to docusaurus.config.js.backup"
echo ""

# Rebuild with new baseUrl
npm run build

# Start server
npx docusaurus serve --port 3023 --host 0.0.0.0 --no-open

# Restore original config on exit
trap "mv docusaurus.config.js.backup docusaurus.config.js && echo '✅ Original config restored'" EXIT
