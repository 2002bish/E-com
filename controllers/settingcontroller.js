
const { OperationalSettings, PaymentSettings, TaxSettings } = require('../models/settingModel');

// Get Operational Settings
exports.getOperationalSettings = async (req, res) => {
  try {
    const settings = await OperationalSettings.findOne({});
    res.status(200).json(settings);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching operational settings', details: error });
  }
};

// Update Operational Settings
exports.updateOperationalSettings = async (req, res) => {
  try {
    const settings = await OperationalSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json({ message: 'Operational settings updated', settings });
  } catch (error) {
    res.status(400).json({ error: 'Error updating operational settings', details: error });
  }
};

// Get Payment Settings
exports.getPaymentSettings = async (req, res) => {
  try {
    const settings = await PaymentSettings.findOne({});
    res.status(200).json(settings);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching payment settings', details: error });
  }
};

// Update Payment Settings
exports.updatePaymentSettings = async (req, res) => {
  try {
    const settings = await PaymentSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json({ message: 'Payment settings updated', settings });
  } catch (error) {
    res.status(400).json({ error: 'Error updating payment settings', details: error });
  }
};

// Get Tax Settings
exports.getTaxSettings = async (req, res) => {
  try {
    const settings = await TaxSettings.findOne({});
    res.status(200).json(settings);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching tax settings', details: error });
  }
};

// Update Tax Settings
exports.updateTaxSettings = async (req, res) => {
  try {
    const settings = await TaxSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json({ message: 'Tax settings updated', settings });
  } catch (error) {
    res.status(400).json({ error: 'Error updating tax settings', details: error });
  }
};
