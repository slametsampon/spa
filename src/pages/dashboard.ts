import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AuthService } from '../utils/auth-service.js';
import { StorageHelper } from '../utils/storage-helper.js';
import '../components/navbar.js';
import '../components/footer.js';
import '../components/custom-chart.js';
import '../components/device-table.js';

@customElement('page-dashboard')
export class DashboardPage extends LitElement {
  @property({ type: String }) public username: string = '';
  @property({ type: String }) public role: string = '';

  @state() private simulationFlag: boolean = true;
  @state() private sensorData: any[] = [];
  @state() private actuatorData: any[] = [];

  private ESP_SERVER = 'http://192.168.50.1';

  createRenderRoot() {
    return this; // Menggunakan Light DOM
  }

  connectedCallback() {
    super.connectedCallback();

    if (!AuthService.isAuthenticated()) {
      window.location.href = '#/auth/login';
      return;
    }

    this.username = StorageHelper.getItem('username') || 'Guest';
    this.role = StorageHelper.getItem('role') || 'guest';

    if (!AuthService.isAuthorized(['ViewDevices', 'ManageDevices'])) {
      console.log('[Auth] Akses ditolak!');
      window.location.href = '#/';
      return;
    }

    console.log('[Dashboard] Inisialisasi berhasil!');

    // Ambil data pertama kali
    this.fetchData();

    // Perbarui data setiap 60 detik
    setInterval(() => {
      console.log(
        `[Interval] Fetching data at ${new Date().toLocaleTimeString()}`
      );
      this.fetchData();
    }, 60000);
  }

  async fetchData() {
    console.log(`[Fetch Data] Mode Simulasi: ${this.simulationFlag}`);

    if (this.simulationFlag) {
      this.sensorData = [
        { name: 'pH Air', value: (5 + Math.random() * 3).toFixed(2) },
        { name: 'EC', value: (1.2 + Math.random() * 0.5).toFixed(2) },
        { name: 'Suhu Air', value: (20 + Math.random() * 5).toFixed(1) + '°C' },
      ];
      this.actuatorData = [
        { tagname: 'Pompa Air', status: Math.random() > 0.5 ? 'On' : 'Off' },
        { tagname: 'Lampu Grow', status: Math.random() > 0.5 ? 'On' : 'Off' },
      ];
      console.log('[Simulasi] Data Sensor:', this.sensorData);
      console.log('[Simulasi] Data Aktuator:', this.actuatorData);
    } else {
      try {
        const response = await fetch(`${this.ESP_SERVER}/data`);
        const data = await response.json();
        this.sensorData = data.sensors;
        this.actuatorData = data.actuators;
        console.log('[ESP32] Data Sensor:', this.sensorData);
        console.log('[ESP32] Data Aktuator:', this.actuatorData);
      } catch (error) {
        console.error('[ESP32] Gagal mengambil data:', error);
      }
    }
    this.requestUpdate();
  }

  async toggleActuator(tagname: string, state: string) {
    console.log(`[Toggle Actuator] Mengubah ${tagname} ke ${state}`);

    try {
      await fetch(`${this.ESP_SERVER}/control`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tagname, state }),
      });
      console.log(`[ESP32] Perintah terkirim: ${tagname} -> ${state}`);
      this.fetchData(); // Refresh data setelah perubahan
    } catch (error) {
      console.error('[ESP32] Gagal mengirim perintah:', error);
    }
  }

  handleToggleClick(row: any) {
    const newState = row.status === 'On' ? 'Off' : 'On';
    console.log(`[Button Click] ${row.tagname} -> ${newState}`);
    this.toggleActuator(row.tagname, newState);
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="p-8 my-14 min-h-screen"
        style="background: linear-gradient(to top right, #a7f3d0, #3b82f6);"
      >
        <h1
          class="text-3xl font-extrabold text-white text-center drop-shadow-lg"
        >
          Dashboard Hidroponik
        </h1>

        <!-- Tombol Simulasi -->
        <div class="mt-4 flex justify-center">
          <button
            @click=${() => {
              this.simulationFlag = !this.simulationFlag;
              console.log(`[Mode Simulasi] Status: ${this.simulationFlag}`);
              this.fetchData();
            }}
            class="px-4 py-2 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-gray-200"
          >
            ${this.simulationFlag ? 'Gunakan Data Real' : 'Gunakan Simulasi'}
          </button>
        </div>

        <!-- Data Sensor -->
        <section class="mt-6">
          <h2 class="text-xl font-semibold text-white mb-3 text-center">
            Data Sensor
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${this.sensorData.map(
              (sensor) => html`
                <div class="bg-white p-4 rounded-lg shadow-md text-center">
                  <h3 class="text-lg font-semibold text-gray-700">
                    ${sensor.name}
                  </h3>
                  <p class="text-2xl font-bold text-blue-600">
                    ${sensor.value}
                  </p>
                </div>
              `
            )}
          </div>
        </section>

        <!-- Kontrol Perangkat -->
        <section class="mt-8">
          <h2 class="text-xl font-semibold text-white mb-3 text-center">
            Kontrol Perangkat
          </h2>
          <device-table
            .data="${this.actuatorData}"
            enableAction
            @toggle-device=${(event: CustomEvent) =>
              this.handleToggleClick(event.detail)}
          ></device-table>
        </section>
      </main>
      <app-footer></app-footer>
    `;
  }
}
