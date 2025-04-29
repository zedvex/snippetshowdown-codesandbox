// provision_sandbox.js  (minimal embed-URL helper)
import { execSync } from "node:child_process";

const OWNER = "zedvex";
const REPO  = "snippetshowdown-codesandbox";
const url   =
  `https://codesandbox.io/p/github/${OWNER}/${REPO}?embed=1&view=editor`;

console.log("👉  Drop this in an <iframe>:\n" + url + "\n");
