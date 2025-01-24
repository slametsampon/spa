import { LitElement, html, css } from 'lit';

export class AboutPage extends LitElement {
  static styles = css`
    main {
      @apply p-8;
    }
  `;

  render() {
    return html`
      <app-header></app-header>
      <main>
        <h1>About spa (Single Page Aplication)</h1>
        <p>This application is powered by ESP32-C3.</p>
      </main>
      <app-footer></app-footer>
    `;
  }
}
customElements.define('page-about', AboutPage);
