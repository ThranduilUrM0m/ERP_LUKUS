const mongoose = require('mongoose');
const { Schema } = mongoose;
const Agence = new Schema({
  _agence_adresse: {
    type: String
  },
  _agence_ville: {
    type: String
  },
  _agence_pays: {
    type: String
  }
}, { timestamps: true });

mongoose.model('Agence', Agence);