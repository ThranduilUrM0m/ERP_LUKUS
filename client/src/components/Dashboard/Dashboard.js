import React from "react";
import axios from 'axios';
import moment from 'moment';
import Calendar from './Calendar';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import API from "../../utils/API";
import { FullPage, Slide } from 'react-full-page';
import Clock from 'react-live-clock';
import Chart from 'chart.js';
import 'whatwg-fetch';
import * as $ from "jquery";
import jQuery from 'jquery';
import 'bootstrap';
import socketIOClient from "socket.io-client";

const socketURL =
    process.env.NODE_ENV === 'production'
        ? window.location.hostname
        : 'localhost:8800';

const socket = socketIOClient(socketURL, { 'transports': ['websocket', 'polling'] });
var _ = require('lodash');

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal_msg: ''
        };

        this.disconnect = this.disconnect.bind(this);
        this.get_users = this.get_users.bind(this);
        this.get_user = this.get_user.bind(this);
        this.send_user = this.send_user.bind(this);

        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleChangeFieldUser = this.handleChangeFieldUser.bind(this);
    }
    componentWillMount() {
        const self = this;
        this.get_user();
        socket.on("USER_UPDATED_GET", data => self.get_user());
    }
    componentDidMount() {
        //control the tabs
        $('.tab-pane').addClass('animated');
        $('.tab-pane').addClass('faster');
        $('.nav_link').click((event) => {

            let _li_parent = $(event.target).parent().parent();
            let _li_target = $($(event.target).attr('href'));
            let _link_target = $(event.target);

            $('.tab-pane').not(_li_target).addClass('fadeOutRight');
            $('.tab-pane').not(_li_target).removeClass('fadeInLeft');
            $(".nav li").not(_li_parent).removeClass('active');
            $('.tab-pane').not(_li_target).removeClass('active');
            $('.tab-pane').not(_li_target).removeClass('show');
            $(".nav_link").not(_link_target).removeClass('active');
            $('.nav_link').not(_link_target).removeClass('show');

            $(_li_target).removeClass('fadeOutRight');
            $(_li_target).addClass('fadeInLeft');
            $(_li_parent).addClass('active');
            $(_li_target).addClass('active');
            $(_li_target).addClass('show');
            $(_link_target).addClass('active');
            $(_link_target).addClass('show');

        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.userToEdit) {
            this.setState({
                _user_toEdit_username: nextProps.userToEdit.username,
                _user_toEdit_roles: nextProps.userToEdit.roles,
            });
        }
    }
    disconnect() {
        API.logout();
        window.location = "/login";
    }
    async get_users() {
        const self = this;
        const { _user } = this.state;
        if (_.includes(_user.roles, 'admin')) {
            await API.get_users()
                .then((res) => {
                    self.setState({
                        _users: res.data.users,
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            self.setState(prevState => ({
                _users: [_user]
            }));
        }
    }
    async get_user() {
        const self = this;
        await API.get_user(localStorage.getItem('email'))
            .then((res) => {
                self.setState({
                    _user: res.data.user,
                }, () => {
                    self.get_users();
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }
    async send_user() {
        let self = this;
        const { _user_toEdit_username, _user_toEdit_roles, _user } = this.state;

        try {
            await API.update_roles({ _user_toEdit_username, _user_toEdit_roles })
                .then((res) => {
                    self.setState({
                        modal_msg: res.data.text
                    }, () => {
                        console.log(_user_toEdit_roles);
                        function setEditFunction() {
                            return new Promise((resolve, reject) => {
                                setTimeout(function () {
                                    $('#edit_modal').modal('toggle');
                                    self.get_users();
                                    self.get_user();
                                    socket.emit("USER_UPDATED", res.data.text);
                                    true ? resolve('Success') : reject('Error');
                                }, 2000);
                            })
                        }
                        setEditFunction()
                            .then(() => {
                                $('#myModal').on('hidden.bs.modal', function (e) {
                                    if (_.includes(_user.roles, 'Deleted')) {
                                        self.disconnect();
                                    }
                                })
                            });
                    })
                })
                .catch((error) => {
                    self.setState({
                        modal_msg: error.response.data.text
                    }, () => {
                        $('#edit_modal_error_roles').modal('toggle');
                    });
                });
        } catch (error) {
            self.setState({
                modal_msg: JSON.stringify(error)
            }, () => {
                $('#edit_modal_error_roles').modal('toggle');
            });
        }
    }
    handleEditUser(user) {
        const { setEditUser } = this.props;
        setEditUser(user);
    }
    handleDeleteUser(user) {
        const self = this;
        const { onSubmitNotification } = this.props;
        const { _user_toEdit_username, _user_toEdit_roles, _user } = this.state;

        function setEditFunction() {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    self.handleEditUser(user);
                    true ? resolve('Success') : reject('Error');
                }, 2000);
            })
        }
        setEditFunction()
            .then(() => {
                self.setState(prevState => ({
                    _user_toEdit_roles: prevState._user_toEdit_roles.concat('Deleted')
                }), () => {
                    self.send_user();
                    return axios.post('/api/notifications', {
                        type: 'User Deleted',
                        description: 'User \' ' + user.username + ' \' Deleted.',
                        author: _user.email
                    })
                        .then((res_n) => {
                            onSubmitNotification(res_n.data);
                        })
                        .catch(error => {
                            console.log(error)
                        });
                });
                return true;
            })
            .catch(err => console.log('There was an error:' + err));
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
    handleChangeField(key, event) {
        this.setState({ [key]: event.target.value });
    }
    handleChangeFieldUser(key, event) {
        this.setState({
            [key]: [event.target.value],
        });
    }
    render() {
        const { modal_msg } = this.state;
        return (
            <FullPage scrollMode={'normal'}>
                <Slide>
                    <section id="first_section_dashboard" className="first_section_dashboard">
                        <div className="wrapper_full">
                            <div className="nav nav-pills flex-column left_nav">
                                <a className="logoHolder" href="/">
                                    <img className="logo img-fluid" src="#" alt="APP_NAME" />
                                </a>
                                <ul className="settings_dashboard">
                                    <li><a href="#1a" className="nav_link active" data-toggle="tab"><i className="fas fa-th-large"></i>Dashboard</a></li>
                                    <li><a href="#3a" className="nav_link" data-toggle="tab"><i className="far fa-bell"></i>Notifications</a></li>
                                    <li><a href="#4a" className="nav_link" data-toggle="tab"><i className="fas fa-chart-line"></i>Analytics</a></li>
                                    <li><a href="#2a" className="nav_link" data-toggle="tab"><i className="fas fa-sliders-h"></i>Settings</a></li>
                                    <li><a href="# " className="nav_link logout" onClick={() => this.disconnect()}><i className="fas fa-sign-out-alt"></i>Logout.</a></li>
                                </ul>
                            </div>
                            <div className="nav nav-pills flex-column right_nav">
                                <div className="copyright">
                                    <i className="far fa-copyright"></i>
                                    <span>{moment().format('YYYY')}</span> - With <i className="fas fa-heart"></i> from Zakariae boutaleb.
                                </div>
                            </div>

                            <div className="tab-content clearfix">
                                <div className="dashboard_pane tab-pane active" id="1a">
                                    
                                </div>
                                <div className="settings_pane tab-pane" id="2a">
                                    
                                </div>
                                <div className="notifications_pane tab-pane" id="3a">

                                </div>
                                <div className="analytics_pane tab-pane" id="4a">
                                    
                                </div>
                            </div>

                            <div className="modal fade" id="edit_modal" tabIndex="-1" role="dialog" aria-labelledby="edit_modalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <h5 className="modal-title" id="edit_modalLabel">Hey!</h5>
                                            <div>Your Informations has been updated, we've sent you details to your email, we love you.</div>
                                            <div><small>Thanks {localStorage.getItem('username')}</small></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="edit_modal_error_roles" tabIndex="-1" role="dialog" aria-labelledby="edit_modal_error_rolesLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <h5 className="modal-title" id="edit_modal_error_rolesLabel">Hey!</h5>
                                            <div>{modal_msg}</div>
                                            <div><small>Thanks {localStorage.getItem('username')}</small></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="edit_modal_error" tabIndex="-1" role="dialog" aria-labelledby="edit_modal_errorLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <h5 className="modal-title" id="edit_modal_errorLabel">Hey!</h5>
                                            <div>{modal_msg}</div>
                                            <div><small>Thanks {localStorage.getItem('username')}</small></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Slide>
            </FullPage>
        );
    }
}

const mapStateToProps = state => ({
    userToEdit: state.home.userToEdit,
});

const mapDispatchToProps = dispatch => ({
    setEditUser: user => dispatch({ type: 'SET_EDIT_USER', user }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);