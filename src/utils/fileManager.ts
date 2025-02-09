/**
 * @module fileManager
 * @description Modul untuk mengelola unggah dan unduh file ke/dari GitHub atau lokal.
 */

export class FileManager {
  /**
   * Mengunggah konten ke GitHub menggunakan API.
   * @param repo - Nama repository GitHub (format: "username/repo").
   * @param path - Jalur file di repository.
   * @param content - Konten file dalam format Base64.
   * @param token - Token akses GitHub.
   * @returns Respons dari API GitHub.
   * @throws Jika terjadi kesalahan selama pengunggahan.
   */
  static async uploadToGitHub(
    repo: string,
    path: string,
    content: string,
    token: string
  ): Promise<object> {
    const url = `https://api.github.com/repos/${repo}/contents/${path}`;
    const body = {
      message: `Upload ${path}`,
      content,
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Mengunggah file ke GitHub repository.
   * Mendukung file teks (JSON, XML, dll.) dan file biner (gambar, PDF, dll.).
   * @param file - File yang akan diunggah.
   * @param repo - Nama repository GitHub (format: "username/repo").
   * @param path - Jalur file di repository.
   * @param token - Token akses GitHub.
   * @returns Respons dari API GitHub.
   * @throws Jika terjadi kesalahan selama pengunggahan.
   */
  static async uploadFile(
    file: File,
    repo: string,
    path: string,
    token: string
  ): Promise<object> {
    if (!file) {
      throw new Error('No file selected for upload.');
    }

    return new Promise<object>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          if (!event.target?.result) {
            throw new Error('Failed to read file.');
          }

          const isTextFile =
            file.type.startsWith('text/') || file.type === 'application/json';

          const base64Content = isTextFile
            ? btoa(event.target.result as string)
            : (event.target.result as string).split(',')[1];

          const response = await FileManager.uploadToGitHub(
            repo,
            path,
            base64Content,
            token
          );
          resolve(response);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject('Error reading the file.');

      if (file.type.startsWith('text/') || file.type === 'application/json') {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    });
  }

  /**
   * Mengunduh file dari URL dan menyimpannya ke lokal.
   * Mendukung file teks (JSON, XML, dll.) dan file biner (gambar, PDF, dll.).
   * @param url - URL file yang akan diunduh.
   * @param filename - Nama file yang akan disimpan.
   * @throws Jika terjadi kesalahan selama pengunduhan.
   */
  static async downloadFile(url: string, filename?: string): Promise<void> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename || url.split('/').pop() || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
}
