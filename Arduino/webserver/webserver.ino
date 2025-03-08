#include "ESPWebServer.h"
#include "SensorManager.h"
#include "ActuatorManager.h"
#include "LEDManager.h"

// Kredensial WiFi untuk STA Mode
const char* ssid_STA = "Sam Family";
const char* password_STA = "basmalah";

// Konfigurasi IP Address yang sama untuk AP dan STA Mode
IPAddress local_IP(192, 168, 1, 100);  // Gunakan IP dalam jaringan router
IPAddress gateway(192, 168, 1, 1);     // IP router sesuai hasil ipconfig
IPAddress subnet(255, 255, 255, 0);    // Subnet mask sesuai router
IPAddress primaryDNS(8, 8, 8, 8);  // Google DNS
IPAddress secondaryDNS(8, 8, 4, 4);

// Membuat objek ESPWebServer
ESPWebServer espServer("ESP32-AP-OOP", "123456789", ssid_STA, password_STA, 
                       local_IP, gateway, subnet, primaryDNS, secondaryDNS);

SensorManager sensorManager;
ActuatorManager actuatorManager;
LEDManager ledManager(8);

void setup() {
    bool stationMode = true;  // Pilih mode: true = STA Mode, false = AP Mode

    espServer.setMode(stationMode);
    espServer.setSensorManager(&sensorManager);
    espServer.setActuatorManager(&actuatorManager);
    espServer.setLEDManager(&ledManager);

    ledManager.begin();
    espServer.begin();
}

void loop() {
    espServer.handleClient();
    espServer.updateLED();
}
