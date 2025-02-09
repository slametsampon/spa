import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AuthService } from '../utils/auth-service.js';
import { StorageHelper } from '../utils/storage-helper.js';
import '../components/navbar.js';
import '../components/footer.js';
import '../components/custom-chart.js';
import '../components/table-custom.js'; // ✅ Tambahkan tabel

/**
 * @customElement page-dashboard
 * @description Halaman dashboard yang hanya bisa diakses oleh pengguna yang sudah login.
 */
@customElement('page-dashboard')
export class DashboardPage extends LitElement {
  public username: string = '';
  public role: string = '';

  /**
   * Data dummy untuk grafik Line dan Bar.
   */
  private chartData = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 50 },
    { name: 'Mar', value: 70 },
    { name: 'Apr', value: 90 },
  ];

  /**
   * Data dummy untuk grafik Pie.
   */
  private pieData = [
    { name: 'Produk A', value: 40 },
    { name: 'Produk B', value: 35 },
    { name: 'Produk C', value: 25 },
  ];

  /**
   * Data dummy untuk tabel perangkat IoT.
   */
  private tableData = [
    {
      tagname: 'Pompa-1',
      link: 'connected',
      status: 'On',
      automationMode: 'Sensor',
    },
    {
      tagname: 'Sensor-1',
      link: 'fail',
      status: 'Off',
      automationMode: 'Sensor',
    },
  ];

  /**
   * Data dummy untuk tabel karyawan.
   */
  private anotherTableData = [
    {
      nama: 'John Doe',
      umur: 30,
      pekerjaan: 'Engineer',
      lokasi: 'Jakarta',
    },
    {
      nama: 'Jane Smith',
      umur: 25,
      pekerjaan: 'Designer',
      lokasi: 'Bandung',
    },
  ];

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    if (!AuthService.isAuthenticated()) {
      window.location.href = '#/auth/login';
    } else {
      this.username = StorageHelper.getItem('username') || 'Guest';
      this.role = StorageHelper.getItem('role') || 'guest';
    }
  }

  logout() {
    AuthService.logout();
    window.location.href = '#/auth/login';
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="p-8 my-14 bg-gradient-to-tr from-gray-200 to-gray-300 min-h-screen"
      >
        <h1 class="text-3xl font-extrabold text-blue-900">Dashboard</h1>
        <p class="text-lg text-gray-700">
          Selamat datang, <strong>${this.username}</strong>!
        </p>
        <p class="text-gray-700">Role Anda: <strong>${this.role}</strong></p>

        <!-- 📊 Tambahkan Chart ke Dashboard -->
        <section
          class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">
              Grafik Penjualan
            </h2>
            <custom-chart type="line" .data="${this.chartData}"></custom-chart>
          </div>

          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">
              Statistik Pengguna
            </h2>
            <custom-chart type="bar" .data="${this.chartData}"></custom-chart>
          </div>

          <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">
              Distribusi Produk
            </h2>
            <custom-chart type="pie" .data="${this.pieData}"></custom-chart>
          </div>
        </section>

        <!-- 📋 Tabel Perangkat IoT -->
        <section class="mt-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">
            Data Perangkat IoT
          </h2>
          <table-custom .data="${this.tableData}" enableAction></table-custom>
        </section>

        <!-- 📋 Tabel Karyawan -->
        <section class="mt-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">
            Data Karyawan
          </h2>
          <table-custom .data="${this.anotherTableData}"></table-custom>
        </section>
      </main>
      <app-footer></app-footer>
    `;
  }
}
