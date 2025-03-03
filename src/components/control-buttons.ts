import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface Device {
  tagname: string;
  status: string;
}

@customElement('control-buttons')
export class ControlButtons extends LitElement {
  @property({ type: Array }) devices: Device[] = [];

  handleControl(device: string, action: string) {
    this.dispatchEvent(
      new CustomEvent('control-action', {
        detail: { device, action },
        bubbles: true,
        composed: true,
      })
    );
  }

  createRenderRoot() {
    return this; // Menggunakan Light DOM
  }

  render() {
    return html`
      <div class="flex flex-wrap gap-4 mt-4">
        ${this.devices.map(
          (device) => html`
            <div
              class="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center"
            >
              <span class="text-lg font-semibold"
                >${device.tagname}: ${device.status}</span
              >
              <div class="mt-2 flex gap-2">
                <button
                  class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  @click=${() => this.handleControl(device.tagname, 'ON')}
                >
                  ON
                </button>
                <button
                  class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  @click=${() => this.handleControl(device.tagname, 'OFF')}
                >
                  OFF
                </button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}
