import { promises as fs } from "node:fs";
import path from "node:path";

function getTargetTaskDir() {
  const input = process.argv[2];

  if (!input) {
    throw new Error(
      "Missing task directory argument. Usage: npm run restore:scaffold -- tasks/<category>/<slug>",
    );
  }

  return path.resolve(process.cwd(), input);
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const taskDir = getTargetTaskDir();
  const scaffoldTsx = path.join(taskDir, "main.scaffold.tsx");
  const scaffoldTs = path.join(taskDir, "main.scaffold.ts");
  const mainTsx = path.join(taskDir, "main.tsx");
  const mainTs = path.join(taskDir, "main.ts");

  if (await exists(scaffoldTsx)) {
    await fs.copyFile(scaffoldTsx, mainTsx);
    console.log(`Restored ${path.relative(process.cwd(), mainTsx)} from scaffold snapshot.`);
    return;
  }

  if (await exists(scaffoldTs)) {
    await fs.copyFile(scaffoldTs, mainTs);
    console.log(`Restored ${path.relative(process.cwd(), mainTs)} from scaffold snapshot.`);
    return;
  }

  throw new Error(
    `No scaffold snapshot found in ${path.relative(process.cwd(), taskDir)}. Expected main.scaffold.tsx or main.scaffold.ts.`,
  );
}

void main();
