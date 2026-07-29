const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace vietnamese characters
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
    .replace(/đ/gi, 'd')
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
}

async function main() {
  const communities = await prisma.community.findMany();
  
  for (const comm of communities) {
    if (!comm.slug) {
      let slug = slugify(comm.name);
      
      // Ensure unique slug
      let uniqueSlug = slug;
      let counter = 1;
      while (true) {
        const existing = await prisma.community.findUnique({ where: { slug: uniqueSlug } });
        if (!existing || existing.id === comm.id) break;
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      }

      await prisma.community.update({
        where: { id: comm.id },
        data: { slug: uniqueSlug }
      });
      console.log(`Updated community ${comm.id} with slug: ${uniqueSlug}`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
