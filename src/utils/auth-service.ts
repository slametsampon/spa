import CryptoJS from 'crypto-js';
import users from '../assets/data/users.ts';
import { StorageHelper } from './storage-helper.ts';

export class AuthService {
  static login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find((u) => u.username === username);
        if (!user) return resolve(false);

        // Hash password yang dimasukkan pengguna
        const passwordHash = CryptoJS.SHA256(password).toString();

        // Bandingkan dengan hash yang tersimpan di database
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
}
