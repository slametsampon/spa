#include <LittleFS.h>

void setup() {
    Serial.begin(115200);
    Serial.println("Formatting LittleFS...");
    LittleFS.format();
    Serial.println("LittleFS formatted successfully!");
}

void loop() {}
