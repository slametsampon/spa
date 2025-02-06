import CryptoJS from 'crypto-js';
import users from '../assets/data/users.js';
import userRole from '../assets/data/user-role.js';
import { StorageHelper } from './storage-helper.js';

/**
 * @class AuthService
 * @description Layanan untuk autentikasi dan otorisasi pengguna.
 */
export class AuthService {
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
   * @function hasPermission
   * @description Mengecek apakah pengguna memiliki izin berdasarkan role.
   * @param {string} permission - Hak akses yang ingin dicek.
   * @returns {boolean} True jika memiliki izin, False jika tidak.
   */
  static hasPermission(permission: string): boolean {
    const role = AuthService.getRole();
    return role ? userRole[role]?.includes(permission) : false;
  }

  static logout() {
    StorageHelper.removeItem('token');
    StorageHelper.removeItem('role');
    StorageHelper.removeItem('username');
  }
}
