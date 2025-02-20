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
        server.on("/", std::bind(&ESPWebServer::handleRoot, this));

        // Memulai server
        server.begin();
        Serial.println("🚀 Server web telah dimulai!");
    }
}

/**
 * @brief Handler untuk menangani request ke root "/".
 */
void ESPWebServer::handleRoot() {
    Serial.println("Permintaan masuk ke halaman utama...");
    digitalWrite(LED_BUILTIN, HIGH);  // LED menyala saat ada request
    server.send(200, "text/html", "<h1>ESP32-C3 Web Server (OOP) dengan IP Kustom</h1>");
    delay(500);
    digitalWrite(LED_BUILTIN, LOW);   // Matikan LED setelah respons dikirim
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
