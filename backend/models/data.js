const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hobbies: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Data = mongoose.model('data', dataSchema);

module.exports = Data;