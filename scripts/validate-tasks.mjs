import { loadRepository } from "./lib/task-data.mjs";

try {
  const { records, catalog } = await loadRepository();
  console.log(`Validated ${records.length} task folder(s) and ${catalog.topics.length} topic(s).`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
