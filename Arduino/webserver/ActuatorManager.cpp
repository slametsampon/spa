#include "ActuatorManager.h"

ActuatorManager::ActuatorManager() {
    // Inisialisasi aktuator (nama & pin GPIO)
    actuators[0] = {"Pompa Air", 5};  // GPIO 5
    actuators[1] = {"Lampu Grow", 4}; // GPIO 4

    // Atur pin sebagai output & matikan secara default
    for (int i = 0; i < 2; i++) {
        pinMode(actuators[i].pin, OUTPUT);
        digitalWrite(actuators[i].pin, LOW); // Default: OFF
    }
}

String ActuatorManager::getActuatorStatus(const String& tagname) {
    for (int i = 0; i < 2; i++) {
        if (actuators[i].tagname == tagname) {
            return (digitalRead(actuators[i].pin) == HIGH) ? "On" : "Off";
        }
    }
    return "Unknown";  // Jika tagname tidak ditemukan
}

void ActuatorManager::setActuatorState(const String& tagname, const String& state) {
    for (int i = 0; i < 2; i++) {
        if (actuators[i].tagname == tagname) {
            digitalWrite(actuators[i].pin, (state == "On") ? HIGH : LOW);
            return;
        }
    }
}
