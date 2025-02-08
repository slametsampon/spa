import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ConfigDevicesLocal from '../assets/data/config-devices-local.js';
import { DeviceConfig } from '../type.js';
import '../components/custom-input';

// Pilihan tipe perangkat
const deviceTypes = [
  { label: 'Pompa', value: 'Pompa' },
  { label: 'Sensor', value: 'Sensor' },
  { label: 'Katup', value: 'Katup' },
  { label: 'Kipas', value: 'Kipas' },
];

// Pilihan unit berdasarkan aplikasi hortikultura
const unitOptions = [
  { label: 'Waktu (Detik)', value: 'Detik' },
  { label: 'Kelembaban (%)', value: '%' },
  { label: 'Suhu (°C)', value: '°C' },
  { label: 'Laju alir (L/min)', value: 'L/min' },
  { label: 'pH', value: 'pH' },
  { label: 'Konsentrasi Nutrisi (ppm)', value: 'ppm' },
  { label: 'Intensitas Cahaya (lux)', value: 'lux' },
];

@customElement('dynamic-config-form')
export class DynamicConfigForm extends LitElement {
  @property({ type: Object }) newConfig: Record<string, string | number> = {};
  @property({ type: Object }) errorMessages: Record<string, string> = {};
  @property({ type: Boolean }) isEditing: boolean = false;
  @property({ type: String }) selectedTagname: string = '';

  createRenderRoot() {
    return this; // Menggunakan Light DOM agar Tailwind bisa bekerja
  }

  private _validateForm(): boolean {
    this.errorMessages = {}; // Reset error sebelumnya
    let isValid = true;

    Object.keys(ConfigDevicesLocal[0]).forEach((key) => {
      const value = this.newConfig[key];

      if (!value || String(value).trim() === '') {
        this.errorMessages[key] = `❌ ${key} wajib diisi!`;
        isValid = false;
      } else if (
        typeof ConfigDevicesLocal[0][key] === 'number' &&
        isNaN(Number(value))
      ) {
        this.errorMessages[key] = `❌ ${key} harus berupa angka!`;
        isValid = false;
      }
    });

    this.requestUpdate();
    console.log('this.errorMessages :', this.errorMessages);
    return isValid;
  }

  private _handleSelectTagname(event: Event) {
    const selectedTag = (event.target as HTMLSelectElement).value;
    this.selectedTagname = selectedTag;

    // Cari data berdasarkan tagname
    const device = ConfigDevicesLocal.find((d) => d.tagname === selectedTag);
    if (device) {
      this.newConfig = { ...device };
      this.isEditing = true;
    } else {
      this.newConfig = {};
      this.isEditing = false;
    }

    this.requestUpdate();
  }

  private _handleInput(event: InputEvent, key: string) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const value =
      target.type === 'number' ? Number(target.value) : target.value;
    this.newConfig = { ...this.newConfig, [key]: value };
    this.errorMessages[key] = ''; // Hapus pesan error saat pengguna mulai mengetik
  }

  private _saveConfig() {
    if (!this._validateForm()) return;
    console.log('Perangkat Baru Tersimpan:', this.newConfig);
    alert('✅ Perangkat berhasil ditambahkan!');
    this.newConfig = {}; // Reset form setelah sukses
    this.requestUpdate();
  }

  render() {
    console.log('this.newConfig : ', this.newConfig);
    return html`
      <div
        class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      >
        <div class="bg-white shadow-lg rounded-2xl p-8 w-96 my-6">
          <!-- 🔹 Pilih Tagname untuk Edit -->
          <label class="block text-gray-700 font-semibold"
            >Pilih Perangkat untuk Diedit</label
          >
          <select
            class="border-2 rounded-xl w-full p-3 text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-gray-100 shadow-inner mb-4"
            @change="${this._handleSelectTagname}"
          >
            <option value="" disabled selected>Pilih Tagname...</option>
            ${ConfigDevicesLocal.map(
              (device) =>
                html`<option value="${device.tagname}">
                  ${device.tagname}
                </option>`
            )}
          </select>

          <!-- 🔹 Input Tagname -->
          <custom-input
            label="Tagname"
            type="text"
            .value="${this.newConfig.tagname || ''}"
            .onInput="${(e: InputEvent) => this._handleInput(e, 'tagname')}"
            required
          ></custom-input>
          ${this.errorMessages['tagname']
            ? html`<p class="text-red-500 text-sm">
                ${this.errorMessages['tagname']}
              </p>`
            : ''}

          <!-- 🔹 Input Description -->
          <custom-input
            label="Description"
            type="text"
            .value="${this.newConfig.description || ''}"
            .onInput="${(e: InputEvent) => this._handleInput(e, 'description')}"
            required
          ></custom-input>
          ${this.errorMessages['description']
            ? html`<p class="text-red-500 text-sm">
                ${this.errorMessages['description']}
              </p>`
            : ''}

          <!-- 🔹 Dropdown dalam Column -->
          <div class="flex flex-col gap-4 mt-2">
            <!-- 🔹 Dropdown untuk Tipe Perangkat -->
            <div>
              <label class="block text-gray-700 font-semibold"
                >Tipe Perangkat</label
              >
              <select
                class="border-2 rounded-xl w-full p-3 text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-gray-100 shadow-inner"
                @change="${(e: Event) =>
                  this._handleInput(e as InputEvent, 'type')}"
              >
                <option value="" disabled selected>Pilih tipe perangkat</option>
                ${deviceTypes.map(
                  (type) =>
                    html`<option
                      value="${type.value}"
                      ?selected=${this.newConfig.type === type.value}
                    >
                      ${type.label}
                    </option>`
                )}
              </select>
              ${this.errorMessages['type']
                ? html`<p class="text-red-500 text-sm">
                    ${this.errorMessages['type']}
                  </p>`
                : ''}
            </div>

            <!-- 🔹 Dropdown untuk Unit -->
            <div>
              <label class="block text-gray-700 font-semibold">Unit</label>
              <select
                class="border-2 rounded-xl w-full p-3 text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-gray-100 shadow-inner"
                @change="${(e: Event) =>
                  this._handleInput(e as InputEvent, 'unit')}"
              >
                <option value="" disabled selected>Pilih unit</option>
                ${unitOptions.map(
                  (unit) =>
                    html`<option
                      value="${unit.value}"
                      ?selected=${this.newConfig.unit === unit.value}
                    >
                      ${unit.label}
                    </option>`
                )}
              </select>
              ${this.errorMessages['unit']
                ? html`<p class="text-red-500 text-sm">
                    ${this.errorMessages['unit']}
                  </p>`
                : ''}
            </div>
          </div>

          <!-- 🔹 Input Lain -->
          ${['highRange', 'lowRange', 'highAlarm', 'lowAlarm'].map(
            (key) => html`
              <custom-input
                label="${key}"
                type="number"
                .value="${this.newConfig[key] || ''}"
                .onInput="${(e: InputEvent) => this._handleInput(e, key)}"
              ></custom-input>
              ${this.errorMessages[key]
                ? html`<p class="text-red-500 text-sm">
                    ${this.errorMessages[key]}
                  </p>`
                : ''}
            `
          )}

          <!-- 🔹 Tombol Simpan / Update -->
          <button
            class="w-full mt-4 ${this.isEditing
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-green-500 hover:bg-green-600'} text-white py-3 rounded-xl text-lg font-semibold transition-transform transform hover:scale-105 shadow-md"
            @click="${this._saveConfig}"
          >
            ${this.isEditing ? '✏️ Update Perangkat' : '➕ Tambah Perangkat'}
          </button>
        </div>
      </div>
    `;
  }
}
