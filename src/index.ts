import Router from './router.ts';
import './pages/home.ts';
import './pages/help.ts';
import './pages/about.ts';

// Inisialisasi router
const router = new Router();

// Tambahkan rute untuk Home
const app = document.querySelector('#app'); // Pilih elemen root
router.addRoute('#/', () => {
  if (app) {
    document.body.innerHTML = `
    <page-home></page-home>
  `;
  }
});
// Tambahkan rute untuk About
router.addRoute('#/about', () => {
  if (app) {
    document.body.innerHTML = `
    <page-about></page-about>
  `;
  }
});

// Tambahkan rute untuk Help
router.addRoute('#/help', () => {
  if (app) {
    document.body.innerHTML = `
    <page-help></page-help>
  `;
  }
});

// Mulai router
router.init();
