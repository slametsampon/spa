import { StorageHelper } from './storage-helper.js';
import userRole from '../assets/data/user-role.js';

/**
 * @description Memeriksa apakah user memiliki izin tertentu.
 * @param {string[]} requiredPermissions - Array izin yang diperlukan (contoh: ["CRUD", "Update"]).
 * @returns {boolean} True jika diizinkan, False jika tidak.
 */
export function isAuthorized(requiredPermissions: string[]): boolean {
  // Ambil informasi pengguna dari localStorage
  const username = StorageHelper.getItem('username') || 'Guest';
  const role = StorageHelper.getItem('role') || 'guest';

  console.log(
    `[Auth] User: ${username}, Role: ${role}, Required: ${requiredPermissions.join(
      ', '
    )}`
  );

  // Dapatkan semua izin yang dimiliki oleh role user
  const userPermissions = userRole[role as keyof typeof userRole] || [];

  // Periksa apakah user memiliki setidaknya salah satu izin yang dibutuhkan
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
