#!/bin/bash
set -e

echo "🚀 Bắt đầu quá trình deploy GroupHub-AI..."

# Đảm bảo file .env.production tồn tại
if [ ! -f "apps/web/.env.production" ]; then
    echo "❌ LỖI: Không tìm thấy file apps/web/.env.production"
    echo "Vui lòng copy từ .env và điền các thông tin production trước khi chạy script này:"
    echo "cp apps/web/.env apps/web/.env.production && nano apps/web/.env.production"
    exit 1
fi

# Link file env cho docker compose
ln -sf apps/web/.env.production .env

echo "📦 Đang build và khởi động các containers (Postgres, Redis, Web, API)..."
docker compose -f docker-compose.prod.yml up -d --build

echo "⏳ Đang đợi database sẵn sàng..."
sleep 5

echo "🗄️ Đang chạy database migrations..."
docker compose -f docker-compose.prod.yml exec -T web npx prisma migrate deploy

echo "🌱 (Tùy chọn) Chạy seed data..."
# Bỏ comment dòng dưới nếu bạn muốn chạy seed tự động
# docker compose -f docker-compose.prod.yml exec -T web npx prisma db seed

echo "✅ Deploy hoàn tất! Các services đang chạy:"
docker compose -f docker-compose.prod.yml ps

echo "🌐 Web App đang chạy ở port 3000"
echo "🔌 API đang chạy ở port 3001"
echo "Bạn có thể dùng Nginx để reverse proxy tới các port này."
