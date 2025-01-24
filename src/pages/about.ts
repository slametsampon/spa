import { LitElement, html } from 'lit';
import '../components/header.ts';
import '../components/footer.ts';

export class AboutPage extends LitElement {
  // Nonaktifkan Shadow DOM untuk memungkinkan Tailwind bekerja
  createRenderRoot() {
    return this; // Menggunakan Light DOM
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('<page-about> connected');
  }
  render() {
    return html`
      <app-header></app-header>
      <main class="p-8">
        <h1 class="text-2xl font-bold mb-4">
          About spa (Single Page Aplication)
        </h1>
        <p>This application is powered by ESP32-C3.</p>
      </main>
      <app-footer></app-footer>
    `;
  }
}
customElements.define('page-about', AboutPage);
