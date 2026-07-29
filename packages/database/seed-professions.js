const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  {
    name: 'Công nghệ Thông tin (IT)',
    description: 'Các ngành nghề liên quan đến phần mềm, phần cứng, mạng và dữ liệu.',
    professions: ['Lập trình viên', 'Kiểm thử phần mềm (QA/QC)', 'Phân tích dữ liệu', 'Thiết kế UI/UX', 'Quản trị hệ thống', 'Quản lý dự án IT', 'Kỹ sư AI/Machine Learning']
  },
  {
    name: 'Marketing & Truyền thông',
    description: 'Các ngành nghề quảng cáo, truyền thông, tiếp thị và sáng tạo nội dung.',
    professions: ['Chuyên viên Digital Marketing', 'Content Creator', 'Chuyên viên SEO', 'Quan hệ công chúng (PR)', 'Quản lý Fanpage', 'Thiết kế đồ họa', 'Chuyên viên quảng cáo (Ads)']
  },
  {
    name: 'Kinh doanh & Bán hàng',
    description: 'Các ngành nghề liên quan đến doanh số, phát triển thị trường và chăm sóc khách hàng.',
    professions: ['Nhân viên Kinh doanh (Sales)', 'Chuyên viên Telesales', 'Quản lý bán hàng', 'Phát triển thị trường', 'Chăm sóc khách hàng', 'Môi giới bất động sản']
  },
  {
    name: 'Tài chính & Kế toán',
    description: 'Các ngành nghề quản lý tài chính, sổ sách, kiểm toán và đầu tư.',
    professions: ['Kế toán tổng hợp', 'Kế toán trưởng', 'Chuyên viên phân tích tài chính', 'Giao dịch viên ngân hàng', 'Kiểm toán viên', 'Chuyên viên tư vấn đầu tư']
  },
  {
    name: 'Giáo dục & Đào tạo',
    description: 'Các ngành nghề giảng dạy, đào tạo, và tư vấn giáo dục.',
    professions: ['Giáo viên/Giảng viên', 'Gia sư', 'Chuyên viên đào tạo', 'Tư vấn tuyển sinh', 'Nghiên cứu viên', 'Thiết kế chương trình học']
  },
  {
    name: 'Hành chính & Nhân sự',
    description: 'Các ngành nghề văn phòng, quản trị nhân sự và phúc lợi.',
    professions: ['Hành chính văn phòng', 'Chuyên viên tuyển dụng', 'C&B (Lương & Phúc lợi)', 'Trợ lý Giám đốc', 'Chuyên viên đào tạo nội bộ']
  },
  {
    name: 'Y tế & Sức khỏe',
    description: 'Các ngành nghề chăm sóc sức khỏe, y tế và dược phẩm.',
    professions: ['Bác sĩ', 'Điều dưỡng', 'Dược sĩ', 'Chuyên viên tư vấn sức khỏe', 'Kỹ thuật viên y tế', 'Chuyên viên tâm lý']
  },
  {
    name: 'Kỹ thuật & Xây dựng',
    description: 'Các ngành nghề kỹ thuật công nghiệp, cơ khí và xây dựng.',
    professions: ['Kỹ sư xây dựng', 'Kỹ sư cơ khí', 'Kỹ sư điện', 'Kiến trúc sư', 'Kỹ thuật viên bảo trì', 'Kỹ sư tự động hóa']
  },
  {
    name: 'Dịch vụ & Du lịch',
    description: 'Các ngành nghề nhà hàng, khách sạn, du lịch và dịch vụ ăn uống.',
    professions: ['Lễ tân', 'Quản lý nhà hàng/khách sạn', 'Hướng dẫn viên du lịch', 'Đầu bếp', 'Pha chế (Bartender)', 'Nhân viên phục vụ']
  },
  {
    name: 'Nghệ thuật & Giải trí',
    description: 'Các ngành nghề sáng tạo nghệ thuật, điện ảnh, âm nhạc và giải trí.',
    professions: ['Diễn viên', 'Nhạc sĩ/Ca sĩ', 'Biên tập viên video', 'Tổ chức sự kiện (Event Planner)', 'Nhiếp ảnh gia', 'Đạo diễn']
  }
];

async function main() {
  console.log("Bắt đầu insert dữ liệu...");
  for (const cat of categories) {
    // Check if category exists
    let dbCat = await prisma.professionCategory.findFirst({
      where: { name: cat.name }
    });

    if (!dbCat) {
      dbCat = await prisma.professionCategory.create({
        data: {
          name: cat.name,
          description: cat.description,
          isActive: true
        }
      });
      console.log(`Created category: ${cat.name}`);
    } else {
      console.log(`Category exists: ${cat.name}`);
    }

    for (const prof of cat.professions) {
      const dbProf = await prisma.profession.findFirst({
        where: { name: prof }
      });
      
      if (!dbProf) {
        await prisma.profession.create({
          data: {
            name: prof,
            categoryId: dbCat.id,
            isActive: true
          }
        });
        console.log(`  - Created profession: ${prof}`);
      } else {
        console.log(`  - Profession already exists: ${prof}`);
      }
    }
  }
  console.log("Hoàn thành!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
