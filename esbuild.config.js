const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

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
  loader: {
    '.ts': 'ts',
    '.css': 'css',
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
      // Pindahkan copyFile setelah watch
      copyFile('src/index.html', 'dist/index.html');
    } else {
      console.log('Building for production...');
      await ctx.rebuild();
      copyFile('src/index.html', 'dist/index.html');
    }

    console.log('Build completed successfully! Check dist/ folder for output.');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
};

startBuild();
