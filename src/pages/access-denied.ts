import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('access-denied')
export class AccessDenied extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="p-4 text-center text-red-500">
        <h1 class="text-2xl font-bold">Akses Ditolak ❌</h1>
        <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        <a href="#/" class="text-blue-500 underline">Kembali ke Home</a>
      </div>
    `;
  }
}
