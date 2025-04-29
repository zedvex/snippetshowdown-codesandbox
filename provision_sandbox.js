#!/usr/bin/env node
import fetch                     from "node-fetch";
import { getParameters }         from "codesandbox-import-utils/lib/api/define.js";
import { readFileSync, readdirSync } from "node:fs/promises";
import { join }                  from "node:path";

const token     = process.env.CODESANDBOX_TOKEN;
if (!token) { console.error("Set CODESANDBOX_TOKEN first"); process.exit(1); }

const OWNER = "zedvex";
const REPO  = "snippetshowdown-codesandbox";
const BRANCH= "main";

/* ----- 1.  Grab the repo files from disk ------------------- */
const walk = dir =>
  Object.fromEntries(
    readdirSync(dir, { withFileTypes:true })
      .flatMap(d =>
        d.isDirectory()
          ? Object.entries(walk(join(dir,d.name)))
          : [[ join(dir,d.name), { content: readFileSync(join(dir,d.name),"utf8") } ]])
  );

const files = walk("./");                       // whole repo
const parameters = getParameters({ files });    // compressed blob

/* ----- 2.  Call the Define API ----------------------------- */
const res = await fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1",{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
  },
  body:JSON.stringify({ parameters })
});

if(!res.ok){ console.error(await res.text()); process.exit(1); }

const { sandbox_id } = await res.json();
console.log("\n✅ Sandbox:", sandbox_id);
console.log("👉 Embed:\nhttps://codesandbox.io/p/sandbox/"
            + sandbox_id + "?embed=1&view=editor\n");
