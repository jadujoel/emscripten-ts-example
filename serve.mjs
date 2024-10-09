import * as fs from "fs/promises";
import * as http from "http";
import * as path from "path";
import esbuild from 'esbuild'

/**
 * @param {string} extname
 *
 **/
function getContentType(extname) {
  switch (extname) {
    case ".js":
      return "text/javascript";
    case ".wasm":
      return "application/wasm";
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".json":
      return "application/json";
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method !== "GET") {
    res.writeHead(405);
    res.end();
    return;
  }
  if (req.url === "/") {
    req.url = "/index.html";
  }
  const filePath = "src" + req.url;
  const extname = path.extname(filePath);
  const contentType = getContentType(extname);
  if (contentType === undefined) {
    res.writeHead(404);
    res.end();
    return;
  }

  if (extname === ".js") {
    esbuild.build({
      entryPoints: [filePath.replace('.js', '.ts')],
      bundle: true,
      minify: true,
      sourcemap: 'inline',
      target: "esnext",
      write: false,
      // make into es module
      format: 'esm',
    }).then((result) => {
      const { outputFiles } = result;
      const [{ text }] = outputFiles;
      res.writeHead(200, { "Content-Type": contentType });
      res.end(text);
    });
    return
  }

  const content = await fs.readFile(filePath).catch(() => undefined)
  if (content === undefined) {
    res.writeHead(404);
    res.end();
    return;
  }

  res.writeHead(200, { 'Content-Type': contentType });
  res.end(content, 'utf-8');
});

server.listen(
  () => {
      console.log(`[server] running at http://localhost:${server.address().port}`);
  },
);
