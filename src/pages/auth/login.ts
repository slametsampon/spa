import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AuthService } from '../../utils/auth-service.js';
import '../../components/custom-input';

@customElement('login-page')
export class LoginPage extends LitElement {
  @property({ type: String }) username = '';
  @property({ type: String }) password = '';

  createRenderRoot() {
    return this; // Menggunakan Light DOM agar Tailwind bisa bekerja
  }

  private async _login() {
    console.log('[login] Tombol "Login" ditekan');

    if (!this.username || !this.password) {
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
      this.password = '';
    }
  }

  render() {
    return html`
      <div
        class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        <div class="bg-white shadow-lg rounded-2xl p-8 w-96">
          <h1 class="text-4xl font-bold text-center text-blue-600 mb-6">
            🔥 Login
          </h1>

          <custom-input
            label="Username"
            type="text"
            .value="${this.username}"
            .onInput="${(e: InputEvent) =>
              (this.username = (e.target as HTMLInputElement).value.trim())}"
            required
            onlyAlphanumeric
          ></custom-input>

          <custom-input
            label="Password"
            type="password"
            .value="${this.password}"
            .onInput="${(e: InputEvent) =>
              (this.password = (e.target as HTMLInputElement).value.trim())}"
            required
            minLength="6"
          ></custom-input>

          <button
            class="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl text-lg font-semibold transition-transform transform hover:scale-105 shadow-md"
            @click="${this._login}"
          >
            🚀 Login
          </button>

          <p class="mt-6 text-gray-700 text-center">
            Belum punya akun?
            <a
              href="#/auth/register"
              class="text-blue-500 font-semibold hover:underline"
              >Daftar di sini</a
            >.
          </p>
        </div>
      </div>
    `;
  }
}
