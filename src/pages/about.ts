import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { AuthService } from '../utils/auth-service.js';
import '../components/navbar.ts';
import '../components/footer.ts';

/**
 * @customElement page-about
 * @description Komponen halaman "Tentang" yang menjelaskan konsep SPA (Single Page Application).
 * Komponen ini menggunakan Light DOM agar kompatibel dengan Tailwind CSS.
 */
@customElement('page-about')
export class AboutPage extends LitElement {
  /**
   * Nonaktifkan Shadow DOM untuk menggunakan Light DOM.
   * Hal ini memungkinkan integrasi penuh dengan Tailwind CSS.
   * @returns {this} Mengembalikan instance kelas untuk Light DOM.
   */
  createRenderRoot() {
    return this;
  }

  /**
   * Properti reaktif `title` untuk menampilkan judul halaman.
   * Dapat diatur langsung melalui atribut HTML.
   * @type {string}
   * @default 'Tentang SPA (Single Page Application)'
   */
  @property({ type: String })
  title: string = 'Tentang SPA (Single Page Application)';

  /**
   * Lifecycle method LitElement.
   * Dipanggil saat elemen ditambahkan ke DOM.
   */
  connectedCallback() {
    super.connectedCallback();
    // Cek apakah user login
    if (!AuthService.isAuthenticated()) {
      window.location.href = '/#/auth/login';
    }
  }

  /**
   * Fungsi render untuk menghasilkan konten HTML dari komponen.
   * @returns {TemplateResult} Template HTML yang akan dirender.
   */
  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="px-8 py-12 my-14 bg-gradient-to-tr from-orange-200 via-green-300 to-yellow-100"
      >
        <!-- Tentang SPA dan IoT -->
        <section class="mb-8">
          <h1 class="text-3xl font-extrabold font-inter text-blue-600 mb-4">
            ${this.title}
          </h1>
          <p class="text-gray-700 font-roboto text-lg leading-relaxed">
            Aplikasi ini didukung oleh <strong>ESP32-C3</strong>, sebuah
            perangkat IoT modern yang memungkinkan pengembangan antarmuka web
            cepat, responsif, dan efisien melalui pendekatan
            <strong>Single Page Application (SPA)</strong>.
          </p>
        </section>

        <!-- Manfaat SPA -->
        <section class="mb-8">
          <h2 class="text-2xl font-inter font-bold text-gray-800 mb-4">
            Mengapa Memilih SPA?
          </h2>
          <ul class="list-disc font-roboto list-inside space-y-2 text-gray-700">
            <li>
              <strong>Interaksi Cepat:</strong> Navigasi tanpa reload halaman.
            </li>
            <li>
              <strong>Hemat Sumber Daya:</strong> Hanya memuat konten yang
              diperlukan.
            </li>
            <li>
              <strong>Desain Modular:</strong> Komponen reusable seperti Header
              dan Footer.
            </li>
            <li>
              <strong>Hosting Lokal:</strong> Berjalan langsung di ESP32-C3.
            </li>
          </ul>
        </section>

        <!-- Teknologi yang Digunakan -->
        <section class="mb-8">
          <h2 class="text-2xl font-inter font-bold text-gray-800 mb-4">
            Teknologi yang Digunakan
          </h2>
          <p class="text-gray-700">
            Aplikasi ini memanfaatkan teknologi berikut:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>LitElement:</strong> Untuk pengembangan komponen web
              modern.
            </li>
            <li>
              <strong>Tailwind CSS:</strong> Untuk styling yang cepat dan
              konsisten.
            </li>
            <li>
              <strong>TypeScript:</strong> Untuk penulisan kode yang lebih
              terstruktur.
            </li>
            <li>
              <strong>esbuild:</strong> Untuk proses bundling yang cepat dan
              ringan.
            </li>
          </ul>
        </section>

        <!-- Ajakan untuk Bereksperimen -->
        <section class="text-center mt-12">
          <h2 class="text-2xl font-inter font-bold text-blue-600 mb-4">
            Coba Sendiri!
          </h2>
          <p class="text-gray-700 font-roboto text-lg">
            Jadikan pengalaman Anda dalam membangun aplikasi IoT lebih seru
            dengan teknologi modern ini. Ayo mulai bereksperimen dan ciptakan
            inovasi Anda! 🚀
          </p>
        </section>
      </main>
      <app-footer></app-footer>
    `;
  }
}
