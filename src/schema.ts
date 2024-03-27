import * as fs from "node:fs";
import * as path from "node:path";

const modulesPath = path.join(import.meta.dir, "modules");
const modules = fs.readdirSync(modulesPath);

for (const module of modules) {
  const moduleSchemaPath = path.join(modulesPath, module, "schema");
  if (fs.existsSync(moduleSchemaPath)) {
    await import(moduleSchemaPath);
  }
}

// builder part
import { builder } from "./builder";
export default builder.toSchema();
