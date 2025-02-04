import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('child-component')
export class ChildComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .content-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      position: relative;
    }
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      background: red;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
    }
  `;

  private _isOpen = false; // ✅ Gunakan variabel internal

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
    return this; // ✅ Gunakan Light DOM agar Tailwind bisa diterapkan
  }

  private _closeChild() {
    console.log('❌ Menutup Child Component');
    this.isOpen = false;
  }

  updated(changedProperties: Map<string, any>) {
    console.log('child-component:updated-run');
    if (changedProperties.has('isOpen')) {
      console.log(`🔄 Child Component State: isOpen = ${this.isOpen}`);
      this.style.display = this.isOpen ? 'flex' : 'none';
    }
  }

  render() {
    return html`
      <div
        class="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${this
          .isOpen
          ? ''
          : 'hidden'}"
      >
        <div class="content-box bg-white p-8 rounded-lg shadow-lg max-w-lg">
          <button
            class="close-button bg-red-500 text-white p-2 rounded-full"
            @click=${this._closeChild}
          >
            ✕
          </button>
          <h2 class="text-xl font-bold text-gray-700">Child Component</h2>
          <p class="text-gray-600">This is a child component content.</p>
        </div>
      </div>
    `;
  }
}
