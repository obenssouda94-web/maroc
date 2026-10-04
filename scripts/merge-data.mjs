// One-off consolidation script for the split data part-files.
// Merges the `*.partN.ts` arrays into single canonical modules.
import { readFileSync, writeFileSync } from "node:fs";

function extractEntries(filePath) {
  const source = readFileSync(filePath, "utf8");
  const start = source.indexOf("= [");
  if (start === -1) throw new Error(`No array start in ${filePath}`);
  const body = source.slice(start + 3);
  const trimmed = body.trim();
  // strip trailing "]"
  const inner = trimmed.endsWith("];") ? trimmed.slice(0, -2).trim() : trimmed;
  return inner;
}

function merge(parts, outPath, typeName, varName) {
  const entries = parts.map((p) => `./${p}`).map((p) => extractEntries(p));
  const merged = entries.join(",\n");
  const output =
    `import type { ${typeName} } from "@/types";\n\n` +
    `const ${varName}: ${typeName}[] = [\n${merged}\n];\n\n` +
    `export default ${varName};\nexport { ${varName} };\n`;
  writeFileSync(outPath, output, "utf8");
  console.log(`Wrote ${outPath} (${parts.length} parts)`);
}

merge(
  ["history.part1.ts", "history.part2.ts"],
  "src/data/history.ts",
  "HistoricalPeriod",
  "historicalPeriods",
);
merge(
  ["dynasties.part1.ts", "dynasties.part2.ts", "dynasties.part3.ts"],
  "src/data/dynasties.ts",
  "Dynasty",
  "dynasties",
);
merge(
  Array.from({ length: 7 }, (_, i) => `royal-figures.part${i + 1}.ts`),
  "src/data/royal-figures.ts",
  "RoyalFigure",
  "royalFigures",
);
console.log("Done");
