# TÀI LIỆU GIỚI THIỆU DỰ ÁN GROUPHUB-AI

## I. Lý do dự án ra đời
Về cơ bản, dự án **GroupHub-AI** không chỉ đơn thuần là một danh bạ lưu trữ các hội nhóm, mà là một nền tảng khám phá cộng đồng trực tuyến toàn diện được hỗ trợ bởi Trí tuệ Nhân tạo. Khởi nguồn từ khó khăn của người dùng trong việc tìm kiếm các cộng đồng chất lượng, uy tín (giữa vô vàn các nhóm rác, lừa đảo, spam) trên các nền tảng như Facebook, Discord, Telegram, Zalo... GroupHub-AI giúp người dùng nhanh chóng tìm ra "ngôi nhà chung" phù hợp với sở thích và ngành nghề của mình. 

Nền tảng tích hợp trợ lý ảo AI giúp tư vấn thông minh, tự động phân tích nhu cầu và trả về các thẻ cộng đồng trực quan chỉ trong vài giây, giúp việc lựa chọn không gian giao lưu trực tuyến trở nên an toàn, nhanh chóng và dễ dàng hơn.

## II. Công nghệ sử dụng
- **Backend:** Next.js 14, Node.js, PostgreSQL (với Prisma ORM)
- **Frontend:** Next.js 14, React, Tailwind CSS, Radix UI / Base UI
- **AI:** 
  - Giao tiếp với người dùng: Hỗ trợ linh hoạt các mô hình ngôn ngữ lớn (LLMs) từ OpenAI, Google (Gemini) và Groq (Llama-3).
  - Kiến trúc tích hợp: Vercel AI SDK.
- **Xác thực & Bảo mật:** Better Auth (Hỗ trợ đăng nhập Google OAuth & Xác thực OTP qua Email).

**Bảng: Chi tiết thư viện sử dụng**

| STT | Tên Thư viện | Phiên bản | Bản quyền |
| :---: | :--- | :---: | :---: |
| 1 | next | 15.0.0 | MIT |
| 2 | react | 19.2.4 | MIT |
| 3 | tailwindcss | 4.0.0 | MIT |
| 4 | ai (Vercel AI SDK) | 7.0.41 | Apache 2.0 |
| 5 | @tanstack/react-query | 5.101.4 | MIT |
| 6 | prisma | 6.2.1 | Apache 2.0 |
| 7 | better-auth | 1.4.3 | MIT |
| 8 | zustand | 5.0.14 | MIT |
| 9 | framer-motion | 12.42.2 | MIT |
| 10 | recharts | 3.10.1 | MIT |
| 11 | react-markdown | 10.1.0 | MIT |
| 12 | lucide-react | 1.25.0 | ISC |
| 13 | nodemailer | 9.0.3 | MIT |
| 14 | sweetalert2 | 11.26.25 | MIT |

## III. Phân quyền và các chức năng chính
Trong dự án GroupHub-AI, hệ thống được thiết kế theo kiến trúc tối ưu hóa và bảo mật dữ liệu. Ứng dụng được chia thành 2 quyền chính là **Quản trị viên** và **Người dùng**.

### 1. Quản trị viên
Quản trị viên là người có quyền cao nhất trong hệ thống và là quyền duy nhất quản lý toàn bộ hệ thống.

- **Tổng quan hệ thống:** Xem thống kê chi tiết về số lượng hội nhóm, số lượng người dùng mới, tỷ lệ các ngành nghề phổ biến, lượt truy cập trong tuần và tình trạng hoạt động chung của hệ thống.
- **Quản lý người dùng:** Cho phép xem danh sách toàn bộ người dùng, xem chi tiết lịch sử hoạt động, khóa/mở khóa tài khoản hoặc thay đổi quyền hạn.
- **Quản lý Nhóm ngành nghề:** Cho phép Quản trị viên tạo, chỉnh sửa và quản lý các nhóm danh mục lớn, làm cơ sở để phân loại cấu trúc ngành nghề của hệ thống.
- **Quản lý Ngành nghề:** Cấu hình chi tiết các lĩnh vực, ngành nghề chuyên môn cụ thể, giúp việc phân loại hội nhóm trở nên mạch lạc và hỗ trợ người dùng tìm kiếm dễ dàng hơn.
- **Quản lý Hội nhóm:** Xem toàn bộ danh sách hội nhóm trên nền tảng, có quyền chỉnh sửa thông tin hoặc xóa các hội nhóm vi phạm tiêu chuẩn cộng đồng.
- **Duyệt người dùng:** Hệ thống yêu cầu kiểm duyệt tài khoản khắt khe. Quản trị viên sẽ đánh giá và quyết định cấp quyền truy cập (Phê duyệt) hoặc Từ chối đối với các yêu cầu đăng ký tài khoản mới.
- **Duyệt hội nhóm:** Mọi cộng đồng do người dùng đóng góp đều phải qua vòng kiểm duyệt. Quản trị viên sẽ xác minh tính chân thực và chất lượng của nhóm trước khi "Phê duyệt" để hiển thị công khai lên trang chủ.
- **Nhật ký hệ thống (Lịch sử hoạt động):** Hiển thị chi tiết toàn bộ lịch sử thao tác của tất cả người dùng và quản trị viên (ai đã làm gì, vào thời gian nào) nhằm đảm bảo tính minh bạch tuyệt đối.
- **Cài đặt hệ thống & Cấu hình AI:** Cho phép quản trị viên trực tiếp cấu hình hệ thống, tùy chỉnh tính cách (System Prompt) cho trợ lý ảo AI, thay đổi mã khóa API (API Key) và thiết lập mô hình AI ngay trên giao diện mà không cần can thiệp vào code.

### 2. Người dùng
- **Khám phá & Tìm kiếm:** Dễ dàng tìm kiếm các cộng đồng nổi bật bằng thanh tìm kiếm có hỗ trợ Debounce chống độ trễ, hoặc lọc theo từng nhóm ngành nghề chuyên biệt.
- **Chat AI (Trợ lý ảo thông minh):** Người dùng sẽ nhập mong muốn, sở thích của họ và AI sẽ trò chuyện để tư vấn cộng đồng phù hợp. Điểm đặc biệt là hệ thống tự động bọc dữ liệu để hiển thị thành các Thẻ cộng đồng (Cards) đẹp mắt ngay trong khung chat. Chatbot được thiết lập kỷ luật thép, chỉ phục vụ duy nhất mục đích tìm kiếm nhóm và từ chối các yêu cầu ngoài luồng.
- **Đăng cộng đồng:** Sau khi tài khoản được Admin phê duyệt, người dùng có thể đóng góp và gửi các cộng đồng chất lượng của chính họ lên hệ thống để chờ xét duyệt.

## IV. Tổng kết
Dự án GroupHub-AI không chỉ là một trang danh bạ liệt kê thông thường mà đóng vai trò như một "người dẫn đường" thông minh, mang lại giá trị thực tiễn vô cùng lớn cho những người đang tìm kiếm môi trường học tập, giao lưu và phát triển bản thân. Bằng cách kết hợp kiến trúc web hiện đại cùng các mô hình Trí tuệ nhân tạo (AI) thế hệ mới, GroupHub-AI giúp xóa bỏ rào cản thông tin nhiễu loạn, rút ngắn tối đa thời gian từ lúc có nhu cầu cho tới khi tham gia được vào một cộng đồng chất lượng, có giá trị thật sự.
