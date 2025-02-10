import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('modal-dialog')
export class ModalDialog extends LitElement {
  private _isOpen = false;

  @property({ type: Boolean })
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    console.log(`⚡ Mengubah isOpen menjadi: ${value}`);
    const oldValue = this._isOpen;
    this._isOpen = value;
    this.requestUpdate('isOpen', oldValue);
  }

  @property({ type: String }) title = 'Informasi';
  @property({ type: String }) content = '';

  createRenderRoot() {
    return this;
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('isOpen')) {
      this.style.display = this.isOpen ? 'flex' : 'none';
    }
  }

  private _closeModal() {
    this.isOpen = false;
    this.requestUpdate();
  }

  setContent(content: string) {
    this.content = content;
    this.requestUpdate();
  }

  render() {
    return html`
      <!-- Overlay (Background Gelap) -->
      <div
        class="${this.isOpen
          ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50'
          : 'hidden'}"
        @click=${this._closeModal}
      >
        <!-- Modal Box -->
        <div
          class="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full relative transform transition-all scale-100 leading-relaxed"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <!-- Tombol Close (Pojok Kanan Atas) -->
          <button
            class="absolute top-3 right-3 w-6 h-6 border-none rounded-full bg-red-600 text-white cursor-pointer flex justify-center items-center shadow-md hover:bg-red-700 transition-all"
            @click=${this._closeModal}
          >
            ✕
          </button>

          <!-- Judul Modal -->
          <h2 class="text-lg font-semibold text-gray-800 mb-4">
            ${this.title}
          </h2>

          <!-- Konten Modal (Menggunakan unsafeHTML untuk HTML Formatting) -->
          <div id="modal-content" class="text-gray-800 text-sm">
            ${unsafeHTML(this.content)}
          </div>
        </div>
      </div>
    `;
  }
}
