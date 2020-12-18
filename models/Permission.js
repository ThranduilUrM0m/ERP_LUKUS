const mongoose = require('mongoose');
const { Schema } = mongoose;
const Permission = new Schema({
	_permission_titre: {
		type: String
	}
}, { timestamps: true });

mongoose.model('Permission', Permission);