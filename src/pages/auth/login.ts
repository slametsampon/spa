import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AuthService } from '../../utils/auth-service.js';

@customElement('login-page')
export class LoginPage extends LitElement {
  private username = '';
  private password = '';

  createRenderRoot() {
    return this; // Menggunakan Light DOM agar Tailwind bisa bekerja
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
   * @description Menangani proses login setelah validasi.
   */
  async login() {
    console.log('[login] Tombol "Login" ditekan');

    let isValid = true;

    // 🔹 Reset pesan error sebelumnya
    this.showErrorMessage('usernameError', '');
    this.showErrorMessage('passwordError', '');

    // 🔹 Validasi username
    if (!this.username) {
      this.showErrorMessage('usernameError', '❌ Username wajib diisi!');
      isValid = false;
    }

    // 🔹 Validasi password
    if (!this.password) {
      this.showErrorMessage('passwordError', '❌ Password wajib diisi!');
      isValid = false;
    }

    if (!isValid) {
      console.log('[login] Validasi gagal, login dihentikan.');
      return;
    }

    console.log('[login] Validasi sukses, memproses login...');

    const success = await AuthService.login(this.username, this.password);
    if (success) {
      console.log('[login] Login berhasil, mengarahkan ke dashboard...');
      window.location.href = '#/dashboard';
    } else {
      console.log('[login] Login gagal, menampilkan pesan kesalahan.');
      this.showErrorMessage(
        'passwordError',
        '❌ Username atau Password salah!'
      );
    }
  }

  render() {
    return html`
      <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-3xl font-bold text-blue-600 mb-4">Login</h1>

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
          placeholder="Password"
          @input=${this.handleInput}
        />
        <p id="passwordError" class="text-red-500 text-sm"></p>

        <!-- 🔹 Tombol Login -->
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          @click=${this.login}
        >
          Login
        </button>

        <!-- 🔹 Link ke Registrasi -->
        <p class="mt-4 text-gray-700">
          Belum punya akun?
          <a href="#/auth/register" class="text-blue-500 underline"
            >Daftar di sini</a
          >.
        </p>
      </div>
    `;
  }
}
