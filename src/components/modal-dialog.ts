import { LitElement, html, css } from 'lit';
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

  setContent(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.requestUpdate();
  }

  private _getGradientClass(title: string) {
    switch (title) {
      case 'Setup Project':
        return 'bg-gradient-to-r from-purple-400 to-indigo-600';
      case 'Setup GitHub':
        return 'bg-gradient-to-r from-blue-400 to-blue-700';
      case 'Setup ESP32-C3':
        return 'bg-gradient-to-r from-green-400 to-teal-600';
      case 'Tahap Development':
        return 'bg-gradient-to-r from-yellow-400 to-orange-600';
      case 'Deployment ke GitHub Pages':
        return 'bg-gradient-to-r from-pink-400 to-red-600';
      case 'Deployment ke ESP32-C3':
        return 'bg-gradient-to-r from-gray-400 to-gray-700';
      default:
        return 'bg-gradient-to-r from-blue-200 to-green-300';
    }
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
        <!-- Modal Box dengan Gradient Dinamis -->
        <div
          class="p-8 rounded-lg shadow-2xl max-w-2xl w-full relative transform transition-all scale-100 ${this._getGradientClass(
            this.title
          )}"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <!-- Tombol Close -->
          <button
            class="absolute top-3 right-3 w-8 h-8 border-none rounded-full bg-red-600 text-white cursor-pointer flex justify-center items-center shadow-md hover:bg-red-700 transition-all"
            @click=${this._closeModal}
          >
            ✕
          </button>

          <!-- Judul Modal -->
          <h2 class="text-xl font-bold text-white shadow-lg">${this.title}</h2>

          <!-- Konten Modal (Menggunakan unsafeHTML) -->
          <div id="modal-content" class="text-gray-900 text-sm mt-4">
            ${unsafeHTML(this.content)}
          </div>
        </div>
      </div>
    `;
  }
}
