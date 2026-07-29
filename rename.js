const fs = require('fs');

const files = [
  'apps/web/src/app/admin/actions.ts',
  'apps/web/src/app/admin/profession-categories/page.tsx',
  'apps/web/src/app/admin/professions/page.tsx',
  'apps/web/src/components/admin/add-category-dialog.tsx',
  'apps/web/src/components/admin/add-profession-dialog.tsx',
  'apps/web/src/components/admin/admin-sidebar.tsx',
  'apps/web/src/components/admin/category-actions.tsx',
  'apps/web/src/components/admin/profession-actions.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/Danh mục/g, 'Nhóm nghề');
  content = content.replace(/danh mục/g, 'nhóm nghề');
  content = content.replace(/DANH MỤC/g, 'NHÓM NGHỀ');
  fs.writeFileSync(file, content);
});
console.log('Renamed in all files');
