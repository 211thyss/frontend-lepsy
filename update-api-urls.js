import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  'src/pages/admin/Users.tsx',
  'src/pages/admin/Profile.tsx',
  'src/pages/admin/Patients.tsx',
  'src/pages/admin/Messages.tsx',
  'src/pages/admin/Dashboard.tsx',
  'src/pages/admin/Appointments.tsx',
  'src/pages/admin/Login.tsx',
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add import if not present
  if (!content.includes("import { API_URL } from")) {
    const importMatch = content.match(/^(import .+;\n)+/m);
    if (importMatch) {
      const lastImport = importMatch[0];
      const insertPos = content.indexOf(lastImport) + lastImport.length;
      content = content.slice(0, insertPos) + "import { API_URL } from '../../config/api';\n" + content.slice(insertPos);
    }
  }
  
  // Replace all hardcoded URLs
  content = content.replace(/['"]http:\/\/localhost:5000/g, '`${API_URL}');
  content = content.replace(/\$\{import\.meta\.env\.VITE_API_URL \|\| 'http:\/\/localhost:5000'\}/g, '${API_URL}');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Updated ${file}`);
});

console.log('\n🎉 All files updated!');
