import { LitElement, html } from 'lit';
import '../components/header.ts';
import '../components/footer.ts';

export class AboutPage extends LitElement {
  // Nonaktifkan Shadow DOM untuk memungkinkan Tailwind bekerja
  createRenderRoot() {
    return this; // Menggunakan Light DOM
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('<page-about> connected');
  }

  render() {
    return html`
      <app-header></app-header>
      <main class="px-8 my-20">
        <!-- Tentang SPA dan IoT -->
        <section class="mb-8">
          <h1 class="text-4xl font-extrabold text-blue-600 mb-4">
            Tentang SPA (Single Page Application)
          </h1>
          <p class="text-gray-700 text-lg leading-relaxed">
            Aplikasi ini didukung oleh <strong>ESP32-C3</strong>, sebuah
            perangkat IoT modern yang memungkinkan pengembangan antarmuka web
            cepat, responsif, dan efisien melalui pendekatan
            <strong>Single Page Application (SPA)</strong>.
          </p>
        </section>

        <!-- Manfaat SPA -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Mengapa Memilih SPA?
          </h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
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
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
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
          <h2 class="text-2xl font-bold text-blue-600 mb-4">Coba Sendiri!</h2>
          <p class="text-gray-700 text-lg">
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

customElements.define('page-about', AboutPage);
