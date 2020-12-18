const mongoose = require('mongoose');
const { Schema } = mongoose;
const Bon = new Schema({
	_bon_numero: {
		type: String
	},
	_bon_date: {
		type: String
	},
	_bon_type: {
		type: String
	},
	Facture: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Facture'
	}
}, { timestamps: true });

mongoose.model('Bon', Bon);