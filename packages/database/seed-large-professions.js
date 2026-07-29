const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = {
  "Công nghệ Thông tin (IT)": [
    "Lập trình viên Web (Frontend)", "Lập trình viên Web (Backend)", "Lập trình viên Fullstack", "Lập trình viên Mobile (iOS)", "Lập trình viên Mobile (Android)",
    "Kiểm thử phần mềm (Manual QA)", "Kiểm thử phần mềm (Automation QA)", "Phân tích nghiệp vụ (BA)", "Thiết kế UI/UX", "Quản trị hệ thống (System Admin)",
    "Kỹ sư DevOps", "Chuyên gia bảo mật mạng (Cybersecurity)", "Kỹ sư dữ liệu (Data Engineer)", "Nhà khoa học dữ liệu (Data Scientist)", "Chuyên viên phân tích dữ liệu (Data Analyst)",
    "Kỹ sư AI/Machine Learning", "Quản lý dự án IT (Project Manager)", "Scrum Master", "Kiến trúc sư phần mềm (Solution Architect)", "Lập trình viên Game"
  ],
  "Marketing & Truyền thông": [
    "Chuyên viên Digital Marketing", "Chuyên viên Marketing tổng hợp", "Content Creator", "Copywriter", "Chuyên viên SEO", "Chuyên viên quảng cáo (Performance Marketing)",
    "Quản lý mạng xã hội (Social Media Manager)", "Chuyên viên PR (Quan hệ công chúng)", "Tổ chức sự kiện (Event Executive)", "Thiết kế đồ họa (Graphic Designer)",
    "Quản lý thương hiệu (Brand Manager)", "Chuyên viên Trade Marketing", "Chuyên viên nghiên cứu thị trường", "Quản lý chiến dịch (Campaign Manager)", "Chuyên viên Media Planner"
  ],
  "Kinh doanh & Bán hàng": [
    "Nhân viên Kinh doanh (Sales Executive)", "Chuyên viên phát triển kinh doanh (BDE)", "Trưởng phòng Kinh doanh", "Giám đốc Kinh doanh (CSO)", "Chuyên viên Telesales",
    "Nhân viên bán hàng tại cửa hàng", "Quản lý cửa hàng (Store Manager)", "Đại diện thương mại", "Chuyên viên chăm sóc khách hàng", "Nhân viên hỗ trợ kỹ thuật (Sales Support)",
    "Key Account Manager (KAM)", "Nhân viên kinh doanh xuất nhập khẩu", "Chuyên viên môi giới bất động sản", "Chuyên viên tư vấn bảo hiểm", "Cộng tác viên kinh doanh"
  ],
  "Tài chính & Kế toán": [
    "Kế toán viên", "Kế toán tổng hợp", "Kế toán trưởng", "Kế toán thanh toán", "Kế toán kho", "Kế toán thuế", "Kế toán công nợ",
    "Chuyên viên phân tích tài chính", "Cố vấn tài chính", "Chuyên viên đầu tư", "Kiểm toán viên nội bộ", "Kiểm toán viên độc lập",
    "Giao dịch viên ngân hàng", "Chuyên viên tín dụng", "Chuyên viên thẩm định giá", "Giám đốc Tài chính (CFO)", "Chuyên gia quản trị rủi ro"
  ],
  "Hành chính & Nhân sự": [
    "Chuyên viên Hành chính văn phòng", "Nhân viên Lễ tân", "Trợ lý Giám đốc (Executive Assistant)", "Thư ký văn phòng",
    "Chuyên viên Tuyển dụng (Talent Acquisition)", "Chuyên viên C&B (Lương & Phúc lợi)", "Chuyên viên Đào tạo nội bộ", "Chuyên viên Phát triển tổ chức (OD)",
    "Chuyên viên Quan hệ lao động", "Quản lý Nhân sự (HR Manager)", "Giám đốc Nhân sự (CHRO)", "Chuyên viên truyền thông nội bộ"
  ],
  "Giáo dục & Đào tạo": [
    "Giáo viên Mầm non", "Giáo viên Tiểu học", "Giáo viên Trung học", "Giáo viên Ngoại ngữ", "Giáo viên Dạy nghề",
    "Giảng viên Đại học/Cao đẳng", "Trợ giảng (Teaching Assistant)", "Gia sư", "Chuyên viên tư vấn tuyển sinh", "Nhân viên học vụ",
    "Chuyên viên phát triển chương trình học", "Nghiên cứu viên giáo dục", "Quản lý trung tâm đào tạo", "Cố vấn học tập"
  ],
  "Y tế & Chăm sóc sức khỏe": [
    "Bác sĩ Đa khoa", "Bác sĩ Chuyên khoa", "Bác sĩ Răng Hàm Mặt", "Bác sĩ Da liễu", "Bác sĩ Tâm thần",
    "Điều dưỡng viên", "Nữ hộ sinh", "Dược sĩ lâm sàng", "Dược sĩ bán thuốc", "Trình dược viên",
    "Kỹ thuật viên xét nghiệm", "Kỹ thuật viên chẩn đoán hình ảnh", "Vật lý trị liệu", "Chuyên viên tâm lý học", "Chuyên gia dinh dưỡng"
  ],
  "Kỹ thuật & Xây dựng": [
    "Kỹ sư xây dựng dân dụng", "Kỹ sư cầu đường", "Kỹ sư cơ điện (MEP)", "Kỹ sư cơ khí", "Kỹ sư tự động hóa", "Kỹ sư điện / điện tử",
    "Kỹ sư vật liệu", "Kiến trúc sư công trình", "Kiến trúc sư cảnh quan", "Kiến trúc sư nội thất",
    "Giám sát công trình", "Họa viên kiến trúc (Draftsman)", "Kỹ thuật viên trắc địa", "Quản lý dự án xây dựng", "Kỹ thuật viên bảo trì máy móc"
  ],
  "Vận tải & Logistics": [
    "Chuyên viên Xuất nhập khẩu (Logistics/Supply Chain)", "Nhân viên mua hàng (Purchasing)", "Nhân viên quản lý kho", "Điều phối viên vận tải",
    "Nhân viên giao nhận (Forwarder)", "Nhân viên khai báo hải quan", "Quản lý chuỗi cung ứng", "Quản lý đội xe (Fleet Manager)",
    "Tài xế xe tải", "Tài xế xe khách", "Tài xế công nghệ", "Thuyền viên / Thủy thủ", "Tiếp viên hàng không", "Phi công"
  ],
  "Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)": [
    "Quản lý nhà hàng", "Quản lý khách sạn", "Nhân viên Lễ tân khách sạn", "Nhân viên phục vụ (Waiter/Waitress)", "Pha chế (Bartender/Barista)",
    "Bếp trưởng (Executive Chef)", "Đầu bếp (Chef)", "Phụ bếp", "Nhân viên buồng phòng (Housekeeping)", "Chuyên viên tổ chức tiệc (Banquet)",
    "Nhân viên giám sát chất lượng dịch vụ", "Chuyên viên tư vấn tour du lịch", "Hướng dẫn viên du lịch", "Nhân viên điều hành tour"
  ],
  "Nghệ thuật, Giải trí & Thiết kế": [
    "Đạo diễn", "Biên kịch", "Diễn viên", "Ca sĩ", "Nhạc sĩ / Nhà sản xuất âm nhạc", "Người mẫu", "Vũ công (Dancer)",
    "Nhiếp ảnh gia (Photographer)", "Quay phim (Cameraman)", "Biên tập viên video (Video Editor)", "Kỹ thuật viên âm thanh",
    "Thiết kế thời trang", "Thiết kế nội thất", "Thiết kế trang sức", "Nhà điêu khắc / Họa sĩ", "Chuyên gia trang điểm (Makeup Artist)"
  ],
  "Luật & Pháp lý": [
    "Luật sư tư vấn", "Luật sư tranh tụng", "Cố vấn pháp lý doanh nghiệp", "Thư ký luật sư", "Công chứng viên",
    "Chuyên viên pháp chế", "Trợ giúp viên pháp lý", "Thẩm phán", "Thư ký tòa án", "Kiểm sát viên",
    "Cán bộ thi hành án", "Chuyên viên sở hữu trí tuệ", "Chuyên viên thu hồi nợ pháp lý"
  ],
  "Sản xuất & Công nghiệp": [
    "Quản đốc phân xưởng", "Tổ trưởng sản xuất", "Kỹ sư quản lý chất lượng (QA/QC)", "Kỹ sư thiết kế khuôn mẫu", "Kỹ sư cải tiến sản xuất (CI)",
    "Kỹ thuật viên lắp ráp", "Kỹ thuật viên hàn", "Kỹ thuật viên CNC", "Công nhân vận hành máy", "Công nhân đóng gói",
    "Nhân viên KCS (Kiểm tra chất lượng)", "Chuyên viên An toàn lao động (HSE)", "Kỹ sư môi trường"
  ],
  "Nông, Lâm, Ngư nghiệp": [
    "Kỹ sư nông nghiệp", "Kỹ sư lâm nghiệp", "Kỹ sư nuôi trồng thủy sản", "Bác sĩ thú y", "Nhà nghiên cứu lai tạo giống",
    "Kỹ thuật viên chăn nuôi", "Chuyên viên khuyến nông", "Quản lý trang trại", "Công nhân thu hoạch", "Thủy thủ đánh bắt xa bờ",
    "Chuyên viên kiểm định nông sản", "Kỹ sư công nghệ thực phẩm", "Nhân viên cảnh lâm"
  ],
  "Báo chí, Truyền hình & Xuất bản": [
    "Nhà báo", "Phóng viên hiện trường", "Biên tập viên báo chí", "Biên tập viên truyền hình", "Phát thanh viên",
    "Người dẫn chương trình (MC)", "Đạo diễn truyền hình", "Chuyên viên kịch bản chương trình", "Thư ký tòa soạn", "Biên dịch viên",
    "Phiên dịch viên", "Nhân viên thiết kế xuất bản", "Nhà văn / Tác giả", "Chuyên viên quản lý bản quyền"
  ],
  "Khoa học & Nghiên cứu": [
    "Nhà nghiên cứu sinh học", "Nhà nghiên cứu hóa học", "Nhà vật lý học", "Nhà toán học", "Chuyên gia môi trường",
    "Nhà khảo cổ học", "Nhà địa chất học", "Nhà khí tượng học", "Nhà thiên văn học", "Chuyên viên phòng thí nghiệm",
    "Trợ lý nghiên cứu", "Chuyên gia công nghệ sinh học", "Chuyên gia công nghệ vật liệu", "Nhà nghiên cứu xã hội học"
  ],
  "Dịch vụ Cá nhân & Gia đình": [
    "Chuyên viên spa / chăm sóc sắc đẹp", "Thợ làm tóc (Hair Stylist)", "Thợ làm móng (Nail Technician)", "Thợ phun xăm thẩm mỹ",
    "Huấn luyện viên thể hình (PT)", "Giáo viên Yoga / Pilates", "Người giúp việc gia đình", "Bảo mẫu",
    "Nhân viên chăm sóc người già", "Thợ may đo", "Thợ sửa chữa điện nước dân dụng", "Nhân viên dọn vệ sinh công nghiệp", "Bảo vệ / Vệ sĩ"
  ],
  "Bán lẻ & Thương mại Điện tử": [
    "Quản lý danh mục sản phẩm (Category Manager)", "Chuyên viên vận hành sàn TMĐT (E-commerce Operations)", "Chuyên viên phát triển nhà bán hàng",
    "Nhân viên nhập liệu sản phẩm", "Trực page / Chốt đơn hàng", "Chuyên viên mua hàng bán lẻ (Buyer)", "Nhân viên quản lý gian hàng",
    "Chuyên viên tối ưu trải nghiệm khách hàng (CX)", "Chuyên viên quản lý tồn kho TMĐT", "Quản lý kho hàng Fulfillment", "Shipper giao hàng TMĐT"
  ],
  "Khác (Tự do, Freelancer, v.v.)": [
    "Freelancer lập trình", "Freelancer thiết kế", "Freelancer viết lách", "Cộng tác viên (CTV)", "Streamer",
    "YouTuber / Vlogger", "KOL / Influencer", "Thợ thủ công mỹ nghệ", "Nhà giao dịch tự do (Trader)", "Khởi nghiệp (Startup Founder)"
  ]
};

async function main() {
  console.log("Bắt đầu insert lượng lớn dữ liệu...");
  for (const [categoryName, professions] of Object.entries(data)) {
    // Check if category exists
    let dbCat = await prisma.professionCategory.findFirst({
      where: { name: categoryName }
    });

    if (!dbCat) {
      dbCat = await prisma.professionCategory.create({
        data: {
          name: categoryName,
          isActive: true
        }
      });
      console.log(`[+] Đã tạo danh mục: ${categoryName}`);
    } else {
      console.log(`[*] Đã tồn tại danh mục: ${categoryName}`);
    }

    let createdCount = 0;
    for (const prof of professions) {
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
        createdCount++;
      }
    }
    console.log(`    -> Đã chèn thêm ${createdCount}/${professions.length} ngành nghề mới.`);
  }
  console.log("Hoàn thành! Đã chèn thành công tất cả dữ liệu.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
