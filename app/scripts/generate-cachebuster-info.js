#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const targetDir = process.argv[2] || path.join(__dirname, "..", "..", "dist", "app");

if (!fs.existsSync(targetDir)) {
    console.error("Target directory not found:", targetDir);
    process.exit(1);
}

const info = {};

function walk(dir, base) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(base, entry.name).replace(/\\/g, "/");
        if (entry.isDirectory()) {
            walk(fullPath, relPath);
        } else if (entry.name !== "sap-ui-cachebuster-info.json") {
            const stat = fs.statSync(fullPath);
            info[relPath] = String(stat.mtimeMs);
        }
    }
}

walk(targetDir, "");

const outPath = path.join(targetDir, "sap-ui-cachebuster-info.json");
fs.writeFileSync(outPath, JSON.stringify(info, null, 2));
console.log("Generated sap-ui-cachebuster-info.json with", Object.keys(info).length, "entries");
