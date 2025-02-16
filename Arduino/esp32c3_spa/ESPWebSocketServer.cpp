#include "ESPWebSocketServer.h"

/**
 * @brief Konstruktor untuk menginisialisasi server dan WebSocket.
 */
ESPWebSocketServer::ESPWebSocketServer() : server(80), ws("/ws") {}

/**
 * @brief Mengonfigurasi ESP32-C3 sebagai Access Point (AP).
 */
void ESPWebSocketServer::setupAP() {
    if (!WiFi.softAPConfig(local_IP, gateway, subnet)) {
        Serial.println("Konfigurasi IP AP gagal!");
    }
    WiFi.softAP(ssid, password);
    Serial.println("Access Point ESP32-C3 aktif");
    Serial.print("IP Address: ");
    Serial.println(WiFi.softAPIP());
}

/**
 * @brief Menginisialisasi sistem file LittleFS.
 */
void ESPWebSocketServer::initFS() {
    if (!LittleFS.begin()) {
        Serial.println("Gagal mount LittleFS!");
        return;
    }
    Serial.println("LittleFS berhasil di-mount.");
}

/**
 * @brief Menampilkan daftar file dalam LittleFS (Debugging).
 */
void ESPWebSocketServer::listFiles() {
    Serial.println("Daftar file dalam LittleFS:");
    File root = LittleFS.open("/");
    File file = root.openNextFile();

    while (file) {
        Serial.print("  - ");
        Serial.println(file.name());
        file = root.openNextFile();
    }
}

/**
 * @brief Menyajikan file statis dari LittleFS ke browser.
 */
void ESPWebSocketServer::serveSPA() {
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
    server.on("/assets/", HTTP_GET, [this](AsyncWebServerRequest *request) {
        String path = request->url(); // Mendapatkan path dari request
        Serial.println("[LittleFS] Memuat file: " + path);

        if (LittleFS.exists(path)) {
            request->send(LittleFS, path, this->getContentType(path));
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

/**
 * @brief Handler untuk menangani event WebSocket.
 * @param server Pointer ke WebSocket server
 * @param client Pointer ke WebSocket client
 * @param type Jenis event WebSocket
 * @param arg Data tambahan
 * @param data Data yang diterima
 * @param len Panjang data
 */
void ESPWebSocketServer::onWebSocketEvent(AsyncWebSocket *server, AsyncWebSocketClient *client,
                                          AwsEventType type, void *arg, uint8_t *data, size_t len) {
    if (type == WS_EVT_CONNECT) {
        Serial.printf("Client %u terhubung!\n", client->id());
    } else if (type == WS_EVT_DISCONNECT) {
        Serial.printf("Client %u terputus!\n", client->id());
    } else if (type == WS_EVT_DATA) {
        data[len] = '\0'; // Pastikan string terakhiri dengan NULL
        Serial.printf("Data diterima: %s\n", data);
        server->textAll("ESP32 menerima: " + String((char*)data));
    }
}

/**
 * @brief Mengirim data sensor dummy ke semua client WebSocket setiap 3 detik.
 */
void ESPWebSocketServer::sendPeriodicData() {
    static unsigned long lastTime = 0;
    if (millis() - lastTime > 3000) { // Setiap 3 detik
        lastTime = millis();
        ws.textAll("Sensor Data: " + String(random(20, 100)));
    }
}

// Fungsi untuk menentukan MIME Type berdasarkan ekstensi file
String ESPWebSocketServer::getContentType(String filename) {
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

/**
 * @brief Memulai server dan WebSocket.
 */
void ESPWebSocketServer::begin() {
    Serial.begin(115200);
    setupAP();
    initFS();
    listFiles();
    serveSPA();

    ws.onEvent(onWebSocketEvent);
    server.addHandler(&ws);
    server.begin();
    Serial.println("Server web berjalan di port 80");
}

/**
 * @brief Loop utama untuk membersihkan client WebSocket dan mengirim data periodik.
 */
void ESPWebSocketServer::loop() {
    ws.cleanupClients();
    sendPeriodicData();
}
