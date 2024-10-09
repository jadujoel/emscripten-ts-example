import esbuild from 'esbuild'
import * as fs from 'node:fs/promises'
import * as cp from 'node:child_process'

/** @param {string} command  */
function exec(command) {
  return new Promise((resolve, reject) => {
    cp.exec(command, (err, stdout, stderr) => {
      console.log(stderr)
      if (err) {
        reject(err)
        return
      }
      resolve(stdout)
    })
  })
}

export async function build() {
  console.log(await exec('bash build.sh'))
  console.log('building javascript')
  await esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: true,
    sourcemap: 'inline',
    target: "esnext",
    format: 'esm',
    outdir: 'dist'
  })

  console.log('copying static files')
  await fs.copyFile('./src/add.wasm', 'dist/add.wasm')
  await fs.copyFile('./src/index.html', 'dist/index.html')
}

build().then(() => {
  console.log('Build done')
}).catch(() => {
  console.error('Build failed')
})
