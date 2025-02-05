export class StorageHelper {
  static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
