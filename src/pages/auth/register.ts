import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CryptoJS from 'crypto-js';
import { StorageHelper } from '../../utils/storage-helper.js';
import users from '../../assets/data/users.js';
import '../../components/navbar.js';
import '../../components/footer.ts';

/**
 * @customElement register-page
 * @description Halaman pendaftaran pengguna baru.
 */
@customElement('register-page')
export class RegisterPage extends LitElement {
  public username = '';
  public password = '';
  public confirmPassword = '';
  public role = 'guest';
  public message = '';

  createRenderRoot() {
    return this;
  }

  /**
   * @description Menangani input pengguna dan mengupdate nilai.
   * @param {Event} event - Event dari input field.
   */
  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    (this as any)[target.name] = target.value.trim();

    // 🔹 Hapus pesan error saat user mulai mengetik ulang
    document.getElementById(`${target.name}Error`)!.innerText = '';
  }

  /**
   * @description Menampilkan error langsung di layar.
   */
  showErrorMessage(id: string, message: string) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
      errorElement.innerText = message;
    }
  }

  /**
   * @description Menyimpan pengguna baru ke dalam localStorage setelah validasi sukses.
   */
  register() {
    console.log("[register] Tombol 'Daftar' ditekan");

    let isValid = true;

    // 🔹 Reset pesan error sebelumnya
    this.showErrorMessage('usernameError', '');
    this.showErrorMessage('passwordError', '');
    this.showErrorMessage('confirmPasswordError', '');

    // 🔹 Validasi username
    if (!this.username) {
      this.showErrorMessage('usernameError', '❌ Username wajib diisi!');
      isValid = false;
    } else if (users.some((u) => u.username === this.username)) {
      this.showErrorMessage('usernameError', '❌ Username sudah digunakan!');
      isValid = false;
    }

    // 🔹 Validasi password
    if (!this.password) {
      this.showErrorMessage('passwordError', '❌ Password wajib diisi!');
      isValid = false;
    } else if (this.password.length < 6) {
      this.showErrorMessage('passwordError', '❌ Password minimal 6 karakter!');
      isValid = false;
    }

    // 🔹 Validasi konfirmasi password
    if (!this.confirmPassword) {
      this.showErrorMessage(
        'confirmPasswordError',
        '❌ Konfirmasi password wajib diisi!'
      );
      isValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.showErrorMessage(
        'confirmPasswordError',
        '❌ Password dan Konfirmasi Password tidak cocok!'
      );
      isValid = false;
    }

    if (!isValid) {
      console.log('[register] Validasi gagal, registrasi dihentikan.');
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
        class="p-8 my-14 bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen"
      >
        <h1 class="text-3xl font-extrabold text-blue-700">Registrasi</h1>
        <p class="text-gray-700">Buat akun baru untuk mengakses sistem.</p>

        <div class="mt-6">
          <!-- 🔹 Input Username -->
          <input
            class="border p-2 rounded w-64 mb-2"
            type="text"
            name="username"
            placeholder="Username"
            @input=${this.handleInput}
          />
          <p id="usernameError" class="text-red-500 text-sm"></p>

          <!-- 🔹 Input Password -->
          <input
            class="border p-2 rounded w-64 mb-2"
            type="password"
            name="password"
            placeholder="Password (min. 6 karakter)"
            @input=${this.handleInput}
          />
          <p id="passwordError" class="text-red-500 text-sm"></p>

          <!-- 🔹 Input Konfirmasi Password -->
          <input
            class="border p-2 rounded w-64 mb-2"
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            @input=${this.handleInput}
          />
          <p id="confirmPasswordError" class="text-red-500 text-sm"></p>

          <!-- 🔹 Pilihan Role -->
          <select
            class="border p-2 rounded w-64 mb-2"
            name="role"
            @change=${this.handleInput}
          >
            <option value="guest">Guest</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <!-- 🔹 Tombol Register -->
          <button
            class="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600"
            @click=${this.register}
          >
            Daftar
          </button>
        </div>

        <!-- 🔹 Pesan Notifikasi -->
        <p class="mt-4 text-red-500">${this.message}</p>
      </main>
      <app-footer></app-footer>
    `;
  }
}
