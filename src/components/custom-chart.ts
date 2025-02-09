import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import Chart from 'chart.js/auto';

/**
 * @customElement custom-chart
 * @description Komponen chart berbasis Chart.js dengan Light DOM agar kompatibel dengan Tailwind CSS.
 */
@customElement('custom-chart')
export class CustomChart extends LitElement {
  /**
   * @property {string} type - Jenis chart yang akan ditampilkan (line, bar, pie).
   */
  @property({ type: String }) type: 'line' | 'bar' | 'pie' = 'line';

  /**
   * @property {Array<{name: string, value: number}>} data - Data yang digunakan untuk chart.
   */
  @property({ type: Array }) data: { name: string; value: number }[] = [];

  /**
   * @private
   * @property {Chart | null} chartInstance - Menyimpan instance dari Chart.js untuk menghindari duplikasi.
   */
  private chartInstance: Chart | null = null;

  /**
   * @override
   * @description Gunakan Light DOM agar kompatibel dengan Tailwind CSS.
   */
  createRenderRoot() {
    return this; // Light DOM agar styling Tailwind tetap bekerja
  }

  /**
   * @override
   * @description Lifecycle pertama kali setelah elemen dipasang ke DOM.
   */
  firstUpdated() {
    this.renderChart();
  }

  /**
   * @override
   * @description Lifecycle saat properti diperbarui untuk merender ulang chart.
   */
  updated() {
    if (this.chartInstance) {
      this.chartInstance.destroy(); // Hancurkan instance sebelumnya untuk mencegah duplikasi
    }
    this.renderChart();
  }

  /**
   * @private
   * @description Fungsi untuk merender chart menggunakan Chart.js
   */
  private renderChart() {
    const ctx = this.querySelector('canvas')?.getContext('2d'); // Ambil dari Light DOM
    if (!ctx) return;

    const chartData = {
      labels: this.data.map((item) => item.name),
      datasets: [
        {
          label: 'Data Statistik',
          data: this.data.map((item) => item.value),
          backgroundColor: ['#8884d8', '#82ca9d', '#ff7300'],
          borderColor: '#4a4a4a',
          borderWidth: 2,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    this.chartInstance = new Chart(ctx, {
      type: this.type as 'line' | 'bar' | 'pie',
      data: chartData,
      options: chartOptions,
    });
  }

  /**
   * @override
   * @description Render tampilan komponen.
   * @returns {import("lit").TemplateResult}
   */
  render() {
    return html`
      <div class="p-4 bg-white shadow-lg rounded-lg">
        <canvas></canvas>
      </div>
    `;
  }
}
