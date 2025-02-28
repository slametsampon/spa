#include "ESPWebServer.h"

/**
 * @brief Konstruktor ESPWebServer.
 */
ESPWebServer::ESPWebServer(const char* ssid, const char* password, IPAddress local_IP, IPAddress gateway, IPAddress subnet)
    : ssid(ssid), password(password), local_IP(local_IP), gateway(gateway), subnet(subnet), server(80), apSuccess(false) {}

/**
 * @brief Memulai Access Point dan server web.
 */
void ESPWebServer::begin() {
    Serial.begin(115200);
    delay(1000);
    Serial.println("\nMemulai ESP32-C3 sebagai Access Point...");

    // Inisialisasi LED
    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, LOW);

    // Konfigurasi alamat IP untuk AP Mode
    if (!WiFi.softAPConfig(local_IP, gateway, subnet)) {
        Serial.println("❌ Gagal mengatur IP Address!");
        apSuccess = false;
        return;
    }

    // Konfigurasi ESP32 sebagai Access Point
    if (WiFi.softAP(ssid, password)) {
        Serial.println("✅ Access Point berhasil dibuat.");
        apSuccess = true;
    } else {
        Serial.println("❌ Gagal membuat Access Point!");
        apSuccess = false;
    }

    // Jika AP berhasil, tampilkan alamat IP dan mulai server
    if (apSuccess) {
        IPAddress IP = WiFi.softAPIP();
        Serial.print("📡 Alamat IP AP: ");
        Serial.println(IP);

        // Tentukan rute untuk root URL
        server.on("/", std::bind(&ESPWebServer::serveHTML, this));
        server.onNotFound([this]() { this->handleStaticFiles(server.uri()); });

        // Memulai server
        server.begin();
        Serial.println("🚀 Server web telah dimulai!");
    }

    // Inisialisasi LittleFS
    if (!LittleFS.begin()) {
        Serial.println("❌ Gagal mount LittleFS!");
        return;
    } else {
        Serial.println("✅ LittleFS berhasil dimount!");
    }
}

/**
 * @brief Menangani request HTTP dari klien.
 */
void ESPWebServer::handleClient() {
    server.handleClient();
}

/**
 * @brief Indikasi status sistem dengan LED.
 */
void ESPWebServer::updateLED() {
    if (apSuccess) {
        // Jika AP sukses, LED berkedip tiap 1 detik (standby mode)
        digitalWrite(LED_BUILTIN, HIGH);
        delay(1000);
        digitalWrite(LED_BUILTIN, LOW);
        delay(1000);
    } else {
        // Jika gagal, LED berkedip cepat (200ms ON/OFF)
        digitalWrite(LED_BUILTIN, HIGH);
        delay(200);
        digitalWrite(LED_BUILTIN, LOW);
        delay(200);
    }
}

/**
 * @brief Menyajikan file index.html dari LittleFS.
 */
void ESPWebServer::serveHTML() {
    handleStaticFiles("/index.html");
}

/**
 * @brief Menyajikan file statis seperti CSS, JS, dan gambar dari LittleFS.
 */
void ESPWebServer::handleStaticFiles(String path) {
    if (path == "/") {
        path = "/index.html";
    }

    String contentType = getContentType(path);
    File file = LittleFS.open(path, "r");

    if (!file) {
        server.send(404, "text/plain", "File tidak ditemukan");
        return;
    }

    server.streamFile(file, contentType);
    file.close();
}

void ESPWebServer::handleStaticFiles() {
    handleStaticFiles(server.uri());
}

/**
 * @brief Menentukan tipe konten berdasarkan ekstensi file.
 */
String ESPWebServer::getContentType(String filename) {
    if (filename.endsWith(".html")) return "text/html";
    if (filename.endsWith(".css")) return "text/css";
    if (filename.endsWith(".js")) return "application/javascript";
    if (filename.endsWith(".png")) return "image/png";
    if (filename.endsWith(".jpg")) return "image/jpeg";
    if (filename.endsWith(".svg")) return "image/svg+xml";
    if (filename.endsWith(".webp")) return "image/webp";
    if (filename.endsWith(".ico")) return "image/x-icon";
    return "text/plain";
}
