import { prisma } from "../src/lib/prisma";

const PERMISSIONS = ["READ_DASHBOARD", "MANAGE_USERS", "VIEW_REPORTS"];

async function main() {
  for (const name of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
