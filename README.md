# Emscripten TypeScript Example

A simple project demonstrating how to build a C project into WebAssembly using Emscripten, with TypeScript for type definitions and easy integration into web applications.

This project includes:
- A basic C function (`add`) that adds two numbers.
- Compilation into WebAssembly with TypeScript type definitions.
- An HTML page that loads the WebAssembly module and displays the result.

The demo page is available [here](https://jadujoel.github.io/emscripten-ts-example/).

## Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [Usage](#usage)
4. [Detailed Explanation](#detailed-explanation)
5. [Troubleshooting](#troubleshooting)
6. [Environment Configuration](#environment-configuration)
7. [CI/CD and Deployment](#ci-cd-and-deployment)

## Overview

This project demonstrates building a WebAssembly module from C code using Emscripten. Additionally, TypeScript bindings are generated automatically using the `--emit-tsd` flag, making it easier to work with the WebAssembly module in TypeScript projects.

## Setup

To get started with this project, make sure you have [Emscripten](https://emscripten.org/docs/getting_started/downloads.html) installed and configured.

### Prerequisites

- **Emscripten**: Follow [Emscripten's installation guide](https://emscripten.org/docs/getting_started/downloads.html) to set up the SDK.
- **TypeScript**: Install globally to enable TypeScript compilation:
  ```bash
  npm install -g typescript
  ```

### Installing Dependencies

Run the following commands to install the necessary dependencies:
```bash
npm install
```

### Building the Project

The build script compiles the C code into WebAssembly and generates a `.d.ts` file for TypeScript bindings.
```bash
bash build.sh
```

This will create:
- `lib.mjs`: The compiled WebAssembly JavaScript glue code.
- `lib.d.ts`: TypeScript definitions for the WebAssembly module.

### Serving the Application

To serve the app locally, you can use the provided `serve.mjs` script, but any static server will work.
```bash
node serve.mjs
```
Then, navigate to the provided url to see the result.

## Usage

The code structure is straightforward:
1. **HTML** (`index.html`): Loads the JavaScript file that initializes the WebAssembly module.
2. **JavaScript/TypeScript** (`index.ts`): Imports and initializes the module, then interacts with it.
3. **C Code** (`lib.c`): Defines the `add` function, which is exposed to JavaScript.

### Example Code

Here’s a breakdown of the core components:

#### `lib.c`:
```c
// lib.c
#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
int add(int a, int b) {
    return a + b;
}
```

#### `index.ts`:
```typescript
import init from './lib.mjs';

const promise = init();

async function main() {
  const { _add: add } = await promise;
  const result = add(1, 2);
  document.getElementById('result')!.innerText = result.toString();
}

main();
```

#### `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Addition Result</title>
</head>
<body>
  <h1>Addition Result</h1>
  <p id="result"></p>
  <script src="index.js" type="module"></script>
</body>
</html>
```

## Detailed Explanation

### Compilation with Emscripten

The `build.sh` script compiles the `lib.c` file to WebAssembly, generating both `lib.mjs` and `lib.d.ts`. The TypeScript file provides type safety and IDE support for the WebAssembly module by defining the functions and memory exports.

### Using TypeScript Definitions

The `lib.d.ts` file automatically generates the necessary TypeScript types, making it easy to use WebAssembly functions directly with type hints and autocompletion.

## Troubleshooting

If you encounter issues, consider these troubleshooting steps:
1. **Emscripten Fails to Find TypeScript**: Ensure TypeScript is globally installed, as it’s needed for generating `.d.ts` files.
2. **Permission Issues**: On some systems, you might need to prepend `sudo` to the `npm install` commands.
3. **Module Not Found**: Ensure the path is correctly specified when importing modules in TypeScript.

## Environment Configuration

### Emscripten Setup on macOS

In your `.bashrc` or `.zshrc` file, add the following to set up Emscripten:

```bash
# .bashrc or .zshrc
source /Users/admin/workspace/emsdk/emsdk_env.sh
export LIBRARY_PATH="/opt/homebrew/lib:$LIBRARY_PATH"
export PKG_CONFIG_PATH="/opt/homebrew/lib/pkgconfig:$PKG_CONFIG_PATH"
```

### Running Locally with Homebrew

For macOS users, you may also consider using [Homebrew](https://brew.sh/) for easier installation and management of dependencies.

## CI-CD and Deployment

This project includes a GitHub Action for CI/CD:
- The action installs Emscripten and builds the WebAssembly module.
- It then deploys the `index.html`, `lib.mjs`, and `lib.d.ts` files to GitHub Pages.


## Conclusion

This project is a simple example of integrating C, WebAssembly, and TypeScript in a web project. Feel free to fork and extend it. Contributions are welcome!
