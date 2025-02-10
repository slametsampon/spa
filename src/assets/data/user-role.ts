const userRole = {
  admin: [
    'ManageUsers', // Mengelola pengguna
    'ManageDevices', // Menambah, menghapus, atau konfigurasi perangkat
    'ViewLogs', // Melihat log aktivitas sistem
    'SystemConfig', // Mengubah pengaturan sistem utama
  ],
  operator: [
    'ViewDevices', // Melihat daftar perangkat & statusnya
    'ControlDevices', // Menghidupkan/mematikan perangkat
    'CalibrateDevices', // Mengkalibrasi sensor atau aktuator
  ],
  user: [
    'ViewDevices', // Melihat perangkat milik sendiri
    'ControlOwnDevices', // Mengontrol perangkat milik sendiri
  ],
  guest: [
    'ViewPublic', // Hanya bisa melihat informasi publik (tidak bisa mengontrol perangkat)
  ],
  device: [
    'SendData', // Mengirim data sensor ke server
    'ReceiveCommands', // Menerima perintah dari server atau pengguna
  ],
};

export default userRole;
