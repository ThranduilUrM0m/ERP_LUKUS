const account = require("./account/lib.js");

module.exports = function(app) {
    app.post('/login', account.login);
    app.post('/get_user', account.get_user);
    app.post('/get_users', account.get_users);

    app.post('/send_mail', account.send_mail);
    app.post('/confirmation', account.confirmationPost);
    app.post('/resend', account.resendTokenPost);
};