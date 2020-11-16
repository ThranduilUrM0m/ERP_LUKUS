const mongoose = require('mongoose');
const { Schema } = mongoose;
const Fournisseur = new Schema({
  _fournisseur_prenomcontact: {
    type: String
  },
  _fournisseur_nomcontact: {
    type: String
  },
  _fournisseur_raison: {
    type: String
  },
  _fournisseur_adresse: {
    type: String
  },
  _fournisseur_telephone: {
    type: String
  },
  _fournisseur_email: {
    type: String
  },
  _fournisseur_ville: {
    type: String
  },
  _fournisseur_pays: {
    type: String
  },
  _fournisseur_ICE: {
    type: String
  },
  _fournisseur_IF: {
    type: String
  },
  _fournisseur_RC: {
    type: String
  },
  _fournisseur_patente: {
    type: String
  }
}, { timestamps: true });

mongoose.model('Fournisseur', Fournisseur);