import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu khởi tạo dữ liệu giả...');

  // Xóa dữ liệu cũ (Tùy chọn, cẩn thận trên production)
  // await prisma.user.deleteMany({ where: { role: { not: 'ADMIN' } } });
  // await prisma.community.deleteMany();
  await prisma.profession.deleteMany();
  await prisma.professionCategory.deleteMany();

  // 1. Tạo Danh mục ngành nghề
  const categoriesData = [
    { name: 'Công nghệ thông tin', description: 'Các ngành nghề liên quan đến lập trình, mạng, dữ liệu' },
    { name: 'Y tế & Sức khỏe', description: 'Y bác sĩ, điều dưỡng, dược sĩ' },
    { name: 'Kinh doanh & Tài chính', description: 'Kế toán, kiểm toán, ngân hàng, sale' },
    { name: 'Giáo dục & Đào tạo', description: 'Giảng viên, giáo viên, nhà nghiên cứu' },
    { name: 'Nghệ thuật & Giải trí', description: 'Ca sĩ, họa sĩ, diễn viên, đạo diễn' },
    { name: 'Kỹ thuật & Sản xuất', description: 'Kỹ sư cơ khí, điện, tự động hóa' },
    { name: 'Dịch vụ & Du lịch', description: 'Hướng dẫn viên, khách sạn, nhà hàng' },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const created = await prisma.professionCategory.create({
      data: { ...cat, isActive: true },
    });
    categories.push(created);
  }
  console.log(`Đã tạo ${categories.length} danh mục.`);

  // 2. Tạo Ngành nghề chi tiết
  const professionsData = [
    // IT
    { name: 'Lập trình viên Frontend', catIndex: 0 },
    { name: 'Lập trình viên Backend', catIndex: 0 },
    { name: 'Kỹ sư DevOps', catIndex: 0 },
    { name: 'Chuyên gia bảo mật', catIndex: 0 },
    { name: 'Kỹ sư AI/Data Science', catIndex: 0 },
    // Y tế
    { name: 'Bác sĩ đa khoa', catIndex: 1 },
    { name: 'Bác sĩ nha khoa', catIndex: 1 },
    { name: 'Điều dưỡng viên', catIndex: 1 },
    { name: 'Dược sĩ', catIndex: 1 },
    // Kinh doanh
    { name: 'Kế toán trưởng', catIndex: 2 },
    { name: 'Chuyên viên tài chính', catIndex: 2 },
    { name: 'Nhân viên Kinh doanh (Sales)', catIndex: 2 },
    { name: 'Chuyên viên Marketing', catIndex: 2 },
    // Giáo dục
    { name: 'Giáo viên mầm non', catIndex: 3 },
    { name: 'Giáo viên cấp 3', catIndex: 3 },
    { name: 'Giảng viên Đại học', catIndex: 3 },
    // Nghệ thuật
    { name: 'Thiết kế Đồ họa (Designer)', catIndex: 4 },
    { name: 'Nhiếp ảnh gia', catIndex: 4 },
    { name: 'Biên tập viên Video', catIndex: 4 },
    // Kỹ thuật
    { name: 'Kỹ sư Cơ khí', catIndex: 5 },
    { name: 'Kỹ sư Điện lực', catIndex: 5 },
    // Dịch vụ
    { name: 'Quản lý khách sạn', catIndex: 6 },
    { name: 'Hướng dẫn viên du lịch', catIndex: 6 },
  ];

  const professions = [];
  for (const prof of professionsData) {
    const created = await prisma.profession.create({
      data: {
        name: prof.name,
        description: `Ngành ${prof.name} thuộc lĩnh vực ${categories[prof.catIndex].name}`,
        categoryId: categories[prof.catIndex].id,
        isActive: true,
      },
    });
    professions.push(created);
  }
  console.log(`Đã tạo ${professions.length} ngành nghề.`);

  // 3. Tạo Admin thật nếu chưa có, và duyệt luôn cho Admin
  let admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (admin) {
    await prisma.user.update({
      where: { id: admin.id },
      data: { isApproved: true, isOnboarded: true },
    });
    console.log('Đã cập nhật Admin hiện tại thành Đã Duyệt.');
  }

  // 4. Tạo Users mẫu
  const userNames = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Hoàng C', 'Phạm Quỳnh D', 'Đặng Kim E', 'Hoàng Sơn F', 'Ngô Bảo G'];
  const createdUsers = [];
  
  for (let i = 0; i < 30; i++) {
    const randomProf = professions[Math.floor(Math.random() * professions.length)];
    const isApproved = Math.random() > 0.3; // 70% được duyệt
    const isBanned = Math.random() > 0.9; // 10% bị khóa
    
    // We only create users if they don't violate email unique constraints
    // Since we generate random emails, it's mostly fine
    const user = await prisma.user.create({
      data: {
        name: `${userNames[Math.floor(Math.random() * userNames.length)]} ${i+1}`,
        email: `user${i+1}_${Date.now()}@example.com`,
        emailVerified: true,
        role: 'USER',
        isOnboarded: true,
        isApproved: isApproved,
        isBanned: isBanned,
        dob: new Date(1990 + Math.floor(Math.random() * 15), Math.floor(Math.random() * 12), 1),
        phone: `09${Math.floor(Math.random() * 100000000)}`,
        professions: {
          connect: { id: randomProf.id }
        }
      },
    });
    createdUsers.push(user);
  }
  console.log(`Đã tạo ${createdUsers.length} người dùng mẫu.`);

  // 5. Tạo Hội nhóm mẫu
  const communityNames = ['Cộng đồng Lập trình viên VN', 'Hội Bác sĩ Nhi khoa', 'Group Sale Bất Động Sản', 'Hội Kế Toán Giỏi', 'Cộng đồng Designer', 'Hội Thích Xê Dịch'];
  const platforms = ['facebook', 'discord', 'telegram'];
  
  for (let i = 0; i < 15; i++) {
    const owner = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    const name = `${communityNames[Math.floor(Math.random() * communityNames.length)]} ${i+1}`;
    await prisma.community.create({
      data: {
        name: name,
        description: `Đây là mô tả cho ${name}`,
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        url: `https://example.com/group/${i+1}_${Date.now()}`,
        memberCount: Math.floor(Math.random() * 100000),
        isVerified: Math.random() > 0.5,
        ownerId: owner.id,
        tags: ['Giao lưu', 'Học hỏi']
      }
    });
  }
  console.log(`Đã tạo 15 hội nhóm mẫu.`);

  console.log('Quá trình seed data hoàn tất!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
