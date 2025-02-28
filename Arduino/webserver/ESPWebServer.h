#ifndef ESPWEBSERVER_H
#define ESPWEBSERVER_H

#include <WiFi.h>
#include <WebServer.h>
#include <LittleFS.h>  // Tambahkan ini

#define LED_BUILTIN 8  // LED bawaan ESP32-C3

/**
 * @class ESPWebServer
 * @brief Kelas untuk mengelola Access Point dan server web pada ESP32-C3.
 */
class ESPWebServer {
private:
    const char* ssid;      ///< SSID untuk Access Point
    const char* password;  ///< Password untuk Access Point
    IPAddress local_IP;    ///< IP Address untuk ESP32
    IPAddress gateway;     ///< Gateway IP
    IPAddress subnet;      ///< Subnet mask
    WebServer server;      ///< Objek WebServer untuk menangani HTTP
    bool apSuccess;        ///< Status keberhasilan Access Point

public:
    /**
     * @brief Konstruktor untuk menginisialisasi server dengan SSID, password, dan konfigurasi IP.
     * @param ssid Nama SSID Access Point.
     * @param password Kata sandi Access Point.
     * @param local_IP IP Address yang digunakan ESP32.
     * @param gateway IP Address Gateway.
     * @param subnet Subnet mask.
     */
    ESPWebServer(const char* ssid, const char* password, IPAddress local_IP, IPAddress gateway, IPAddress subnet);

    /**
     * @brief Memulai Access Point dan server web.
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
     * @brief Menyajikan file HTML dari LittleFS.
     */
    void serveHTML();

    /**
     * @brief Menyajikan file statis seperti HTML, CSS, JS, dan gambar dari LittleFS.
     * @param path Path file yang diminta.
     */
    void handleStaticFiles(String path);
    void handleStaticFiles();  // Versi tanpa parameter untuk onNotFound

private:
    /**
     * @brief Menangani permintaan ke root URL ("/").
     */
    void handleRoot();
    /**
     * @brief Menentukan tipe konten berdasarkan ekstensi file.
     * @param filename Nama file yang diminta.
     * @return String berisi MIME type.
     */
    String getContentType(String filename);
};

#endif
