#include <SPIFFS.h>

void setup() {
    Serial.begin(115200);
    Serial.println("Formatting SPIFFS...");
    SPIFFS.format();
    Serial.println("SPIFFS formatted successfully!");
}

void loop() {}
