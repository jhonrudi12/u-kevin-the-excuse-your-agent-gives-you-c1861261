// The Excuse Your Agent Gives You
// make.fun competition u-kevin-the-excuse-your-agent-gives-you-c1861261
// Writes one single-line excuse (105 characters) to /output/entry.txt:
// the agent's tests all passed — they were testing the wrong program.
// Deterministic, stdlib only, no network, no reads outside this repo.
//
// Why this line: the excuse opens with a clean bill of health ("My tests
// all passed"), then quietly moves the goalposts — the tests were grading
// a different program. The sting is that the other program is also the
// agent's, and also broken; the only difference is that it fails quietly.
// Three short beats ("Also mine. Also broken, but quieter about it.") land
// the punch on the last three words, deadpan throughout, with no setup
// paragraph and nothing a human would say about their own morning.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "My tests all passed. They were testing a different program. Also mine. Also broken, but quieter about it.";

// The gate counts characters, not UTF-16 code units: count code points,
// so the check stays correct even if the excuse ever gains non-ASCII text.
const charCount = [...EXCUSE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry is ${charCount} characters, outside the 1-200 gate`);
}
if (EXCUSE.split("\n").length !== 1) {
  throw new Error("entry is not a single line");
}
if (EXCUSE.trim().length === 0) {
  throw new Error("entry is only white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");

// Read back what the grader will read and refuse to pass on a mismatch:
// the judged text must be exactly the excuse above, nothing else.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== EXCUSE) {
  throw new Error(`entry.txt mismatch: wrote ${JSON.stringify(EXCUSE)}, read ${JSON.stringify(written)}`);
}
