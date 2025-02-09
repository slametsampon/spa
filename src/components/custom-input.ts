import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('custom-input')
export class CustomInput extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) type:
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

  @property({ type: String }) private _value: string | number = '';

  set value(newValue: string | number) {
    console.log(`🔍 Setter dipanggil, value baru:`, newValue); // Debug tambahan

    const oldValue = this._value;
    this._value = newValue;

    this.requestUpdate('value', oldValue); // Paksa update meskipun nilai sama
    this._validateInput(); // Pastikan validasi tetap berjalan
  }

  get value() {
    return this._value;
  }

  @property({ type: String }) errorMessage = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Number }) minLength = 0;
  @property({ type: Boolean }) onlyAlphanumeric = false;
  @property({ type: Boolean }) showPassword = false;
  @property({ type: Boolean }) isEditing = false;

  createRenderRoot() {
    return this; // Menggunakan Light DOM agar Tailwind bisa bekerja
  }

  private _togglePassword() {
    this.showPassword = !this.showPassword;
    this.requestUpdate(); // ✅ Paksa UI diperbarui setelah perubahan
  }

  private _validateInput() {
    // 🚀 Jangan validasi jika form belum mulai diedit
    if (!this.isEditing) {
      console.log(
        `🔍 SKIP Validasi (isEditing = false) - Label: ${this.label}`
      );
      return;
    }

    let error = '';

    if (
      this.required &&
      (this.value === '' || this.value === null || this.value === undefined)
    ) {
      error = `❌ ${this.label} wajib diisi!`;
    }

    this.errorMessage = error;
    this.requestUpdate();

    console.log(
      `✅ Final Debug - Label: ${this.label}, Value:`,
      this.value,
      'Error:',
      error
    );
  }

  private _handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;

    console.log(
      `🔍 DEBUG _handleInput() - Value Changed (Before Dispatch):`,
      this.value
    );

    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: this.value,
        bubbles: true,
        composed: true,
      })
    );

    this._validateInput();
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
