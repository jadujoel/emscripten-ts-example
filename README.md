# Emscripten ts example

Built Page available at https://jadujoel.github.io/emscripten-ts-example/

To get started run:

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

## CI

There is an github action that install emscripten, in which case you dont need to set up emscripten locally.
It builds the wasm and js and deploys the built files to github pages.

Feel free to fork of course.
