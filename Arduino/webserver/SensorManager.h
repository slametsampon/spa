#ifndef SENSORMANAGER_H
#define SENSORMANAGER_H

#include <Arduino.h>

/**
 * @class SensorManager
 * @brief Kelas untuk mengelola pembacaan sensor dan mode simulasi.
 */
class SensorManager {
private:
    bool simulationMode; ///< Menyimpan status mode simulasi

public:
    /**
     * @brief Konstruktor SensorManager. Mode simulasi default: aktif.
     */
    SensorManager();

    /**
     * @brief Mengubah mode simulasi sensor.
     * @param mode `true` untuk mode simulasi, `false` untuk mode real sensor.
     */
    void setSimulationMode(bool mode);

    /**
     * @brief Mengecek apakah mode simulasi aktif.
     * @return `true` jika mode simulasi aktif, `false` jika membaca sensor asli.
     */
    bool isSimulationMode();

    /**
     * @brief Membaca nilai pH dari sensor atau simulasi.
     * @return Nilai pH dalam rentang 5.0 - 8.0 jika simulasi, atau dari sensor jika tidak.
     */
    float readPH();

    /**
     * @brief Membaca nilai EC dari sensor atau simulasi.
     * @return Nilai EC dalam rentang 1.2 - 1.7 jika simulasi, atau dari sensor jika tidak.
     */
    float readEC();

    /**
     * @brief Membaca suhu air dari sensor atau simulasi.
     * @return Nilai suhu dalam derajat Celcius.
     */
    float readTemperature();
};

#endif
