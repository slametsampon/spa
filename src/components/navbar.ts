import { LitElement, html } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { AuthService } from '../utils/auth-service.js';
import { StorageHelper } from '../utils/storage-helper.js';

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
    { path: '#/dashboard', label: 'Dashboard' },
    { path: '#/config', label: 'Config' },
    { path: '#/about', label: 'About' },
    { path: '#/help', label: 'Help' },
  ];

  /**
   * @state
   * @description Menyimpan status login user.
   */
  @state() public isLoggedIn: boolean = false;

  /**
   * @state
   * @description Menyimpan nama pengguna yang login.
   */
  @state() public username: string = '';

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
    this.checkAuthStatus();
    console.log('<app-navbar> connected');
  }

  /**
   * Mengecek apakah pengguna sudah login dan memperbarui state.
   */
  checkAuthStatus() {
    this.isLoggedIn = AuthService.isAuthenticated();
    this.username = this.isLoggedIn
      ? StorageHelper.getItem('username') || ''
      : '';
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

  navbarControl() {
    // Select the hamburger button and menu container
    const menuToggle = this.renderRoot.querySelector(
      '#menu-toggle'
    ) as HTMLElement;
    const menu = this.renderRoot.querySelector('#menu') as HTMLElement;
    const userMenuLogout = this.renderRoot.querySelector('#user-menu-logout');
    const userMenuLogoutButton = this.renderRoot.querySelector(
      '#user-menu-logout-button'
    );

    // Check if elements exist to avoid errors
    if (!menuToggle || !menu || !userMenuLogout || !userMenuLogoutButton)
      return;

    // Toggle menu visibility on hamburger button click
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    // Close menu when a navigation link is clicked
    menu.querySelectorAll('a').forEach((item) => {
      item.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });

    // Toggle user menu on button click
    userMenuLogoutButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent immediate closing due to document click event
      userMenuLogout.classList.toggle('hidden');
    });

    // Close both menus when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as Node;
      if (!menu.contains(target) && !menuToggle.contains(target)) {
        menu.classList.add('hidden');
      }

      if (
        !userMenuLogout.contains(target) &&
        !userMenuLogoutButton.contains(target)
      ) {
        userMenuLogout.classList.add('hidden');
      }
    });

    // Close both menus when clicking outside
    document.addEventListener('click', (event) => {
      const menu = this.renderRoot.querySelector(
        '#user-menu-logout'
      ) as HTMLElement;
      const button = this.renderRoot.querySelector(
        '#user-menu-logout-button'
      ) as HTMLElement;

      if (menu && button) {
        if (
          !menu.contains(event.target as Node) &&
          !button.contains(event.target as Node)
        ) {
          menu.classList.add('hidden');
        }
      }
    });
  }

  /**
   * Fungsi logout untuk menghapus session dan mengarahkan ke halaman login.
   */
  logout() {
    AuthService.logout();
    this.isLoggedIn = false;
    this.username = '';
    window.location.href = '#/auth/login';
  }

  getUserRoles() {
    return StorageHelper.getItem('role') || 'No Role';
  }

  getUserToken() {
    return StorageHelper.getItem('token') || 'No Token';
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
          <p class="sm:hidden px-2 mt-7 text-sm font-thin">
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
              class="hidden mr-2 px-3 space-y-2 py-3 flex-col bg-white text-gray-800 shadow-lg absolute top-11 right-0 sm:bg-blue-600 sm:text-white rounded-md sm:static sm:flex sm:flex-row sm:space-y-0 sm:space-x-8 sm:min-w-fit sm:mr-6 min-w-max"
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
            ${this.isLoggedIn
              ? html`
                  <!-- Jika sudah login -->
                  <button
                    id="user-menu-logout-button"
                    class="flex items-center space-x-2 focus:outline-none bg-orange-600 rounded-full font-bold"
                  >
                    <div
                      class="bg-orange-600 w-10 h-10 rounded-full flex justify-center items-center text-white font-bold uppercase italic underline"
                    >
                      ${this.username.charAt(0)}
                    </div>
                  </button>
                  <!-- Dropdown User Detail & Logout -->
                  <div
                    id="user-menu-logout"
                    class="hidden absolute right-0 mt-2 w-60 bg-white text-gray-800 shadow-lg rounded-md p-3 text-sm"
                  >
                    <p><strong>Username:</strong> ${this.username}</p>
                    <p><strong>Role:</strong> ${this.getUserRoles()}</p>
                    <p><strong>Token:</strong> ${this.getUserToken()}</p>

                    <hr class="my-2" />

                    <button
                      @click=${this.logout}
                      class="block w-full text-left px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                `
              : html`
                    <!-- Jika belum login -->
                    <div class="relative">
                      <button
                        id="user-menu-logout-button"
                        class="flex items-center space-x-2 focus:outline-none bg-gradient-to-r from-orange-500 to-orange-700 rounded-full font-bold shadow-md hover:shadow-lg transition duration-300"
                      >
                        <div
                          class="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-800 rounded-full flex justify-center items-center text-white text-2xl font-bold"
                        >
                          👤
                        </div>
                      </button>

                      <!-- Dropdown menu -->
                      <div
                        id="user-menu-logout"
                        class="hidden absolute right-0 mt-3 w-40 bg-white text-gray-800 shadow-md rounded-md border border-gray-200 transition duration-200"
                      >
                        <a
                          href="#/auth/login"
                          class="block px-5 py-3 hover:bg-orange-100 transition duration-200"
                        >
                          🔑 Login
                        </a>
                        <a
                          href="#/auth/register"
                          class="block px-5 py-3 hover:bg-orange-100 transition duration-200"
                        >
                          📝 Register
                        </a>
                      </div>
                    </div>
                  </div>
                `}
          </div>
        </div>
      </nav>
    `;
  }
}
