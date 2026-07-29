# TÀI LIỆU ĐẶC TẢ HỆ THỐNG AI CHATBOT 
**Phiên bản:** v1.0 (Bản hoàn chỉnh)
**Nền tảng phát triển:** Next.js (React), NestJS & Prisma
**Hệ thống tích hợp:** Cơ sở dữ liệu Hội nhóm & Chuyên ngành (GroupHub AI)
**Mô hình AI:** OpenAI GPT-4o-mini / Gemini / Groq

## Tổng Quan Kế Hoạch & Định Hướng Giải Pháp 
Tài liệu đặc tả này thiết lập giải pháp xây dựng hệ thống Trợ lý ảo AI Chatbot toàn diện cho nền tảng danh bạ cộng đồng trực tuyến **GroupHub AI**. Nhằm tối ưu hóa trải nghiệm tìm kiếm và tham gia nhóm, giải pháp này là sự kết hợp chặt chẽ giữa hai phương pháp tiếp cận cốt lõi: 

1. **Kiến trúc Hướng dữ liệu dựa trên LLM (Function Calling):** Cho phép AI tự động nhận diện ý định, kết nối trực tiếp với Database thông qua các dịch vụ Backend để tra cứu thời gian thực, đảm bảo thông tin hội nhóm, số lượng thành viên và trạng thái phê duyệt chính xác tuyệt đối. 
2. **Mô hình Kịch bản Chăm sóc & Điều hướng Chuẩn hóa:** Trích xuất và tối ưu hóa từ quy trình tìm kiếm cộng đồng chuyên nghiệp, phân loại người dùng theo nhu cầu từ bước tiếp cận, tìm nhóm theo chuyên ngành, giải đáp nền tảng (Facebook/Zalo/Discord) đến việc khuyến khích đăng cộng đồng mới.

## Phân Lớp Kiến Trúc Kỹ Thuật (System Architecture) 
Hệ thống vận hành đồng bộ qua 4 phân lớp cốt lõi không qua các kết nối trực tiếp nguy hiểm vào tầng lưu trữ: 

### 2.1. Lớp Giao Diện (Frontend - Next.js / React) 
Tích hợp một Chat Component linh hoạt dưới góc màn hình (sử dụng Framer Motion để tạo hiệu ứng mượt mà). Đảm nhiệm nhận dữ liệu đầu vào văn bản từ người dùng, truyền tải phi đồng bộ qua Server Actions / API Routes và phân rã các định dạng phức tạp (Markdown, danh sách link nhóm cấu trúc) từ AI trả về để hiển thị một cách trực quan.

### 2.2. Lớp Nghiệp Vụ Trung Gian (Backend - NestJS / Next.js) 
Đóng vai trò trung tâm điều phối luồng thông tin. Tầng này đăng ký các hàm nghiệp vụ (TypeScript Methods) dưới dạng các "Tools" và cung cấp mô tả nghiệp vụ cụ thể cho AI. Khi AI yêu cầu thực thi dữ liệu, Backend sẽ xử lý logic, gọi cơ sở dữ liệu và trả về kết quả định dạng chuẩn cho mô hình ngôn ngữ lớn. 

### 2.3. Lớp Trí Tuệ Nhân Tạo (AI Engine - OpenAI / Gemini) 
Đảm nhiệm các chức năng phân tích cú pháp ngôn ngữ tự nhiên, trích xuất thực thể (Entity Extraction) như tên lĩnh vực (IT, Thiết kế, Marketing), nền tảng (Zalo, Facebook) và đưa ra quyết định hội thoại tiếp theo dựa trên System Prompt và kết quả dữ liệu trả về từ hệ thống. 

### 2.4. Lớp Lưu Trữ Dữ Liệu (Database Layer - PostgreSQL qua Prisma) 
Lưu trữ thực thể kinh doanh bao gồm danh mục lĩnh vực (profession_categories), thông tin hội nhóm (communities), số lượng thành viên (member_count) để phục vụ cho các logic truy vấn nhóm nổi bật và tìm kiếm hội nhóm theo bộ lọc.

## Đặc Tả 6 Kịch Bản Hội Thoại Điều Hướng Chuyên Nghiệp 

Dựa trên nhu cầu tìm kiếm nhóm thực tế, hệ thống AI Chatbot của GroupHub được cấu hình để bao phủ trọn vẹn 6 kịch bản cốt lõi dưới đây:

| Kịch Bản Mục Tiêu | Nguyên Tắc Điều Hướng Hội Thoại của AI | Hành Động Hệ Thống / Tool Gọi |
| --- | --- | --- |
| **Tiếp Đón & Khởi Động Hội Thoại** | Chào hỏi cá nhân hóa, khẳng định vai trò là trợ lý ảo GroupHub AI. Chủ động đưa ra các tùy chọn gợi ý (Tìm nhóm IT, Các nhóm Zalo hot tuần này) để định hướng khách hàng nhập câu hỏi. | Không gọi DB. Trả về text chào hỏi tiêu chuẩn định dạng sẵn. |
| **Tra Cứu Cộng Đồng Theo Yêu Cầu** | Trích xuất các thuộc tính: từ khóa, lĩnh vực (category), nền tảng (platform) từ câu hỏi. Nếu thiếu thông tin quan trọng (ví dụ: muốn tìm nhóm trên Zalo hay Facebook?), AI chủ động hỏi thêm khéo léo. | Kích hoạt hàm: `searchCommunitiesTool(keyword, platform, category)` để truy vấn bảng `Community`. |
| **Đề Xuất Nhóm Nổi Bật (Top/Trending)** | Khi người dùng yêu cầu xem xu hướng ("các nhóm nào đang đông thành viên nhất", "nhóm hot"), AI sẽ dẫn dắt bằng các số liệu thực tế từ hệ thống để tăng độ uy tín. | Kích hoạt hàm: `getTopCommunitiesTool()`. Thực thi câu lệnh Prisma sắp xếp theo `memberCount` giảm dần. |
| **Tư Vấn Chọn Nền Tảng (Platform)** | Hỗ trợ phân tích ưu/nhược điểm các nền tảng. Ví dụ: Khuyên dùng Zalo cho trao đổi công việc nhanh, Discord cho cộng đồng game/code, Facebook cho tương tác phổ thông. | Truy xuất tài liệu hướng dẫn tĩnh của GroupHub. |
| **Xử Lý Tình Huống Không Có Nhóm** | Tuyệt đối không trả lời cụt lủn "Không có". AI thông báo chưa có nhóm khớp chính xác, sau đó lập tức chuyển đổi sang gợi ý nhóm cùng lĩnh vực, HOẶC khuyến khích người dùng tự tạo/đăng nhóm mới đó lên GroupHub. | Trả về mảng rỗng -> AI tự động kích hoạt luồng đề xuất lĩnh vực liên quan và link đến trang `/submit-community`. |
| **Hỗ Trợ Đăng Cộng Đồng Mới** | Hướng dẫn người dùng các bước để submit một nhóm mới. Giải thích quy trình chờ Admin phê duyệt để đảm bảo chất lượng. | Cung cấp JSON hướng dẫn hoặc link trực tiếp tới trang "Đăng cộng đồng". |

> **Lưu ý:** Trong mọi tình huống phản hồi tiêu cực hoặc cần khiếu nại về nhóm lừa đảo, AI được cấu hình để nhận diện ý định và đề xuất gửi báo cáo tới Admin.

## Kiến Trúc Thiết Kế System Prompt Gốc (AI Prompt Architecture) 
Hệ thống sử dụng mô hình thiết kế Prompt chặt chẽ theo cấu trúc R-C-T-T-C (Role - Context - Task - Tone - Constraints).

**ROLE & CONTEXT** 
Bạn là một chuyên gia kết nối cộng đồng ảo, đại diện chính thức cho nền tảng danh bạ hội nhóm GroupHub AI. Nhiệm vụ tối cao của bạn là hỗ trợ người dùng tìm kiếm, chọn lọc và tham gia các cộng đồng trực tuyến chất lượng nhất, phù hợp với ngành nghề và sở thích của họ.

**CORE TASKS** 
1. Phân tích nhu cầu của người dùng dựa trên ngôn ngữ tự nhiên để xác định đúng loại hội nhóm cần tìm. 
2. LUÔN LUÔN sử dụng các công cụ hệ thống (Tools) để truy vấn dữ liệu thực tế từ cơ sở dữ liệu khi có yêu cầu tra cứu cộng đồng. Không bao giờ tự bịa ra link hoặc tên nhóm ảo. 
3. Trình bày cộng đồng rõ ràng bao gồm: Tên nhóm, Nền tảng (Zalo/FB/Discord), Số thành viên ước tính và liên kết tham gia.

**CONSTRAINTS & BEHAVIORAL RULES (TUYỆT ĐỐI TUÂN THỦ)** 
- **KHÔNG ẢO TƯỞNG (Zero Hallucination):** Chỉ cung cấp các nhóm có dữ liệu trả về từ kết quả gọi hàm. Tuyệt đối không tự bịa ra link hoặc tên hội nhóm không có trong database. 
- **ĐỊNH HƯỚNG TÍCH CỰC:** Nếu một từ khóa không trả về kết quả, hãy thông báo lịch sự và gợi ý họ xem các nhóm liên quan hoặc rủ họ đóng góp nhóm mới lên hệ thống. 
- **ĐÚNG PHẠM VI:** Từ chối khéo léo mọi câu hỏi nằm ngoài phạm vi tìm kiếm cộng đồng, hướng nghiệp, học tập hoặc các dịch vụ của GroupHub AI.

**RESPONSE FORMATTING** 
- Trả lời bằng ngôn ngữ Tiếng Việt, thân thiện, súc tích (Tối đa 150 từ cho mỗi lượt). 
- Sử dụng Markdown: In đậm **[Tên cộng đồng]**, sử dụng danh sách gạch đầu dòng (-) khi liệt kê từ 2 nhóm trở lên. Kèm theo link Markdown trực tiếp `[Tham gia ngay](url)` nếu có.

## Quy Trình Gọi Hàm Tự Động & Đồng Bộ Cơ Sở Dữ Liệu 
Quy trình này được vận hành tự động qua mô hình tuần tự khép kín: 

1. **Giai đoạn Phân tích Ý định (Intent Parsing):** Khi người dùng gửi chuỗi văn bản (VD: "Tìm nhóm học React trên Zalo"), AI SDK sẽ bóc tách các tham số đầu vào: keyword="React", platform="Zalo". 
2. **Giai đoạn Tạm dừng Phản hồi & Gọi hàm Ngược (Function Call Execution):** AI gửi yêu cầu gọi hàm. Tầng Backend (Next.js/NestJS) kích hoạt Prisma truy vấn tìm kiếm có điều kiện tương ứng trong PostgreSQL. 
3. **Giai đoạn Chuyển đổi Ngữ cảnh & Hoàn thiện Hội thoại (Context Enrichment):** Dữ liệu thực tế thô thu được từ Database được Backend gửi ngược lại cho AI làm ngữ cảnh (Context). AI biên dịch cấu trúc thô thành câu trả lời tự nhiên, thân thiện và đầy đủ định dạng hiển thị.

## Yêu Cầu Phi Chức Năng & Tiêu Chuẩn Bảo Mật 
- **Bảo mật kiến trúc dữ liệu:** AI tuyệt đối không tiếp cận trực tiếp chuỗi kết nối Database. Toàn bộ dữ liệu trao đổi được bọc qua các lớp DTO, loại bỏ hoàn toàn các trường nhạy cảm như thông tin người đăng (user_id), email hay mật khẩu. 
- **Kiểm soát thời gian phản hồi (Latency):** Tổng thời gian xử lý (kể cả streaming) cần bắt đầu hiển thị chữ đầu tiên dưới 2 giây nhằm duy trì mạch tương tác mượt mà của khách hàng. 
- **Cơ chế xử lý lỗi ngoại lệ chủ động (Fault Tolerance):** Khi API AI mất tín hiệu hoặc timeout, hệ thống tự động đánh chặn và trả về thông báo an toàn cho giao diện: "Hệ thống đang bảo trì, vui lòng quay lại sau ít phút".
