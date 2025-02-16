#ifndef ESPWEBSOCKETSERVER_H
#define ESPWEBSOCKETSERVER_H

#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <LittleFS.h>
#include <AsyncTCP.h>

/**
 * @class ESPWebSocketServer
 * @brief Kelas ini menangani Web Server dan WebSocket pada ESP32-C3.
 */
class ESPWebSocketServer {
private:
    const char* ssid = "ESP32C3-AP";  ///< Nama Access Point (AP)
    const char* password = "12345678"; ///< Password AP
    IPAddress local_IP = IPAddress(192,168,10,1); ///< IP Address ESP32-C3
    IPAddress gateway = IPAddress(192,168,10,1); ///< Gateway
    IPAddress subnet = IPAddress(255,255,255,0); ///< Subnet mask

    AsyncWebServer server; ///< Objek untuk menangani server HTTP
    AsyncWebSocket ws; ///< Objek untuk menangani WebSocket

    /**
     * @brief Mengonfigurasi ESP32-C3 sebagai Access Point.
     */
    void setupAP();

    /**
     * @brief Menginisialisasi LittleFS untuk menyimpan file statis.
     */
    void initFS();

    /**
     * @brief Menampilkan daftar file dalam LittleFS (Debugging)
     */
    void listFiles();

    /**
     * @brief Menyajikan file SPA dari LittleFS.
     */
    void serveSPA();

    /**
     * @brief Callback untuk menangani event WebSocket.
     * @param server Pointer ke AsyncWebSocket server
     * @param client Pointer ke AsyncWebSocket client
     * @param type Jenis event WebSocket (connect, disconnect, data)
     * @param arg Pointer ke data tambahan
     * @param data Data yang diterima
     * @param len Panjang data yang diterima
     */
    static void onWebSocketEvent(AsyncWebSocket *server, AsyncWebSocketClient *client,
                                 AwsEventType type, void *arg, uint8_t *data, size_t len);

    /**
     * @brief Mengirim data ke client secara periodik.
     */
    void sendPeriodicData();

    /**
     * @brief Mengambil content type
     * @param filename Filename
     */
    String getContentType(String filename);

public:
    /**
     * @brief Konstruktor ESPWebSocketServer.
     */
    ESPWebSocketServer();

    /**
     * @brief Memulai Web Server dan WebSocket.
     */
    void begin();

    /**
     * @brief Loop utama untuk membersihkan client WebSocket dan mengirim data berkala.
     */
    void loop();
};

#endif
