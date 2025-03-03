#include "SensorManager.h"

SensorManager::SensorManager() {
    simulationMode = true;  // Default: mode simulasi aktif
}

/**
 * @brief Mengatur mode simulasi untuk sensor.
 * @param mode `true` untuk mode simulasi, `false` untuk membaca sensor asli.
 */
void SensorManager::setSimulationMode(bool mode) {
    simulationMode = mode;
}

/**
 * @brief Mengecek apakah mode simulasi aktif.
 * @return `true` jika mode simulasi aktif, `false` jika membaca data sensor asli.
 */
bool SensorManager::isSimulationMode() {
    return simulationMode;
}

/**
 * @brief Membaca nilai pH dari sensor atau mode simulasi.
 * @return Nilai pH antara 5.0 - 8.0 jika simulasi, atau data sensor asli jika mode simulasi mati.
 */
float SensorManager::readPH() {
    if (simulationMode) {
        return random(50, 80) / 10.0;  // Simulasi pH antara 5.0 - 8.0
    } else {
        int rawValue = analogRead(34); // Contoh: Port ADC untuk sensor pH
        return (rawValue * 3.3 / 4095.0) * 7.0;  // Konversi ADC ke pH
    }
}

/**
 * @brief Membaca nilai EC (Electrical Conductivity) dari sensor atau mode simulasi.
 * @return Nilai EC antara 1.2 - 1.7 jika simulasi, atau data sensor asli jika mode simulasi mati.
 */
float SensorManager::readEC() {
    if (simulationMode) {
        return random(12, 17) / 10.0;  // Simulasi EC antara 1.2 - 1.7
    } else {
        int rawValue = analogRead(35); // Contoh: Port ADC untuk sensor EC
        return (rawValue * 3.3 / 4095.0) * 2.0;  // Konversi ADC ke EC
    }
}

/**
 * @brief Membaca suhu air dari sensor atau mode simulasi.
 * @return Suhu dalam derajat Celcius (20.0 - 25.0°C jika simulasi, atau dari sensor asli jika aktif).
 */
float SensorManager::readTemperature() {
    if (simulationMode) {
        return random(200, 250) / 10.0;  // Simulasi suhu 20.0 - 25.0°C
    } else {
        int rawValue = analogRead(36); // Contoh: Port ADC untuk sensor suhu
        return (rawValue * 3.3 / 4095.0) * 100.0;  // Konversi ADC ke suhu dalam °C
    }
}
