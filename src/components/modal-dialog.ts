import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('modal-dialog')
export class ModalDialog extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .overlay {
      position: fixed; /* ✅ Pastikan overlay menutupi seluruh layar */
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 50; /* ✅ Pastikan modal muncul di atas elemen lain */
    }
    .modal-content {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      width: 400px;
      max-width: 90%;
      position: relative; /* ✅ Pastikan tombol close bisa absolute */
    }
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 32px;
      height: 32px;
      background: white;
      border: none;
      border-radius: 50%;
      font-size: 20px;
      font-weight: bold;
      color: #333;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
    .close-button:hover {
      background: #ddd;
    }
    .close-button:hover {
      background: #ddd;
    }
  `;

  private _isOpen = false;

  @property({ type: Boolean })
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    console.log("⚡ Properti 'isOpen' diubah menjadi:", value);
    this._isOpen = value;
    this.requestUpdate();
  }

  createRenderRoot() {
    return this; // ✅ Gunakan Light DOM agar Tailwind bekerja
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.display = 'none'; // ✅ Paksa modal agar tidak muncul saat halaman dimuat
    console.log('🛠️ Modal tertutup saat halaman dimuat');
  }

  updated(changedProperties: Map<string, any>) {
    console.log('updated-run');
    if (changedProperties.has('isOpen')) {
      console.log('🔄 Modal status berubah:', this.isOpen);

      if (this.isOpen) {
        this.style.display = 'block'; // ✅ Paksa modal muncul
        this.offsetHeight; // ✅ Magic Trick: Paksa browser merender ulang elemen
        console.log('✅ Modal ditampilkan setelah perubahan');
      } else {
        this.style.display = 'none'; // ✅ Sembunyikan modal saat ditutup
        console.log('❌ Modal disembunyikan');
      }
    }
  }

  private _closeModal() {
    console.log('❌ Menutup modal');
    this.isOpen = false;
  }

  render() {
    return html`
      <div class="overlay" @click=${this._closeModal}>
        <div class="modal-content" @click=${(e: Event) => e.stopPropagation()}>
          <button class="close-button" @click=${this._closeModal}>✕</button>
          <slot></slot>
        </div>
      </div>
    `;
  }
}
