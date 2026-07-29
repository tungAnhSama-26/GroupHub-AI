const fs = require('fs');

const usersFile = 'apps/web/src/app/admin/users/page.tsx';
let usersContent = fs.readFileSync(usersFile, 'utf8');
usersContent = usersContent.replace('<TableHead>Người dùng</TableHead>', '<TableHead className="w-[30%]">Người dùng</TableHead>');
usersContent = usersContent.replace('<TableHead>Vai trò</TableHead>', '<TableHead className="w-[20%]">Vai trò</TableHead>');
usersContent = usersContent.replace('<TableHead>Trạng thái</TableHead>', '<TableHead className="w-[20%]">Trạng thái</TableHead>');
usersContent = usersContent.replace('<TableHead>Ngày tham gia</TableHead>', '<TableHead className="w-[20%]">Ngày tham gia</TableHead>');
usersContent = usersContent.replace('<TableHead className="text-right">Thao tác</TableHead>', '<TableHead className="w-[10%] text-right">Thao tác</TableHead>');
fs.writeFileSync(usersFile, usersContent);

const groupsFile = 'apps/web/src/app/admin/groups/page.tsx';
let groupsContent = fs.readFileSync(groupsFile, 'utf8');
groupsContent = groupsContent.replace('<TableHead>Tên hội nhóm</TableHead>', '<TableHead className="w-[30%]">Tên hội nhóm</TableHead>');
groupsContent = groupsContent.replace('<TableHead>Nền tảng</TableHead>', '<TableHead className="w-[10%]">Nền tảng</TableHead>');
groupsContent = groupsContent.replace('<TableHead>Lĩnh vực</TableHead>', '<TableHead className="w-[15%]">Lĩnh vực</TableHead>');
groupsContent = groupsContent.replace('<TableHead>Thành viên</TableHead>', '<TableHead className="w-[10%]">Thành viên</TableHead>');
groupsContent = groupsContent.replace('<TableHead>Kiểm duyệt</TableHead>', '<TableHead className="w-[15%]">Kiểm duyệt</TableHead>');
groupsContent = groupsContent.replace('<TableHead>Người đăng</TableHead>', '<TableHead className="w-[15%]">Người đăng</TableHead>');
groupsContent = groupsContent.replace('<TableHead className="text-right">Thao tác</TableHead>', '<TableHead className="w-[5%] text-right">Thao tác</TableHead>');
fs.writeFileSync(groupsFile, groupsContent);

const professionsFile = 'apps/web/src/app/admin/professions/page.tsx';
let profContent = fs.readFileSync(professionsFile, 'utf8');
profContent = profContent.replace('<TableHead>Tên Ngành nghề</TableHead>', '<TableHead className="w-[30%]">Tên Ngành nghề</TableHead>');
profContent = profContent.replace('<TableHead>Thuộc Nhóm nghề</TableHead>', '<TableHead className="w-[20%]">Thuộc Nhóm nghề</TableHead>');
profContent = profContent.replace('<TableHead>Số Người dùng</TableHead>', '<TableHead className="w-[15%]">Số Người dùng</TableHead>');
profContent = profContent.replace('<TableHead>Trạng thái</TableHead>', '<TableHead className="w-[15%]">Trạng thái</TableHead>');
profContent = profContent.replace('<TableHead>Ngày tạo</TableHead>', '<TableHead className="w-[15%]">Ngày tạo</TableHead>');
profContent = profContent.replace('<TableHead className="text-right">Thao tác</TableHead>', '<TableHead className="w-[5%] text-right">Thao tác</TableHead>');
fs.writeFileSync(professionsFile, profContent);

const categoriesFile = 'apps/web/src/app/admin/profession-categories/page.tsx';
let catContent = fs.readFileSync(categoriesFile, 'utf8');
catContent = catContent.replace('<TableHead>Tên Nhóm nghề</TableHead>', '<TableHead className="w-[25%]">Tên Nhóm nghề</TableHead>');
catContent = catContent.replace('<TableHead>Mô tả</TableHead>', '<TableHead className="w-[35%]">Mô tả</TableHead>');
catContent = catContent.replace('<TableHead>Trạng thái</TableHead>', '<TableHead className="w-[15%]">Trạng thái</TableHead>');
catContent = catContent.replace('<TableHead>Ngày tạo</TableHead>', '<TableHead className="w-[15%]">Ngày tạo</TableHead>');
catContent = catContent.replace('<TableHead className="text-right">Thao tác</TableHead>', '<TableHead className="w-[10%] text-right">Thao tác</TableHead>');
fs.writeFileSync(categoriesFile, catContent);
