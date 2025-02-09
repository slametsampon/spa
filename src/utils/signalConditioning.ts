/**
 * @module signalConditioning
 * @description Modul ini menyediakan berbagai metode untuk penyaringan sinyal, termasuk filter EMA, SMA, Median, Kalman, dan WMA.
 */

/**
 * Menghitung Exponential Moving Average (EMA).
 * @param alpha - Koefisien penghalusan (0 < alpha <= 1).
 * @param prevValue - Nilai sebelumnya.
 * @param newValue - Nilai terbaru.
 * @returns Nilai EMA yang diperbarui.
 */
export function emaFilter(
  alpha: number,
  prevValue: number,
  newValue: number
): number {
  return alpha * newValue + (1 - alpha) * prevValue;
}

/**
 * Menghitung Simple Moving Average (SMA).
 * @param windowSize - Jumlah data dalam jendela SMA.
 * @param dataWindow - Array nilai terbaru untuk SMA.
 * @param newValue - Nilai baru yang akan ditambahkan ke SMA.
 * @returns Nilai rata-rata dari jendela SMA.
 */
export function smaFilter(
  windowSize: number,
  dataWindow: number[],
  newValue: number
): number {
  dataWindow.push(newValue);
  if (dataWindow.length > windowSize) {
    dataWindow.shift(); // Buang nilai tertua
  }
  const sum = dataWindow.reduce((a, b) => a + b, 0);
  return sum / dataWindow.length;
}

/**
 * Menghitung Median Filter.
 * @param windowSize - Jumlah data dalam jendela Median Filter.
 * @param dataWindow - Array nilai terbaru untuk Median Filter.
 * @param newValue - Nilai baru yang akan ditambahkan ke filter.
 * @returns Median dari jendela data.
 */
export function medianFilter(
  windowSize: number,
  dataWindow: number[],
  newValue: number
): number {
  dataWindow.push(newValue);
  if (dataWindow.length > windowSize) {
    dataWindow.shift(); // Buang nilai tertua
  }
  const sorted = [...dataWindow].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Kelas untuk Kalman Filter, digunakan untuk penyaringan sinyal dinamis.
 */
export class KalmanFilter {
  private q: number; // Variance of the process noise
  private r: number; // Variance of the measurement noise
  private x: number; // Estimated value
  private p: number; // Estimation error covariance
  private k: number; // Kalman gain

  /**
   * Membuat sebuah instance KalmanFilter.
   * @param q - Varians noise proses (default: 1).
   * @param r - Varians noise pengukuran (default: 1).
   * @param x - Nilai awal (default: 0).
   * @param p - Kovarians kesalahan estimasi awal (default: 1).
   * @param k - Gain Kalman awal (default: 1).
   */
  constructor(
    q: number = 1,
    r: number = 1,
    x: number = 0,
    p: number = 1,
    k: number = 1
  ) {
    this.q = q;
    this.r = r;
    this.x = x;
    this.p = p;
    this.k = k;
  }

  /**
   * Memperbarui nilai filter berdasarkan pengukuran baru.
   * @param measurement - Nilai pengukuran baru.
   * @returns Nilai Kalman yang diperbarui.
   */
  update(measurement: number): number {
    this.p = this.p + this.q; // Prediction update
    this.k = this.p / (this.p + this.r); // Measurement update
    this.x = this.x + this.k * (measurement - this.x);
    this.p = (1 - this.k) * this.p;

    return this.x;
  }
}

/**
 * Menghitung Weighted Moving Average (WMA).
 * @param weights - Array bobot untuk setiap elemen dalam jendela.
 * @param dataWindow - Array nilai terbaru untuk WMA.
 * @param newValue - Nilai baru yang akan ditambahkan ke WMA.
 * @returns Rata-rata berbobot dari jendela data.
 */
export function wmaFilter(
  weights: number[],
  dataWindow: number[],
  newValue: number
): number {
  dataWindow.push(newValue);
  if (dataWindow.length > weights.length) {
    dataWindow.shift(); // Buang nilai tertua
  }

  const weightedSum = dataWindow.reduce(
    (sum, value, index) => sum + value * weights[index],
    0
  );
  const weightSum = weights
    .slice(0, dataWindow.length)
    .reduce((a, b) => a + b, 0);

  return weightedSum / weightSum;
}
