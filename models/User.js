const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config/config');

const { Schema } = mongoose;

const User = new Schema({
    _user_email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    _user_username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    _user_password: {
        type: String,
        required: true
    },
    _user_passwordResetToken: {
        type: String
    },
    _user_passwordResetExpires: {
        type: Date
    },
    _user_fingerprint: {
        type: String
    },
    _user_isVerified: {
        type: Boolean,
        default: false
    },
    _user_logindate: [{
        type: Date
    }],
    Employe: {
        type: Schema.Types.ObjectId, required: true, ref: 'Employe'
    },
    Permission: [{
        type: Schema.Types.ObjectId, required: true, ref: 'Permission'
    }]
}, { timestamps: true });

User.methods = {
    authenticate: function (_user_password) {
        return passwordHash.verify(_user_password, this._user_password);
    },
    getToken: function () {
        return jwt.encode(this, config.secret);
    }
}

module.exports = mongoose.model("User", User);