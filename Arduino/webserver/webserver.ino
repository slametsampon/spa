#include "ESPWebServer.h"

// Konfigurasi IP Address kustom
IPAddress local_IP(192, 168, 50, 1);
IPAddress gateway(192, 168, 50, 1);
IPAddress subnet(255, 255, 255, 0);

// Membuat objek ESPWebServer dengan SSID, Password, dan IP Address
ESPWebServer espServer("ESP32-AP-OOP", "123456789", local_IP, gateway, subnet);

void setup() {
    espServer.begin();  // Memulai Wi-Fi dengan IP yang sudah dikonfigurasi
}

void loop() {
    espServer.handleClient();
    espServer.updateLED();
}
