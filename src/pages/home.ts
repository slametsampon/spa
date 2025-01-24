import { LitElement, html, css } from 'lit';

export class HomePage extends LitElement {
  static styles = css`
    main {
      @apply p-8;
    }
  `;

  render() {
    return html`
      <app-header></app-header>
      <main>
        <h1>Welcome to spa (Single Page Aplication)</h1>
        <p>This is the home page.</p>
      </main>
      <app-footer></app-footer>
    `;
  }
}
customElements.define('page-home', HomePage);
