import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Komponen tabel generik yang dapat digunakan untuk berbagai jenis JSON.
 *
 * @property {Array<Object>} data - Data JSON yang akan ditampilkan.
 * @property {boolean} enableAction - Menampilkan kolom aksi atau tidak.
 * @property {string} title - Judul untuk card tabel.
 */
@customElement('table-custom')
export class TableCustom extends LitElement {
  /** Data JSON generik */
  @property({
    type: Array,
    hasChanged: (newVal, oldVal) =>
      JSON.stringify(newVal) !== JSON.stringify(oldVal),
  })
  data: any[] = [];

  /** Opsi untuk menampilkan tombol aksi */
  @property({ type: Boolean })
  enableAction = false;

  /** Judul card tabel */
  @property({ type: String })
  title = 'Tabel Data';

  /** Gunakan Light DOM agar tetap menggunakan styling global */
  createRenderRoot() {
    return this;
  }

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('data')) {
      console.log('📊 [table-custom] Data berubah, merender ulang:', this.data);
    }
  }
  render() {
    console.log('📊 [table-custom] Rendering dengan data:', this.data);
    if (!this.data.length) {
      return html`
        <div class="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">
            ${this.title}
          </h2>
          <p class="text-gray-500 text-center">Tidak ada data tersedia.</p>
        </div>
      `;
    }

    /** Ambil header dari kunci objek pertama */
    const headers = Object.keys(this.data[0]);

    return html`
      <div
        class="bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-lg shadow-md mt-4"
      >
        <div class="bg-white p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">
            ${this.title}
          </h2>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-gray-300">
              <thead>
                <tr class="bg-blue-100">
                  ${headers.map(
                    (header) =>
                      html`<th
                        class="border border-gray-300 px-4 py-2 text-left font-semibold"
                      >
                        ${header}
                      </th>`
                  )}
                  ${this.enableAction
                    ? html`<th
                        class="border border-gray-300 px-4 py-2 text-left font-semibold"
                      >
                        Aksi
                      </th>`
                    : ''}
                </tr>
              </thead>
              <tbody>
                ${this.data.map(
                  (row, index) => html`
                    <tr
                      class="${index % 2 === 0
                        ? 'bg-white'
                        : 'bg-gray-50'} hover:bg-green-100"
                    >
                      ${headers.map(
                        (key) =>
                          html`<td class="border border-gray-300 px-4 py-2">
                            ${row[key]}
                          </td>`
                      )}
                      ${this.enableAction
                        ? html`
                            <td class="border border-gray-300 px-4 py-2">
                              <button
                                class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                                @click=${() => this.handleAction(row)}
                              >
                                Aksi
                              </button>
                            </td>
                          `
                        : ''}
                    </tr>
                  `
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Handler untuk tombol aksi.
   * @param {Object} row - Data dari baris yang diklik.
   */
  handleAction(row: any) {
    alert(`Aksi diklik untuk ${JSON.stringify(row)}`);
  }
}
