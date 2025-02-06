import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('card-component')
export class CardComponent extends LitElement {
  @property({ type: Object }) data: Record<string, any> = {}; // ✅ Fleksibel untuk data JSON apa pun

  createRenderRoot() {
    return this; // ✅ Gunakan Light DOM agar Tailwind bisa diterapkan
  }

  render() {
    return html`
      <div
        class="max-w-full p-4 bg-gradient-to-tr from-blue-200 via-green-200 to-yellow-100 rounded-lg shadow-lg"
      >
        <h2 class="text-lg font-bold text-gray-700">
          ${this.data.tagname || 'Unknown'}
        </h2>
        <p class="text-gray-600">
          ${this.data.description || 'No description available'}
        </p>
        <ul class="text-gray-500 text-sm mt-2">
          ${Object.entries(this.data)
            .filter(([key]) => key !== 'tagname' && key !== 'description') // ✅ Kecuali title & description
            .map(
              ([key, value]) => html`
                <li><strong>${this._formatKey(key)}:</strong> ${value}</li>
              `
            )}
        </ul>
      </div>
    `;
  }

  private _formatKey(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1') // ✅ Pisahkan camelCase menjadi kata
      .replace(/^./, (str) => str.toUpperCase()); // ✅ Kapitalisasi kata pertama
  }
}
