import { LitElement, html, css } from 'lit';

export class FooterComponent extends LitElement {
  render() {
    return html`
      <footer class="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 spa (Single Page Aplication)</p>
      </footer>
    `;
  }
}
customElements.define('app-footer', FooterComponent);
