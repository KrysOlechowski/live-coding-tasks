import { promises as fs } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import yaml from "js-yaml";
import { ROOT, readOptionalFile, checkedTaskFile, writeJson, parseFrontmatter } from "./lib/task-data.mjs";

try {
  const taskArg = process.argv[2];
  if (!/^tasks\/[a-z0-9-]+\/[a-z0-9-]+$/.test(taskArg ?? "")) throw new Error("Usage: npm run scaffold:init -- tasks/<category>/<slug> [main.ts support.ts]");
  const taskDir = path.join(ROOT, taskArg);
  if (await readOptionalFile(path.join(taskDir, "scaffold.json")) !== null) throw new Error("A scaffold manifest already exists; snapshots are immutable.");
  await checkedTaskFile(taskDir, "task.md");
  await checkedTaskFile(taskDir, "interviewer.md");
  let workingNames = process.argv.slice(3);
  if (!workingNames.length) {
    workingNames = [];
    for (const name of ["main.ts", "main.tsx"]) if (await readOptionalFile(path.join(taskDir, name)) !== null) workingNames.push(name);
  }
  if (workingNames.filter((name) => ["main.ts", "main.tsx"].includes(name)).length !== 1 || new Set(workingNames).size !== workingNames.length) throw new Error("List exactly one main.ts or main.tsx and every additional candidate-editable TS file once.");
  const files = [];
  for (const working of workingNames) {
    if (!/\.tsx?$/.test(working) || working.includes(".scaffold.")) throw new Error("Starter files must be working .ts or .tsx files.");
    const workingFile = await checkedTaskFile(taskDir, working);
    const snapshot = working.replace(/(\.tsx?)$/, ".scaffold$1");
    const snapshotFile = path.join(taskDir, snapshot);
    try { await fs.lstat(snapshotFile); throw new Error(`Snapshot already exists: ${snapshot}`); }
    catch (error) { if (error.code !== "ENOENT") throw error; }
    const content = await fs.readFile(workingFile);
    files.push({ working, snapshot, sha256: createHash("sha256").update(content).digest("hex"), content });
  }
  const taskFile = path.join(taskDir, "task.md");
  const taskSource = await fs.readFile(taskFile, "utf8");
  const taskDoc = parseFrontmatter(taskSource);
  if (taskDoc.data.createdAt === undefined) {
    taskDoc.data.createdAt = new Date().toISOString();
    await fs.writeFile(taskFile, `---\n${yaml.dump(taskDoc.data, { schema: yaml.JSON_SCHEMA, lineWidth: -1 })}---\n\n${taskDoc.body}\n`);
  }
  for (const file of files) await fs.writeFile(path.join(taskDir, file.snapshot), file.content, { flag: "wx" });
  await writeJson(path.join(taskDir, "scaffold.json"), { schemaVersion: 1, files: files.map(({ working, snapshot, sha256 }) => ({ working, snapshot, sha256 })) });
  console.log(`Created ${files.length} snapshot(s) and scaffold manifest. Run npm run finalize:tasks to validate.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
