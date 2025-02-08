import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('custom-input')
export class CustomInput extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String })
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'search'
    | 'tel'
    | 'url'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'time'
    | 'color' = 'text';
  @property({ type: String }) value: string | number = '';
  @property({ attribute: false }) onInput: (event: InputEvent) => void =
    () => {};
  @property({ type: String }) errorMessage = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Number }) minLength = 0;
  @property({ type: Boolean }) onlyAlphanumeric = false;
  @property({ type: Boolean }) showPassword = false;

  createRenderRoot() {
    return this; // Menggunakan Light DOM agar Tailwind bisa bekerja
  }

  private _togglePassword() {
    this.showPassword = !this.showPassword;
  }

  private _validateInput() {
    let error = '';

    if (this.required && !this.value) {
      error = `❌ ${this.label} wajib diisi!`;
    } else if (
      this.minLength > 0 &&
      String(this.value).length < this.minLength
    ) {
      error = `❌ ${this.label} minimal ${this.minLength} karakter!`;
    } else if (
      this.onlyAlphanumeric &&
      !/^[a-zA-Z0-9]+$/.test(String(this.value))
    ) {
      error = `❌ ${this.label} hanya boleh huruf dan angka!`;
    }

    this.errorMessage = error;
    this.requestUpdate();
  }

  private _handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this._validateInput();
    this.onInput(event);
  }

  render() {
    return html`
      <div class="mb-4 w-full">
        <label class="block text-blue-600 font-semibold mb-1"
          >${this.label}</label
        >
        <div class="relative">
          <input
            type="${this.showPassword ? 'text' : this.type}"
            .value="${String(this.value)}"
            @input="${this._handleInput}"
            class="border-2 rounded-xl w-full p-3 text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-gray-100 shadow-inner"
          />
          ${this.type === 'password'
            ? html`
                <button
                  class="absolute right-3 top-3 text-gray-500 text-lg"
                  @click="${this._togglePassword}"
                  type="button"
                >
                  ${this.showPassword ? '🙈' : '👁'}
                </button>
              `
            : ''}
        </div>
        ${this.errorMessage
          ? html`<p class="text-red-500 text-sm flex items-center mt-1">
              ❌ ${this.errorMessage}
            </p>`
          : ''}
      </div>
    `;
  }
}
