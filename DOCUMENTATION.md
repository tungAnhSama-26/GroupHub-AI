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

## III. Phân quyền và các chức năng chính
Trong dự án GroupHub-AI, hệ thống được thiết kế theo kiến trúc tối ưu hóa và bảo mật dữ liệu. Ứng dụng được chia thành 2 quyền chính là **Quản trị viên** và **Người dùng**.

### 1. Quản trị viên
Quản trị viên là người có quyền cao nhất trong hệ thống và là quyền duy nhất quản lý toàn bộ hệ thống.

- **Tổng quan hệ thống:** Xem thống kê chi tiết về số lượng cộng đồng, số lượng người dùng mới, các ngành nghề phổ biến và tình trạng tài nguyên chung của hệ thống.
- **Quản lý cấu hình AI:** Cho phép quản trị viên trực tiếp tùy chỉnh tính cách, giới hạn chuyên môn (System Prompt) cho trợ lý ảo, cũng như thay đổi các thiết lập mô hình AI ngay trên giao diện quản trị một cách linh hoạt.
- **Quản lý người dùng:** Quản lý toàn bộ người dùng đã đăng ký vào hệ thống. Cung cấp bộ lọc trạng thái hoạt động (chưa duyệt, đã duyệt, khóa tài khoản) và có thể tìm kiếm phân quyền hệ thống một cách dễ dàng.
- **Nhật ký hệ thống:** Hiển thị toàn bộ lịch sử thao tác của người dùng (tạo nhóm, cập nhật thông tin) khi sử dụng website nhằm đảm bảo tính minh bạch.
- **Quản lý cộng đồng (Xét duyệt):** Quản trị viên kiểm duyệt các cộng đồng do người dùng gửi lên. Hệ thống cung cấp bộ lọc trạng thái để dễ dàng tìm kiếm và chỉ những cộng đồng đạt chuẩn mới được "Phê duyệt" để hiển thị lên trang chủ.

### 2. Người dùng
- **Khám phá & Tìm kiếm:** Dễ dàng tìm kiếm các cộng đồng nổi bật bằng thanh tìm kiếm có hỗ trợ Debounce chống độ trễ, hoặc lọc theo từng nhóm ngành nghề chuyên biệt.
- **Chat AI (Trợ lý ảo thông minh):** Người dùng sẽ nhập mong muốn, sở thích của họ và AI sẽ trò chuyện để tư vấn cộng đồng phù hợp. Điểm đặc biệt là hệ thống tự động bọc dữ liệu để hiển thị thành các Thẻ cộng đồng (Cards) đẹp mắt ngay trong khung chat. Chatbot được thiết lập kỷ luật thép, chỉ phục vụ duy nhất mục đích tìm kiếm nhóm và từ chối các yêu cầu ngoài luồng.
- **Đăng cộng đồng:** Sau khi tài khoản được Admin phê duyệt, người dùng có thể đóng góp và gửi các cộng đồng chất lượng của chính họ lên hệ thống để chờ xét duyệt.

## IV. Tổng kết
Dự án GroupHub-AI không chỉ là một trang danh bạ liệt kê thông thường mà đóng vai trò như một "người dẫn đường" thông minh, mang lại giá trị thực tiễn vô cùng lớn cho những người đang tìm kiếm môi trường học tập, giao lưu và phát triển bản thân. Bằng cách kết hợp kiến trúc web hiện đại cùng các mô hình Trí tuệ nhân tạo (AI) thế hệ mới, GroupHub-AI giúp xóa bỏ rào cản thông tin nhiễu loạn, rút ngắn tối đa thời gian từ lúc có nhu cầu cho tới khi tham gia được vào một cộng đồng chất lượng, có giá trị thật sự.
