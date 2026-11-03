import { promises as fs } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ROOT, readScaffoldFiles } from "./lib/task-data.mjs";

try {
  const target = process.argv[2];
  if (!/^tasks\/[a-z0-9-]+\/[a-z0-9-]+$/.test(target ?? "")) throw new Error("Usage: npm run restore:scaffold -- tasks/<category>/<slug>");
  const taskDir = path.join(ROOT, target);
  const manifest = JSON.parse(await fs.readFile(path.join(taskDir, "scaffold.json"), "utf8"));
  // Verify every path and hash before changing any working file or removing review.
  const files = await readScaffoldFiles(taskDir, manifest);
  for (const file of files) await fs.writeFile(file.workingFile, file.content);
  await fs.rm(path.join(taskDir, "review.md"), { force: true });
  console.log(`Restored ${files.length} file(s); removed the current review.`);
  const result = spawnSync(process.execPath, [path.join(ROOT, "scripts/finalize-tasks.mjs")], { cwd: ROOT, stdio: "inherit" });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
