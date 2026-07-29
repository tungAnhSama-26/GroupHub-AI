import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const result = await prisma.category.deleteMany({
    where: { name: { contains: 'sfsdfsf' } }
  })
  console.log('Deleted categories:', result.count)
  
  const groups = await prisma.community.deleteMany({
    where: { name: { contains: 'sfsdfsf' } }
  })
  console.log('Deleted groups:', groups.count)
}

main()
