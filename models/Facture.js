const mongoose = require('mongoose');
const { Schema } = mongoose;
const Facture = new Schema({
	_facture_numero: {
		type: String
	},
	_facture_date: {
		type: Date
	},
	_facture_commentaire: {
		type: String
	},
	_facture_TVA: {
		type: Number
	},
	_facture_ispayed: {
		type: Boolean
	},
	_facture_numeropaiement: {
		type: Number
	},
	_facture_datepaiement: {
		type: Date
	},
	_facture_type: {
		type: String
	},
	_facture_image: {
		type: String
	},
	Client: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: 'Client'
	},
	Produit: [{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Produit'
	}],
	Societe: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Societe'
	},
	Fournisseur: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: 'Fournisseur'
	}
}, { timestamps: true });

mongoose.model('Facture', Facture);