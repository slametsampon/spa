const { exec } = require('child_process');
const path = require('path');

// Path direktori dist
const distPath = path.resolve(__dirname, '../dist');

// Port serial ESP32-C3
const port = 'COM3'; // Sesuaikan dengan port di sistem Anda (misalnya, /dev/ttyUSB0 di Linux)

// Fungsi untuk menjalankan perintah shell
function runCommand(command, description) {
  console.log(description);
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
        reject(err);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
}

// Proses upload
(async function uploadToESP32() {
  try {
    // Langkah 1: Verifikasi Arduino CLI
    await runCommand('arduino-cli version', 'Memverifikasi Arduino CLI...');

    // Langkah 2: Unggah file LittleFS
    const uploadCommand = `arduino-cli upload -p ${port} --fqbn esp32:esp32:esp32c3 --input-dir ${distPath}`;
    await runCommand(uploadCommand, 'Mengunggah file ke ESP32-C3...');

    console.log('🎉 Upload ke ESP32-C3 selesai!');
  } catch (err) {
    console.error('❌ Proses upload gagal:', err);
  }
})();
