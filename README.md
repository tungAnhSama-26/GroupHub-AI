# GroupHub AI 🚀

GroupHub AI là nền tảng danh bạ cộng đồng trực tuyến thông minh, giúp người dùng dễ dàng khám phá, tìm kiếm và kết nối với các hội nhóm chất lượng trên đa nền tảng (Facebook, Zalo, Discord, Telegram...). Với sự hỗ trợ của Trí tuệ nhân tạo (AI), hệ thống giúp người dùng tìm ra cộng đồng phù hợp nhất với nhu cầu, đồng thời cung cấp môi trường kiểm duyệt nghiêm ngặt để loại bỏ spam và lừa đảo.

## 🌟 Tính năng nổi bật

- **Khám phá Cộng đồng:** Dễ dàng lọc và tìm kiếm nhóm theo ngành nghề, sở thích, hoặc nền tảng.
- **Trợ lý ảo AI:** Tích hợp chatbot AI thông minh giúp tư vấn và tìm kiếm hội nhóm nhanh chóng bằng ngôn ngữ tự nhiên.
- **Quản lý & Xét duyệt (Admin):** Hệ thống Admin Dashboard hoàn chỉnh giúp phê duyệt người dùng mới và các hội nhóm được gửi lên hệ thống.
- **Bảo mật & Chống Spam:** Người dùng phải đăng nhập và được phê duyệt mới có thể đăng cộng đồng. Tích hợp mã OTP qua email.

---

## 🛠 Tech Stack

Dự án được xây dựng theo kiến trúc **Monorepo** với các công nghệ hiện đại nhất:
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Monorepo:** [Turborepo](https://turbo.build/)
- **Database:** PostgreSQL kết hợp với ORM [Prisma](https://www.prisma.io/)
- **Authentication:** [Better Auth](https://better-auth.com/) (Hỗ trợ Google OAuth & Email/Password)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/) (Hỗ trợ nhiều model như OpenAI, Groq, Google Gemini)
- **Styling:** Tailwind CSS + Radix UI / Base UI
- **State Management:** Zustand & TanStack React Query

---

## 📂 Cấu trúc dự án

Dự án sử dụng kiến trúc Monorepo để dễ dàng mở rộng và quản lý mã nguồn:

```text
GroupHub-AI/
├── apps/
│   └── web/                 # Next.js Application (Giao diện chính và API)
│       ├── src/
│       │   ├── app/         # App Router (Pages & API Routes)
│       │   ├── components/  # Reusable UI Components
│       │   └── lib/         # Utilities, Auth, Database Client
│       └── .env             # File chứa biến môi trường của web
├── packages/
│   └── database/            # Database package dùng chung
│       └── prisma/
│           └── schema.prisma # Schema định nghĩa các bảng trong DB
├── turbo.json               # Cấu hình Turborepo
├── package.json             # Root dependencies
└── docker/                  # Các cấu hình Docker (nếu dùng)
```

---

## ⚙️ Hướng dẫn cài đặt và chạy dự án

### 1. Yêu cầu hệ thống (Prerequisites)
- [Node.js](https://nodejs.org/en/) (phiên bản 18.x hoặc mới hơn)
- `npm` (hoặc `pnpm`, `yarn`)
- [PostgreSQL](https://www.postgresql.org/) (Có thể cài đặt trực tiếp hoặc dùng Docker / dịch vụ Cloud như Supabase)

### 2. Cài đặt các gói phụ thuộc (Dependencies)
Clone dự án về máy, mở terminal tại thư mục gốc của dự án và chạy:
```bash
npm install
```

### 3. Cấu hình biến môi trường (.env)
Bạn cần tạo file `.env` tại thư mục `apps/web/` dựa trên cấu hình hệ thống của bạn. Một mẫu cấu hình cơ bản bao gồm:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/grouphub_db"

# Authentication (Better Auth)
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-super-secret-key"

# AI API Keys
OPENAI_API_KEY="your-openai-key"
GROQ_API_KEY="your-groq-key"
GEMINI_API_KEY="your-gemini-key"

# SMTP (Gửi Email OTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### 4. Khởi tạo Database (Prisma)
Chạy lệnh sau để đồng bộ schema với Database của bạn:
```bash
# Di chuyển vào package database (hoặc chạy từ root nếu đã config workspace)
cd packages/database
npx prisma generate
npx prisma db push
```

### 5. Chạy dự án (Development Mode)
Quay lại thư mục gốc của dự án và khởi động server:
```bash
cd ../../
npm run dev
```

Ứng dụng sẽ chạy tại địa chỉ: [http://localhost:3000](http://localhost:3000)

### 6. Build dự án (Production Mode)
Để build và chạy dự án trên môi trường thực tế:
```bash
npm run build
npm run start
```
