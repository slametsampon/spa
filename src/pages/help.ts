import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/navbar.ts';
import '../components/footer.ts';
import '../components/parent-component.ts'; // ✅ Ganti ke parent-component

@customElement('page-help')
export class HelpPage extends LitElement {
  createRenderRoot() {
    return this; // ✅ Gunakan Light DOM agar Tailwind bekerja
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="p-8 my-14 bg-gradient-to-tr from-blue-50 to-green-300 min-h-full relative"
      >
        <h1 class="text-3xl font-extrabold text-blue-700">Help & Support</h1>
        <p class="text-gray-700 text-lg">
          Butuh bantuan? Berikut adalah sumber daya yang dapat membantu Anda:
        </p>

        <!-- Tambahkan Parent Component -->
        <parent-component></parent-component>
      </main>
      <app-footer></app-footer>
    `;
  }
}
