const mongoose = require('mongoose');
const { Schema } = mongoose;
const Voyage = new Schema({
  _voyage_datedepart: {
    type: Date
  },
  _voyage_datearrive: {
    type: Date
  },
  _voyage_lieudepart: {
    type: String
  },
  _voyage_lieuarrive: {
    type: String
  },
  _voyage_statut: {
    type: String
  },
  Passager: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Passager'
  }],
  Vehicule: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Vehicule'
  }
}, { timestamps: true });

mongoose.model('Voyage', Voyage);