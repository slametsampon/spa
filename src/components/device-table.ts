import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @customElement device-table
 * @description Tabel untuk menampilkan dan mengontrol status perangkat hidroponik.
 */
@customElement('device-table')
export class DeviceTable extends LitElement {
  @property({ type: Array }) data: any[] = [];
  @property({ type: Boolean }) enableAction: boolean = false;

  createRenderRoot() {
    return this; // ✅ Menggunakan Light DOM agar mengikuti styling global
  }

  render() {
    return html`
      <table class="w-full border-collapse border border-gray-500 shadow-lg">
        <thead>
          <tr class="bg-gray-200 text-gray-900">
            <th class="border border-gray-500 p-3 text-left">Nama Perangkat</th>
            <th class="border border-gray-500 p-3 text-left">Status</th>
            ${this.enableAction
              ? html`<th class="border border-gray-500 p-3 text-left">Aksi</th>`
              : ''}
          </tr>
        </thead>
        <tbody>
          ${this.data.map(
            (row, index) => html`
              <tr
                class="${index % 2 === 0
                  ? 'bg-gray-50'
                  : 'bg-white'} hover:bg-gray-200"
              >
                <td class="border border-gray-500 p-3">${row.tagname}</td>
                <td class="border border-gray-500 p-3">${row.status}</td>
                ${this.enableAction
                  ? html`
                      <td class="border border-gray-500 p-3">
                        <button
                          class="px-4 py-2 text-white font-semibold rounded-md ${row.status ===
                          'On'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-green-600 hover:bg-green-700'}"
                          @click=${() => this.handleAction(row)}
                        >
                          ${row.status === 'On' ? 'Matikan' : 'Nyalakan'}
                        </button>
                      </td>
                    `
                  : ''}
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }

  handleAction(row: any) {
    const newState = row.status === 'On' ? 'Off' : 'On';
    console.log(`[DeviceTable] Aksi tombol: ${row.tagname} -> ${newState}`);
    this.dispatchEvent(
      new CustomEvent('toggle-device', {
        detail: { tagname: row.tagname, state: newState },
        bubbles: true,
        composed: true,
      })
    );
  }
}
