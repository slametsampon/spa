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
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2">Nama Perangkat</th>
            <th class="border p-2">Status</th>
            ${this.enableAction ? html`<th class="border p-2">Aksi</th>` : ''}
          </tr>
        </thead>
        <tbody>
          ${this.data.map(
            (row) => html`
              <tr class="border">
                <td class="border p-2">${row.tagname}</td>
                <td class="border p-2">${row.status}</td>
                ${this.enableAction
                  ? html`
                      <td class="border p-2">
                        <button
                          class="px-3 py-1 text-white rounded-md ${row.status ===
                          'On'
                            ? 'bg-red-600'
                            : 'bg-green-600'}"
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
