const User = require('../../models/User.js');
const Token = require('../../models/Token.js');
const passwordHash = require("password-hash");

const nodemailer = require('nodemailer');
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;
const crypto = require('crypto');
require('dotenv').config()

/* const myOAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);
myOAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});
const myAccessToken = myOAuth2Client.getAccessToken(); */

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
        subject: 'username : '+mail_username+' location : '+mail_location+' phone : '+mail_phone, // Subject line
        text: mail_content, // plain text body
    });
    console.log('Message sent: %s', info.messageId);
}
async function send_mail(req, res) {
    const { mail_username, mail_location, mail_email, mail_phone, mail_content } = req.body;
    if(!mail_username || !mail_email || !mail_content) {
        return res.status(400).json({
            text: "Requête invalide"
        });
    }
    try {
        main(mail_username, mail_location, mail_email, mail_phone, mail_content).catch(console.error);
    }catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}
async function confirmationPost(req, res, next) {
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).json({ text: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).json({ text: 'We were unable to find a user for this token.' });
            if (user._user_isVerified) return res.status(400).json({ text: 'This user has already been verified.' });
 
            // Verify and save the user
            user._user_isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).json({ text: err.message }); }
                res.status(200).json({text: "The account has been verified. Please log in."});
            });
        });
    });
}
async function resendTokenPost(req, res, next) {
 
    User.findOne({ _user_email: req.body._user_email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user._user_isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the email
            main(mail_username, mail_location, mail_email, mail_phone, mail_content).catch(console.error);
            var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
            var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
    });
}

async function signup(req, res) {
    const { _user_email, _user_username, _user_password, _user_fingerprint, _user_isVerified, _user_logindate, Employe, Permission } = req.body;
    try {
        if (!_user_email || !_user_username || !_user_password || !_user_fingerprint || !_user_isVerified || !_user_logindate || !Employe || !Permission) {
            return res.status(400).json({
                text: "It looks like some information about u, wasn't correctly submitted, please retry."
            });
        }
        const user = {
            _user_email: _user_email,
            _user_username: _user_username,
            _user_password: passwordHash.generate(_user_password),
            _user_fingerprint: _user_fingerprint,
            _user_isVerified: _user_isVerified,
            _user_logindate: _user_logindate,
            Employe: Employe,
            Permission: Permission
        };
        const findUserByEmail = await User.findOne({
            _user_email: user._user_email
        });
        const findUserByUsername = await User.findOne({
            _user_username: user._user_username
        });
        if (findUserByEmail) {
            return res.status(400).json({
                text: "This Email exists already can u, please submit another Email."
            });
        }
        if (findUserByUsername) {
            return res.status(400).json({
                text: "This Username exists already can u, please submit another Username."
            });
        }
        
        // Sauvegarde de l'utilisateur en base
        const userData = new User(user);
        const userObject = await userData.save();

        // Create a verification token for this user
        var token = new Token({ _userId: userData._id, token: crypto.randomBytes(16).toString('hex') });
        const tokenObject = await token.save();

        //send mail
        verification_email(userData._user_email, 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n');
        return res.status(200).json({
            text: "And that's it, only thing left is verify your email. \nWe have sent you an email verification."
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
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
        if(!findUser._user_isVerified)
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
        const findUser = await User.findOne({ 
            _user_email 
        });
        if (!findUser)
            return res.status(401).json({
                text: "L'utilisateur n'existe pas"
            });
        return res.status(200).json({
            user: findUser
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
        const findUsers = await User.find();
        if (!findUsers)
            return res.status(401).json({
                text: "No users found."
            });
        return res.status(200).json({
            users: findUsers
        });
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}

exports.get_user = get_user;
exports.get_users = get_users;
exports.login = login;
exports.signup = signup;
exports.send_mail = send_mail;
exports.confirmationPost = confirmationPost;
exports.resendTokenPost = resendTokenPost;