const mongoose = require('mongoose');
const { Schema } = mongoose;
const Stock = new Schema({
  Produit: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Produit'
  }]
}, { timestamps: true });

mongoose.model('Stock', Stock);