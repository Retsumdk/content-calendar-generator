import { join } from "path";
import { describe, test, expect } from "bun:test";

const CLI = join(import.meta.dir, "index.ts");

function run(args: string[]): { stdout: string; exitCode: number } {
  const proc = Bun.spawnSync(["bun", CLI, ...args]);
  return { stdout: proc.stdout.toString(), exitCode: proc.exitCode };
}

describe("content-calendar-generator CLI", () => {
  test("generates the requested number of posts with day and time slots", () => {
    const { stdout, exitCode } = run(["--generate", "5", "--platform", "twitter", "--days", "7"]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Content Calendar");
    expect(stdout).toContain("Total posts: 5");
    expect(stdout).toContain("| AI");
    expect(stdout).toContain("| Automation");
  });

  test("defaults to 30 linkedin posts when no flags are given", () => {
    const { stdout, exitCode } = run([]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Total posts: 30");
    expect(stdout).toContain("09:00");
    expect(stdout).toContain("Day 1");
  });

  test("custom topics are used in order and cycle across posts", () => {
    const { stdout, exitCode } = run(["--generate", "4", "--topics", "Agents", "Eval"]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("| Agents");
    expect(stdout).toContain("| Eval");
  });

  test("--help prints usage and exits cleanly", () => {
    const { stdout, exitCode } = run(["--help"]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Usage:");
    expect(stdout).toContain("--platform");
  });
});
