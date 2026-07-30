-- Seed script for Profession Categories and Professions
-- Run this script to populate the database with over 300 professions.

-- ==========================================
-- CATEGORY: Công nghệ Thông tin (IT)
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('dfd975c6-8312-44f4-9f55-23ca762228e0', 'Công nghệ Thông tin (IT)', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '87e7ef68-677f-451f-aed3-347bd66138d2', 
  'Lập trình viên Web (Frontend)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '8254a966-3218-4cab-ab02-55f485463210', 
  'Lập trình viên Web (Backend)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '212d6900-ee78-47b6-8c0c-28c460f49de1', 
  'Lập trình viên Fullstack', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'a153fdc2-99c9-4243-b1c8-70694bf5c9e5', 
  'Lập trình viên Mobile (iOS)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '930a19c5-1f7c-46af-a24b-8ac9e13582f3', 
  'Lập trình viên Mobile (Android)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '55eab37b-3587-4658-90bc-869c89121f01', 
  'Kiểm thử phần mềm (Manual QA)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '9be9bdc9-b7b7-45b1-950a-64615ca4312d', 
  'Kiểm thử phần mềm (Automation QA)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '27a57d3d-b8df-4db9-80aa-a9d28f537b81', 
  'Phân tích nghiệp vụ (BA)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '73d9a803-e8a4-4639-b26f-c21137545cf1', 
  'Thiết kế UI/UX', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'e3bcfead-33cf-49e5-8e86-75f30006c022', 
  'Quản trị hệ thống (System Admin)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4070726e-1468-4369-96a2-a01789f3e4fc', 
  'Kỹ sư DevOps', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '3efc5f52-bdbb-4cfe-a837-1afcc2824ca0', 
  'Chuyên gia bảo mật mạng (Cybersecurity)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'a76a3da5-8234-4258-a7bf-392af78bb3ae', 
  'Kỹ sư dữ liệu (Data Engineer)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '91aa33d1-674f-4902-94f9-3c1fbac637ee', 
  'Nhà khoa học dữ liệu (Data Scientist)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '66db50b8-678b-4682-bb56-ea14cf245dc3', 
  'Chuyên viên phân tích dữ liệu (Data Analyst)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1cdb3d01-76e1-4414-ad55-d06dfa9d7689', 
  'Kỹ sư AI/Machine Learning', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '20f26218-4426-4a77-a8d6-ad990af73a5c', 
  'Quản lý dự án IT (Project Manager)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4600194f-c1a1-4316-bccc-5258acc204bf', 
  'Scrum Master', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '009b196e-8b85-4a7d-8e6a-5e14ab690bd5', 
  'Kiến trúc sư phần mềm (Solution Architect)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '02628a62-0be2-4e00-a7e5-821155e2ed95', 
  'Lập trình viên Game', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Công nghệ Thông tin (IT)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Marketing & Truyền thông
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('d483f53d-a45b-4d95-9304-5fb756ee3b40', 'Marketing & Truyền thông', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'e4900846-2ea8-4869-a487-93a14cdc4578', 
  'Chuyên viên Digital Marketing', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '3a297f63-cb2a-445d-b69e-0d13ff33ac7b', 
  'Chuyên viên Marketing tổng hợp', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'efca02f0-59f2-4011-a5fc-da5478e53b5c', 
  'Content Creator', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'd141158e-c90c-4d2b-b5a8-f32198d59c6f', 
  'Copywriter', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '41ecd44e-a3b0-492c-a673-dacd01428f37', 
  'Chuyên viên SEO', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '3efbcb42-2d2b-45cb-b00b-f701cfa088cd', 
  'Chuyên viên quảng cáo (Performance Marketing)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'efad6848-6d49-41b6-b4d8-843fd95c8db5', 
  'Quản lý mạng xã hội (Social Media Manager)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'e688c798-cef6-4186-b6c3-aeee6e5c5a05', 
  'Chuyên viên PR (Quan hệ công chúng)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '55ddd3fa-2eee-416e-9e87-6b04e388801c', 
  'Tổ chức sự kiện (Event Executive)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1df79e31-9a6e-4b4b-b938-1a63fc377719', 
  'Thiết kế đồ họa (Graphic Designer)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '8e660664-a83c-4270-9c55-bb1978ba1719', 
  'Quản lý thương hiệu (Brand Manager)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '618486b6-6d73-4980-8ca9-c478db5f6de5', 
  'Chuyên viên Trade Marketing', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'a1ec6906-af60-4312-976e-6b244491a06c', 
  'Chuyên viên nghiên cứu thị trường', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c32d7968-80cc-4037-af59-ed240040b3a2', 
  'Quản lý chiến dịch (Campaign Manager)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '341d5f0b-1669-490a-bad0-8df15de81161', 
  'Chuyên viên Media Planner', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Marketing & Truyền thông' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Kinh doanh & Bán hàng
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('0e51d381-0fb6-475d-8653-c3dcf2f22438', 'Kinh doanh & Bán hàng', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '7c47ad1b-1bdf-45ae-9664-c3aa39a0506b', 
  'Nhân viên Kinh doanh (Sales Executive)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c070cbf6-aa7b-4c3c-a2e4-f8bf36714059', 
  'Chuyên viên phát triển kinh doanh (BDE)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '196e3c02-1f72-47b5-bc6f-b2284598c9d9', 
  'Trưởng phòng Kinh doanh', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '92d4a84e-4a99-4368-a56b-c0e24e1d8170', 
  'Giám đốc Kinh doanh (CSO)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6e9f39b6-9f9b-4176-9f2f-c9a45c660c31', 
  'Chuyên viên Telesales', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '021a0ba2-67cb-475e-86a6-8b586dee9564', 
  'Nhân viên bán hàng tại cửa hàng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'f4d7b0eb-a65f-4d8b-8de9-f41fff61b7fd', 
  'Quản lý cửa hàng (Store Manager)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'fad4679c-bdf6-4c46-9059-8d61536b2beb', 
  'Đại diện thương mại', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'f6e92731-b1b6-418a-8244-9eeb55d18319', 
  'Chuyên viên chăm sóc khách hàng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '7b6fc6ea-f56b-4e52-8fb9-40c6ac889011', 
  'Nhân viên hỗ trợ kỹ thuật (Sales Support)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '9ce54f25-9a30-4264-a166-dbf6177d497c', 
  'Key Account Manager (KAM)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '2c7dc170-3900-4057-9920-3e902d726c3a', 
  'Nhân viên kinh doanh xuất nhập khẩu', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1d26e816-f736-435c-b4ca-11b88ace153a', 
  'Chuyên viên môi giới bất động sản', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '43e139c5-a926-4154-b0b4-4db52243341e', 
  'Chuyên viên tư vấn bảo hiểm', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '8d54eb12-04c9-41c0-945b-f708ddb8ec9f', 
  'Cộng tác viên kinh doanh', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kinh doanh & Bán hàng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Tài chính & Kế toán
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('f0eb43d5-a8fb-42a9-8285-7a76d1490a0d', 'Tài chính & Kế toán', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'e576019e-49d7-4011-a64a-433e4c5e5cfd', 
  'Kế toán viên', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '7667fa0c-e88b-42d5-9f05-1538e608dc86', 
  'Kế toán tổng hợp', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '9a947775-645c-4868-8841-039af93f26f2', 
  'Kế toán trưởng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '42c2d5da-ab77-4841-811e-4e72c44a0dcd', 
  'Kế toán thanh toán', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1bbed93b-464e-4f39-9e03-40bc26731a58', 
  'Kế toán kho', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'faae5bc3-80b8-4a74-951f-54a790f93917', 
  'Kế toán thuế', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4637ef25-7cef-4e19-8112-8c3c54eb9a19', 
  'Kế toán công nợ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '8506a2f4-4fd7-4ac6-94b3-15d5f6227858', 
  'Chuyên viên phân tích tài chính', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '9fe7361b-b9d1-4a32-9552-0ab63ac2c66f', 
  'Cố vấn tài chính', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'eea13bf1-16e5-4efe-a23d-7d696f85647b', 
  'Chuyên viên đầu tư', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'dc8cf584-11dc-44a3-99ba-b87130bec560', 
  'Kiểm toán viên nội bộ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1e5c6dfa-94ee-472f-ae6c-87e106b0ab55', 
  'Kiểm toán viên độc lập', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '2e927acf-6eff-452e-8187-ade3c6da1346', 
  'Giao dịch viên ngân hàng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '236d578a-e2fa-49f3-b996-1838b756000a', 
  'Chuyên viên tín dụng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '40298cf9-8740-439a-bd4e-d4160ec342f6', 
  'Chuyên viên thẩm định giá', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '492b8405-dc4b-4faa-ab93-4584391f8191', 
  'Giám đốc Tài chính (CFO)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4062d9fb-8092-4aa1-8850-8dc8ea6280b3', 
  'Chuyên gia quản trị rủi ro', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Tài chính & Kế toán' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Hành chính & Nhân sự
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('063dfa3f-66ea-408a-9c8e-80fe232cdacd', 'Hành chính & Nhân sự', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '69fbe79b-2cb1-42f5-b263-67f35a1e2b01', 
  'Chuyên viên Hành chính văn phòng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c92ee32f-746c-421f-9889-a340e53f3798', 
  'Nhân viên Lễ tân', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6518d61a-5499-4753-958e-00aa9c6ce50d', 
  'Trợ lý Giám đốc (Executive Assistant)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '60dd1b93-e5b3-4e0b-b9ea-ab46a8029c5c', 
  'Thư ký văn phòng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'aa9f0440-9999-4777-bed1-adb230198518', 
  'Chuyên viên Tuyển dụng (Talent Acquisition)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '9c98b43d-620f-4988-bd03-986aed4077ed', 
  'Chuyên viên C&B (Lương & Phúc lợi)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '11102a50-45d3-40b9-8b7b-c592d25e2f3f', 
  'Chuyên viên Đào tạo nội bộ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c07edc4c-7c44-4b0b-8a58-7ce5a89b543c', 
  'Chuyên viên Phát triển tổ chức (OD)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '209e4453-1f66-4c20-818a-90b2b19c1861', 
  'Chuyên viên Quan hệ lao động', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'e399027b-e968-49ae-9097-8f6e12e6b405', 
  'Quản lý Nhân sự (HR Manager)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c7a9fe79-e5e0-49c6-b32d-a439e4a906e0', 
  'Giám đốc Nhân sự (CHRO)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1057e8bd-f7cc-437a-960b-bbdc0e45b35f', 
  'Chuyên viên truyền thông nội bộ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Hành chính & Nhân sự' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Giáo dục & Đào tạo
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('cb25816b-7746-440a-8679-b82883cd3ef0', 'Giáo dục & Đào tạo', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'af066f45-682a-4710-a998-a3e492b37aa0', 
  'Giáo viên Mầm non', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1665c1d3-3e32-4c33-9985-b4f4be796354', 
  'Giáo viên Tiểu học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '08e585d1-54c1-4178-8c73-e88804a36fb2', 
  'Giáo viên Trung học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'ad93e391-e188-406b-8397-979d13c5ed09', 
  'Giáo viên Ngoại ngữ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '72cef9cb-bea5-449b-b26e-539ef6f714da', 
  'Giáo viên Dạy nghề', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '143b366e-661e-42db-8771-6297ca16c9b0', 
  'Giảng viên Đại học/Cao đẳng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '301a7e5b-04b6-40cd-a899-049a0b3f47dc', 
  'Trợ giảng (Teaching Assistant)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '8a55596a-25c3-474d-b10f-e54a339d1e84', 
  'Gia sư', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'bfe4901a-7ceb-4236-ac9c-d887af8a2ec9', 
  'Chuyên viên tư vấn tuyển sinh', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b4316af1-679d-4029-acb2-fcecd1b67a24', 
  'Nhân viên học vụ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '41dd4556-8f22-405a-b024-822495c9b106', 
  'Chuyên viên phát triển chương trình học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '60aeea1e-558a-475e-8a20-3e0955a8dccf', 
  'Nghiên cứu viên giáo dục', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'a5126a22-87f3-433d-beed-83c6f02fd88c', 
  'Quản lý trung tâm đào tạo', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '81a6df45-6160-4d26-8538-44d743a77a76', 
  'Cố vấn học tập', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Giáo dục & Đào tạo' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Y tế & Chăm sóc sức khỏe
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('ec066f9a-8594-4c51-b735-a73c29e01009', 'Y tế & Chăm sóc sức khỏe', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '62036848-3931-49cb-b89e-455e1ebff921', 
  'Bác sĩ Đa khoa', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '3e1cd0cd-6991-4e32-93b6-78039e080bf8', 
  'Bác sĩ Chuyên khoa', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'd9468aef-0a1c-4e2c-84b5-68f14b2d9827', 
  'Bác sĩ Răng Hàm Mặt', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'd1543caf-5b88-4f6f-827e-2e7c131bfbe3', 
  'Bác sĩ Da liễu', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'f48f9282-a275-4aae-920f-8b407f5ff92f', 
  'Bác sĩ Tâm thần', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '17c803ab-f38a-4745-9525-e5b68cbf6b20', 
  'Điều dưỡng viên', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '0e7f019b-3b90-4904-9ff7-de488149a53d', 
  'Nữ hộ sinh', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b85abcab-b3d8-4cab-9dff-073556f92cbd', 
  'Dược sĩ lâm sàng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6d7844ce-2c8e-4e1b-af9b-ba1e860ef841', 
  'Dược sĩ bán thuốc', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '92a9f671-0959-4daa-915a-1ef6a33fbc39', 
  'Trình dược viên', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6e4ec50a-7954-42b8-bdb8-d8ac8e716930', 
  'Kỹ thuật viên xét nghiệm', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '5fb5423e-fc8d-494b-af46-dfebecd25f70', 
  'Kỹ thuật viên chẩn đoán hình ảnh', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '55c2ea56-2989-4eca-a899-bdac30c59349', 
  'Vật lý trị liệu', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'a036fffd-b6d7-4664-b316-38ba7493f5ab', 
  'Chuyên viên tâm lý học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '0f4598ed-e043-43aa-a6a0-f28ac20fde48', 
  'Chuyên gia dinh dưỡng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Y tế & Chăm sóc sức khỏe' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Kỹ thuật & Xây dựng
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('785b2e42-7c4a-46ac-8b5d-81e32aed3922', 'Kỹ thuật & Xây dựng', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '0803ce84-2b95-4d00-b9c3-9f3d29800675', 
  'Kỹ sư xây dựng dân dụng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'ffc1321c-d8d7-4224-876f-e841fcc08baf', 
  'Kỹ sư cầu đường', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'cab34294-0ada-43ed-91ec-eb5293613067', 
  'Kỹ sư cơ điện (MEP)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '9234f907-55ff-4d73-a348-9bf0f78db351', 
  'Kỹ sư cơ khí', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '15dc3ae2-fad4-40cc-b378-029bd1ff0163', 
  'Kỹ sư tự động hóa', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '38dea733-7c3a-4587-a02b-92dec57591f4', 
  'Kỹ sư điện / điện tử', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '68f2b2ed-149c-425f-a93f-b61e7501165d', 
  'Kỹ sư vật liệu', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '481fb6f5-bdab-46c3-b073-79a7160b90e6', 
  'Kiến trúc sư công trình', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '34553449-d0a7-4057-bb79-5bf53bf34cc6', 
  'Kiến trúc sư cảnh quan', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'd18fe33f-b7cb-4f2c-b0dd-786b8b7f2918', 
  'Kiến trúc sư nội thất', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1d28dc89-b6c8-45ff-96d5-19ae63a3b732', 
  'Giám sát công trình', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'a8faaa0e-4976-4e0d-9333-777d4a82ae17', 
  'Họa viên kiến trúc (Draftsman)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '8ec63b31-0256-46db-a84a-b1e358f884f8', 
  'Kỹ thuật viên trắc địa', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '7db6ba5a-9f80-457a-9f74-d9a18c9ff0d8', 
  'Quản lý dự án xây dựng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6bc5d3fb-e34d-4aca-aa43-9cdd363f3f77', 
  'Kỹ thuật viên bảo trì máy móc', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Kỹ thuật & Xây dựng' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Vận tải & Logistics
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('ec499eb7-81b6-4d02-842c-b29c8416ee2d', 'Vận tải & Logistics', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '3472fbdf-57d7-4709-bc7a-77c6cb4f47bc', 
  'Chuyên viên Xuất nhập khẩu (Logistics/Supply Chain)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1a5749ce-7546-4720-9fbc-babf8ed5c668', 
  'Nhân viên mua hàng (Purchasing)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '2114c1f5-0b54-48dd-9f76-c3129ac86492', 
  'Nhân viên quản lý kho', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '579d72b1-b282-4ff8-b33b-b213aff07c3c', 
  'Điều phối viên vận tải', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '47f54952-ea2e-4b2d-b6d7-ed6c4be08e69', 
  'Nhân viên giao nhận (Forwarder)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '279c92ac-90cd-400c-a2a3-8e8866f95e69', 
  'Nhân viên khai báo hải quan', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '8f6d497c-d8d3-4c83-ba75-fa9f5304f4ac', 
  'Quản lý chuỗi cung ứng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'bfb5fa81-0083-44b3-9d20-923d1316a0a7', 
  'Quản lý đội xe (Fleet Manager)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'f181a253-029b-40b0-b5a3-cee0e80f5e0e', 
  'Tài xế xe tải', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '886be573-83f0-4d2b-b5ee-45c35162f026', 
  'Tài xế xe khách', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'd1b91c3d-7365-471d-8034-3742f2f766c5', 
  'Tài xế công nghệ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '0e527512-a7c3-46fd-97de-0328d11405fb', 
  'Thuyền viên / Thủy thủ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b39f5976-9030-4140-900d-a0ab469571b3', 
  'Tiếp viên hàng không', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '3ada5424-f631-47f9-8347-3e1236d0ae92', 
  'Phi công', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Vận tải & Logistics' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('b3ba3335-ae6a-4abe-baee-86507ad21a1f', 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '0146d226-9014-485c-b53b-4ff90227334e', 
  'Quản lý nhà hàng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '7161ab97-056a-41f2-a409-3657eabe20b4', 
  'Quản lý khách sạn', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c2b19d1f-d726-40a8-a3e1-29c113e2b997', 
  'Nhân viên Lễ tân khách sạn', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'fec6f008-b3fb-4678-a0c8-6f5f5f997cc5', 
  'Nhân viên phục vụ (Waiter/Waitress)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4d642503-c157-45bc-9f8d-6c7a77c1ae36', 
  'Pha chế (Bartender/Barista)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'ac80a1e0-3dab-4a47-b092-0b7f771a49ec', 
  'Bếp trưởng (Executive Chef)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '8ffe4689-ec23-4022-98a3-6a75054577a3', 
  'Đầu bếp (Chef)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b4c70cca-0556-4223-bc7a-56815dbfba1e', 
  'Phụ bếp', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '57b96f9f-4b98-4576-8d24-385c0080c95b', 
  'Nhân viên buồng phòng (Housekeeping)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'af7cc98d-6302-4a8b-bcc2-c284231e0ca5', 
  'Chuyên viên tổ chức tiệc (Banquet)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '89604488-fcf4-49a3-9b97-b2ee1e2bccdc', 
  'Nhân viên giám sát chất lượng dịch vụ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '5a2080e0-1b00-41ca-821e-09a22029ef84', 
  'Chuyên viên tư vấn tour du lịch', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '07976bc3-ba80-4024-acb1-e804e264f7f0', 
  'Hướng dẫn viên du lịch', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1d2f663a-5c95-4bbe-b4f6-f2c5734bc0a8', 
  'Nhân viên điều hành tour', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Nhà hàng & Khách sạn (F&B / Hospitality)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Nghệ thuật, Giải trí & Thiết kế
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('8a8f2f87-4149-4c01-87a0-19db2515cee7', 'Nghệ thuật, Giải trí & Thiết kế', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'd289d6fe-7b43-4244-b42c-85c5fe25002b', 
  'Đạo diễn', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b5997880-87a9-4774-be1d-d7d33ba8f976', 
  'Biên kịch', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4f72472e-cd3f-4838-b40b-dd8f002d75f5', 
  'Diễn viên', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '9120af65-f0b8-4331-9615-43dd6530371d', 
  'Ca sĩ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '5dc5891c-06c0-4c82-a3de-f4800dc1dade', 
  'Nhạc sĩ / Nhà sản xuất âm nhạc', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'a3cf284b-dae7-49fc-b335-f83f4a4e29a0', 
  'Người mẫu', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b3b73098-fc3f-4601-a569-80acc374ae81', 
  'Vũ công (Dancer)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b9155189-88d7-412e-9489-67afaec7e49f', 
  'Nhiếp ảnh gia (Photographer)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1881f9f2-da38-482b-b1d7-34d2b1c57534', 
  'Quay phim (Cameraman)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b057b867-4e50-497a-99de-aa26400f7736', 
  'Biên tập viên video (Video Editor)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1f5cb9fc-050a-4fec-a065-890e1c9979f5', 
  'Kỹ thuật viên âm thanh', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'ace135be-a14d-47e8-8eaf-90b8c6093d9e', 
  'Thiết kế thời trang', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4ce8fb6a-69a3-4041-967c-e0968180b0d2', 
  'Thiết kế nội thất', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '9f0d2bfe-4799-4671-ab78-ab16b4ee1387', 
  'Thiết kế trang sức', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '0781773d-7b8b-44e8-a41c-0343c0456811', 
  'Nhà điêu khắc / Họa sĩ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '8c9d9a0b-e4ae-48d0-88b0-7e47bd46a319', 
  'Chuyên gia trang điểm (Makeup Artist)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nghệ thuật, Giải trí & Thiết kế' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Luật & Pháp lý
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('f417b254-52dc-46cc-8eae-420d64489d20', 'Luật & Pháp lý', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '14f4c408-5a3e-47e4-ae16-7ee00778b454', 
  'Luật sư tư vấn', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '33431f5d-4ccc-465a-adff-34a5b83f69b0', 
  'Luật sư tranh tụng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '63ebbc91-e4b9-4e4a-9183-22691c427fc1', 
  'Cố vấn pháp lý doanh nghiệp', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '3d8d6b39-6a70-4024-930d-53bed9a4b07f', 
  'Thư ký luật sư', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '0aeaa245-d902-44ee-919a-0ce172e73bca', 
  'Công chứng viên', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'ae8fd2b6-f1ea-44d7-bd60-5993218b78b2', 
  'Chuyên viên pháp chế', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6431df25-3554-49e3-8512-203c15f187a8', 
  'Trợ giúp viên pháp lý', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6b9007ed-a9e1-4c60-9e3f-a0c3b5ede8e9', 
  'Thẩm phán', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4ff748d4-03a6-43a4-8c82-0a19927fa6d4', 
  'Thư ký tòa án', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '917fef5c-734e-4563-adf0-8b8f009a5345', 
  'Kiểm sát viên', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6f3483db-3a79-4b74-8024-a8f085d6f77b', 
  'Cán bộ thi hành án', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '9c8d333b-b7a1-49b3-84d6-2cd413fb5fcc', 
  'Chuyên viên sở hữu trí tuệ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '5f94be97-7a3d-414c-9510-1901652a8665', 
  'Chuyên viên thu hồi nợ pháp lý', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Luật & Pháp lý' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Sản xuất & Công nghiệp
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('7ea2d429-55e1-4ab1-a780-64b983dd75b4', 'Sản xuất & Công nghiệp', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '75206c32-27b4-4598-9f55-abda1b3a7673', 
  'Quản đốc phân xưởng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'ace33343-2150-4b4d-adb2-bea5732350a5', 
  'Tổ trưởng sản xuất', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c4d3e7a9-7d1f-4f10-8194-4c565308a136', 
  'Kỹ sư quản lý chất lượng (QA/QC)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'a5b4d850-ff87-47af-b254-dcfb24f0d587', 
  'Kỹ sư thiết kế khuôn mẫu', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '73bbf93a-8e9e-43c8-8222-7017ba34ce75', 
  'Kỹ sư cải tiến sản xuất (CI)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'cb349688-12a0-41c8-bf6b-0c166d272639', 
  'Kỹ thuật viên lắp ráp', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '40f2fdfe-aedf-4591-a0f2-f2639a1b22ff', 
  'Kỹ thuật viên hàn', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4c525d8d-bc12-4cb2-ad94-3e7f4873f0fd', 
  'Kỹ thuật viên CNC', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6f1e01e5-b183-416f-a1c2-d39604c796e3', 
  'Công nhân vận hành máy', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '784196cf-c4b4-41b9-8473-6a0324a5d74a', 
  'Công nhân đóng gói', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '08f662c9-b970-4c58-be37-075015d7bceb', 
  'Nhân viên KCS (Kiểm tra chất lượng)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b9287793-c300-4416-9cd5-5b39ce825f00', 
  'Chuyên viên An toàn lao động (HSE)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'd0e6b5b2-03d4-4376-b3cc-ba4ee6c25769', 
  'Kỹ sư môi trường', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Sản xuất & Công nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Nông, Lâm, Ngư nghiệp
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('f41c7285-4e5d-4935-8f7d-681fc022cfb0', 'Nông, Lâm, Ngư nghiệp', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '84406b7b-e59e-4182-8391-86d38861c93f', 
  'Kỹ sư nông nghiệp', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b26db7d8-c3dd-455e-9638-bfe9d7e72609', 
  'Kỹ sư lâm nghiệp', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '0b4de88c-fcaf-4281-a61e-349d14b0d536', 
  'Kỹ sư nuôi trồng thủy sản', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c7f2ddeb-013f-4fb5-b3d8-da62f2c05e31', 
  'Bác sĩ thú y', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4ed0d460-6081-4826-bb71-6f3f0768cb90', 
  'Nhà nghiên cứu lai tạo giống', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '93a8a374-32a4-4dd5-9651-b65014bf740b', 
  'Kỹ thuật viên chăn nuôi', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '07df62df-179d-4cd1-84c3-2e656a9a99cb', 
  'Chuyên viên khuyến nông', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '25f031dd-42f2-4a10-aed3-cda7432f2f7d', 
  'Quản lý trang trại', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'fbc58568-6365-412c-a00b-90c42798bee5', 
  'Công nhân thu hoạch', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4e282c52-9853-44f8-9117-a5db98ea8f21', 
  'Thủy thủ đánh bắt xa bờ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '04dacd45-abe9-4e5c-8ec7-e3037ab95bcd', 
  'Chuyên viên kiểm định nông sản', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '05dcc85b-baf1-432c-9afd-850d7fbbbd7c', 
  'Kỹ sư công nghệ thực phẩm', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b3855ec9-96a4-4cde-b309-e802808fd5eb', 
  'Nhân viên cảnh lâm', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Nông, Lâm, Ngư nghiệp' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Báo chí, Truyền hình & Xuất bản
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('2d2cf080-7c66-4a11-9f76-cd244c3e688b', 'Báo chí, Truyền hình & Xuất bản', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '30705431-a073-47de-abdc-01f564b8537f', 
  'Nhà báo', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '34096eed-d48e-4853-98e5-2e90becc4b87', 
  'Phóng viên hiện trường', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4395ce74-38ca-4df8-8d79-74967136eef5', 
  'Biên tập viên báo chí', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6de29b3b-cc93-4eef-bd7a-0a70532a27cb', 
  'Biên tập viên truyền hình', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'fe9c00a8-d4a5-4150-8b8d-4515b031dabf', 
  'Phát thanh viên', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'e5a3bda7-21fd-4e72-98dd-c004fda86fcf', 
  'Người dẫn chương trình (MC)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'ac61ce7a-d870-4cd7-884d-b9093b75e513', 
  'Đạo diễn truyền hình', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6cfe12b1-465b-4613-a508-23ac6e5069c5', 
  'Chuyên viên kịch bản chương trình', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '679de51e-0a19-4ed6-8c7b-09ca5b2a09ab', 
  'Thư ký tòa soạn', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '005fc4c5-2908-457d-bfc9-9e9e586b3581', 
  'Biên dịch viên', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c0ffeb7d-692d-4241-8e96-dc7b50c76af3', 
  'Phiên dịch viên', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '8560a0b9-1ba5-4150-884a-3c2256f5fe15', 
  'Nhân viên thiết kế xuất bản', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c3e582d9-e3a6-4a55-b406-44f17d08bd03', 
  'Nhà văn / Tác giả', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '77508394-0c21-42eb-bbf3-5fd825bea6ba', 
  'Chuyên viên quản lý bản quyền', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Báo chí, Truyền hình & Xuất bản' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Khoa học & Nghiên cứu
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('2644436d-dfa0-4542-80a1-dd214c003703', 'Khoa học & Nghiên cứu', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '7b8970f3-a663-4881-8aca-279e3effa6c3', 
  'Nhà nghiên cứu sinh học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4415b949-5929-42b4-9377-0b94aa59f2fa', 
  'Nhà nghiên cứu hóa học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '3ce78030-63cc-4c0d-8dfd-16fcc47b8fb5', 
  'Nhà vật lý học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '98c74e36-3fc6-46c6-aa8c-d874b43d68ab', 
  'Nhà toán học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4d436d50-de4b-488e-b857-d68e35a4a26f', 
  'Chuyên gia môi trường', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '3675582c-3f74-48e7-a136-3942d2f0eb59', 
  'Nhà khảo cổ học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '9609b861-bb58-49f0-a3e3-82749218b420', 
  'Nhà địa chất học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4e98e0f8-abb4-48bd-9a00-1f48cd43cf71', 
  'Nhà khí tượng học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '370c0284-3a00-4eea-811c-32e6e678b4ea', 
  'Nhà thiên văn học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'a5375c3c-54c9-403f-855c-9cbce1af6cdd', 
  'Chuyên viên phòng thí nghiệm', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'f29014f0-f386-4023-a2f8-3e593d4dfcce', 
  'Trợ lý nghiên cứu', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '39315a82-1b3a-4e7f-8d66-b07e2a54e8e4', 
  'Chuyên gia công nghệ sinh học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'd16b473c-658a-4254-8d4a-ddbb682240bc', 
  'Chuyên gia công nghệ vật liệu', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4c3f752a-1b8f-4718-9840-1b9eb4bcc517', 
  'Nhà nghiên cứu xã hội học', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khoa học & Nghiên cứu' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Dịch vụ Cá nhân & Gia đình
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('83349665-fc36-4823-8d1c-689417e5c059', 'Dịch vụ Cá nhân & Gia đình', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '0aac0378-3568-4e1d-ba0e-fae02e99712d', 
  'Chuyên viên spa / chăm sóc sắc đẹp', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '308dcaf1-bebc-4435-9e25-5e0a40a22a96', 
  'Thợ làm tóc (Hair Stylist)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6c174d1c-16ec-4d6c-a837-020b62997179', 
  'Thợ làm móng (Nail Technician)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '33116fea-db85-4e14-b47f-62bb6f967db5', 
  'Thợ phun xăm thẩm mỹ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '96a88d6b-3f5d-4e3f-a11d-aef48b5ef8f1', 
  'Huấn luyện viên thể hình (PT)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '1af640e2-965e-4b93-8e9b-ab563d37b837', 
  'Giáo viên Yoga / Pilates', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b004b868-9807-4ff9-8174-899f31a18399', 
  'Người giúp việc gia đình', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c2309983-d781-4612-adae-4b750df1c27f', 
  'Bảo mẫu', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '952a538f-1b9e-444a-9932-88a28f71427d', 
  'Nhân viên chăm sóc người già', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '0c862a2e-17fc-4696-97fb-d9934d6dfc93', 
  'Thợ may đo', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '4c6f372c-fccc-42e5-8c08-ab1f4e47fc20', 
  'Thợ sửa chữa điện nước dân dụng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'fc23d01a-4ee1-4ea2-87dd-b13e60588a30', 
  'Nhân viên dọn vệ sinh công nghiệp', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '035c0efc-a455-48ca-8ecc-e6afbc04b902', 
  'Bảo vệ / Vệ sĩ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Dịch vụ Cá nhân & Gia đình' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Bán lẻ & Thương mại Điện tử
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('a0f8afe4-e82f-49c4-9f5b-4117d9dd1709', 'Bán lẻ & Thương mại Điện tử', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '38c21dbe-732e-44ee-9719-95529c590031', 
  'Quản lý danh mục sản phẩm (Category Manager)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Bán lẻ & Thương mại Điện tử' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'da0bc6b4-fff0-4c31-a8d4-0fd5877adf84', 
  'Chuyên viên vận hành sàn TMĐT (E-commerce Operations)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Bán lẻ & Thương mại Điện tử' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'f4df7651-8134-4b38-8b58-6171a28808fe', 
  'Chuyên viên phát triển nhà bán hàng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Bán lẻ & Thương mại Điện tử' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '37a4adb9-f075-4d10-8112-08cc86243f26', 
  'Nhân viên nhập liệu sản phẩm', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Bán lẻ & Thương mại Điện tử' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '5981332b-12ab-4df0-bbb9-24dd765af86e', 
  'Trực page / Chốt đơn hàng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Bán lẻ & Thương mại Điện tử' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '5b1dc7f1-e48f-4a43-90ef-d2e75e966a54', 
  'Chuyên viên mua hàng bán lẻ (Buyer)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Bán lẻ & Thương mại Điện tử' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'dd862ce5-4d81-4365-b326-7b818eb2e0cc', 
  'Nhân viên quản lý gian hàng', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Bán lẻ & Thương mại Điện tử' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '7b666ff6-42f0-4aa5-92c4-146ca1362f34', 
  'Chuyên viên tối ưu trải nghiệm khách hàng (CX)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Bán lẻ & Thương mại Điện tử' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'eeaa81f7-6e52-4263-ba15-7f73869370c5', 
  'Chuyên viên quản lý tồn kho TMĐT', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Bán lẻ & Thương mại Điện tử' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'c1e338c9-ab0e-4067-986f-5bb7378a31eb', 
  'Quản lý kho hàng Fulfillment', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Bán lẻ & Thương mại Điện tử' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'fe2f7de1-fc2c-436c-bbf3-251f2ffe67e2', 
  'Shipper giao hàng TMĐT', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Bán lẻ & Thương mại Điện tử' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

-- ==========================================
-- CATEGORY: Khác (Tự do, Freelancer, v.v.)
-- ==========================================
INSERT INTO "ProfessionCategory" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('19dab1ae-0e1d-489d-a130-f4c5e1889ec5', 'Khác (Tự do, Freelancer, v.v.)', NULL, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '3f43245f-20ae-44f7-ab0e-a9734763de63', 
  'Freelancer lập trình', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khác (Tự do, Freelancer, v.v.)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'e06e8ced-454c-4f39-8c77-e408caea6546', 
  'Freelancer thiết kế', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khác (Tự do, Freelancer, v.v.)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '089ade56-8ef9-40eb-a38f-1b8aa17b8d35', 
  'Freelancer viết lách', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khác (Tự do, Freelancer, v.v.)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '08e3eb19-cddd-49d5-9ed8-69883f7d3eea', 
  'Cộng tác viên (CTV)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khác (Tự do, Freelancer, v.v.)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '28557c25-81a7-4501-94a9-e85ffa9cf405', 
  'Streamer', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khác (Tự do, Freelancer, v.v.)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '6281274e-511e-4fdf-960e-028bc7fe047d', 
  'YouTuber / Vlogger', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khác (Tự do, Freelancer, v.v.)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'b44bdc30-61f4-4093-8bb7-42da6e56e394', 
  'KOL / Influencer', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khác (Tự do, Freelancer, v.v.)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '56af4ada-54a0-4957-ad23-e16b355f5cb5', 
  'Thợ thủ công mỹ nghệ', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khác (Tự do, Freelancer, v.v.)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  'cee97995-5705-4ab3-b934-267a75dce82f', 
  'Nhà giao dịch tự do (Trader)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khác (Tự do, Freelancer, v.v.)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;
INSERT INTO "Profession" ("id", "name", "description", "isActive", "categoryId", "createdAt", "updatedAt")
VALUES (
  '40344fab-8825-46e9-86ca-a65c2102893d', 
  'Khởi nghiệp (Startup Founder)', 
  NULL, 
  true, 
  (SELECT "id" FROM "ProfessionCategory" WHERE "name" = 'Khác (Tự do, Freelancer, v.v.)' LIMIT 1), 
  NOW(), 
  NOW()
)
ON CONFLICT ("name") DO NOTHING;

