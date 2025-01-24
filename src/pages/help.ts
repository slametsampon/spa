import { LitElement, html } from 'lit';
import '../components/header.ts';
import '../components/footer.ts';

export class HelpPage extends LitElement {
  // Nonaktifkan Shadow DOM untuk memungkinkan Tailwind bekerja
  createRenderRoot() {
    return this; // Menggunakan Light DOM
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('<page-help> connected');
  }

  render() {
    return html`
      <app-header></app-header>
      <main class="px-8 my-20">
        <!-- Judul Halaman -->
        <section class="mb-8">
          <h1 class="text-4xl font-extrabold text-blue-600 mb-4">
            Help & Support
          </h1>
          <p class="text-gray-700 text-lg leading-relaxed">
            Butuh bantuan? Berikut adalah sumber daya yang dapat membantu Anda:
          </p>
        </section>

        <!-- Daftar Sumber Daya -->
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Sumber Daya</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <a
                href="https://github.com/slametsampon/spa/wiki"
                target="_blank"
                class="text-blue-600 hover:underline"
                >Dokumentasi Resmi</a
              >
            </li>
            <li>
              <a
                href="mailto:support@spa.com"
                class="text-blue-600 hover:underline"
                >Email Dukungan</a
              >
            </li>
            <li>
              <a href="/faq" class="text-blue-600 hover:underline"
                >Pertanyaan yang Sering Diajukan (FAQ)</a
              >
            </li>
          </ul>
        </section>

        <!-- Ajakan untuk Hubungi Kami -->
        <section class="mt-12 text-center">
          <h2 class="text-2xl font-bold text-blue-600 mb-4">
            Masih Memiliki Pertanyaan?
          </h2>
          <p class="text-gray-700 text-lg">
            Jangan ragu untuk menghubungi kami! Kami siap membantu Anda.
          </p>
          <a
            href="mailto:support@spa.com"
            class="inline-block mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Hubungi Dukungan
          </a>
        </section>
      </main>
      <app-footer></app-footer>
    `;
  }
}

customElements.define('page-help', HelpPage);
