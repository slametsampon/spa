import Router from './router.js';
import './pages/home.ts';
import './pages/help.ts';
import './pages/about.ts';
import './pages/auth/login.ts';
import './pages/auth/register.ts';
import './pages/access-denied.ts';
import './pages/dashboard.js';

// Inisialisasi router
const router = new Router();
// Tambahkan rute untuk Home
const app = document.querySelector('#app'); // Pilih elemen root
if (app) {
  // Tambahkan rute untuk Home
  router.addRoute('#/', () => {
    document.body.innerHTML = `
      <page-home></page-home>
    `;
  });
  // Tambahkan rute untuk About
  router.addRoute('#/about', () => {
    document.body.innerHTML = `
      <page-about></page-about>
    `;
  });
  // Tambahkan rute untuk Help
  router.addRoute('#/help', () => {
    document.body.innerHTML = `
      <page-help></page-help>
    `;
  });
  // Tambahkan rute untuk Login
  router.addRoute('#/auth/login', () => {
    document.body.innerHTML = `
      <login-page></login-page>
    `;
  });
  // Tambahkan rute untuk register
  router.addRoute('#/auth/register', () => {
    document.body.innerHTML = `
      <register-page></register-page>
    `;
  });
  // Tambahkan rute untuk Dashboard
  router.addRoute('#/dashboard', () => {
    document.body.innerHTML = `
      <page-dashboard></page-dashboard>
    `;
  });
  // Tambahkan rute untuk access-denied
  router.addRoute('#/access-denied', () => {
    document.body.innerHTML = `
      <access-denied></access-denied>
    `;
  });
}

// Mulai router
router.init();
