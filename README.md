# To fix better-sqlite3 error:

Install electron-rebuild (if not already installed)
```bash
npm install --save-dev electron-rebuild
```

Rebuild native modules for Electron
```bash
./node_modules/.bin/electron-rebuild
```

Or using npx
```bash
npx electron-rebuild
```