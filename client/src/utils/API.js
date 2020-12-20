import axios from "axios";
const headers = {
    "Content-Type": "application/json"
};
const burl = "";

export default {
    
    send_mail: function(send) {
        return axios.post(`${burl}/user/send_mail`, send, { headers: headers });
    },
    confirmation: function(send) {
        return axios.post(`${burl}/user/confirmation`, send, { headers: headers });
    },

    get_users: function() {
        return axios.post(
            `${burl}/user/get_users`,
            {
                headers: headers
            }
        );
    },
    get_user: function(_user_email) {
        return axios.post(
            `${burl}/user/get_user`,
            {
                _user_email
            },
            {
                headers: headers
            }
        );
    },
    set_user: function(send) {
        return axios.patch(`${burl}/user/set_user`, send, { headers: headers });
    },

    isAuth: function() {
        return localStorage.getItem("token") !== null;
    },

    login: function(_user_email, _user_password) {
        return axios.post(
            `${burl}/user/login`,
            {
                _user_email,
                _user_password
            },
            {
                headers: headers
            }
        );
    },
    logout: function() {
        localStorage.clear();
    }
};