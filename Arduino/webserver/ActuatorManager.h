#ifndef ACTUATORMANAGER_H
#define ACTUATORMANAGER_H

#include <Arduino.h>

/**
 * @class ActuatorManager
 * @brief Kelas untuk mengelola aktuator (seperti Pompa Air, Lampu Grow).
 */
class ActuatorManager {
private:
    struct Actuator {
        String tagname;  ///< Nama aktuator (misalnya, "Pompa Air")
        uint8_t pin;     ///< Pin GPIO yang digunakan
    };

    Actuator actuators[2];  // Array untuk menyimpan aktuator

public:
    /**
     * @brief Konstruktor untuk menginisialisasi aktuator dengan GPIO yang sesuai.
     */
    ActuatorManager();

    /**
     * @brief Mendapatkan status aktuator berdasarkan tagname.
     * @param tagname Nama aktuator ("Pompa Air" atau "Lampu Grow").
     * @return "On" jika HIGH, "Off" jika LOW.
     */
    String getActuatorStatus(const String& tagname);

    /**
     * @brief Mengubah status aktuator.
     * @param tagname Nama aktuator yang ingin diubah.
     * @param state "On" untuk HIGH, "Off" untuk LOW.
     */
    void setActuatorState(const String& tagname, const String& state);
};

#endif
