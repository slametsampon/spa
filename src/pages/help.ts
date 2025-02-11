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
        Sebelum memulai pengembangan, kita perlu menyiapkan proyek dengan struktur yang jelas. 
        Langkah ini penting agar kode tetap terorganisir dan dapat dikembangkan dengan mudah. 
        Kita akan menggunakan Node.js, npm, dan beberapa dependensi utama untuk membangun SPA ini.
      `,
      content: `
        <p>Untuk memulai proyek, lakukan langkah-langkah berikut:</p>
        <h3 class="text-lg font-semibold mt-4">1️⃣ Clone Repository</h3>
        <pre class="bg-gray-100 p-3 rounded">git clone https://github.com/username/spa-project.git</pre>
        <h3 class="text-lg font-semibold mt-4">2️⃣ Masuk ke Folder Project</h3>
        <pre class="bg-gray-100 p-3 rounded">cd spa-project</pre>
        <h3 class="text-lg font-semibold mt-4">3️⃣ Install Dependencies</h3>
        <pre class="bg-gray-100 p-3 rounded">npm install</pre>
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
      title: 'Tahap Development',
      description: `
        Tahap pengembangan dilakukan untuk memastikan aplikasi berjalan dengan baik sebelum deployment. 
        Kita akan menggunakan esbuild sebagai bundler dan live-server untuk melihat perubahan secara langsung.
      `,
      content: `
        <p>Dalam tahap development, kita perlu menjalankan aplikasi di lingkungan lokal sebelum siap dipublikasikan.</p>
        <h3 class="text-lg font-semibold mt-4">1️⃣ Jalankan Mode Development</h3>
        <pre class="bg-gray-100 p-3 rounded">npm run dev</pre>
        <h3 class="text-lg font-semibold mt-4">2️⃣ Menjalankan Tailwind & Build Bersamaan</h3>
        <pre class="bg-gray-100 p-3 rounded">npm run dev:full</pre>
      `,
    },
    {
      title: 'Deployment ke GitHub Pages',
      description: `
        GitHub Pages memungkinkan kita untuk menghosting SPA secara gratis. 
        Dengan memanfaatkan gh-pages, kita dapat membangun aplikasi dalam mode pre-release 
        dan mengunggahnya ke GitHub untuk diakses oleh publik.
      `,
      content: `
        <p>Untuk mempublikasikan aplikasi ke GitHub Pages:</p>
        <h3 class="text-lg font-semibold mt-4">1️⃣ Build dalam Mode Pre-Release</h3>
        <pre class="bg-gray-100 p-3 rounded">npm run pre-release</pre>
        <h3 class="text-lg font-semibold mt-4">2️⃣ Deploy ke GitHub Pages</h3>
        <pre class="bg-gray-100 p-3 rounded">npm run deploy:github</pre>
      `,
    },
    {
      title: 'Deployment ke ESP32-C3',
      description: `
        ESP32-C3 digunakan untuk menyimpan SPA agar bisa diakses tanpa koneksi internet. 
        Dengan memanfaatkan fitur penyimpanan file, kita bisa meng-hosting aplikasi ini langsung dari perangkat IoT. 
        Kita akan menginstal dependensi, membangun aplikasi, dan mengunggahnya ke ESP32-C3.
      `,
      content: `
        <p>Untuk menyiapkan ESP32-C3 agar bisa digunakan untuk hosting SPA:</p>
        <h3 class="text-lg font-semibold mt-4">1️⃣ Install Dependencies</h3>
        <pre class="bg-gray-100 p-3 rounded">npm install</pre>
        <h3 class="text-lg font-semibold mt-4">2️⃣ Build untuk ESP32</h3>
        <pre class="bg-gray-100 p-3 rounded">npm run build:production</pre>
        <h3 class="text-lg font-semibold mt-4">3️⃣ Upload ke ESP32</h3>
        <pre class="bg-gray-100 p-3 rounded">npm run upload:esp32</pre>
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

        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          ${this.helpTopics.map(
            (topic) => html`
              <card-component
                class="cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105"
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
