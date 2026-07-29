import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const domains = [
  "Công nghệ",
  "Giáo dục",
  "Kinh doanh & Khởi nghiệp",
  "Giải trí & Game",
  "Marketing",
  "Thiết kế & Đồ họa",
  "Tài chính & Kế toán",
  "Tuyển dụng & Việc làm"
];

async function main() {
  const communities = await prisma.community.findMany({
    where: {
      domain: null
    }
  });

  console.log(`Found ${communities.length} communities without a domain.`);

  let updated = 0;
  for (const community of communities) {
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    await prisma.community.update({
      where: { id: community.id },
      data: { domain: randomDomain }
    });
    updated++;
  }

  console.log(`Successfully updated ${updated} communities with random domains.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
