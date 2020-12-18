const mongoose = require('mongoose');
const { Schema } = mongoose;
const Client = new Schema({
	_client_prenomcontact: {
		type: String
	},
	_client_nomcontact: {
		type: String
	},
	_client_raison: {
		type: String
	},
	_client_adresse: {
		type: String
	},
	_client_telephone: {
		type: String
	},
	_client_email: {
		type: String
	},
	_client_ville: {
		type: String
	},
	_client_pays: {
		type: String
	},
	_client_ICE: {
		type: String
	},
	_client_IF: {
		type: String
	},
	_client_RC: {
		type: String
	},
	_client_patente: {
		type: String
	},
	_client_contrat: {
		type: String
	}
}, { timestamps: true });

mongoose.model('Client', Client);