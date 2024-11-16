
const mongoose = require('mongoose');

// Operational Settings Schema
const operationalSettingsSchema = new mongoose.Schema({
  workingHours: { type: String, default: '09:00-18:00' }, // e.g., '09:00-18:00'
  deliveryZones: { type: [String], default: ['Zone 1', 'Zone 2', 'Zone 3'] },
  otherSettings: { type: Map, of: String }, // Any additional key-value settings
});

// Payment Settings Schema
const paymentSettingsSchema = new mongoose.Schema({
  enabledGateways: { type: [String], default: ['Stripe', 'PayPal'] },
  currency: { type: String, default: 'NPR' },
  otherSettings: { type: Map, of: String },
});

// Tax and Compliance Settings Schema
const taxSettingsSchema = new mongoose.Schema({
  taxRates: { type: Map, of: Number }, // Keyed by region or category, e.g., {'NY': 0.08}
  complianceDocuments: { type: [String], default: [] },
  otherSettings: { type: Map, of: String },
});

const OperationalSettings = mongoose.model('OperationalSettings', operationalSettingsSchema);
const PaymentSettings = mongoose.model('PaymentSettings', paymentSettingsSchema);
const TaxSettings = mongoose.model('TaxSettings', taxSettingsSchema);

module.exports = {
  OperationalSettings,
  PaymentSettings,
  TaxSettings
};