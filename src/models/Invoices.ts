export interface Invoice {
  id: string;
  customerNumber: string;
  referenceMonth: string;
  electricEnergyKWh: string;
  electricEnergyValue: string;
  compensatedEnergyKWh: string;
  compensatedEnergyValue: string;
  publicLightingCharge: string;
  createdAt: string;
}
