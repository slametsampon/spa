export default class Router {
  private routes: { [path: string]: () => void } = {}; // Menyimpan daftar rute

  // Tambahkan rute baru
  addRoute(path: string, callback: () => void): void {
    this.routes[path] = callback;
  }

  // Tangani perubahan rute
  private handleRoute(): void {
    const path = window.location.hash || '#/'; // Ambil hash lengkap
    if (this.routes[path]) {
      this.routes[path](); // Jalankan callback untuk path
    } else {
      this.routes['#/404'] && this.routes['#/404'](); // Callback untuk 404
    }
  }

  // Inisialisasi router
  init(): void {
    window.addEventListener('hashchange', () => this.handleRoute()); // Saat hash berubah
    window.addEventListener('load', () => this.handleRoute()); // Saat halaman dimuat
  }
}
