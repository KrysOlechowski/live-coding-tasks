import path from "node:path";
import { ROOT, loadRepository, buildPracticeIndex, writeJson } from "./lib/task-data.mjs";

const { records, catalog } = await loadRepository();
await writeJson(path.join(ROOT, "data/practice-index.json"), buildPracticeIndex(records, catalog));
console.log(`Generated practice index for ${records.length} task(s).`);
