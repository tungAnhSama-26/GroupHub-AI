const fs = require('fs');

const pages = [
  'apps/web/src/app/admin/users/page.tsx',
  'apps/web/src/app/admin/groups/page.tsx',
  'apps/web/src/app/admin/professions/page.tsx',
  'apps/web/src/app/admin/profession-categories/page.tsx'
];

pages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/className="animate-in fade-in slide-in-from-bottom-4 duration-500"/, 'className="relative h-full flex flex-col"');
  fs.writeFileSync(file, content);
});
console.log('Removed duplicate animations');
