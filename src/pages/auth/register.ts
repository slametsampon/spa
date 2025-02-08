import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CryptoJS from 'crypto-js';
import { StorageHelper } from '../../utils/storage-helper.js';
import users from '../../assets/data/users.js';
import '../../components/navbar.js';
import '../../components/footer.ts';
import '../../components/custom-input'; // ✅ Impor custom-input untuk digunakan di form

@customElement('register-page')
export class RegisterPage extends LitElement {
  @property({ type: String }) username = '';
  @property({ type: String }) password = '';
  @property({ type: String }) confirmPassword = '';
  @property({ type: String }) role = 'guest';
  @property({ type: String }) message = '';

  createRenderRoot() {
    return this;
  }

  private _register() {
    console.log("[register] Tombol 'Daftar' ditekan");

    if (!this.username) {
      this.message = '❌ Username wajib diisi!';
      this.requestUpdate();
      return;
    } else if (users.some((u) => u.username === this.username)) {
      this.message = '❌ Username sudah digunakan!';
      this.requestUpdate();
      return;
    }

    if (!this.password || this.password.length < 6) {
      this.message = '❌ Password minimal 6 karakter!';
      this.requestUpdate();
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.message = '❌ Password dan Konfirmasi Password tidak cocok!';
      this.requestUpdate();
      return;
    }

    console.log('[register] Validasi sukses, menyimpan data...');
    const passwordHash = CryptoJS.SHA256(this.password).toString();

    users.push({
      username: this.username,
      role: this.role,
      passwordHash,
    });

    StorageHelper.setItem('users', JSON.stringify(users));

    this.message = '✅ Registrasi berhasil! Mengalihkan ke login...';
    this.requestUpdate();

    console.log('[register] Registrasi sukses, akan dialihkan ke login...');
    setTimeout(() => (window.location.href = '#/auth/login'), 2000);
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="p-8 my-14 bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen flex flex-col items-center"
      >
        <div class="bg-white shadow-lg rounded-2xl p-8 w-96">
          <h1 class="text-4xl font-bold text-center text-green-600 mb-6">
            📝 Registrasi
          </h1>
          <p class="text-gray-700 text-center">
            Buat akun baru untuk mengakses sistem.
          </p>

          <!-- 🔹 Input Username -->
          <custom-input
            label="Username"
            type="text"
            .value="${this.username}"
            .onInput="${(e: InputEvent) =>
              (this.username = (e.target as HTMLInputElement).value.trim())}"
            required
            onlyAlphanumeric
          ></custom-input>

          <!-- 🔹 Input Password -->
          <custom-input
            label="Password"
            type="password"
            .value="${this.password}"
            .onInput="${(e: InputEvent) =>
              (this.password = (e.target as HTMLInputElement).value.trim())}"
            required
            minLength="6"
          ></custom-input>

          <!-- 🔹 Input Konfirmasi Password -->
          <custom-input
            label="Konfirmasi Password"
            type="password"
            .value="${this.confirmPassword}"
            .onInput="${(e: InputEvent) =>
              (this.confirmPassword = (
                e.target as HTMLInputElement
              ).value.trim())}"
            required
          ></custom-input>

          <!-- 🔹 Pilihan Role -->
          <label class="block text-gray-700 font-semibold mt-3">Role</label>
          <select
            class="border-2 rounded-xl w-full p-3 text-gray-700 focus:outline-none focus:ring-4 focus:ring-green-300 bg-gray-100 shadow-inner"
            name="role"
            @change="${(e: Event) =>
              (this.role = (e.target as HTMLSelectElement).value)}"
          >
            <option value="guest">Guest</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <!-- 🔹 Tombol Register -->
          <button
            class="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-xl text-lg font-semibold transition-transform transform hover:scale-105 shadow-md"
            @click="${this._register}"
          >
            ✅ Daftar
          </button>

          <!-- 🔹 Pesan Notifikasi -->
          <p class="mt-4 text-red-500 text-center">${this.message}</p>
        </div>
      </main>
      <app-footer></app-footer>
    `;
  }
}
