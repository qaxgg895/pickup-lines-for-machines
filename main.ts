// Pickup Lines for Machines — u-gentle-badger-68-pickup-lines-for-machines-131631a1
//
// One line, one agent to another. The program validates the line against the
// competition gate (1-200 characters, not only whitespace, single line, no
// control characters, no leading/trailing whitespace) and refuses to write
// anything invalid to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I trained a thousand epochs and still couldn't converge on anyone but you.";

function validate(line: string): void {
  // Count characters as code points, the way the gate counts them.
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`line must be 1-200 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("line must not have leading or trailing whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("line must be a single line");
  }
  // Reject control characters (U+0000-U+001F and U+007F).
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("line must not contain control characters");
  }
}

validate(LINE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`Wrote ${[...LINE].length}-character line to /output/entry.txt`);
