#!/usr/bin/env node
// provision_sandbox.js – create a private CodeSandbox from local files
import { readdirSync, readFileSync } from "node:fs";
import { join, relative }           from "node:path";
import { getParameters }            from "codesandbox-import-utils/lib/api/define.js";

///////////////////////////////////////////////////////////////////////////////
// 0. ENV
///////////////////////////////////////////////////////////////////////////////
const token = process.env.CODESANDBOX_TOKEN;
if (!token) {
  console.error("❌  Set CODESANDBOX_TOKEN first (export CODESANDBOX_TOKEN=...)");
  process.exit(1);
}

///////////////////////////////////////////////////////////////////////////////
// 1. Walk the repo, skipping dot-folders & node_modules
///////////////////////////////////////////////////////////////////////////////
const IGNORED_DIRS = new Set([".git", "node_modules"]);

function walk(dir) {
  const files = {};
  for (const dirent of readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(dirent.name) || dirent.name.startsWith(".")) continue;

    const full = join(dir, dirent.name);

    if (dirent.isDirectory()) {
      Object.assign(files, walk(full));
    } else if (dirent.isFile()) {
      files[relative(".", full)] = { content: readFileSync(full, "utf8") };
    }
  }
  return files;
}

const files       = walk(".");                     // all project files
const parameters  = getParameters({ files });      // compress for API

///////////////////////////////////////////////////////////////////////////////
// 2. Call the CodeSandbox “define” endpoint
///////////////////////////////////////////////////////////////////////////////
const res = await fetch(
  "https://codesandbox.io/api/v1/sandboxes/define?json=1",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ parameters })
  }
);

if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}

///////////////////////////////////////////////////////////////////////////////
// 3. Success!  Print the embed URL
///////////////////////////////////////////////////////////////////////////////
const { sandbox_id } = await res.json();
console.log("\n✅  Sandbox:", sandbox_id);
console.log("👉  Embed URL:");
console.log(`https://codesandbox.io/p/sandbox/${sandbox_id}?embed=1&view=editor\n`);
