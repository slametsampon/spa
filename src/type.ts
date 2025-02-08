// src/types.ts
export interface DeviceConfig {
  tagname: string;
  type: string;
  description: string;
  unit: string;
  highRange: number;
  lowRange: number;
  highAlarm: number;
  lowAlarm: number;
  [key: string]: string | number; // ✅ Tambahkan index signature
}
