import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AuthService } from '../utils/auth-service.js';
import '../components/navbar.ts';
import '../components/footer.ts';
import '../components/modal-dialog.ts';
import '../components/card-component.ts';

@customElement('page-help')
export class HelpPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state()
  private helpTopics = [
    {
      title: 'Setup Project',
      description: `
        Untuk memulai proyek SPA, langkah pertama adalah menginisialisasi proyek menggunakan Node Package Manager (NPM). 
        Proses ini menghasilkan file <code>package.json</code> yang akan berfungsi sebagai pusat manajemen dependensi dan skrip proyek.
      `,
      content: `
        <p>Ikuti langkah-langkah berikut untuk mengatur proyek dari awal:</p>
    
        <h3 class="text-lg font-semibold mt-4">1️⃣ Buat Folder Proyek</h3>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">mkdir spa && cd spa</pre>
        <p>Perintah ini akan membuat folder <code>spa</code> dan masuk ke dalamnya.</p>
    
        <h3 class="text-lg font-semibold mt-4">2️⃣ Inisialisasi Proyek dengan NPM</h3>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">npm init -y</pre>
        <p>Perintah ini akan membuat file <code>package.json</code> di dalam folder proyek.</p>
    
        <h3 class="text-lg font-semibold mt-4">🔹 Penjelasan</h3>
        <ul class="list-disc pl-5 mt-4 space-y-2">
          <li>
            <strong>File <code>package.json</code>:</strong> Berisi metadata proyek seperti nama, versi, deskripsi, skrip build, dan daftar dependensi.
          </li>
          <li>
            <strong>Manfaat:</strong> Dengan <code>package.json</code>, Anda dapat mengelola library pihak ketiga, menjalankan skrip otomatis, 
            dan mengatur alur kerja pengembangan dengan lebih mudah.
          </li>
        </ul>
    
        <p class="mt-4">Langkah ini adalah fondasi untuk semua konfigurasi dan instalasi dependensi proyek di tahap selanjutnya.</p>
      `,
    },
    {
      title: 'Instalasi Dependensi',
      description: `
        Pada tahap ini, kita akan memasang semua dependensi yang diperlukan untuk mengembangkan aplikasi SPA 
        berbasis LitElement, Tailwind CSS, dan TypeScript. Instalasi ini mencakup pengaturan toolchain, konfigurasi file, 
        dan penambahan skrip build agar proyek dapat dibuild dengan lancar.
      `,
      content: `
        <p>Ikuti langkah-langkah berikut untuk memasang semua dependensi yang dibutuhkan:</p>
    
        <h3 class="text-lg font-semibold mt-4">1️⃣ Install Dependensi Dasar</h3>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">
    npm install --save-dev lit tailwindcss esbuild typescript
        </pre>
        
        <h3 class="text-lg font-semibold mt-4">🔹 Penjelasan</h3>
        <ul class="list-disc pl-5 mt-4 space-y-2">
          <li><strong>lit:</strong> Library untuk membangun komponen web berbasis LitElement.</li>
          <li><strong>tailwindcss:</strong> Framework utility-first untuk styling.</li>
          <li><strong>esbuild:</strong> Alat build yang cepat untuk menggabungkan, meminifikasi, dan membundle file proyek.</li>
          <li><strong>typescript:</strong> Superset JavaScript yang menambahkan dukungan untuk tipe statis, meningkatkan keandalan dan maintainability kode.</li>
        </ul>
    
        <h3 class="text-lg font-semibold mt-4">2️⃣ Inisialisasi Tailwind CSS</h3>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">npx tailwindcss init</pre>
        <p>Perintah ini akan menghasilkan file <code>tailwind.config.js</code> dengan konfigurasi default.</p>
    
        <h3 class="text-lg font-semibold mt-4">3️⃣ Konfigurasi File Tailwind CSS</h3>
        <p>Tailwind CSS adalah framework utility-first yang dirancang untuk mempercepat proses styling dalam pengembangan web.</p>
    
        <h3 class="text-lg font-semibold mt-4">🔹 Membuat File <code>styles.css</code></h3>
        <p>Buat file <code>src/styles.css</code> dan tambahkan konfigurasi berikut:</p>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
        </pre>
    
        <h3 class="text-lg font-semibold mt-4">🔹 Konfigurasi File <code>tailwind.config.js</code></h3>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">
    module.exports = {
      content: ['./src/**/*.html', './src/**/*.ts'],
      theme: {
        extend: {}, // Memperluas tema default
      },
      plugins: [], // Menambahkan plugin Tailwind (opsional)
    };
        </pre>
        <p>File ini memastikan Tailwind hanya memproses kelas yang digunakan dalam proyek untuk mengurangi ukuran file CSS final.</p>
      `,
    },
    {
      title: 'Setup GitHub',
      description: `
        Penggunaan GitHub dalam proyek ini bertujuan untuk mempermudah pengelolaan versi kode, 
        kolaborasi tim, dan deployment ke GitHub Pages. 
        Kita akan menginisialisasi repository, menghubungkannya ke GitHub, dan melakukan push pertama.
      `,
      content: `
        <p>Untuk menyimpan proyek ini di GitHub, ikuti langkah-langkah berikut:</p>
        <h3 class="text-lg font-semibold mt-4">1️⃣ Inisialisasi Git</h3>
        <pre class="bg-gray-100 p-3 rounded">git init</pre>
        <h3 class="text-lg font-semibold mt-4">2️⃣ Tambahkan Remote Repository</h3>
        <pre class="bg-gray-100 p-3 rounded">git remote add origin https://github.com/username/spa-project.git</pre>
        <h3 class="text-lg font-semibold mt-4">3️⃣ Commit dan Push</h3>
        <pre class="bg-gray-100 p-3 rounded">
git add .
git commit -m "Inisialisasi proyek"
git push -u origin main
        </pre>
      `,
    },
    {
      title: 'Setup esbuild',
      description: `
        Untuk menggunakan esbuild, kita perlu menginstalnya dan mengatur konfigurasi awal 
        di dalam file \`esbuild.config.js\`. Tahap ini mencakup instalasi, konfigurasi 
        build, dan loader untuk berbagai file.
      `,
      content: `
        <p><strong>Apa itu esbuild?</strong></p>
        <p>esbuild adalah tool yang digunakan untuk mengompilasi dan menggabungkan file JavaScript/TypeScript 
        dengan sangat cepat. Dalam proyek ini, kita menggunakan esbuild untuk:</p>
  
        <ul class="list-disc pl-5 mt-4 space-y-2">
          <li>Menggabungkan semua file TypeScript menjadi satu bundle.</li>
          <li>Meminifikasi kode untuk produksi.</li>
          <li>Membuat source map untuk debugging.</li>
        </ul>
  
        <h3 class="text-lg font-semibold mt-4">🔹 Instalasi esbuild</h3>
        <p>Pastikan Node.js sudah terinstal, lalu jalankan perintah berikut:</p>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">npm install --save-dev esbuild</pre>
  
        <h3 class="text-lg font-semibold mt-4">🔹 Konfigurasi \`esbuild.config.js\`</h3>
        <p>File ini mengatur bagaimana esbuild memproses file TypeScript dan aset lainnya.</p>
  
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">
  const buildOptions = {
    entryPoints: ['src/index.ts'], // File utama yang akan dibundel
    outdir: 'dist', // Folder output setelah build
    bundle: true, // Menggabungkan semua file menjadi satu
    minify: isProduction, // Minifikasi hanya untuk mode produksi
    sourcemap: isDev || isPreRelease, // Source map untuk debugging
    publicPath: publicPath, // Path untuk akses file publik
    target: 'es2022', // Target versi JavaScript
    tsconfig: 'tsconfig.json', // Menggunakan konfigurasi TypeScript
    loader: {
      '.ts': 'ts', // Loader untuk TypeScript
      '.png': 'file', // Loader untuk gambar PNG
      '.jpg': 'file', // Loader untuk gambar JPG
      '.svg': 'file', // Loader untuk SVG
      '.webp': 'file', // Loader WebP
      '.ico': 'file', // Loader untuk favicon
    },
    logLevel: 'info', // Menampilkan informasi saat proses build
  };
        </pre>
  
        <p>Setelah konfigurasi selesai, kita bisa mulai menggunakan esbuild untuk membangun aplikasi.</p>
      `,
    },
    {
      title: 'Penggunaan esbuild',
      description: `
        Setelah esbuild dikonfigurasi, kita bisa menggunakannya untuk membangun aplikasi.
        Proses ini mencakup menjalankan build dalam mode development, produksi, dan otomatisasi.
      `,
      content: `
        <h3 class="text-lg font-semibold mt-4">🔹 Menjalankan esbuild</h3>
        <p>Untuk menjalankan esbuild secara manual, gunakan perintah berikut:</p>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">node esbuild.config.js</pre>
  
        <p>Atau gunakan perintah dari \`package.json\`:</p>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">npm run esbuild:watch</pre>
  
        <p>Perintah ini akan menjalankan esbuild dalam mode watch sehingga perubahan file akan 
        otomatis di-build ulang tanpa harus menjalankan perintah secara manual.</p>
  
        <h3 class="text-lg font-semibold mt-4">🔹 Build untuk Produksi</h3>
        <p>Jika ingin membangun aplikasi untuk produksi:</p>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">npm run build:production</pre>
  
        <p>Setelah proses selesai, file hasil build akan tersimpan di folder <code>dist/</code>.</p>
  
        <h3 class="text-lg font-semibold mt-4">🔹 Fungsi Pendukung</h3>
        <p>Beberapa fungsi tambahan untuk memastikan build berjalan dengan baik:</p>
  
        <ul class="list-disc pl-5 mt-4 space-y-2">
          <li><strong>ensureDirExists()</strong>: Membuat folder \`dist/\` jika belum ada.</li>
          <li><strong>copyFile()</strong>: Menyalin file (misalnya \`index.html\`) ke \`dist/\`.</li>
          <li><strong>copyFolderRecursive()</strong>: Menyalin seluruh folder \`assets/\` ke \`dist/\`.</li>
        </ul>
  
        <h3 class="text-lg font-semibold mt-4">🔹 Mode Development vs. Production</h3>
        <p>Kita bisa memilih mode sesuai kebutuhan:</p>
  
        <table class="border-collapse border border-gray-300 mt-4 text-sm">
          <tr class="bg-gray-700 text-white">
            <th class="border border-gray-300 px-4 py-2">Mode</th>
            <th class="border border-gray-300 px-4 py-2">Perintah</th>
            <th class="border border-gray-300 px-4 py-2">Keterangan</th>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">Development</td>
            <td class="border border-gray-300 px-4 py-2">npm run dev</td>
            <td class="border border-gray-300 px-4 py-2">Build + Live Server</td>
          </tr>
          <tr class="bg-gray-100">
            <td class="border border-gray-300 px-4 py-2">Production</td>
            <td class="border border-gray-300 px-4 py-2">npm run build:production</td>
            <td class="border border-gray-300 px-4 py-2">Build dan Minify untuk deploy</td>
          </tr>
        </table>
      `,
    },
    {
      title: 'Tahap Development',
      description: `
      Dalam tahap pengembangan, kita menjalankan aplikasi secara lokal dengan memantau perubahan kode 
      secara real-time. Perintah <code>npm run dev:full</code> digunakan untuk menjalankan tiga proses sekaligus:
      <strong>Tailwind CSS Watch, esbuild Watch, dan Live Server</strong>.
    `,
      content: `
      <p>Untuk memulai tahap development, cukup jalankan perintah berikut:</p>
      <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">npm run dev:full</pre>
  
      <h3 class="text-lg font-semibold mt-4">🔹 Apa yang Dilakukan Perintah Ini?</h3>
      <p>Perintah <code>npm run dev:full</code> menjalankan tiga proses utama secara bersamaan:</p>
  
      <ol class="list-decimal pl-5 mt-4 space-y-2">
        <li>
          <strong>Menjalankan Tailwind CSS Watch</strong>
          <pre class="bg-gray-700 text-white p-3 rounded-lg shadow-md">npm run tailwind:watch</pre>
          <p>Proses ini memastikan bahwa setiap perubahan di file <code>styles.css</code> langsung 
          dikompilasi ke dalam <code>dist/styles.css</code>.</p>
        </li>
  
        <li>
          <strong>Menjalankan esbuild Watch</strong>
          <pre class="bg-gray-700 text-white p-3 rounded-lg shadow-md">npm run esbuild:watch</pre>
          <p>Proses ini akan memantau perubahan pada file TypeScript (<code>.ts</code>) dan 
          secara otomatis membangun ulang kode ke dalam folder <code>dist/</code>.</p>
        </li>
  
        <li>
          <strong>Menjalankan Live Server</strong>
          <pre class="bg-gray-700 text-white p-3 rounded-lg shadow-md">npm run start:local</pre>
          <p>Proses ini menjalankan <code>live-server</code> pada folder <code>dist/</code>, sehingga 
          setiap perubahan dalam kode langsung terlihat di browser tanpa perlu refresh secara manual.</p>
        </li>
      </ol>
  
      <p class="mt-4">Dengan menjalankan ketiga proses ini secara bersamaan, pengembangan aplikasi 
      menjadi lebih cepat dan efisien.</p>
    `,
    },
    {
      title: 'Deployment ke GitHub Pages',
      description: `
        GitHub Pages memungkinkan kita untuk menghosting SPA secara gratis. 
        Perintah <code>npm run deploy:github</code> digunakan untuk membangun aplikasi 
        dalam mode pre-release dan mengunggahnya ke GitHub secara otomatis.
      `,
      content: `
        <p>Untuk mempublikasikan aplikasi ke GitHub Pages, cukup jalankan perintah berikut:</p>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">npm run deploy:github</pre>
    
        <h3 class="text-lg font-semibold mt-4">🔹 Apa yang Dilakukan Perintah Ini?</h3>
        <p>Perintah <code>npm run deploy:github</code> menjalankan dua langkah utama:</p>
    
        <ol class="list-decimal pl-5 mt-4 space-y-2">
          <li>
            <strong>Build dalam Mode Pre-Release</strong>
            <pre class="bg-gray-700 text-white p-3 rounded-lg shadow-md">npm run pre-release</pre>
            <p>Perintah ini mengatur variabel lingkungan <code>NODE_ENV=pre-release</code> dan 
            menjalankan <code>esbuild</code> untuk membangun aplikasi dengan pengaturan khusus untuk GitHub Pages.</p>
          </li>
    
          <li>
            <strong>Deploy ke GitHub Pages</strong>
            <pre class="bg-gray-700 text-white p-3 rounded-lg shadow-md">gh-pages -d dist</pre>
            <p>Setelah proses build selesai, perintah ini akan mengunggah folder <code>dist/</code> 
            ke branch <code>gh-pages</code> di repository GitHub.</p>
          </li>
        </ol>
    
        <p class="mt-4">Dengan menjalankan satu perintah <code>npm run deploy:github</code>, 
        aplikasi langsung dibangun dan diunggah ke GitHub Pages secara otomatis.</p>
      `,
    },
    {
      title: 'Deployment ke ESP32-C3',
      description: `
        ESP32-C3 digunakan untuk menyimpan SPA agar bisa diakses tanpa koneksi internet. 
        Dengan memanfaatkan fitur penyimpanan file, kita bisa meng-hosting aplikasi ini 
        langsung dari perangkat IoT. Perintah <code>npm run deploy:esp32</code> akan 
        secara otomatis membangun aplikasi dan mengunggahnya ke ESP32-C3.
      `,
      content: `
        <p>Untuk mengunggah aplikasi ke ESP32-C3, cukup jalankan perintah berikut:</p>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">npm run deploy:esp32</pre>
    
        <h3 class="text-lg font-semibold mt-4">🔹 Apa yang Dilakukan Perintah Ini?</h3>
        <p>Perintah <code>npm run deploy:esp32</code> menjalankan dua langkah utama:</p>
    
        <ol class="list-decimal pl-5 mt-4 space-y-2">
          <li>
            <strong>Build dalam Mode Produksi</strong>
            <pre class="bg-gray-700 text-white p-3 rounded-lg shadow-md">npm run build:production</pre>
            <p>Perintah ini menggunakan <code>esbuild</code> untuk membangun aplikasi dengan optimasi maksimal, 
            meminimalkan ukuran file, dan menyiapkannya untuk diunggah ke ESP32.</p>
          </li>
    
          <li>
            <strong>Upload ke ESP32-C3</strong>
            <pre class="bg-gray-700 text-white p-3 rounded-lg shadow-md">npm run upload:esp32</pre>
            <p>Perintah ini menjalankan skrip <code>upload-to-esp32.js</code>, yang bertugas mengunggah 
            seluruh file dalam <code>dist/</code> ke sistem penyimpanan ESP32-C3.</p>
          </li>
        </ol>
    
        <p class="mt-4">Dengan menjalankan satu perintah <code>npm run deploy:esp32</code>, 
        aplikasi langsung dibangun dan diunggah ke ESP32-C3 secara otomatis.</p>
      `,
    },
    {
      title: 'Upload ke ESP32-C3',
      description: `
        Bagian dari tahap <strong>"Deployment ke ESP32-C3"</strong>. 
        Proses upload ini digunakan untuk mengunggah file hasil build ke ESP32-C3. 
        Skrip <code>upload-to-esp32.js</code> menjalankan beberapa perintah untuk memastikan 
        file dapat disimpan di ESP32-C3 menggunakan LittleFS.
      `,
      content: `
        <p>Untuk mengunggah file ke ESP32-C3, jalankan perintah berikut:</p>
        <pre class="bg-gray-800 text-white p-3 rounded-lg shadow-md">npm run upload:esp32</pre>
    
        <h3 class="text-lg font-semibold mt-4">🔹 Apa yang Dilakukan Perintah Ini?</h3>
        <p>Perintah <code>npm run upload:esp32</code> akan menjalankan skrip <code>upload-to-esp32.js</code> 
        yang melakukan tiga langkah utama:</p>
    
        <ol class="list-decimal pl-5 mt-4 space-y-2">
          <li>
            <strong>Verifikasi Arduino CLI</strong>
            <pre class="bg-gray-700 text-white p-3 rounded-lg shadow-md">arduino-cli version</pre>
            <p>Memeriksa apakah <code>arduino-cli</code> sudah terinstal dan dapat digunakan.</p>
          </li>
    
          <li>
            <strong>Mengunggah file ke ESP32-C3</strong>
            <pre class="bg-gray-700 text-white p-3 rounded-lg shadow-md">
    arduino-cli upload -p COM3 --fqbn esp32:esp32:esp32c3 --input-dir dist
            </pre>
            <p>Perintah ini mengunggah seluruh file di dalam folder <code>dist/</code> ke ESP32-C3 melalui port <code>COM3</code> (sesuaikan dengan sistem Anda).</p>
          </li>
    
          <li>
            <strong>Menampilkan Status Upload</strong>
            <p>Jika berhasil, akan muncul pesan:</p>
            <pre class="bg-gray-700 text-white p-3 rounded-lg shadow-md">🎉 Upload ke ESP32-C3 selesai!</pre>
            <p>Jika gagal, akan ada pesan error yang dapat digunakan untuk debugging.</p>
          </li>
        </ol>
    
        <p class="mt-4">Dengan menjalankan satu perintah <code>npm run upload:esp32</code>, 
        proses upload akan dilakukan secara otomatis tanpa perlu mengatur ulang secara manual.</p>
      `,
    },
  ];

  connectedCallback() {
    super.connectedCallback();
    if (!AuthService.isAuthenticated()) {
      window.location.href = '#/auth/login';
    }
  }

  private _showModal(title: string, content: string) {
    const modalDialog = this.renderRoot?.querySelector(
      'modal-dialog'
    ) as HTMLElement & {
      isOpen: boolean;
      setContent: (title: string, content: string) => void;
    };

    if (modalDialog) {
      modalDialog.isOpen = true;
      modalDialog.setContent(title, content);
    }
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="p-8 my-14 bg-gradient-to-tr from-blue-50 to-green-300 min-h-screen"
      >
        <h1 class="text-3xl font-extrabold text-blue-700">Alur Kerja SPA</h1>
        <p class="text-gray-700 text-lg">
          Berikut adalah tahapan utama dalam membangun SPA ini:
        </p>

        <div
          class="mt-6 flex flex-wrap justify-center gap-6 md:grid md:grid-cols-2 lg:grid-cols-3"
        >
          ${this.helpTopics.map(
            (topic) => html`
              <card-component
                class="cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105 w-full max-w-md mx-auto"
                .data=${{
                  title: topic.title,
                  description: topic.description,
                }}
                @click=${() => this._showModal(topic.title, topic.content)}
              ></card-component>
            `
          )}
        </div>

        <modal-dialog></modal-dialog>
      </main>
      <app-footer></app-footer>
    `;
  }
}
