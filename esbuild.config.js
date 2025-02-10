import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

// Tentukan environment
const isDev = process.env.NODE_ENV === 'development';
const isPreRelease = process.env.NODE_ENV === 'pre-release';
const isProduction = process.env.NODE_ENV === 'production';

// Tentukan publicPath berdasarkan hosting
let publicPath = '/';
if (isPreRelease) publicPath = '/spa'; // Untuk GitHub Pages
if (isProduction) publicPath = ''; // Untuk ESP32-C3

// Salin file HTML
console.log('Checking if source file exists...');
console.log('File exists:', fs.existsSync(path.resolve('src/index.html')));
const copyFile = (src, dest) => {
  try {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  } catch (error) {
    console.error(`Failed to copy ${src}:`, error.message);
  }
};
console.log('Checking if source file exists...');
console.log('File exists:', fs.existsSync(path.resolve('src/index.html')));

// Konfigurasi esbuild
const buildOptions = {
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  bundle: true,
  minify: isProduction,
  sourcemap: isDev || isPreRelease,
  publicPath: publicPath,
  target: 'es2022', // Pastikan menggunakan target modern (ES2022 atau lebih tinggi)
  tsconfig: 'tsconfig.json', // Menggunakan pengaturan dekorator dari tsconfig
  loader: {
    '.ts': 'ts', // Loader TypeScript
    '.png': 'file', // Loader untuk PNG
    '.jpg': 'file', // Loader untuk JPG
    '.svg': 'file', // Loader untuk SVG
    '.webp': 'file', // Loader WebP
    '.ico': 'file', // Loader untuk favicon
  },
  logLevel: 'info',
};

// Jalankan build
const startBuild = async () => {
  console.log('Starting esbuild...');

  try {
    const ctx = await esbuild.context(buildOptions);
    if (isDev) {
      console.log('Watching for changes...');
      await ctx.watch();
    } else {
      console.log('Building for production...');
      await ctx.rebuild();
      await ctx.dispose(); // <-- Tambahkan ini untuk menghentikan proses
    }

    console.log('Build completed successfully! Check dist/ folder for output.');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
};

// Jalankan proses secara berurutan
const main = async () => {
  await startBuild();
  copyFile('src/index.html', 'dist/index.html'); // Pindahkan proses copyFile setelah startBuild selesai
  console.log('Exiting process...');
  process.exit(0); // <-- Tambahkan ini agar proses benar-benar selesai
};

main();
