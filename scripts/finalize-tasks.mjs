import path from "node:path";
import { ROOT, loadRepository, buildPracticeIndex, writeJson } from "./lib/task-data.mjs";
import { generatePreviewManifest } from "./generate-preview-manifest.mjs";

try {
  const { records, catalog } = await loadRepository();
  await writeJson(path.join(ROOT, "data/practice-index.json"), buildPracticeIndex(records, catalog));
  await generatePreviewManifest(records);
  console.log(`Validated ${records.length} task(s); updated practice index and preview manifest.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
