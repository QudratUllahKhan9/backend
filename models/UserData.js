import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  deliverableId: String,
  publishedOn: String,
  qrCodeStatus: String,
  name: String,
  id: String,
  issuedOn: String,
  validUntil: String,
  type: String,
  model: String,
  company: String,
  trainingLocation: String,
  trainer: String
});

// Ensure that the model is created only once, to avoid overwriting it in a hot-reloading environment
export default mongoose.models.Data || mongoose.model('Data', DataSchema);
