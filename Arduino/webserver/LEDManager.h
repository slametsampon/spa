#ifndef LEDMANAGER_H
#define LEDMANAGER_H

#include <Arduino.h>

/**
 * @class LEDManager
 * @brief Kelas untuk mengelola status LED pada ESP32-C3.
 */
class LEDManager {
private:
    uint8_t pin;  ///< GPIO yang digunakan untuk LED

public:
    /**
     * @brief Konstruktor LEDManager.
     * @param pin GPIO yang digunakan untuk LED indikator.
     */
    LEDManager(uint8_t pin);

    /**
     * @brief Menginisialisasi LED.
     */
    void begin();

    /**
     * @brief Menyalakan LED.
     */
    void turnOn();

    /**
     * @brief Mematikan LED.
     */
    void turnOff();

    /**
     * @brief LED berkedip lambat (indikasi sukses).
     */
    void blinkSuccess();

    /**
     * @brief LED berkedip cepat (indikasi error).
     */
    void blinkError();
};

#endif
