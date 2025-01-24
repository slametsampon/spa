import { LitElement, html } from 'lit';
import '../components/header.ts';
import '../components/footer.ts';

export class HomePage extends LitElement {
  // Nonaktifkan Shadow DOM untuk memungkinkan Tailwind bekerja
  createRenderRoot() {
    return this; // Menggunakan Light DOM
  }
  connectedCallback() {
    super.connectedCallback();
    console.log('<page-home> connected');
  }
  render() {
    return html`
      <app-header></app-header>
      <main class="p-8">
        <h1 class="text-2xl font-bold mb-4">
          Welcome to SPA (Single Page Application)
        </h1>
        <p class="text-gray-700">This is the home page.</p>
      </main>
      <app-footer></app-footer>
    `;
  }
}

customElements.define('page-home', HomePage);
