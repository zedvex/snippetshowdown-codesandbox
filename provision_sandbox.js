#!/usr/bin/env node
import fetch from "node-fetch";

const token = process.env.CODESANDBOX_TOKEN;
if (!token) {
  console.error("❌  CODESANDBOX_TOKEN env var is missing"); process.exit(1);
}

const payload = {
  githubRepo: "<YOUR_USER>/snippetshowdown-codesandbox",
  branch: "main",
  title: "SnippetShowdown Instance"
};

const res = await fetch("https://codesandbox.io/api/v1/sandboxes/define", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify(payload)
});

if (!res.ok) {
  console.error(await res.text()); process.exit(1);
}

const data = await res.json();
console.log("\n✅ Sandbox ID:", data.sandbox.id);
console.log("👉 Embed URL:");
console.log(`https://codesandbox.io/p/sandbox/${data.sandbox.id}?embed=1&view=editor`);
