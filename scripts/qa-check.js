#!/usr/bin/env node
/**
 * QA Check Script — Qurbaniya
 * Scans the project for common issues:
 *  1. Escaped Unicode in source files
 *  2. Missing images referenced in code
 *  3. Leftover console.log/console.error
 *  4. Undocumented environment variables
 *  5. Broken internal links (href to non-existent routes)
 *
 * Usage: npm run qa
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
let errors = 0;
let warnings = 0;

function log(type, msg) {
  if (type === "error") {
    errors++;
    console.log(`  ❌ ${msg}`);
  } else if (type === "warn") {
    warnings++;
    console.log(`  ⚠️  ${msg}`);
  } else {
    console.log(`  ✅ ${msg}`);
  }
}

function getAllFiles(dir, exts, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git", "scripts"].includes(entry.name)) continue;
      getAllFiles(fullPath, exts, results);
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

// ─── 1. Escaped Unicode ───
function checkUnicodeEscapes() {
  console.log("\n📝 1. Checking for escaped Unicode...");
  const files = getAllFiles(ROOT, [".ts", ".tsx", ".js", ".json"]);
  const pattern = /\\u00[0-9a-fA-F]{2}|\\u20[0-9a-fA-F]{2}/g;
  let found = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      const matches = line.match(pattern);
      if (matches) {
        found += matches.length;
        const rel = path.relative(ROOT, file);
        log("error", `${rel}:${i + 1} — ${matches.join(", ")}`);
      }
    });
  }

  if (found === 0) log("ok", "No escaped Unicode found");
}

// ─── 2. Missing images ───
function checkImages() {
  console.log("\n🖼️  2. Checking image references...");
  const files = getAllFiles(ROOT, [".ts", ".tsx"]);
  const srcPattern = /src=["'`](\/([\w/.-]+))["'`]/g;
  let missing = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    let match;
    while ((match = srcPattern.exec(content)) !== null) {
      const imgPath = match[1];
      if (imgPath.startsWith("http") || imgPath.startsWith("//")) continue;
      const fullPath = path.join(ROOT, "public", imgPath);
      if (!fs.existsSync(fullPath)) {
        missing++;
        const rel = path.relative(ROOT, file);
        log("error", `${rel} — missing: ${imgPath}`);
      }
    }
  }

  if (missing === 0) log("ok", "All local image references exist");
}

// ─── 3. Console statements ───
function checkConsoleLogs() {
  console.log("\n🔍 3. Checking for leftover console statements...");
  const files = getAllFiles(ROOT, [".ts", ".tsx", ".js"]);
  const pattern = /\bconsole\.(log|error|warn|debug)\b/g;
  let found = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      if (line.match(pattern) && !line.trim().startsWith("//")) {
        found++;
        const rel = path.relative(ROOT, file);
        log("warn", `${rel}:${i + 1} — ${line.trim().substring(0, 80)}`);
      }
    });
  }

  if (found === 0) log("ok", "No console statements found");
}

// ─── 4. Environment variables ───
function checkEnvVars() {
  console.log("\n🔐 4. Checking environment variables...");
  const files = getAllFiles(ROOT, [".ts", ".tsx", ".js"]);
  const pattern = /process\.env\.(\w+)/g;
  const usedVars = new Set();

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    let match;
    while ((match = pattern.exec(content)) !== null) {
      usedVars.add(match[1]);
    }
  }

  // Check .env.local.example
  const exampleFile = path.join(ROOT, ".env.local.example");
  if (!fs.existsSync(exampleFile)) {
    log("error", ".env.local.example file not found");
    return;
  }

  const exampleContent = fs.readFileSync(exampleFile, "utf-8");
  const documentedVars = new Set();
  for (const line of exampleContent.split("\n")) {
    const m = line.match(/^(\w+)=/);
    if (m) documentedVars.add(m[1]);
  }

  for (const v of usedVars) {
    if (v === "NODE_ENV") continue;
    if (!documentedVars.has(v)) {
      log("warn", `${v} is used in code but not in .env.local.example`);
    }
  }

  const undocumented = [...usedVars].filter(
    (v) => v !== "NODE_ENV" && !documentedVars.has(v)
  );
  if (undocumented.length === 0) log("ok", `All ${usedVars.size} env vars documented`);
}

// ─── 5. Internal links ───
function checkInternalLinks() {
  console.log("\n🔗 5. Checking internal links...");
  const files = getAllFiles(ROOT, [".ts", ".tsx"]);
  const hrefPattern = /href=["'`](\/[^"'`#]*)/g;

  // Discover valid routes from app/ directory
  const appDir = path.join(ROOT, "app");
  const validRoutes = new Set(["/"]);

  function discoverRoutes(dir, prefix) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) {
        if (entry.name === "page.tsx" || entry.name === "page.ts") {
          validRoutes.add(prefix || "/");
        }
        continue;
      }
      const name = entry.name;
      if (name.startsWith("(")) {
        // Route group — no segment added
        discoverRoutes(path.join(dir, name), prefix);
      } else if (name.startsWith("[")) {
        // Dynamic route — matches anything
        validRoutes.add(prefix + "/*");
        discoverRoutes(path.join(dir, name), prefix + "/*");
      } else if (name === "api") {
        discoverRoutes(path.join(dir, name), prefix + "/api");
      } else {
        discoverRoutes(path.join(dir, name), prefix + "/" + name);
      }
    }
  }

  discoverRoutes(appDir, "");

  let broken = 0;
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    let match;
    while ((match = hrefPattern.exec(content)) !== null) {
      const href = match[1];
      if (href.startsWith("/api/")) continue;
      if (href.startsWith("/_next")) continue;

      // Check if route exists (exact or dynamic match)
      const isValid =
        validRoutes.has(href) ||
        [...validRoutes].some((r) => {
          if (!r.includes("*")) return false;
          const base = r.replace("/*", "");
          return href.startsWith(base + "/");
        });

      if (!isValid) {
        broken++;
        const rel = path.relative(ROOT, file);
        log("warn", `${rel} — href="${href}" may not match a route`);
      }
    }
  }

  if (broken === 0) log("ok", `All internal links valid (${validRoutes.size} routes discovered)`);
}

// ─── Run all checks ───
console.log("🔬 Qurbaniya QA Check");
console.log("=".repeat(40));

checkUnicodeEscapes();
checkImages();
checkConsoleLogs();
checkEnvVars();
checkInternalLinks();

console.log("\n" + "=".repeat(40));
console.log(`\n📊 Results: ${errors} errors, ${warnings} warnings`);
process.exit(errors > 0 ? 1 : 0);
