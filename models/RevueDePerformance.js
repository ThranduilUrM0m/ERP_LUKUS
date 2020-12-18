const mongoose = require('mongoose');
const { Schema } = mongoose;
const RevueDePerformance = new Schema({
	_revueDePerformance_date: {
		type: Date
	},
	_revueDePerformance_resultat: {
		type: String
	}
}, { timestamps: true });

mongoose.model('RevueDePerformance', RevueDePerformance);