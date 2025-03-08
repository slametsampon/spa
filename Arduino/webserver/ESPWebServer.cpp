#include "ESPWebServer.h"

/**
 * @brief Konstruktor ESPWebServer.
 */
ESPWebServer::ESPWebServer(const char* ssid_AP, const char* password_AP,
                           const char* ssid_STA, const char* password_STA,
                           IPAddress local_IP, IPAddress gateway, IPAddress subnet,
                           IPAddress primaryDNS, IPAddress secondaryDNS)
    : ssid(ssid_AP), password(password_AP),
      ssid_STA(ssid_STA), password_STA(password_STA),
      local_IP(local_IP), gateway(gateway), subnet(subnet),
      primaryDNS(primaryDNS), secondaryDNS(secondaryDNS),
      server(80), wifiSuccess(false) {}

void ESPWebServer::setSensorManager(SensorManager* manager) {
    sensorManager = manager;
}
    
void ESPWebServer::setActuatorManager(ActuatorManager* manager) {
    actuatorManager = manager;
}

void ESPWebServer::setLEDManager(LEDManager* manager) {
    ledManager = manager;
}

/**
 * @brief Memulai Access Point dan server web.
 */
void ESPWebServer::begin() {
    Serial.begin(115200);
    delay(1000);
    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, LOW);

    wifiSuccess = false; // Reset status

    if (useStationMode) {
        Serial.println("\n🔄 Memulai ESP32-C3 dalam Station Mode...");

        WiFi.mode(WIFI_STA);
        if (!WiFi.config(local_IP, gateway, subnet)) {
            Serial.println("❌ Gagal mengatur IP statis untuk STA Mode!");
        }

        WiFi.begin(ssid_STA, password_STA);
        Serial.print("🔗 Menghubungkan ke WiFi");

        int retry = 20;  // Timeout 10 detik
        while (WiFi.status() != WL_CONNECTED && retry-- > 0) {
            delay(500);
            Serial.print(".");
        }

        if (WiFi.status() == WL_CONNECTED) {
            Serial.println("\n✅ Berhasil terhubung ke WiFi!");
            Serial.print("📡 Alamat IP STA: ");
            Serial.println(WiFi.localIP());
            wifiSuccess = true;
        } else {
            Serial.println("\n❌ Gagal terhubung ke WiFi! Beralih ke AP Mode...");
            useStationMode = false;
        }
    }

    if (!useStationMode) {
        Serial.println("\n📶 Memulai ESP32-C3 dalam Access Point Mode...");

        WiFi.mode(WIFI_AP);
        if (!WiFi.softAPConfig(local_IP, gateway, subnet)) {
            Serial.println("❌ Gagal mengatur IP Address untuk AP Mode!");
            return;
        }

        if (WiFi.softAP(ssid, password)) {
            Serial.println("✅ Access Point berhasil dibuat!");
            Serial.print("📡 Alamat IP AP: ");
            Serial.println(WiFi.softAPIP());
            wifiSuccess = true;
        } else {
            Serial.println("❌ Gagal membuat Access Point!");
            return;
        }
    }

    // Inisialisasi server
    server.on("/", std::bind(&ESPWebServer::serveHTML, this));
    server.on("/data", HTTP_GET, std::bind(&ESPWebServer::handleDataRequest, this));
    server.on("/control", HTTP_POST, std::bind(&ESPWebServer::handleControlRequest, this));
    server.on("/config", HTTP_POST, std::bind(&ESPWebServer::handleConfigRequest, this));
    server.onNotFound([this]() { this->handleStaticFiles(server.uri()); });

    server.begin();
    Serial.println("🚀 Server web telah dimulai!");

    // Inisialisasi LittleFS
    if (!LittleFS.begin()) {
        Serial.println("❌ Gagal mount LittleFS!");
    } else {
        Serial.println("✅ LittleFS berhasil dimount!");
    }
}

void ESPWebServer::setMode(bool stationMode) {
    useStationMode = stationMode;
}

/**
 * @brief Menangani request HTTP dari klien.
 */
void ESPWebServer::handleClient() {
    server.handleClient();
}

// ====== HANDLE DATA SENSOR & AKTUATOR (GET /data) ======
void ESPWebServer::handleDataRequest() {
    if (!sensorManager || !actuatorManager) {
        server.send(500, "application/json", R"({"error":"SensorManager or ActuatorManager not initialized"})");
        return;
    }

    StaticJsonDocument<256> jsonDoc;

    // Menambahkan data sensor
    JsonArray sensors = jsonDoc.createNestedArray("sensors");

    JsonObject sensor1 = sensors.createNestedObject();
    sensor1["name"] = "pH Air";
    sensor1["value"] = String(sensorManager->readPH(), 2);

    JsonObject sensor2 = sensors.createNestedObject();
    sensor2["name"] = "EC";
    sensor2["value"] = String(sensorManager->readEC(), 2);

    JsonObject sensor3 = sensors.createNestedObject();
    sensor3["name"] = "Suhu Air";
    sensor3["value"] = String(sensorManager->readTemperature(), 1) + "°C";

    // Menambahkan data aktuator
    JsonArray actuators = jsonDoc.createNestedArray("actuators");

    JsonObject actuator1 = actuators.createNestedObject();
    actuator1["tagname"] = "Pompa Air";
    actuator1["status"] = actuatorManager->getActuatorStatus("Pompa Air");

    JsonObject actuator2 = actuators.createNestedObject();
    actuator2["tagname"] = "Lampu Grow";
    actuator2["status"] = actuatorManager->getActuatorStatus("Lampu Grow");

    // Konversi JSON ke string untuk dikirim ke frontend
    String jsonResponse;
    serializeJson(jsonDoc, jsonResponse);

    server.send(200, "application/json", jsonResponse);
}

// ====== HANDLE KONTROL AKTUATOR (POST /control) ======
void ESPWebServer::handleControlRequest() {
    if (!actuatorManager) {
        server.send(500, "application/json", R"({"error":"ActuatorManager not initialized"})");
        return;
    }

    if (server.hasArg("plain") == false) {
        server.send(400, "text/plain", "Bad Request");
        return;
    }

    String requestBody = server.arg("plain");
    DynamicJsonDocument doc(256);
    deserializeJson(doc, requestBody);

    String tagname = doc["tagname"];
    String state = doc["state"];

    actuatorManager->setActuatorState(tagname, state);
    Serial.printf("Mengontrol %s ke %s\n", tagname.c_str(), state.c_str());

    server.send(200, "application/json", R"({"status":"success"})");
}

void ESPWebServer::handleConfigRequest() {
    if (!server.hasArg("plain")) {
        server.send(400, "text/plain", "Bad Request");
        return;
    }

    String requestBody = server.arg("plain");
    DynamicJsonDocument doc(256);
    deserializeJson(doc, requestBody);

    bool simulationMode = doc["simulation"];
    sensorManager->setSimulationMode(simulationMode);

    Serial.printf("Mode Simulasi diubah ke: %s\n", simulationMode ? "ON" : "OFF");

    server.send(200, "application/json", R"({"status":"success"})");
}

/**
 * @brief Indikasi status sistem dengan LED.
 */
void ESPWebServer::updateLED() {
    if (!ledManager) {
        Serial.println("⚠️ LEDManager belum diinisialisasi!");
        return;
    }

    if (wifiSuccess) {
        ledManager->blinkSuccess();  // LED berkedip lambat jika berhasil
    } else {
        ledManager->blinkError();    // LED berkedip cepat jika gagal
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
