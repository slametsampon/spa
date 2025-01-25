import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

/**
 * HeaderComponent is a custom web component that represents a fixed navigation bar.
 * It provides links to Home, About, and Help pages.
 *
 * @element app-header
 */
@customElement('app-header')
export class HeaderComponent extends LitElement {
  /**
   * Array of navigation links to display in the header.
   * Each link is an object with the following properties:
   * - `label`: The text to display for the link.
   * - `href`: The URL the link navigates to.
   *
   * @type {{label: string, href: string}[]}
   */
  @property({ type: Array })
  navLinks = [
    { label: 'Home', href: '#/' },
    { label: 'About', href: '#/about' },
    { label: 'Help', href: '#/help' },
  ];

  /**
   * Overrides LitElement's shadow DOM to use Light DOM.
   * This ensures Tailwind CSS classes are applied correctly.
   *
   * @returns {HTMLElement} Light DOM render root.
   */
  createRenderRoot() {
    return this; // Use Light DOM
  }

  /**
   * Lifecycle method called when the component is connected to the DOM.
   * Logs a message to the console.
   */
  connectedCallback() {
    super.connectedCallback();
    console.log('<app-header> connected');
  }

  /**
   * Lifecycle method called when the component is disconnected from the DOM.
   * Logs a message to the console.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('<app-header> disconnected');
  }

  /**
   * Renders the template for the header component.
   * Loops through the `navLinks` property to generate navigation links dynamically.
   *
   * @returns {import('lit').TemplateResult} The template for the header.
   */
  render() {
    return html`
      <nav
        class="bg-blue-600 text-white p-4 flex gap-4 fixed top-0 left-0 w-full shadow-lg z-50"
      >
        ${this.navLinks.map(
          (link) => html`
            <a
              href="${link.href}"
              class="hover:underline hover:text-orange-300 transition-colors duration-200"
            >
              ${link.label}
            </a>
          `
        )}
      </nav>
    `;
  }
}
