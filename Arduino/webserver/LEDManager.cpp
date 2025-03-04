#include "LEDManager.h"

LEDManager::LEDManager(uint8_t pin) {
    this->pin = pin;
}

void LEDManager::begin() {
    pinMode(pin, OUTPUT);
    digitalWrite(pin, LOW); // Default: LED mati
}

void LEDManager::turnOn() {
    digitalWrite(pin, HIGH);
}

void LEDManager::turnOff() {
    digitalWrite(pin, LOW);
}

void LEDManager::blinkSuccess() {
    digitalWrite(pin, HIGH);
    delay(1000);
    digitalWrite(pin, LOW);
    delay(1000);
}

void LEDManager::blinkError() {
    digitalWrite(pin, HIGH);
    delay(200);
    digitalWrite(pin, LOW);
    delay(200);
}
