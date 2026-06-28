import { getSeedEnvFromProcess } from "./backoffice-seed";

const env = getSeedEnvFromProcess();

if (!env.defaultSuperadminPassword) {
  throw new Error("FOUNDJOB_DEFAULT_SUPERADMIN_PASSWORD is required. Do not hardcode the default admin password.");
}

console.log("Backoffice SUPERADMIN seed command scaffold is ready.");
console.log("Wire BackofficeSeedStore to Prisma before running this against a real database.");
