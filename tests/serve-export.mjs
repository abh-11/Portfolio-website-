import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

const root = resolve("out");
const mount = process.env.NEXT_PUBLIC_BASE_PATH || "";
const types = {
  ".html": "text/html; charset=utf-8", ".js": "application/javascript",
  ".css": "text/css", ".svg": "image/svg+xml", ".webp": "image/webp",
  ".avif": "image/avif", ".png": "image/png", ".jpg": "image/jpeg",
  ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".wav": "audio/wav",
  ".woff2": "font/woff2", ".ico": "image/x-icon", ".json": "application/json",
  ".txt": "text/plain", ".xml": "application/xml",
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname !== mount && !pathname.startsWith(mount + "/")) throw new Error();
    let file = resolve(root, "." + pathname.slice(mount.length));
    if (file !== root && !file.startsWith(root + sep)) throw new Error();
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    const body = await readFile(file);
    response.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    response.end(body);
  } catch {
    const body = await readFile(join(root, "404.html")).catch(() => "Page not found");
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(body);
  }
});

server.listen(Number(process.env.PLAYWRIGHT_PORT || 4173), "127.0.0.1");
