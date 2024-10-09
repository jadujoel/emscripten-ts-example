# Emscripten ts example

## Getting started

```bash
npm install
npm run build
npm run serve
```

if emscripten fails to build you might need to install emscripten sdk
- https://emscripten.org/docs/getting_started/downloads.html

if it still fails to build you might need to add the sdk to the bashrc

For MacOS I have these in my environment
```bashrc
# $HOME/.bashrc
source /Users/admin/workspace/emsdk/emsdk_env.sh
export LIBRARY_PATH="/opt/homebrew/lib:$LIBRARY_PATH"
export PKG_CONFIG_PATH="/opt/homebrew/lib/pkgconfig:$PKG_CONFIG_PATH"
```
