const fs = require('fs');

const usersFile = 'apps/web/src/app/admin/users/page.tsx';
let usersContent = fs.readFileSync(usersFile, 'utf8');
usersContent = usersContent.replace(/<TableHead className="w-\[[^\]]+\](?: text-right)?"/g, (match) => {
  if (match.includes('Người dùng')) return '<TableHead className="w-[30%]"';
  if (match.includes('Vai trò')) return '<TableHead className="w-[20%]"';
  if (match.includes('Trạng thái')) return '<TableHead className="w-[20%]"';
  if (match.includes('Ngày tham gia')) return '<TableHead className="w-[15%]"';
  if (match.includes('Thao tác')) return '<TableHead className="w-[15%] text-right"';
  return match;
});
// Let's do it simply using replace string exact match since we know the current contents:
usersContent = usersContent.replace('<TableHead className="w-[20%]">Ngày tham gia</TableHead>', '<TableHead className="w-[15%]">Ngày tham gia</TableHead>');
usersContent = usersContent.replace('<TableHead className="w-[10%] text-right">Thao tác</TableHead>', '<TableHead className="w-[15%] text-right">Thao tác</TableHead>');
fs.writeFileSync(usersFile, usersContent);

const groupsFile = 'apps/web/src/app/admin/groups/page.tsx';
let groupsContent = fs.readFileSync(groupsFile, 'utf8');
groupsContent = groupsContent.replace('<TableHead className="w-[30%]">Tên hội nhóm</TableHead>', '<TableHead className="w-[25%]">Tên hội nhóm</TableHead>');
groupsContent = groupsContent.replace('<TableHead className="w-[15%]">Kiểm duyệt</TableHead>', '<TableHead className="w-[10%]">Kiểm duyệt</TableHead>');
groupsContent = groupsContent.replace('<TableHead className="w-[5%] text-right">Thao tác</TableHead>', '<TableHead className="w-[15%] text-right">Thao tác</TableHead>');
fs.writeFileSync(groupsFile, groupsContent);

const professionsFile = 'apps/web/src/app/admin/professions/page.tsx';
let profContent = fs.readFileSync(professionsFile, 'utf8');
profContent = profContent.replace('<TableHead className="w-[15%]">Số Người dùng</TableHead>', '<TableHead className="w-[10%]">Số Người dùng</TableHead>');
profContent = profContent.replace('<TableHead className="w-[15%]">Ngày tạo</TableHead>', '<TableHead className="w-[10%]">Ngày tạo</TableHead>');
profContent = profContent.replace('<TableHead className="w-[5%] text-right">Thao tác</TableHead>', '<TableHead className="w-[15%] text-right">Thao tác</TableHead>');
fs.writeFileSync(professionsFile, profContent);

const categoriesFile = 'apps/web/src/app/admin/profession-categories/page.tsx';
let catContent = fs.readFileSync(categoriesFile, 'utf8');
catContent = catContent.replace('<TableHead className="w-[15%]">Trạng thái</TableHead>', '<TableHead className="w-[15%]">Trạng thái</TableHead>');
catContent = catContent.replace('<TableHead className="w-[10%] text-right">Thao tác</TableHead>', '<TableHead className="w-[15%] text-right">Thao tác</TableHead>');
// Need to shrink another column by 5%
catContent = catContent.replace('<TableHead className="w-[35%]">Mô tả</TableHead>', '<TableHead className="w-[30%]">Mô tả</TableHead>');
fs.writeFileSync(categoriesFile, catContent);

console.log("Widths updated.");
