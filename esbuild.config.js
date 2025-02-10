import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';
const isPreRelease = process.env.NODE_ENV === 'pre-release';
const isProduction = process.env.NODE_ENV === 'production';

// 🔹 Tentukan publicPath berdasarkan environment
let publicPath = '/';
if (isPreRelease) publicPath = '/spa';
if (isProduction) publicPath = '';

const buildOptions = {
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  bundle: true,
  minify: isProduction,
  sourcemap: isDev || isPreRelease,
  publicPath: publicPath,
  target: 'es2022',
  tsconfig: 'tsconfig.json',
  loader: {
    '.ts': 'ts',
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'file',
    '.webp': 'file',
    '.ico': 'file',
  },
  logLevel: 'info',
};

// 🔹 Fungsi untuk membuat folder jika belum ada
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// 🔹 Fungsi untuk menyalin file
const copyFile = (src, dest) => {
  try {
    if (!fs.existsSync(src)) {
      throw new Error(`Source file ${src} not found.`);
    }
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  } catch (error) {
    console.error(`Failed to copy ${src}:`, error.message);
  }
};

// 🔹 Fungsi untuk menyalin folder secara rekursif
const copyFolderRecursive = (src, dest) => {
  if (!fs.existsSync(src)) {
    console.warn(`Warning: Source folder ${src} does not exist. Skipping.`);
    return;
  }

  ensureDirExists(dest);

  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      // Jika folder, rekursif copy
      copyFolderRecursive(srcPath, destPath);
    } else {
      // Jika file, copy biasa
      copyFile(srcPath, destPath);
    }
  });
};

// 🔹 Jalankan build
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
      await ctx.dispose();
    }

    console.log('Build completed successfully!');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
};

// 🔹 Jalankan proses secara berurutan
const main = async () => {
  ensureDirExists('dist'); // Pastikan `dist/` ada
  await startBuild();
  copyFile('src/index.html', 'dist/index.html'); // Copy index.html
  copyFolderRecursive('src/assets', 'dist/assets'); // Copy seluruh folder assets
};

main();
