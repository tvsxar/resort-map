import { spawn } from "node:child_process";

const receivedArguments = process.argv.slice(2);
const backendArguments = [...receivedArguments];

if (!backendArguments.includes("--map")) {
  backendArguments.push("--map", "./backend/map.ascii");
}

if (!backendArguments.includes("--bookings")) {
  backendArguments.push("--bookings", "./backend/bookings.json");
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const backendProcess = spawn(
  process.execPath,
  ["./backend/server.js", ...backendArguments],
  {
    stdio: "inherit",
  },
);

const frontendProcess = spawn(
  npmCommand,
  ["--prefix", "frontend", "run", "dev"],
  {
    stdio: "inherit",
  },
);

function stopApplications() {
  backendProcess.kill();
  frontendProcess.kill();
}

process.on("SIGINT", stopApplications);
process.on("SIGTERM", stopApplications);

backendProcess.on("exit", () => {
  frontendProcess.kill();
});

frontendProcess.on("exit", () => {
  backendProcess.kill();
});
