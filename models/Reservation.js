const mongoose = require('mongoose');
const { Schema } = mongoose;
const Reservation = new Schema({
  _reservation_nombreadultes: {
    type: Number
  },
  _reservation_nombreenfants: {
    type: Number
  },
  _reservation_datereservation: {
    type: Date
  },
  _reservation_commentaire: {
    type: String
  },
  Voyage: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Voyage'
  }],
  Client: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Client'
  }
}, { timestamps: true });

mongoose.model('Reservation', Reservation);