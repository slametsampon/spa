import { LitElement, html } from 'lit';

export class FooterComponent extends LitElement {
  // Nonaktifkan Shadow DOM untuk memungkinkan Tailwind bekerja
  createRenderRoot() {
    return this; // Menggunakan Light DOM
  }

  // Lifecycle untuk debugging
  connectedCallback() {
    super.connectedCallback();
    console.log('<app-footer> connected');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('<app-footer> disconnected');
  }

  render() {
    return html`
      <footer
        class="bg-gray-800 text-white text-center p-4 bottom-0 fixed min-w-full"
      >
        <p>&copy; 2025 SPA (Single Page Application)</p>
      </footer>
    `;
  }
}

customElements.define('app-footer', FooterComponent);
