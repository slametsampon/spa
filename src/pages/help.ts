import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/navbar.ts';
import '../components/footer.ts';
import '../components/modal-dialog.js';

@customElement('page-help')
export class HelpPage extends LitElement {
  // Nonaktifkan Shadow DOM untuk memungkinkan Tailwind bekerja
  createRenderRoot() {
    return this; // Menggunakan Light DOM
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('<page-help> connected');
  }

  /**
   * Membuka modal dengan mengatur properti `open` pada elemen `modal-dialog`.
   * @private
   */
  private _showModal() {
    const modal = this.querySelector('modal-dialog') as HTMLElement & {
      isOpen: boolean;
    };
    if (modal) {
      modal.isOpen = true;
      console.log('✅ Modal dibuka, isOpen =', modal.isOpen);

      setTimeout(() => {
        console.log(
          '🔍 Debugging setelah perubahan:',
          modal,
          'display:',
          getComputedStyle(modal).display
        );
      }, 100);
    } else {
      console.error('❌ Modal tidak ditemukan!');
    }
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="p-8 my-14 bg-gradient-to-tr from-blue-50 to-green-300 min-h-full relative"
      >
        <!-- Judul Halaman -->
        <section class="mb-8">
          <h1 class="text-3xl font-inter font-extrabold text-blue-700 mb-4">
            Help & Support
          </h1>
          <p class="text-gray-700 font-roboto text-lg leading-relaxed">
            Butuh bantuan? Berikut adalah sumber daya yang dapat membantu Anda:
          </p>
        </section>

        <!-- Daftar Sumber Daya -->
        <section class="mb-8">
          <h2 class="text-2xl font-inter font-bold text-gray-800 mb-4">
            Sumber Daya
          </h2>
          <ul class="list-disc font-roboto list-inside space-y-2 text-gray-700">
            <li>
              <a
                href="https://github.com/slametsampon/spa/wiki"
                target="_blank"
                class="text-blue-800 font-semibold hover:underline"
              >
                Dokumentasi Resmi
              </a>
            </li>
            <li>
              <a
                href="mailto:support@spa.com"
                class="text-blue-800 font-semibold hover:underline"
              >
                Email Dukungan
              </a>
            </li>
            <li>
              <a
                href="/faq"
                class="text-blue-800 font-semibold hover:underline"
              >
                Pertanyaan yang Sering Diajukan (FAQ)
              </a>
            </li>
          </ul>
        </section>

        <!-- Ajakan untuk Hubungi Kami -->
        <section class="mt-12 text-center">
          <h2 class="text-2xl font-inter font-bold text-blue-700 mb-4">
            Masih Memiliki Pertanyaan?
          </h2>
          <p class="text-gray-700 font-roboto text-lg">
            Jangan ragu untuk menghubungi kami! Kami siap membantu Anda.
          </p>
          <button
            class="px-6 py-3 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            @click=${this._showModal}
          >
            Hubungi Dukungan
          </button>
        </section>

        <!-- Elemen modal -->
        <modal-dialog>
          <div class="bg-gray-100 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold">Dynamic Card Title</h3>
            <p class="text-gray-600">
              This is the content inside the modal card.
            </p>
          </div>
        </modal-dialog>
      </main>
      <app-footer></app-footer>
    `;
  }
}
