import { LitElement, html } from 'lit';

export class HelpPage extends LitElement {
  render() {
    return html`
      <app-header></app-header>
      <main class="p-8">
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
