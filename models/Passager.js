const mongoose = require('mongoose');
const { Schema } = mongoose;
const Passager = new Schema({
  _passager_prenom: {
    type: String
  },
  _passager_nom: {
    type: String
  },
  _passager_telephone: {
    type: String
  },
  _passager_email: {
    type: String
  },
  _passager_adresse: {
    type: String
  },
  _passager_ville: {
    type: String
  },
  _passager_pays: {
    type: String
  }
}, { timestamps: true });

mongoose.model('Passager', Passager);