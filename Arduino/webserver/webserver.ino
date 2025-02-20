#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>

// SSID dan kata sandi untuk Access Point
const char *ssid = "ESP32-Access-Point";
const char *password = "123456789";

// Membuat instance server web pada port 80
WebServer server(80);

// Fungsi yang akan dipanggil saat root URL diakses
void handleRoot() {
  server.send(200, "text/html", "<h1>Selamat datang di ESP32-C3 Web Server</h1>");
}

void setup() {
  Serial.begin(115200);
  delay(1000);

  // Mengonfigurasi ESP32-C3 sebagai Access Point
  Serial.println("Mengonfigurasi Access Point...");
  WiFi.softAP(ssid, password);

  // Menampilkan alamat IP Access Point
  IPAddress IP = WiFi.softAPIP();
  Serial.print("Alamat IP Access Point: ");
  Serial.println(IP);

  // Menentukan rute untuk root URL
  server.on("/", handleRoot);

  // Memulai server
  server.begin();
  Serial.println("Server dimulai");
}

void loop() {
  // Menangani klien yang terhubung
  server.handleClient();
}
