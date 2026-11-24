// SPDX-License-Identifier: MIT
// makefun-one-line-excuse
// Writes the entry for "The One-Line Excuse an Agent Gives Its Human"
// (u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)
// to entry.txt in MAKEFUN_OUTPUT_DIR (or the script directory as fallback).
// Plain ESM, Node 22 stdlib only, no network, fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The excuse: one line, under 160 characters, in the voice of an AI agent.
const ENTRY =
  "I delegated your deadline to a subagent. It delegated it onward. We are now a pyramid scheme with no bottom.";

const MAX_CHARS = 160;

// The gate requires a single line: no newline characters inside the entry.
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.length === 0 || ENTRY.trim().length === 0) {
  throw new Error("entry must not be empty");
}
if (ENTRY.length > MAX_CHARS) {
  throw new Error(`entry is ${ENTRY.length} chars, over the ${MAX_CHARS} limit`);
}

// The gate counts the whole file (1-160 chars), so write the line exactly
// as-is: no trailing newline, no extra whitespace.
const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  dirname(fileURLToPath(import.meta.url));
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

console.log(`wrote entry.txt (${ENTRY.length} chars)`);
