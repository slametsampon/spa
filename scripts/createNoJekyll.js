import fs from 'fs';
const path = 'dist/.nojekyll';

try {
  fs.writeFileSync(path, '', { flag: 'w' }); // Buat file kosong
  console.log('✅ Successfully created .nojekyll file in dist/');
} catch (error) {
  console.error('❌ Error creating .nojekyll:', error);
  process.exit(1);
}
