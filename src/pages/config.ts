import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AuthService } from '../utils/auth-service.js';
import '../components/navbar.js';
import '../components/footer.js';
import '../components/dynamic-config-form.js';

/**
 * @customElement page-config
 * @description Halaman konfigurasi perangkat, hanya dapat diakses oleh pengguna dengan role "admin" yang memiliki izin "CRUD".
 */
@customElement('page-config')
export class ConfigPage extends LitElement {
  public username: string = '';
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
   * Mengecek autentikasi dan memastikan hanya pengguna dengan role "admin" yang memiliki izin "CRUD" yang bisa mengakses halaman ini.
   */
  connectedCallback() {
    super.connectedCallback();

    // Cek apakah pengguna sudah login
    if (!AuthService.isAuthenticated()) {
      window.location.href = '#/auth/login';
      return;
    }

    // Cek apakah user memiliki salah satu izin: "CRUD" atau "Update"
    if (!AuthService.isAuthorized(['ManageDevices'])) {
      console.log('[Auth] Akses ditolak!');
      return;
    }
  }

  /**
   * @override
   * @description Render tampilan halaman konfigurasi.
   * @returns {import("lit").TemplateResult}
   */
  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="p-8 my-14 bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen"
      >
        <h1 class="text-3xl font-extrabold text-blue-700">
          ⚙️ Konfigurasi Perangkat
        </h1>

        <!-- Komponen Form Konfigurasi -->
        <section class="mt-6">
          <dynamic-config-form></dynamic-config-form>
        </section>
      </main>
      <app-footer></app-footer>
    `;
  }
}
