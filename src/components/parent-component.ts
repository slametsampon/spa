import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './modal-dialog';

@customElement('parent-component')
export class ParentComponent extends LitElement {
  createRenderRoot() {
    return this; // ✅ Light DOM agar Tailwind bisa diterapkan
  }

  private _showModalDialog() {
    console.log('🟢 Membuka modal');

    const modalDialog = this.renderRoot?.querySelector(
      'modal-dialog'
    ) as HTMLElement & {
      isOpen: boolean;
      setContent: (content: HTMLElement) => void;
    };

    if (modalDialog) {
      modalDialog.isOpen = true;

      // Buat elemen yang akan dimasukkan ke dalam modal
      const content = document.createElement('div');
      content.innerHTML = `
        <h2 class="text-xl font-bold text-gray-700">Modal Dialog</h2>
        <p class="text-gray-600">This is a modal dialog content.</p>
      `;

      modalDialog.setContent(content);
    }
  }

  render() {
    return html`
      <div class="p-8 flex flex-col">
        <h1 class="text-2xl font-bold text-blue-600">Parent Component</h1>

        <button
          class="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
          @click=${this._showModalDialog}
        >
          Open Modal Dialog
        </button>

        <!-- Komponen modal -->
        <modal-dialog></modal-dialog>
      </div>
    `;
  }
}
