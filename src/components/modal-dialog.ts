import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('modal-dialog')
export class ModalDialog extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  private _isOpen = false; // ✅ Variabel internal untuk kontrol modal

  @property({ type: Boolean })
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    console.log(`⚡ Mengubah isOpen menjadi: ${value}`);
    const oldValue = this._isOpen;
    this._isOpen = value;
    this.requestUpdate('isOpen', oldValue); // ✅ Paksa pembaruan
  }

  createRenderRoot() {
    return this; // ✅ Gunakan Light DOM agar Tailwind bekerja
  }

  updated(changedProperties: Map<string, any>) {
    console.log('modal-dialog:updated-run');
    if (changedProperties.has('isOpen')) {
      console.log(`🔄 Modal State: isOpen = ${this.isOpen}`);
      this.style.display = this.isOpen ? 'flex' : 'none';
    }
  }

  private _closeModal() {
    console.log('❌ Menutup modal');
    this.isOpen = false;
    this.requestUpdate();
  }

  setContent(content: HTMLElement) {
    const modalContent = this.querySelector('#modal-content');
    if (modalContent) {
      modalContent.innerHTML = ''; // Bersihkan konten sebelumnya
      modalContent.appendChild(content); // Tambahkan konten baru
    }
  }

  render() {
    return html`
      <div
        class="${this.isOpen
          ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
          : 'hidden'}"
      >
        <div
          class="bg-white rounded-lg shadow-lg w-[400px] max-w-[90%] p-6 relative flex flex-col items-center"
        >
          <!-- Tombol Close -->
          <button
            class="absolute top-2 right-2 w-8 h-8 border-none rounded-full bg-red-600 text-white cursor-pointer flex shadow-md justify-center items-center hover:bg-red-700"
            @click=${this._closeModal}
          >
            ✕
          </button>

          <!-- Wrapper Konten -->
          <div
            id="modal-content"
            class="w-full p-4 flex flex-col items-center bg-green-200 overflow-hidden"
          ></div>
        </div>
      </div>
    `;
  }
}
