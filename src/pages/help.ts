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
    return this; // ✅ Gunakan Light DOM agar Tailwind bekerja
  }

  @state()
  private helpTopics = [
    {
      title: 'Cara Menggunakan Aplikasi',
      description:
        'Panduan langkah demi langkah untuk menggunakan aplikasi ini.',
      content: `
      <p>Aplikasi ini dirancang untuk mempermudah pengguna dalam mengelola perangkat IoT.</p>
      <p>Berikut adalah langkah-langkah penggunaan aplikasi:</p>

      <ol class="list-decimal pl-5 mt-4 space-y-2">
        <li><strong>Login</strong> dengan akun Anda.</li>
        <li><strong>Tambahkan perangkat baru</strong> melalui menu "Perangkat".</li>
        <li><strong>Pantau data sensor</strong> yang dikirim oleh perangkat.</li>
        <li><strong>Konfigurasikan notifikasi & alarm</strong> jika dibutuhkan.</li>
        <li><strong>Perbarui firmware perangkat</strong> secara berkala untuk mendapatkan fitur terbaru.</li>
      </ol>

      <p class="mt-4">Jika mengalami kendala, silakan hubungi tim dukungan teknis kami.</p>
    `,
    },
    {
      title: 'Pengaturan Perangkat',
      description: 'Cara menambahkan dan mengonfigurasi perangkat Anda.',
      content: `
      <p>Untuk menghubungkan perangkat baru, ikuti langkah-langkah berikut:</p>

      <ul class="list-disc pl-5 mt-4 space-y-2">
        <li><strong>Pastikan perangkat menyala</strong> dan dalam mode pairing.</li>
        <li><strong>Buka aplikasi</strong> dan masuk ke bagian "Pengaturan > Perangkat".</li>
        <li><strong>Klik "Tambah Perangkat"</strong>, lalu ikuti petunjuk yang muncul.</li>
        <li><strong>Masukkan informasi perangkat</strong>, seperti nama dan tipe sensor.</li>
        <li><strong>Simpan konfigurasi</strong> dan cek apakah perangkat muncul di dashboard.</li>
      </ul>

      <p class="mt-4">Jika koneksi gagal, pastikan perangkat berada dalam jangkauan WiFi.</p>
    `,
    },
  ];

  connectedCallback() {
    super.connectedCallback();

    // Cek apakah user login dan memiliki akses
    if (!AuthService.isAuthenticated()) {
      window.location.href = '#/auth/login';
    }
  }

  private _showModal(content: string) {
    console.log('🟢 Membuka modal dengan konten:', content);

    const modalDialog = this.renderRoot?.querySelector(
      'modal-dialog'
    ) as HTMLElement & {
      isOpen: boolean;
      setContent: (content: HTMLElement) => void;
    };

    if (modalDialog) {
      modalDialog.isOpen = true;

      const contentElement = document.createElement('div');
      contentElement.innerHTML = `<p class="text-gray-700 text-lg">${content}</p>`;

      modalDialog.setContent(contentElement);
    }
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="p-8 my-14 bg-gradient-to-tr from-blue-50 to-green-300 min-h-screen"
      >
        <h1 class="text-3xl font-extrabold text-blue-700">Help & Support</h1>
        <p class="text-gray-700 text-lg">
          Butuh bantuan? Berikut adalah sumber daya yang dapat membantu Anda:
        </p>

        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${this.helpTopics.map(
            (topic) => html`
              <card-component
                class="cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105"
                .data=${{
                  title: topic.title,
                  description: topic.description,
                }}
                @click=${() => this._showModal(topic.content)}
              ></card-component>
            `
          )}
        </div>

        <!-- Komponen modal -->
        <modal-dialog></modal-dialog>
      </main>
      <app-footer></app-footer>
    `;
  }
}
