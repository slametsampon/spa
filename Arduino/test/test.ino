#include <Arduino.h>
#include <esp_partition.h>

void setup() {
    Serial.begin(115200);
    delay(1000);
    Serial.println("\n🔍 Mengecek Partisi Flash di ESP32-C3...\n");

    // Mendapatkan daftar semua partisi
    Serial.println("Nama Partisi |  Tipe  |  SubTipe  |  Offset  |  Ukuran");
    Serial.println("-------------------------------------------------------");

    esp_partition_iterator_t it = esp_partition_find(ESP_PARTITION_TYPE_ANY, ESP_PARTITION_SUBTYPE_ANY, NULL);
    while (it != NULL) {
        const esp_partition_t *part = esp_partition_get(it);
        Serial.printf("%-12s |  0x%02X  |  0x%02X  |  0x%06X  |  %d KB\n",
                      part->label, part->type, part->subtype, part->address, part->size / 1024);
        it = esp_partition_next(it);
    }
    Serial.println("\n✅ Selesai!");
}

void loop() {
}
