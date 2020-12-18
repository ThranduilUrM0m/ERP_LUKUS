const mongoose = require('mongoose');
const { Schema } = mongoose;
const Produit = new Schema({
	_produit_designation: {
		type: String
	},
	_produit_reference: {
		type: String
	},
	_produit_quantite: {
		type: Number
	},
	_produit_prixunitaire: {
		type: Number
	},
	_produit_statut: {
		type: String
	}
}, { timestamps: true });

mongoose.model('Produit', Produit);