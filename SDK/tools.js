import { execSync } from "child_process";

function execute(cmd) {
  try {
    return execSync(cmd, { encoding: "utf-8" });
  } catch (err) {
    return err.toString();
  }
}

export { execute };
