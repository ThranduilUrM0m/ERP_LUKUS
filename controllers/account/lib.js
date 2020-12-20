const User = require('../../models/User.js');
const Employe = require('../../models/Employe.js');
const Permission = require('../../models/Permission.js');
const Token = require('../../models/Token.js');
const passwordHash = require("password-hash");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const assert = require('assert');
require('dotenv').config();

/* const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const myOAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);
myOAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});
const myAccessToken = myOAuth2Client.getAccessToken();

async function verification_email(user_email, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL, //your gmail account you used to set the project up in google cloud console"
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: myAccessToken //access token variable we defined earlier
        }
    });
    let info = await transporter.sendMail({
        from: 'contact@boutaleb.dev', // sender address
        to: user_email, // list of receivers
        subject: 'Hello ✔ and Welcome', // Subject line
        text: text, // plain text body
    });
    console.log('Message sent: %s', info.messageId);
}
async function main(mail_username, mail_location, mail_email, mail_phone, mail_content) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL, //your gmail account you used to set the project up in google cloud console"
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: myAccessToken //access token variable we defined earlier
        }
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: mail_email, // sender address
        to: 'contact@boutaleb.dev', // list of receivers
        subject: 'username : ' + mail_username + ' location : ' + mail_location + ' phone : ' + mail_phone, // Subject line
        text: mail_content, // plain text body
    });
    console.log('Message sent: %s', info.messageId);
} */

async function send_mail(req, res) {
    const { mail_username, mail_location, mail_email, mail_phone, mail_content } = req.body;
    if (!mail_username || !mail_email || !mail_content) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    }
    try {
        main(mail_username, mail_location, mail_email, mail_phone, mail_content).catch(console.error);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}
async function confirmationPost(req, res, next) {
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).json({ text: 'We were unable to find a valid token. Your token my have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, _user) {
            if (!_user) return res.status(400).json({ text: 'We were unable to find a user for this token.' });
            if (_user._user_isVerified) return res.status(400).json({ text: 'This user has already been verified.' });

            // Verify and save the user
            _user._user_isVerified = true;
            _user.save(function (err) {
                if (err) { return res.status(500).json({ text: err.message }); }
                res.status(200).json({ text: "The account has been verified. Please log in." });
            });
        });
    });
}
async function resendTokenPost(req, res, next) {

    User.findOne({ _user_email: req.body._user_email }, function (err, _user) {
        if (!_user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (_user._user_isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

        // Create a verification token, save it, and send email
        var token = new Token({ _userId: _user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            main(mail_username, mail_location, mail_email, mail_phone, mail_content).catch(console.error);
            var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { _user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
            var mailOptions = { from: 'no-reply@codemoto.io', to: _user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + _user.email + '.');
            });
        });
    });
}

async function login(req, res) {
    const { _user_email, _user_password } = req.body;

    try {
        if (!_user_email || !_user_password) {
            //Le cas où l'email ou bien le password ne serait pas soumit ou nul
            return res.status(400).json({
                text: "Please fill out both email and password."
            });
        }
        // On check si l'utilisateur existe en base
        const findUser = await User.findOne({
            _user_email
        });
        if (!findUser)
            return res.status(401).json({
                text: "Verify your email, this account is not registred."
            });
        if (!findUser.authenticate(_user_password))
            return res.status(401).json({
                text: "Incorrect Password."
            });
        if (!findUser._user_isVerified)
            return res.status(401).json({
                text: "Your account has not been verified. Please check your inbox for a verification email that was sent to you."
            });

        //If User is marked to be deleted, modify the mark and save on database


        return res.status(200).json({
            token: findUser.getToken(),
            _user_email: findUser._user_email,
            _user_password: findUser._user_password,
            text: "Authentification successful."
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}

async function get_users(req, res) {
    try {
        // On check si l'utilisateur existe en base
        const findUsers = await User
            .find()
            .populate({
                path: 'Employe',
                populate: {
                    path: 'Poste',
                },
                populate: {
                    path: 'RevueDePerformance',
                }
            })
            .populate({
                path: 'Permission'
            });
        if (!findUsers)
            return res.status(401).json({
                text: "No users found."
            });
        return res.status(200).json({
            _users: findUsers
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}
async function get_user(req, res) {
    const { _user_email } = req.body;
    if (!_user_email) {
        //Le cas où l'email ne serait pas soumit ou nul
        return res.status(400).json({
            text: "Requête invalide"
        });
    }
    try {
        // On check si l'utilisateur existe en base
        const findUser = await User
            .findOne({
                _user_email
            })
            .populate('Permission')
            .populate({
                path: 'Employe',
                populate: [{
                    path: 'Poste'
                }, {
                    path: 'RevueDePerformance'
                }]
            });
        if (!findUser)
            return res.status(401).json({
                text: "L'utilisateur n'existe pas"
            });
        return res.status(200).json({
            _user: findUser
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}
async function set_user(req, res) {
    const { _user, _user_password, _user_password_new, _user_password_new_confirm } = req.body;
    try {
        if (_user_password_new)
            if (_user_password && _user_password_new === _user_password_new_confirm)
                if (!passwordHash.verify(_user_password, _user.password)) {
                    return res.status(400).json({
                        text: "Password Invalid"
                    });
                }


        // Sauvegarde de l'utilisateur en base
        const findUser = await User.findOneAndUpdate(
            { _user_email: _user._user_email },
            {
                $set: {
                    _user_email: _user._user_email,
                    _user_username: _user._user_username,
                    _user_password: _user_password_new ? passwordHash.generate(_user_password_new) : _user.password,
                    _user_passwordResetToken: _user._user_passwordResetToken,
                    _user_passwordResetExpires: _user._user_passwordResetExpires,
                    _user_fingerprint: _user._user_fingerprint,
                    _user_isVerified: _user._user_isVerified,
                    _user_logindate: _user._user_logindate,
                    Permission: _user.Permission
                }
            },
            { upsert: true }
        );

        //verification_email(_user._user_email, 'Hello,\n\n' + 'your information has been changed, if this wasn\'t you, please contact us.\n');
        return res.status(200).json({
            _user_username: _user._user_username,
            _user_email: _user._user_email,
            text: "User updated successfully.",
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

exports.get_users = get_users;
exports.get_user = get_user;
exports.set_user = set_user;

exports.send_mail = send_mail;
exports.confirmationPost = confirmationPost;
exports.resendTokenPost = resendTokenPost;

exports.login = login;