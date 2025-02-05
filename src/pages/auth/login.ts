import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AuthService } from '../../utils/auth-service.ts';

@customElement('login-page')
export class LoginPage extends LitElement {
  @state() private username = '';
  @state() private password = '';

  createRenderRoot() {
    return this; // Menggunakan Light DOM agar Tailwind bisa bekerja
  }

  render() {
    return html`
      <div class="flex flex-col items-center justify-center h-screen">
        <input
          class="border p-2 rounded w-64 mb-2"
          type="text"
          placeholder="Username"
          @input=${(e: any) => (this.username = e.target.value)}
        />
        <input
          class="border p-2 rounded w-64 mb-2"
          type="password"
          placeholder="Password"
          @input=${(e: any) => (this.password = e.target.value)}
        />
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          @click=${this.login}
        >
          Login
        </button>
      </div>
    `;
  }

  async login() {
    const success = await AuthService.login(this.username, this.password);
    if (success) {
      window.location.href = '/dashboard';
    } else {
      alert('Login gagal!');
    }
  }
}
