import CryptoJS from 'crypto-js';
import users from '../assets/data/users.js';
import userRole from '../assets/data/user-role.js';
import { StorageHelper } from './storage-helper.js';

/**
 * @class AuthService
 * @description Layanan untuk autentikasi dan otorisasi pengguna.
 */
export class AuthService {
  /**
   * @static
   * @function login
   * @description Melakukan autentikasi pengguna berdasarkan username dan password.
   * @param {string} username - Username pengguna.
   * @param {string} password - Password pengguna.
   * @returns {Promise<boolean>} True jika login berhasil, False jika tidak.
   */
  static login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find((u) => u.username === username);
        if (!user) return resolve(false);

        const passwordHash = CryptoJS.SHA256(password).toString();
        if (passwordHash === user.passwordHash) {
          StorageHelper.setItem('token', 'secure_token');
          StorageHelper.setItem('role', user.role);
          StorageHelper.setItem('username', user.username);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

  /**
   * @static
   * @function isAuthenticated
   * @description Mengecek apakah pengguna sudah login.
   * @returns {boolean} True jika pengguna memiliki token, False jika tidak.
   */
  static isAuthenticated(): boolean {
    return !!StorageHelper.getItem('token');
  }

  /**
   * @static
   * @function getRole
   * @description Mendapatkan role pengguna yang sedang login.
   * @returns {string|null} Role pengguna atau null jika belum login.
   */
  static getRole(): string | null {
    return StorageHelper.getItem('role');
  }

  /**
   * @static
   * @function isAuthorized
   * @description Mengecek apakah pengguna memiliki setidaknya satu dari izin yang diberikan.
   * @param {string[]} requiredPermissions - Array izin yang diperlukan (contoh: ["CRUD", "Update"]).
   * @returns {boolean} True jika diizinkan, False jika tidak.
   */
  static isAuthorized(requiredPermissions: string[]): boolean {
    const role = AuthService.getRole();

    console.log(
      `[Auth] Role: ${role}, Required: ${requiredPermissions.join(', ')}`
    );

    if (!role || !(role in userRole)) {
      alert('❌ Anda tidak memiliki izin untuk mengakses halaman ini.');
      window.location.href = '#/';
      return false;
    }

    const userPermissions = userRole[role as keyof typeof userRole] || [];
    const isAuthorized = requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (!isAuthorized) {
      alert('❌ Anda tidak memiliki izin untuk mengakses halaman ini.');
      window.location.href = '#/';
      return false;
    }

    return true;
  }

  /**
   * @static
   * @function logout
   * @description Menghapus semua data login pengguna dari localStorage.
   */
  static logout() {
    StorageHelper.removeItem('token');
    StorageHelper.removeItem('role');
    StorageHelper.removeItem('username');
  }
}
