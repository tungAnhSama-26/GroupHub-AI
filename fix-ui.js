const fs = require('fs');
const path = require('path');

const pages = [
  'apps/web/src/app/admin/users/page.tsx',
  'apps/web/src/app/admin/groups/page.tsx',
  'apps/web/src/app/admin/professions/page.tsx',
  'apps/web/src/app/admin/profession-categories/page.tsx'
];

pages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Remove the subtitle paragraphs
  content = content.replace(/<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">[\s\S]*?<\/p>/g, '');

  // 2. Add ThemeToggle and Bell to the right side of the header
  // First, make sure we import ThemeToggle and Bell
  if (!content.includes('ThemeToggle')) {
    content = content.replace(
      'import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";',
      'import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";\nimport { ThemeToggle } from "@/components/theme-toggle";\nimport { Bell } from "lucide-react";\nimport { Button } from "@/components/ui/button";'
    );
  }

  // Update Users and Groups (they don't have an Add button)
  content = content.replace(
    /<\/div>\s*<\/div>\s*<div className="p-8 space-y-4">/,
    `</div>\n        <div className="flex items-center gap-2">\n          <Button variant="ghost" size="icon" className="text-zinc-500"><Bell className="h-5 w-5" /></Button>\n          <ThemeToggle />\n        </div>\n      </div>\n\n      <div className="p-8 space-y-4">`
  );

  // Update Professions
  content = content.replace(
    /<AddProfessionDialog categories=\{categories\} \/>\s*<\/div>/,
    `<div className="flex items-center gap-2">\n          <AddProfessionDialog categories={categories} />\n          <Button variant="ghost" size="icon" className="text-zinc-500"><Bell className="h-5 w-5" /></Button>\n          <ThemeToggle />\n        </div>\n      </div>`
  );

  // Update Profession Categories
  content = content.replace(
    /<AddCategoryDialog \/>\s*<\/div>/,
    `<div className="flex items-center gap-2">\n          <AddCategoryDialog />\n          <Button variant="ghost" size="icon" className="text-zinc-500"><Bell className="h-5 w-5" /></Button>\n          <ThemeToggle />\n        </div>\n      </div>`
  );

  // 3. Make the table columns distribute evenly
  // Replace <Table> with <Table className="table-fixed w-full">
  content = content.replace(/<Table>/g, '<Table className="table-fixed w-full">');

  // Replace <TableHead> with <TableHead className="w-[15%]"> or similar depending on the column count
  // Users: 5 columns => 20%, 20%, 20%, 20%, 20%
  // Groups: 6 columns => 20%, 15%, 15%, 15%, 15%, 20%
  // Professions: 6 columns => 25%, 20%, 15%, 15%, 15%, 10%
  // Profession Categories: 5 columns => 25%, 35%, 15%, 15%, 10%
  // Actually, standardizing <TableHead> with no specific width on most, but `table-fixed` will distribute them evenly by default unless specified.
  // Wait, if I just use `table-fixed`, it distributes columns exactly equally. Let's do that first, but for the action column, we should specify a small width, and maybe a bit more for Name.
  // Let's manually replace the TableHeads for each file.

  fs.writeFileSync(file, content);
});

console.log('UI fixes applied.');
