const { PrismaClient } = require("./node_modules/@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const res = await prisma.user.updateMany({
    where: { email: "tunganht26@gmail.com" },
    data: { role: "ADMIN" }
  });
  console.log("Updated users:", res.count);
}
main();
