#!/bin/bash

emcc src/add.c \
    -Oz \
    -s WASM=1 \
    -s ENVIRONMENT='web' \
    -s EXPORT_ES6=1 \
    -s EXPORTED_FUNCTIONS="['_add']" \
    -s NO_FILESYSTEM=1 \
    -s ALLOW_MEMORY_GROWTH=0 \
    -o src/add.mjs
