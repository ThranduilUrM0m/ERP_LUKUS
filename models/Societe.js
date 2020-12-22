const mongoose = require('mongoose');
const { Schema } = mongoose;
const Societe = new Schema({
	_societe_raison: {
		type: String
	},
	_societe_siege: {
		type: String
	},
	_societe_numeroTP: {
		type: String
	},
	_societe_IF: {
		type: String
	},
	_societe_telephone: {
		type: String
	},
	_societe_fax: {
		type: String
	},
	_societe_email: {
		type: String
	},
	_societe_ICE: {
		type: String
	},
	_societe_CNSS: {
		type: String
	},
	_societe_logo: {
		type: String
	},
	Agence: [{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Agence'
	}],
	Employe: [{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Employe'
	}]
}, { timestamps: true });

mongoose.model('Societe', Societe);