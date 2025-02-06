import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AuthService } from '../utils/auth-service.js';
import '../components/footer.ts';
import '../components/navbar.ts';

@customElement('page-home')
export class HomePage extends LitElement {
  // Nonaktifkan Shadow DOM untuk memungkinkan Tailwind bekerja
  createRenderRoot() {
    return this; // Menggunakan Light DOM
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('<page-home> connected');
    // Redirect ke login jika tidak login
    // if (!AuthService.isAuthenticated()) {
    //   window.location.href = '#/auth/login';
    // }
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="p-8 my-14 bg-gradient-to-tr from-yellow-200 via-purple-300 to-purple-200"
      >
        <!-- Kata Pengantar -->
        <section class="mb-8">
          <h1 class="text-3xl font-inter font-extrabold text-blue-600 mb-4">
            Halo para praktisi dan penggiat teknologi! 👋
          </h1>
          <p class="text-gray-700 text-lg leading-relaxed font-roboto">
            Pernahkah Anda ingin menggabungkan teknologi modern seperti
            <strong>Single Page Application (SPA)</strong> dengan kekuatan
            <strong>Internet of Things (IoT)</strong>? Artikel ini adalah
            panduan lengkap untuk membangun aplikasi modern menggunakan
            LitElement, Tailwind CSS, TypeScript, dan esbuild, yang dapat
            dihosting langsung pada perangkat IoT seperti ESP32-C3!
          </p>
        </section>

        <!-- Kenapa SPA di IoT -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold font-inter text-gray-800 mb-4">
            Kenapa SPA di IoT?
          </h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700 font-roboto">
            <li>
              <strong>Navigasi Tanpa Reload:</strong> Menghindari pemuatan ulang
              setiap kali berpindah halaman.
            </li>
            <li>
              <strong>Efisiensi Memori:</strong> Mengurangi jumlah file yang
              diunggah ke sistem file ESP32.
            </li>
            <li>
              <strong>Desain Modular:</strong> Memanfaatkan komponen reusable
              seperti Header dan Footer.
            </li>
            <li>
              <strong>Modern & Rapi:</strong> Kombinasi LitElement dan Tailwind
              CSS menghasilkan UI minimalis dengan logika terorganisir.
            </li>
          </ul>
        </section>

        <!-- Apa yang Akan Kita Buat -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold font-inter text-gray-800 mb-4">
            Apa yang Akan Kita Buat?
          </h2>
          <p class="text-gray-700 mb-4 font-roboto">
            Sebuah proyek SPA multipage dengan halaman <strong>Home</strong>,
            <strong>About</strong>, dan <strong>Help</strong>, masing-masing
            memiliki:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 font-roboto">
            <li><strong>Header:</strong> Navbar navigasi antar halaman.</li>
            <li>
              <strong>Main Content:</strong> Konten utama yang unik untuk setiap
              halaman.
            </li>
            <li><strong>Footer:</strong> Informasi umum di bagian bawah.</li>
          </ul>
          <p class="text-gray-700 mt-4 font-roboto">
            Semua ini akan dihosting pada ESP32-C3 sebagai server, dengan opsi
            alternatif hosting di GitHub Pages untuk kebutuhan pengembangan.
          </p>
        </section>

        <!-- Lingkungan Pengembangan -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 font-inter">
            Lingkungan Pengembangan
          </h2>
          <p class="text-gray-700 font-roboto">
            Untuk memulai, pastikan Anda memiliki perangkat dan alat berikut:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 font-roboto">
            <li><strong>Operating System:</strong> Windows 10.</li>
            <li>
              <strong>IDE:</strong> Visual Studio Code (VS Code), dengan plugin
              seperti Tailwind CSS IntelliSense, ESLint, dan Prettier.
            </li>
            <li>
              <strong>Perangkat IoT:</strong> ESP32-C3 yang mendukung LittleFS
              atau SPIFFS sebagai sistem file.
            </li>
          </ul>
        </section>

        <!-- Ajakan untuk Memulai -->
        <section class="text-center mt-12">
          <h2 class="text-2xl font-bold text-blue-600 mb-4 font-inter">
            Mari Kita Mulai! 🚀
          </h2>
          <p class="text-gray-700 text-lg font-roboto">
            Dengan panduan ini, Anda akan memiliki pemahaman yang solid tentang
            bagaimana mengintegrasikan teknologi SPA modern dengan perangkat IoT
            untuk menciptakan aplikasi yang efisien dan fleksibel.
          </p>
        </section>
      </main>
      <app-footer></app-footer>
    `;
  }
}
