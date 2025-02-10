import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('card-component')
export class CardComponent extends LitElement {
  @property({ type: Object }) data: Record<string, any> = {}; // Data JSON fleksibel

  createRenderRoot() {
    return this; // ✅ Gunakan Light DOM agar Tailwind bisa diterapkan
  }

  render() {
    const title = this.data.tagname || this.data.title || 'Tidak Diketahui';
    const description = this.data.description || 'Tidak ada deskripsi.';

    // Filter properti tambahan (kecuali title & description)
    const filteredEntries = Object.entries(this.data).filter(
      ([key]) => key !== 'tagname' && key !== 'title' && key !== 'description'
    );

    return html`
      <div
        class="max-w-sm p-5 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      >
        <h2 class="text-lg font-bold text-gray-800">${title}</h2>
        <p class="text-gray-600 text-sm mb-3">${description}</p>

        <!-- Tampilkan daftar hanya jika ada data tambahan -->
        ${filteredEntries.length > 0
          ? html`
              <ul class="text-gray-700 text-sm space-y-1">
                ${filteredEntries.map(
                  ([key, value]) => html`
                    <li class="flex justify-between">
                      <span class="font-medium">${this._formatKey(key)}:</span>
                      <span>${value}</span>
                    </li>
                  `
                )}
              </ul>
            `
          : ''}
      </div>
    `;
  }

  private _formatKey(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/_/g, ' ');
  }
}
