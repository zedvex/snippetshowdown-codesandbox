#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Installing system prerequisites…"
sudo apt update
sudo apt install -y git curl build-essential

echo "🔧 Installing Node LTS…"
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
corepack enable  # gives pnpm/yarn wrappers

echo "📦 Installing workspace dependencies…"
pnpm install  # or: npm install -w frontend -w backend

echo "✅ Local install done."
echo
echo "👉 1) export CODESANDBOX_TOKEN=<your-token>"
echo "👉 2) node provision_sandbox.js"
echo "👉 3) embed the printed URL in your contest UI."
