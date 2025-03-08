#ifndef ESPWEBSERVER_H
#define ESPWEBSERVER_H

#include <WiFi.h>
#include <WebServer.h>
#include <LittleFS.h>
#include <ArduinoJson.h>
#include "SensorManager.h"
#include "ActuatorManager.h"
#include "LEDManager.h"

#define LED_BUILTIN 8  // LED bawaan ESP32-C3

/**
 * @class ESPWebServer
 * @brief Kelas untuk mengelola Web Server pada ESP32-C3.
 */
class ESPWebServer {
private:
    const char* ssid; ///< SSID untuk Access Point
    const char* password; ///< Password untuk Access Point
    IPAddress local_IP; ///< IP Address untuk ESP32
    IPAddress gateway; ///< Gateway IP
    IPAddress subnet; ///< Subnet mask
    WebServer server; ///< Objek WebServer
    bool wifiSuccess; ///< Status keberhasilan koneksi Wi-Fi (AP atau STA)
    bool useStationMode; ///< Mode Wi-Fi (true = STA, false = AP)
    const char* ssid_STA; ///< SSID untuk Station Mode
    const char* password_STA; ///< Password untuk Station Mode
    IPAddress primaryDNS; ///< DNS Utama
    IPAddress secondaryDNS; ///< DNS Sekunder
    SensorManager* sensorManager; ///< Pointer ke objek SensorManager
    ActuatorManager* actuatorManager;  ///< Pointer ke objek ActuatorManager
    LEDManager* ledManager;  ///< Pointer ke objek LEDManager

public:
    /**
     * @brief Konstruktor untuk menginisialisasi server dengan SSID, password, dan IP.
     */
    ESPWebServer(const char* ssid_AP, const char* password_AP, 
                const char* ssid_STA, const char* password_STA,
                IPAddress local_IP, IPAddress gateway, IPAddress subnet,
                IPAddress primaryDNS, IPAddress secondaryDNS);

    /**
     * @brief Memulai server dan menginisialisasi WiFi.
     */
    void begin();

    /**
     * @brief Menangani request HTTP dari klien.
     */
    void handleClient();

    /**
     * @brief Memproses status LED sebagai indikator sistem.
     */
    void updateLED();

    /**
     * @brief Menyajikan file index.html dari LittleFS.
     */
    void serveHTML();

    /**
     * @brief Menyajikan file statis (HTML, CSS, JS) dari LittleFS.
     * @param path Path file yang diminta.
     */
    void handleStaticFiles(String path);

    /**
     * @brief Versi tanpa parameter untuk menangani file yang tidak ditemukan.
     */
    void handleStaticFiles();

    /**
     * @brief Menangani request GET `/data` untuk mengirimkan data sensor.
     */
    void handleDataRequest();

    /**
     * @brief Menangani request POST `/control` untuk mengontrol aktuator.
     */
    void handleControlRequest();

    /**
     * @brief Menangani request POST `/config` untuk mengubah mode simulasi.
     */
    void handleConfigRequest();

    /**
     * @brief Mengatur mode WiFi (AP atau STA).
     * @param stationMode True untuk STA Mode, False untuk AP Mode.
     */
    void setMode(bool stationMode);

    /**
     * @brief Menghubungkan ESPWebServer dengan SensorManager.
     * @param manager Pointer ke objek SensorManager.
     */
    void setSensorManager(SensorManager* manager);

    /**
     * @brief Menghubungkan ESPWebServer dengan ActuatorManager.
     * @param manager Pointer ke objek ActuatorManager.
     */
    void setActuatorManager(ActuatorManager* manager);

    /**
     * @brief Menghubungkan ESPWebServer dengan LEDManager.
     * @param manager Pointer ke objek LEDManager.
     */
    void setLEDManager(LEDManager* manager);

private:
    /**
     * @brief Menentukan tipe konten berdasarkan ekstensi file.
     * @param filename Nama file yang diminta.
     * @return String berisi MIME type.
     */
    String getContentType(String filename);
};

#endif
