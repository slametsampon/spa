import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * @class FooterComponent
 * @description Komponen Footer untuk SPA
 * @extends {LitElement}
 */
@customElement('app-footer')
export class FooterComponent extends LitElement {
  /**
   * @override
   * @description Nonaktifkan Shadow DOM agar Tailwind bekerja
   * @returns {this} Menggunakan Light DOM
   */
  createRenderRoot() {
    return this;
  }

  /**
   * @override
   * @description Lifecycle saat elemen terhubung ke DOM
   */
  connectedCallback() {
    super.connectedCallback();
    console.log('<app-footer> connected');
  }

  /**
   * @override
   * @description Lifecycle saat elemen dilepas dari DOM
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('<app-footer> disconnected');
  }

  /**
   * @override
   * @description Render tampilan footer
   * @returns {import("lit").TemplateResult} Template hasil render
   */
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
