import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

/**
 * Navbar component for the application
 *
 * @element app-navbar
 * @property {Array} routes - Array of route objects containing `path` and `label` for navigation links.
 */
@customElement('app-navbar')
export class Navbar extends LitElement {
  /**
   * Array of route objects for navigation links.
   * Each object contains:
   * - `path`: The relative path of the route.
   * - `label`: The display name of the route.
   * @type {Array<{path: string, label: string}>}
   */
  @property({ type: Array }) routes = [
    { path: '#/about', label: 'About' },
    { path: '#/help', label: 'Help' },
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
   * Lifecycle method triggered when the component is added to the DOM.
   * Sets the logged-in state and user information based on local storage.
   */
  connectedCallback() {
    super.connectedCallback();
    console.log('<app-navbar> connected');
  }

  /**
   * Lifecycle method called when the component is disconnected from the DOM.
   * Logs a message to the console.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('<app-navbar> disconnected');
  }
  /**
   * Lifecycle method triggered after the first render.
   * Adds event listeners to control the navbar interactions.
   */
  firstUpdated() {
    this.navbarControl();
  }

  /**
   * Controls the behavior of the navigation menu.
   * - Toggles the menu visibility when the hamburger button is clicked.
   * - Closes the menu when a navigation link is clicked.
   */
  navbarControl() {
    // Select the hamburger button and menu container
    const menuToggle = this.renderRoot.querySelector(
      '#menu-toggle'
    ) as HTMLElement;
    const menu = this.renderRoot.querySelector('#menu') as HTMLElement;

    // Check if elements exist to avoid errors
    if (!menuToggle || !menu) return;

    // Add click listener to toggle menu visibility
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    // Add click listeners to close menu when a link is clicked
    menu.querySelectorAll('a').forEach((item) => {
      item.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });

    const userMenuLogout = this.renderRoot.querySelector('#user-menu-logout');
    const userMenuLogoutButton = this.renderRoot.querySelector(
      '#user-menu-logout-button'
    );
    // Check if elements exist to avoid errors
    if (!userMenuLogout || !userMenuLogoutButton) return;

    userMenuLogoutButton.addEventListener('click', () => {
      userMenuLogout.classList.toggle('hidden');
    });
  }

  /**
   * Renders the navbar component.
   * @returns {TemplateResult} The template for the navbar.
   */
  render() {
    return html`
      <nav
        class="container px-3 mx-auto flex justify-between items-center bg-blue-600 text-white shadow-md fixed top-0 left-0 min-w-full z-10"
      >
        <!-- Logo -->
        <a href="#/" class="flex flex-row py-1">
          <img
            src="./assets/logo-spa-88x50.webp"
            alt="SPA-Logo"
            class="rounded-xl h-[50px]"
          />
          <p class="sm:hidden px-2 mt-5 text-xl font-thin">
            <span class="font-bold text-orange-600 italic">S</span>ingle
            <span class="font-bold text-orange-600 italic">P</span>age
            <span class="font-bold text-orange-600 italic">A</span>pplication
          </p>
        </a>
        <div class="flex flex-row items-center">
          <div class="relative">
            <!-- Hamburger Button -->
            <button
              id="menu-toggle"
              class="text-gray-800 sm:hidden mt-3 mr-3 focus:outline-none"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <!-- Menu -->
            <ul
              id="menu"
              class="hidden mr-2 px-3 space-y-2 py-3 flex-col text-blue-600 bg-green-100 absolute top-11 right-0 sm:bg-blue-600 sm:text-white rounded-md sm:static sm:flex sm:flex-row sm:space-y-0 sm:space-x-8 sm:min-w-fit sm:mr-6 min-w-max"
            >
              ${this.routes.map(
                (route) => html`
                  <li>
                    <a href="${route.path}" class="hover:text-orange-600"
                      >${route.label}</a
                    >
                  </li>
                `
              )}
            </ul>
          </div>
          <!-- User Section -->
          <div class="relative">
            <button
              id="user-menu-logout-button"
              class="flex items-center space-x-2 focus:outline-none bg-orange-600 rounded-full font-bold"
            >
              <div
                class="bg-orange-600 w-10 h-10 rounded-full flex justify-center items-center text-white font-bold uppercase italic underline"
              >
                U
              </div>
            </button>
            <div
              id="user-menu-logout"
              class="hidden absolute right-0 mt-2 w-30 bg-white text-gray-800 shadow-lg rounded-md"
            >
              <a
                href="pages/auth/login.html"
                class="block px-4 py-2 hover:bg-gray-200"
                >Login</a
              >
              <a
                href="pages/auth/register.html"
                class="block px-4 py-2 hover:bg-gray-200"
                >Register</a
              >
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}
