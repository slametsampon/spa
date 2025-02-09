/**
 * @module jsonHelper
 * @description Modul utilitas untuk manipulasi JSON dalam array dan validasi data.
 */

/**
 * Mengecek apakah input adalah objek kosong, array kosong, Set kosong, atau Map kosong.
 * Jika `null` atau `undefined`, fungsi juga mengembalikan `true`.
 *
 * @param data - Data yang akan diperiksa.
 * @returns `true` jika input dianggap kosong, `false` jika tidak.
 */
export function isEmptyObject(data: any): boolean {
  if (data === null || data === undefined) return true;
  if (typeof data === 'object') {
    if (data instanceof Set || data instanceof Map) {
      return data.size === 0;
    }
    return Object.keys(data).length === 0;
  }
  return false;
}

/**
 * Mencari objek dalam array JSON berdasarkan properti `tagname`.
 * @param jsonArray - Array objek JSON yang akan dicari.
 * @param tagname - Nilai dari properti `tagname` yang akan dicocokkan.
 * @returns Objek yang sesuai atau `null` jika tidak ditemukan.
 */
export function getArrayJson(
  jsonArray: Record<string, any>[],
  tagname: string
): Record<string, any> | null {
  if (!Array.isArray(jsonArray))
    throw new TypeError('jsonArray harus berupa array.');
  return jsonArray.find((item) => item.tagname === tagname) || null;
}

/**
 * Mendapatkan parameter dari JSON array berdasarkan `tagname` dan `parameter`.
 * @param jsonArray - Array JSON yang akan diproses.
 * @param tagname - Nama tag untuk mencari objek.
 * @param parameter - Nama parameter yang ingin diambil.
 * @returns Nilai parameter jika ditemukan, atau `null` jika tidak.
 */
export function getJsonParameter(
  jsonArray: Record<string, any>[],
  tagname: string,
  parameter: string
): any | null {
  if (isEmptyObject(jsonArray)) return null;
  const jsonResult = getArrayJson(jsonArray, tagname);
  return jsonResult ? jsonResult[parameter] : null;
}

/**
 * Memperbarui parameter dalam JSON array berdasarkan `tagname`.
 * @param jsonArray - Array JSON yang akan diproses.
 * @param tagname - Nama tag untuk mencari objek.
 * @param parameter - Nama parameter yang ingin diperbarui.
 * @param value - Nilai baru untuk parameter.
 * @returns `true` jika berhasil diperbarui, `false` jika gagal.
 */
export function updateJsonParameter(
  jsonArray: Record<string, any>[],
  tagname: string,
  parameter: string,
  value: any
): boolean {
  if (isEmptyObject(jsonArray)) return false;
  const jsonResult = getArrayJson(jsonArray, tagname);
  if (jsonResult && parameter in jsonResult) {
    jsonResult[parameter] = value;
    return true;
  }
  return false;
}

/**
 * Menambahkan entri baru ke JSON array.
 * @param jsonArray - Array JSON yang akan ditambahkan entri baru.
 * @param newJson - Objek JSON baru yang akan ditambahkan.
 * @returns `true` jika berhasil ditambahkan, `false` jika gagal.
 */
export function addJsonEntry(
  jsonArray: Record<string, any>[],
  newJson: Record<string, any>
): boolean {
  if (!Array.isArray(jsonArray)) return false;
  jsonArray.push(newJson);
  return true;
}

/**
 * Menghapus entri dari JSON array berdasarkan `tagname`.
 * @param jsonArray - Array JSON yang akan dihapus entri-nya.
 * @param tagname - Nama tag untuk mencari entri yang akan dihapus.
 * @returns `true` jika berhasil dihapus, `false` jika tidak ditemukan.
 */
export function removeJsonEntry(
  jsonArray: Record<string, any>[],
  tagname: string
): boolean {
  if (isEmptyObject(jsonArray)) return false;
  const index = jsonArray.findIndex((item) => item.tagname === tagname);
  if (index !== -1) {
    jsonArray.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Menggabungkan dua JSON array berdasarkan `key`.
 * @param json1 - JSON array pertama.
 * @param json2 - JSON array kedua.
 * @param key - Nama kunci untuk mencocokkan data.
 * @returns JSON array yang digabung dengan prioritas pada `json2`.
 */
export function mergeWithPriority(
  json1: Record<string, any>[],
  json2: Record<string, any>[],
  key: string
): Record<string, any>[] {
  const merged = [...json1];
  json2.forEach((item2) => {
    const index = merged.findIndex((item1) => item1[key] === item2[key]);
    if (index !== -1) {
      merged[index] = { ...merged[index], ...item2 };
    } else {
      merged.push(item2);
    }
  });
  return merged;
}

/**
 * Membuat objek JSON dari pasangan key-value.
 * @param pairs - Array pasangan key-value dalam format `[key, value]`.
 * @returns Objek JSON yang dihasilkan.
 */
export function createDynamicJSON(
  ...pairs: [string, any][]
): Record<string, any> {
  return pairs.reduce((result, [key, value]) => {
    if (typeof key !== 'string') {
      throw new Error('Key harus berupa string.');
    }
    result[key] = value;
    return result;
  }, {} as Record<string, any>);
}

/**
 * Komponen LitElement untuk memanipulasi JSON.
 */
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('json-helper')
export class JsonHelper extends LitElement {
  @state() private jsonData: Record<string, any>[] = [];

  createRenderRoot() {
    return this; // Menggunakan Light DOM agar kompatibel dengan style global
  }

  /**
   * Menambahkan entri baru ke dalam data JSON.
   */
  addEntry() {
    const newEntry = { tagname: 'example', value: 'Sample Data' };
    addJsonEntry(this.jsonData, newEntry);
    this.requestUpdate();
  }

  /**
   * Menghapus entri dengan `tagname` tertentu.
   */
  removeEntry() {
    removeJsonEntry(this.jsonData, 'example');
    this.requestUpdate();
  }

  render() {
    return html`
      <button @click=${this.addEntry}>Tambah Entri</button>
      <button @click=${this.removeEntry}>Hapus Entri</button>
      <pre>${JSON.stringify(this.jsonData, null, 2)}</pre>
    `;
  }
}
