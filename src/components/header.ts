import { LitElement, html, css } from 'lit';

export class HeaderComponent extends LitElement {
  render() {
    return html`
      <nav class="bg-blue-600 text-white p-4">
        <a href="/" class="text-white mx-2 hover:underline">Home</a>
        <a href="/about" class="text-white mx-2 hover:underline">About</a>
        <a href="/help" class="text-white mx-2 hover:underline">Help</a>
      </nav>
    `;
  }
}
customElements.define('app-header', HeaderComponent);
