const mongoose = require('mongoose');
const { Schema } = mongoose;
const Poste = new Schema({
	_poste_titre: {
		type: String
	},
	_poste_salaireinitiale: {
		type: Schema.Types.Decimal128
	}
}, { timestamps: true });

mongoose.model('Poste', Poste);