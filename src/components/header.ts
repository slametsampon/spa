import { LitElement, html } from 'lit';

export class HeaderComponent extends LitElement {
  // Nonaktifkan Shadow DOM
  createRenderRoot() {
    return this; // Menggunakan Light DOM
  }
  connectedCallback() {
    super.connectedCallback();
    console.log('<app-header> connected');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('<app-header> disconnected');
  }

  // Template HTML
  render() {
    return html`
      <nav class="bg-blue-600 text-white p-4 flex gap-4">
        <a href="#/" class="hover:underline">Home</a>
        <a href="#/about" class="hover:underline">About</a>
        <a href="#/help" class="hover:underline">Help</a>
      </nav>
    `;
  }
}

// Mendefinisikan elemen custom
customElements.define('app-header', HeaderComponent);
