import { LitElement, html } from 'lit';
import '../components/header.ts';
import '../components/footer.ts';

export class HelpPage extends LitElement {
  // Nonaktifkan Shadow DOM untuk memungkinkan Tailwind bekerja
  createRenderRoot() {
    return this; // Menggunakan Light DOM
  }
  connectedCallback() {
    super.connectedCallback();
    console.log('<page-help> connected');
  }
  render() {
    return html`
      <app-header></app-header>
      <main class="p-8 h-full">
        <h1 class="text-2xl font-bold mb-4">Help & Support</h1>
        <p class="mb-2">
          If you need assistance, refer to the following resources:
        </p>
        <ul>
          <li>
            <a href="https://github.com/slametsampon/spa/wiki" target="_blank"
              >Documentation</a
            >
          </li>
          <li><a href="mailto:support@spa.com">Email Support</a></li>
          <li><a href="/faq">Frequently Asked Questions (FAQ)</a></li>
        </ul>
      </main>
      <app-footer></app-footer>
    `;
  }
}
customElements.define('page-help', HelpPage);
