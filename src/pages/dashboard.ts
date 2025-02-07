import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AuthService } from '../utils/auth-service.js';
import { StorageHelper } from '../utils/storage-helper.js';
import '../components/navbar.js';
import '../components/footer.js';

/**
 * @customElement page-dashboard
 * @description Halaman dashboard yang hanya bisa diakses oleh pengguna yang sudah login.
 */
@customElement('page-dashboard')
export class DashboardPage extends LitElement {
  // @state()
  public username: string = '';
  // @state()
  public role: string = '';

  /**
   * @override
   * @description Gunakan Light DOM agar kompatibel dengan Tailwind CSS.
   * @returns {this}
   */
  createRenderRoot() {
    return this;
  }

  /**
   * @override
   * @description Lifecycle saat elemen ditambahkan ke DOM.
   * Mengecek autentikasi dan mengambil informasi pengguna.
   */
  connectedCallback() {
    super.connectedCallback();

    // Cek apakah pengguna sudah login
    if (!AuthService.isAuthenticated()) {
      window.location.href = '#/auth/login';
    } else {
      // Ambil informasi pengguna dari localStorage
      this.username = StorageHelper.getItem('username') || 'Guest';
      this.role = StorageHelper.getItem('role') || 'guest';
    }
  }

  /**
   * @description Fungsi logout untuk menghapus token dan mengarahkan ke halaman login.
   */
  logout() {
    AuthService.logout();
    window.location.href = '#/auth/login';
  }

  /**
   * @description Menampilkan fitur berdasarkan role pengguna.
   * @returns {TemplateResult}
   */
  renderFeatures() {
    if (AuthService.hasPermission('CRUD')) {
      return html`<p class="text-green-600">
        ✅ Anda memiliki akses penuh ke sistem (Admin).
      </p>`;
    }
    if (AuthService.hasPermission('Update')) {
      return html`<p class="text-yellow-600">
        ⚠️ Anda bisa mengedit data (User).
      </p>`;
    }
    if (AuthService.hasPermission('Public')) {
      return html`<p class="text-gray-600">
        ℹ️ Anda hanya bisa melihat informasi publik (Guest).
      </p>`;
    }
    return html`<p class="text-red-600">❌ Role tidak dikenali.</p>`;
  }

  /**
   * @override
   * @description Render tampilan halaman dashboard.
   * @returns {import("lit").TemplateResult}
   */
  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="p-8 my-14 bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen"
      >
        <h1 class="text-3xl font-extrabold text-blue-700">Dashboard</h1>
        <p class="text-gray-700 text-lg">
          Selamat datang, <strong>${this.username}</strong>!
        </p>
        <p class="text-gray-700">Role Anda: <strong>${this.role}</strong></p>

        <!-- Fitur berdasarkan role -->
        <section class="mt-6">${this.renderFeatures()}</section>
      </main>
      <app-footer></app-footer>
    `;
  }
}
