#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <LittleFS.h>

// Konfigurasi Access Point (AP)
const char* ssid = "ESP32C3-AP";
const char* password = "12345678"; // Kosongkan ("") jika ingin tanpa password

// Membuat objek server di port 80
AsyncWebServer server(80);

// Fungsi untuk menentukan MIME Type berdasarkan ekstensi file
String getContentType(String filename) {
    if (filename.endsWith(".html")) return "text/html";
    else if (filename.endsWith(".css")) return "text/css";
    else if (filename.endsWith(".js")) return "application/javascript";
    else if (filename.endsWith(".json")) return "application/json";
    else if (filename.endsWith(".png")) return "image/png";
    else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
    else if (filename.endsWith(".gif")) return "image/gif";
    else if (filename.endsWith(".svg")) return "image/svg+xml";
    else if (filename.endsWith(".ico")) return "image/x-icon";
    else if (filename.endsWith(".webp")) return "image/webp";  // ✅ Tambahkan dukungan untuk WebP
    return "application/octet-stream"; // Default jika tidak dikenal
}

// Inisialisasi LittleFS
void initFS() {
    if (!LittleFS.begin()) {
        Serial.println("Gagal mount LittleFS!");
        return;
    }
    Serial.println("LittleFS berhasil di-mount.");
}

// Menampilkan daftar file dalam LittleFS (Debugging)
void listFiles() {
    Serial.println("Daftar file dalam LittleFS:");
    File root = LittleFS.open("/");
    File file = root.openNextFile();

    while (file) {
        Serial.print("  - ");
        Serial.println(file.name());
        file = root.openNextFile();
    }
}

// Konfigurasi Access Point ESP32-C3
void setupAP() {
    WiFi.softAP(ssid, password);
    Serial.println("Access Point ESP32-C3 aktif");
    Serial.print("IP Address: ");
    Serial.println(WiFi.softAPIP());
}

// Menyajikan SPA dari LittleFS
void serveSPA() {
    // Menyajikan semua file statis dari LittleFS
    server.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");

    // Menyajikan file spesifik dengan MIME type yang benar
    server.on("/index.js", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(LittleFS, "/index.js", "application/javascript");
    });

    server.on("/styles.css", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(LittleFS, "/styles.css", "text/css");
    });

    server.on("/index.js.map", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(LittleFS, "/index.js.map", "application/json");
    });

    // Menyajikan semua file di dalam folder "assets/"
    server.on("/assets/", HTTP_GET, [](AsyncWebServerRequest *request) {
        String path = request->url(); // Mendapatkan path dari request
        Serial.println("[LittleFS] Memuat file: " + path);

        if (LittleFS.exists(path)) {
            request->send(LittleFS, path, getContentType(path));
        } else {
            request->send(404, "text/plain", "File tidak ditemukan!");
        }
    });
    // Redirect semua permintaan yang tidak dikenal ke index.html untuk routing SPA
    server.onNotFound([](AsyncWebServerRequest *request) {
        request->send(LittleFS, "/index.html", "text/html");
    });

    server.begin();
    Serial.println("Server web berjalan di port 80");
}

// Setup
void setup() {
    Serial.begin(115200);
    setupAP();      // Mengaktifkan Access Point
    initFS();       // Memulai LittleFS
    listFiles();    // Debug: Menampilkan daftar file dalam LittleFS
    serveSPA();     // Menjalankan Web Server
}

// Loop kosong karena semua sudah ditangani oleh Web Server
void loop() {}
