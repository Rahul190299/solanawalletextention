import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dist = path.resolve(__dirname, "../dist");
const manifestPath = path.join(dist, "manifest.json");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

// find files
const files = fs.readdirSync(dist);

function findFile(name) {
  return files.find(f => f.startsWith(name));
}

// update paths
manifest.background.service_worker = findFile("background");

manifest.content_scripts[0].js = [
  findFile("content")
];

// write back
fs.writeFileSync(
  manifestPath,
  JSON.stringify(manifest, null, 2)
);

console.log("✅ Manifest updated with hashed files");