const mongoose = require('mongoose');
const { Schema } = mongoose;
const Devis = new Schema({
	_devis_numero: {
		type: String
	},
	_devis_date: {
		type: Date
	},
	_devis_commentaire: {
		type: String
	},
	_devis_TVA: {
		type: Number
	},
	_devis_image: {
		type: String
	},
	Fournisseur: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Fournisseur'
	},
	Client: {
		type: Schema.Types.ObjectId,
		required: true,
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
	}
}, { timestamps: true });

mongoose.model('Devis', Devis);