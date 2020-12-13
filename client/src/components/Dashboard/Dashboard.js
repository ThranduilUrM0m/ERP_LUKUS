import React from "react";
import axios from 'axios';
import moment from 'moment';
import Account from './Account';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';
import API from "../../utils/API";
import { FullPage, Slide } from 'react-full-page';
import 'whatwg-fetch';
import * as $ from "jquery";
import jQuery from 'jquery';
import 'bootstrap';
import socketIOClient from "socket.io-client";
import favicon from '../../favicon.svg';

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
            modal_msg: '',

            _user: {},

            _search_value_vehicules: '',
            _search_value_parametres: '',

            _vehicule_marque: '',
            _vehicule_fabricant: '',
            _vehicule_numerochassis: '',
            _vehicule_numeroregistration: '',
            _vehicule_model: '',
            _vehicule_datefabrication: moment().format('YYYY-MM-DD'),
            _vehicule_moteur: '',
            _vehicule_volumereservoir: '',
            _vehicule_poidsavide: '',
            _vehicule_kmparvidange: '',
            _vehicule_image: '',
            _vehicule_categorie: {
                _vehicule_categorie_nom: '',
                _vehicule_categorie_nombrepassagers: '',
                _vehicule_categorie_bagage: '',
                _vehicule_categorie_carrosserie: ''
            },
            _vehicule_consommation: {
                _vehicule_consommation_ville: '',
                _vehicule_consommation_route: '',
                _vehicule_consommation_mixte: ''
            },

            _vehicule_assurance: {
                _vehicule_assurance_entrepriseassurance: '',
                _vehicule_assurance_datedebut: moment().format('YYYY-MM-DD'),
                _vehicule_assurance_datefin: moment().format('YYYY-MM-DD'),
                _vehicule_assurance_montant: '',
                _vehicule_assurance_image1: '',
                _vehicule_assurance_image2: ''
            },
            _vehicule_cartegrise: {
                _vehicule_cartegrise_immatriculation: '',
                _vehicule_cartegrise_immatriculationanterieur: '',
                _vehicule_cartegrise_miseencriculation: moment().format('YYYY-MM-DD'),
                _vehicule_cartegrise_miseencirculationmaroc: moment().format('YYYY-MM-DD'),
                _vehicule_cartegrise_mutation: '',
                _vehicule_cartegrise_debutdevalidite: moment().format('YYYY-MM-DD'),
                _vehicule_cartegrise_image1: '',
                _vehicule_cartegrise_image2: ''
            },
            _vehicule_vignette: {
                _vehicule_vignette_montant: '',
                _vehicule_vignette_penalite: '',
                _vehicule_vignette_migration: '',
                _vehicule_vignette_tsava: '',
                _vehicule_vignette_datepaiement: moment().format('YYYY-MM-DD'),
                _vehicule_vignette_image: ''
            },
            _vehicule_carteautorisation: {
                _vehicule_carteautorisation_dateetablie: moment().format('YYYY-MM-DD'),
                _vehicule_carteautorisation_datefinvalidite: moment().format('YYYY-MM-DD'),
                _vehicule_autorisation_image: ''
            },
            _vehicule_certificatinstallation: {
                _vehicule_certificatinstallation_datedebut: moment().format('YYYY-MM-DD'),
                _vehicule_certificatinstallation_datefin: moment().format('YYYY-MM-DD'),
                _vehicule_certificatinstallation_image: ''
            },
            _vehicule_extincteur: {
                _vehicule_extincteur_datedebut: moment().format('YYYY-MM-DD'),
                _vehicule_extincteur_datefin: moment().format('YYYY-MM-DD')
            }
        };

        this.disconnect = this.disconnect.bind(this);
        this.get_user = this.get_user.bind(this);

        this.handleDeleteVehicule = this.handleDeleteVehicule.bind(this);
        this.handleEditVehicule = this.handleEditVehicule.bind(this);
        this.handleSubmitVehicule = this.handleSubmitVehicule.bind(this);

        this.handleChangeOnlyNumbers = this.handleChangeOnlyNumbers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNested = this.handleChangeNested.bind(this);
        this.handleChangeNestedOnlyNumbers = this.handleChangeNestedOnlyNumbers.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleChangeFieldUser = this.handleChangeFieldUser.bind(this);

        this._handleClickEvents = this._handleClickEvents.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }
    componentWillMount() {
        const self = this;

        this.get_user();
        socket.on("USER_UPDATED_GET", data => self.get_user());

        const { onLoadVehicule } = this.props;
        axios('/api/vehicule')
            .then((response) => {
                onLoadVehicule(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });
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

        this._handleClickEvents();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps._vehiculeToEdit) {
            this.setState({
                _vehicule_marque: nextProps._vehiculeToEdit._vehicule_marque,
                _vehicule_fabricant: nextProps._vehiculeToEdit._vehicule_fabricant,
                _vehicule_numerochassis: nextProps._vehiculeToEdit._vehicule_numerochassis,
                _vehicule_numeroregistration: nextProps._vehiculeToEdit._vehicule_numeroregistration,
                _vehicule_model: nextProps._vehiculeToEdit._vehicule_model,
                _vehicule_datefabrication: nextProps._vehiculeToEdit._vehicule_datefabrication,
                _vehicule_moteur: nextProps._vehiculeToEdit._vehicule_moteur,
                _vehicule_volumereservoir: nextProps._vehiculeToEdit._vehicule_volumereservoir,
                _vehicule_poidsavide: nextProps._vehiculeToEdit._vehicule_poidsavide,
                _vehicule_kmparvidange: nextProps._vehiculeToEdit._vehicule_kmparvidange,
                _vehicule_categorie: nextProps._vehiculeToEdit._vehicule_categorie,
                _vehicule_consommation: nextProps._vehiculeToEdit._vehicule_consommation,
                _vehicule_assurance: nextProps._vehiculeToEdit._vehicule_assurance,
                _vehicule_cartegrise: nextProps._vehiculeToEdit._vehicule_cartegrise,
                _vehicule_vignette: nextProps._vehiculeToEdit._vehicule_vignette,
                _vehicule_carteautorisation: nextProps._vehiculeToEdit._vehicule_carteautorisation,
                _vehicule_certificatinstallation: nextProps._vehiculeToEdit._vehicule_certificatinstallation,
                _vehicule_extincteur: nextProps._vehiculeToEdit._vehicule_extincteur
            });
        }
    }

    handleDeleteVehicule(id) {
        const { onDeleteVehicule } = this.props;
        return axios.delete(`/api/vehicule/${id}`)
            .then(() => {
                onDeleteVehicule(id);
            });
    }
    handleEditVehicule(vehicule) {
        const { setEditVehicule } = this.props;
        setEditVehicule(vehicule);
    }
    handleSubmitVehicule() {
        const { onSubmitVehicule, _vehiculeToEdit, onEditVehicule } = this.props;
        const {
            _vehicule_marque,
            _vehicule_fabricant,
            _vehicule_numerochassis,
            _vehicule_numeroregistration,
            _vehicule_model,
            _vehicule_datefabrication,
            _vehicule_moteur,
            _vehicule_volumereservoir,
            _vehicule_poidsavide,
            _vehicule_kmparvidange,
            _vehicule_image,

            _vehicule_assurance,
            _vehicule_cartegrise,
            _vehicule_carteautorisation,
            _vehicule_categorie,
            _vehicule_vignette,
            _vehicule_certificatinstallation,
            _vehicule_consommation,
            _vehicule_extincteur,
        } = this.state;

        if (!_vehiculeToEdit) {
            return axios.post('/api/vehicule', {
                _vehicule_marque,
                _vehicule_fabricant,
                _vehicule_numerochassis,
                _vehicule_numeroregistration,
                _vehicule_model,
                _vehicule_datefabrication,
                _vehicule_moteur,
                _vehicule_volumereservoir,
                _vehicule_poidsavide,
                _vehicule_kmparvidange,
                _vehicule_image,
                _vehicule_assurance,
                _vehicule_cartegrise,
                _vehicule_carteautorisation,
                _vehicule_categorie,
                _vehicule_vignette,
                _vehicule_certificatinstallation,
                _vehicule_consommation,
                _vehicule_extincteur,
            })
                .then((res) => {
                    onSubmitVehicule(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _vehicule_marque: '',
                            _vehicule_fabricant: '',
                            _vehicule_numerochassis: '',
                            _vehicule_numeroregistration: '',
                            _vehicule_model: '',
                            _vehicule_datefabrication: moment().format('YYYY-MM-DD'),
                            _vehicule_moteur: '',
                            _vehicule_volumereservoir: '',
                            _vehicule_poidsavide: '',
                            _vehicule_kmparvidange: '',
                            _vehicule_image: '',
                            _vehicule_categorie: {
                                _vehicule_categorie_nom: '',
                                _vehicule_categorie_nombrepassagers: '',
                                _vehicule_categorie_bagage: '',
                                _vehicule_categorie_carrosserie: ''
                            },
                            _vehicule_consommation: {
                                _vehicule_consommation_ville: '',
                                _vehicule_consommation_route: '',
                                _vehicule_consommation_mixte: ''
                            },
                            _vehicule_assurance: {
                                _vehicule_assurance_entrepriseassurance: '',
                                _vehicule_assurance_datedebut: moment().format('YYYY-MM-DD'),
                                _vehicule_assurance_datefin: moment().format('YYYY-MM-DD'),
                                _vehicule_assurance_montant: '',
                                _vehicule_assurance_image1: '',
                                _vehicule_assurance_image2: ''
                            },
                            _vehicule_cartegrise: {
                                _vehicule_cartegrise_immatriculation: '',
                                _vehicule_cartegrise_immatriculationanterieur: '',
                                _vehicule_cartegrise_miseencriculation: moment().format('YYYY-MM-DD'),
                                _vehicule_cartegrise_miseencirculationmaroc: moment().format('YYYY-MM-DD'),
                                _vehicule_cartegrise_mutation: '',
                                _vehicule_cartegrise_debutdevalidite: moment().format('YYYY-MM-DD'),
                                _vehicule_cartegrise_image1: '',
                                _vehicule_cartegrise_image2: ''
                            },
                            _vehicule_vignette: {
                                _vehicule_vignette_montant: '',
                                _vehicule_vignette_penalite: '',
                                _vehicule_vignette_migration: '',
                                _vehicule_vignette_tsava: '',
                                _vehicule_vignette_datepaiement: moment().format('YYYY-MM-DD'),
                                _vehicule_vignette_image: ''
                            },
                            _vehicule_carteautorisation: {
                                _vehicule_carteautorisation_dateetablie: moment().format('YYYY-MM-DD'),
                                _vehicule_carteautorisation_datefinvalidite: moment().format('YYYY-MM-DD'),
                                _vehicule_autorisation_image: ''
                            },
                            _vehicule_certificatinstallation: {
                                _vehicule_certificatinstallation_datedebut: moment().format('YYYY-MM-DD'),
                                _vehicule_certificatinstallation_datefin: moment().format('YYYY-MM-DD'),
                                _vehicule_certificatinstallation_image: ''
                            },
                            _vehicule_extincteur: {
                                _vehicule_extincteur_datedebut: moment().format('YYYY-MM-DD'),
                                _vehicule_extincteur_datefin: moment().format('YYYY-MM-DD')
                            },
                        }, () => {
                            var first_fs, last_fs;
                            var left, opacity, scale;
                            var animating;

                            if (animating)
                                return false;

                            animating = true;

                            first_fs = $('.first-of-type');
                            last_fs = $('.last-of-type');

                            $('.progressbar li').eq($('.fieldset').index(last_fs)).removeClass('active');
                            $('.progressbar li').eq($('.fieldset').index(first_fs)).addClass('active');

                            last_fs.animate({ opacity: 0 }, {
                                step: (now, mx) => {
                                    scale = 0.8 + (1 - now) * 0.2;
                                    left = ((1 - now) * 50) + '%';
                                    opacity = 1 - now;

                                    last_fs.css({
                                        'left': left
                                    });
                                    first_fs.css({
                                        'transform': 'scale(' + scale + ')',
                                        'opacity': opacity
                                    });
                                },
                                duration: 400,
                                complete: () => {
                                    last_fs.hide();
                                    first_fs.css({
                                        'display': 'grid',
                                    });
                                    animating = false;
                                }
                            });
                        })
                });
        } else {
            return axios.patch(`/api/vehicule/${_vehiculeToEdit._id}`, {
                _vehicule_marque,
                _vehicule_fabricant,
                _vehicule_numerochassis,
                _vehicule_numeroregistration,
                _vehicule_model,
                _vehicule_datefabrication,
                _vehicule_moteur,
                _vehicule_volumereservoir,
                _vehicule_poidsavide,
                _vehicule_kmparvidange,
                _vehicule_image,
                _vehicule_assurance,
                _vehicule_cartegrise,
                _vehicule_carteautorisation,
                _vehicule_categorie,
                _vehicule_vignette,
                _vehicule_certificatinstallation,
                _vehicule_consommation,
                _vehicule_extincteur,
            })
                .then((res) => {
                    onEditVehicule(res.data);
                })
                .then(() => {
                    this.setState({
                        _vehicule_marque: '',
                        _vehicule_fabricant: '',
                        _vehicule_numerochassis: '',
                        _vehicule_numeroregistration: '',
                        _vehicule_model: '',
                        _vehicule_datefabrication: moment().format('YYYY-MM-DD'),
                        _vehicule_moteur: '',
                        _vehicule_volumereservoir: '',
                        _vehicule_poidsavide: '',
                        _vehicule_kmparvidange: '',
                        _vehicule_image: '',
                        _vehicule_categorie: {
                            _vehicule_categorie_nom: '',
                            _vehicule_categorie_nombrepassagers: '',
                            _vehicule_categorie_bagage: '',
                            _vehicule_categorie_carrosserie: ''
                        },
                        _vehicule_consommation: {
                            _vehicule_consommation_ville: '',
                            _vehicule_consommation_route: '',
                            _vehicule_consommation_mixte: ''
                        },
                        _vehicule_assurance: {
                            _vehicule_assurance_entrepriseassurance: '',
                            _vehicule_assurance_datedebut: moment().format('YYYY-MM-DD'),
                            _vehicule_assurance_datefin: moment().format('YYYY-MM-DD'),
                            _vehicule_assurance_montant: '',
                            _vehicule_assurance_image1: '',
                            _vehicule_assurance_image2: ''
                        },
                        _vehicule_cartegrise: {
                            _vehicule_cartegrise_immatriculation: '',
                            _vehicule_cartegrise_immatriculationanterieur: '',
                            _vehicule_cartegrise_miseencriculation: moment().format('YYYY-MM-DD'),
                            _vehicule_cartegrise_miseencirculationmaroc: moment().format('YYYY-MM-DD'),
                            _vehicule_cartegrise_mutation: '',
                            _vehicule_cartegrise_debutdevalidite: moment().format('YYYY-MM-DD'),
                            _vehicule_cartegrise_image1: '',
                            _vehicule_cartegrise_image2: ''
                        },
                        _vehicule_vignette: {
                            _vehicule_vignette_montant: '',
                            _vehicule_vignette_penalite: '',
                            _vehicule_vignette_migration: '',
                            _vehicule_vignette_tsava: '',
                            _vehicule_vignette_datepaiement: moment().format('YYYY-MM-DD'),
                            _vehicule_vignette_image: ''
                        },
                        _vehicule_carteautorisation: {
                            _vehicule_carteautorisation_dateetablie: moment().format('YYYY-MM-DD'),
                            _vehicule_carteautorisation_datefinvalidite: moment().format('YYYY-MM-DD'),
                            _vehicule_autorisation_image: ''
                        },
                        _vehicule_certificatinstallation: {
                            _vehicule_certificatinstallation_datedebut: moment().format('YYYY-MM-DD'),
                            _vehicule_certificatinstallation_datefin: moment().format('YYYY-MM-DD'),
                            _vehicule_certificatinstallation_image: ''
                        },
                        _vehicule_extincteur: {
                            _vehicule_extincteur_datedebut: moment().format('YYYY-MM-DD'),
                            _vehicule_extincteur_datefin: moment().format('YYYY-MM-DD')
                        },
                    })
                });
        }
    }

    handleChangeOnlyNumbers(event) {
        const reg = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
        // if value is not blank, then test the regex
        if (event.target.value === '' || reg.test(event.target.value)) {
            this.setState({
                [event.target.id]: event.target.value
            });
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleChangeNested(parentObject, childObject, value) {
        this.setState(prevState => ({
            ...prevState,
            [parentObject]: {
                ...prevState[parentObject],
                [childObject]: value
            }
        }));
    }
    handleChangeNestedOnlyNumbers(parentObject, childObject, value) {
        const reg = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
        // if value is not blank, then test the regex
        if (value === '' || reg.test(value)) {
            this.setState(prevState => ({
                ...prevState,
                [parentObject]: {
                    ...prevState[parentObject],
                    [childObject]: value
                }
            }));
        }
    }
    handleChangeField(key, event) {
        this.setState({ [key]: event.target.value });
    }
    handleChangeFieldUser(key, event) {
        this.setState({
            [key]: [event.target.value],
        });
    }

    handleNext(parent) {
        var current_fs, next_fs;
        var left, opacity, scale;
        var animating;

        if (animating)
            return false;

        animating = true;

        current_fs = $('.' + parent);
        next_fs = $('.' + parent).next();

        $('.progressbar li').eq($('.fieldset').index(current_fs)).removeClass('active');
        $('.progressbar li').eq($('.fieldset').index(next_fs)).addClass('active');

        current_fs.animate({ opacity: 0 }, {
            step: (now, mx) => {
                scale = 1 - (1 - now) * 0.2;
                left = (now * 50) + '%';
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')',
                });
                next_fs.css({
                    'left': left,
                    'opacity': opacity
                });
            },
            duration: 400,
            complete: () => {
                current_fs.hide();
                next_fs.css({
                    'display': 'grid',
                });
                animating = false;
            }
        });
    }
    handlePrev(parent) {
        var current_fs, previous_fs;
        var left, opacity, scale;
        var animating;

        if (animating)
            return false;

        animating = true;

        current_fs = $('.' + parent);
        previous_fs = $('.' + parent).prev();

        $('.progressbar li').eq($('.fieldset').index(current_fs)).removeClass('active');
        $('.progressbar li').eq($('.fieldset').index(previous_fs)).addClass('active');

        current_fs.animate({ opacity: 0 }, {
            step: (now, mx) => {
                scale = 0.8 + (1 - now) * 0.2;
                left = ((1 - now) * 50) + '%';
                opacity = 1 - now;

                current_fs.css({
                    'left': left
                });
                previous_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'opacity': opacity
                });
            },
            duration: 400,
            complete: () => {
                current_fs.hide();
                previous_fs.css({
                    'display': 'grid',
                });
                animating = false;
            }
        });
    }

    _handleClickEvents() {
        let searchWrapper = document.querySelector('.search-wrapper_vehicules, .search-wrapper_parametres'),
            searchInput = document.querySelector('.search-input_vehicules, .search-input_parametres'),
            searchIcon = document.querySelector('.search_vehicules, .search_parametres'),
            searchActivated = false,
            self = this;

        $('.search_form_vehicules, .search_form_parametres').click((event) => {
            if (!searchActivated) {
                searchWrapper.classList.add('focused');
                searchIcon.classList.add('active');
                searchInput.focus();
                searchActivated = !searchActivated;
            } else {
                if ($(event.target).hasClass('search_vehicules')) {
                    searchWrapper.classList.remove('focused');
                    searchIcon.classList.remove('active');
                    searchActivated = !searchActivated;
                    self.setState({
                        _search_value_vehicules: ''
                    });
                }
                if ($(event.target).hasClass('search_parametres')) {
                    searchWrapper.classList.remove('focused');
                    searchIcon.classList.remove('active');
                    searchActivated = !searchActivated;
                    self.setState({
                        _search_value_parametres: ''
                    });
                }
            }
        });

    }

    async get_user() {
        const self = this;

        await API.get_user(localStorage.getItem('_user_email'))
            .then((res) => {
                self.setState({
                    _user: res.data.user,
                }, () => {

                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    disconnect() {
        API.logout();
        window.location = "/login";
    }
    render() {
        const {
            modal_msg,
            _user,
            _search_value_vehicules,
            _search_value_parametres,
            _vehicule_marque,
            _vehicule_fabricant,
            _vehicule_numerochassis,
            _vehicule_numeroregistration,
            _vehicule_model,
            _vehicule_datefabrication,
            _vehicule_moteur,
            _vehicule_volumereservoir,
            _vehicule_poidsavide,
            _vehicule_kmparvidange,
            _vehicule_image,
            _vehicule_assurance,
            _vehicule_cartegrise,
            _vehicule_vignette,
            _vehicule_carteautorisation,
            _vehicule_categorie,
            _vehicule_certificatinstallation,
            _vehicule_consommation,
            _vehicule_extincteur,
        } = this.state;
        const {
            _vehiculeToEdit,
            _vehicules
        } = this.props;
        return (
            <FullPage scrollMode={'normal'}>
                <Slide>
                    <section id="first_section_dashboard" className="first_section_dashboard">
                        <div className="wrapper_full">
                            <div className="nav nav-pills flex-column left_nav">
                                <a className="logoHolder" href="/">
                                    <img className="logo img-fluid" src={favicon} alt="APP_NAME" />
                                </a>
                                <ul className="menu_dashboard">
                                    <li><a href="#1a" className="nav_link active" data-toggle="tab"><i className="fas fa-home"></i>Accueil</a></li>
                                    <li><a href="#2a" className="nav_link" data-toggle="tab"><i className="fas fa-money-check-alt"></i>Finance</a></li>
                                    <li><a href="#3a" className="nav_link" data-toggle="tab"><i className="far fa-id-badge"></i>Personnel</a></li>
                                    <li><a href="#4a" className="nav_link" data-toggle="tab"><i className="fas fa-user-tie"></i>Clients</a></li>
                                    <li><a href="#5a" className="nav_link" data-toggle="tab"><i className="far fa-address-book"></i>Fournisseurs</a></li>
                                    <li><a href="#6a" className="nav_link" data-toggle="tab"><i className="fas fa-car-side"></i>Vehicules</a></li>
                                    <li><a href="#7a" className="nav_link" data-toggle="tab"><i className="far fa-calendar-check"></i>Reservations</a></li>
                                    <li><a href="#8a" className="nav_link" data-toggle="tab"><i className="fas fa-suitcase-rolling"></i>Voyages</a></li>
                                    <li><a href="#9a" className="nav_link" data-toggle="tab"><i className="fas fa-people-carry"></i>Stock</a></li>
                                    <li className="settings"><a href="#10a" className="nav_link" data-toggle="tab"><i className="fas fa-cogs"></i>Parametres</a></li>
                                    <li><a href="# " className="nav_link logout" onClick={() => this.disconnect()}><i className="fas fa-sign-out-alt"></i>Logout.</a></li>
                                </ul>
                            </div>

                            <div className="tab-content clearfix">
                                <div className="home_pane tab-pane active" id="1a">

                                </div>
                                <div className="finance_pane tab-pane" id="2a">

                                </div>
                                <div className="personnel_pane tab-pane" id="3a">

                                </div>
                                <div className="clients_pane tab-pane" id="4a">

                                </div>
                                <div className="fournisseurs_pane tab-pane" id="5a">

                                </div>
                                <div className="vehicules_pane tab-pane" id="6a">
                                    <div className="_vehicules_pane">
                                        <div className="_vehicules_header">
                                            <form className="search_form_vehicules">
                                                <div className="input-field search-wrapper_vehicules">
                                                    <input
                                                        className="search-input_vehicules validate form-group-input _search_value_vehicules"
                                                        id="_search_value_vehicules"
                                                        type="text"
                                                        name="_search_value_vehicules"
                                                        value={_search_value_vehicules}
                                                        onChange={this.handleChange}
                                                    />
                                                    <label htmlFor='_search_value_vehicules' className={_search_value_vehicules ? 'active' : ''}>Search.</label>
                                                    <div className="form-group-line"></div>

                                                    <span className="hover_effect"></span>
                                                    <div className='search_vehicules'></div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="_vehicules_content">
                                            <ul className="cards">
                                                {
                                                    _.map(_vehicules, (_v) => {
                                                        return (
                                                            <li className="cards__item _vehicule__item">
                                                                <div className="card" data-attr-span={_.head(_v._vehicule_marque)}>
                                                                    <div className="card__content">
                                                                        <div className="_vehicule_pane _pane">
                                                                            <div className="_vehicule_content _content">
                                                                                <div className="_vehicule_datefabrication">
                                                                                    {_v._vehicule_datefabrication}
                                                                                </div>
                                                                                <div className="_vehicule_marque">
                                                                                    {_v._vehicule_marque}
                                                                                </div>
                                                                                <div className="_vehicule_model">
                                                                                    {_v._vehicule_model}
                                                                                </div>
                                                                                <div className="_vehicule_moteur">
                                                                                    {_v._vehicule_moteur}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                                <li className="cards__item _vehicule__item">
                                                    <div className="card" data-attr-span='B'>
                                                        <div className="card__content">
                                                            <div className="_vehicule_pane _pane">
                                                                <div className="_vehicule_content _content">

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="cards__item _add_vehicule__item">
                                                    <button id="_add_vehicule" type="button" data-toggle="modal" data-target="#_vehicule_modal">
                                                        <span>
                                                            <span>
                                                                <span data-attr-span="Ajouter Vehicule">
                                                                    <i className="fas fa-plus"></i>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="reservations_pane tab-pane" id="7a">

                                </div>
                                <div className="voyages_pane tab-pane" id="8a">

                                </div>
                                <div className="stocks_pane tab-pane" id="9a">

                                </div>
                                <div className="parametres_pane tab-pane" id="10a">
                                    <div className="_parametres_pane">
                                        <div className="_parametres_header">
                                            <form className="search_form_parametres">
                                                <div className="input-field search-wrapper_parametres">
                                                    <input
                                                        className="search-input_parametres validate form-group-input _search_value_parametres"
                                                        id="_search_value_parametres"
                                                        type="text"
                                                        name="_search_value_parametres"
                                                        value={_search_value_parametres}
                                                        onChange={this.handleChange}
                                                    />
                                                    <label htmlFor='_search_value_parametres' className={_search_value_parametres ? 'active' : ''}>Search.</label>
                                                    <div className="form-group-line"></div>

                                                    <span className="hover_effect"></span>
                                                    <div className='search_parametres'></div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="_parametres_content">
                                            <ul className="forms">
                                                <li className="forms__item">
                                                    <div className="card">
                                                        <div className="card__content">
                                                            <div className="_account_pane _pane">
                                                                <div className="_account_content _content">
                                                                    <div className="_account_head">
                                                                        <h4>Account Settings.</h4>
                                                                        <p className="text-muted">Here you can change the email address you use and password</p>
                                                                    </div>
                                                                    <div className="_account_data data_container">
                                                                        <Account />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="forms__item">
                                                    <div className="card">
                                                        <div className="card__content">
                                                            <div className="_accoutns_pane _pane">
                                                                <div className="_accounts_content _content">
                                                                    <div className="_accounts_head">
                                                                        <h4>Accounts.</h4>
                                                                    </div>
                                                                    <div className="_accounts_data data_container">
                                                                        <table className="accounts_list table table-striped">
                                                                            <thead>
                                                                                <tr className="accounts_list_header">
                                                                                    <th>Username</th>
                                                                                    <th>Email</th>
                                                                                    <th>Fingerprint</th>
                                                                                    <th>Created At</th>
                                                                                    <th>Roles</th>
                                                                                    <th>Verified</th>
                                                                                    <th className="_empty"></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {
                                                                                    /* _.orderBy(_users, ['createdAt'], ['desc']).map((_u, index) => {
                                                                                        return (
                                                                                            <>
                                                                                                <tr className="spacer"></tr>
                                                                                                <tr key={index} className={`user_card user_anchor ${_u._id === _user._id ? 'active' : ''}`}>
                                                                                                    <td data-th="Username">{_u.username}</td>
                                                                                                    <td data-th="Email">{_u.email}</td>
                                                                                                    <td data-th="Fingerprint">{_u.fingerprint}</td>
                                                                                                    <td data-th="Created">{moment(_u.createdAt).format('dddd, MMM Do YYYY')}</td>
                                                                                                    <td data-th="Roles">{_.isEmpty(_u.roles) ? 'Reader' : _.map(_u.roles, (r) => { return <p key={r}>{r}</p>; })}</td>
                                                                                                    <td data-th="Verified">{_u.isVerified ? 'Verified' : 'Not Verified'}</td>
                                                                                                    <td className="dropdown">
                                                                                                        <span className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                                            <i className="fas fa-ellipsis-h"></i>
                                                                                                        </span>
                                                                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                                            {(() => {
                                                                                                                if (_.includes(_user.roles, 'admin')) {
                                                                                                                    return (
                                                                                                                        <a className="dropdown-item" href="# " data-toggle="modal" data-target="#_user_modal" onClick={() => this.handleEditUser(_u)}><i className="fas fa-edit"></i></a>
                                                                                                                    )
                                                                                                                }
                                                                                                            })()}
                                                                                                            <a className="dropdown-item" href="# " onClick={() => this.handleDeleteUser(_u)}><i className="far fa-trash-alt"></i></a>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </>
                                                                                        )
                                                                                    }) */
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="_vehicules_modal modal fade" id="_vehicule_modal" tabIndex="-1" role="dialog" aria-labelledby="_vehicule_modalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <ul className="progressbar">
                                                <li className="active"><span className="item item-0"> Information general. </span></li>
                                                <li><span className="item item-1"> Assurance. </span></li>
                                                <li><span className="item item-2"> Carte grise. </span></li>
                                                <li><span className="item item-3"> Vignette. </span></li>
                                                <li><span className="item item-4"> Final. </span></li>
                                            </ul>
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <div className="mail_form card">
                                                <div className="fieldset first-of-type general">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <Autocomplete
                                                                items={['Abarth', 'Abarth', 'Ac', 'Aixam', 'Alfa Romeo', 'Alpina', 'Alpine', 'Amc', 'Aston Martin', 'Audi', 'Austin Healey', 'Autobianchi', 'Auverland', 'Bellier', 'Bentley', 'Bluecar', 'Bmw', 'Buick', 'Burboys', 'Cadillac', 'Carbodies', 'Casalini', 'Caterham', 'Chatenet', 'Chevrolet', 'Chrysler', 'Citroen', 'Colani', 'Cord', 'Corvette', 'Dacia', 'Daihatsu', 'Daimler', 'Dangel', 'De Tomaso', 'Delorean', 'Desoto', 'Dodge', 'Donkervoort', 'Ds', 'Edsel', 'Excalibur', 'Ferrari', 'Fiat', 'Fisker', 'Ford', 'Gmc', 'Grecav', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'International Harvester', 'Isuzu', 'Jaguar', 'Jdm', 'Jeep', 'Jiayuan', 'Kaiser', 'Kia', 'Ktm', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Lasalle', 'Lexus', 'Ligier', 'Lincoln', 'Lotus', 'Maserati', 'Matra', 'Mazda', 'Mclaren', 'Mega', 'Mercedes', 'Mercury', 'Mg', 'Mia', 'Microcar', 'Mini', 'Mitsubishi', 'Morgan', 'Mpm Motors', 'Nash', 'Nissan', 'Noun', 'Nsu', 'Oldsmobile', 'Opel', 'Packard', 'Panther', 'Peugeot', 'Pgo', 'Plymouth', 'Pontiac', 'Porsche', 'Renault', 'Rolls Royce', 'Rover Mg', 'Saab', 'Seat', 'Shelby', 'Simca', 'Skoda', 'Smart', 'Ssangyong', 'Studebaker', 'Subaru', 'Sunbeam', 'Suzuki', 'Tempo', 'Tesla', 'Think', 'Toyota', 'Triumph', 'Tvr', 'Venturi', 'Vespa', 'Volkswagen', 'Volvo', 'Wiesman', 'Willys', 'Zenos']}
                                                                getItemValue={(item) => item}
                                                                inputProps={{ id: '_vehicule_marque', className: 'validate form-group-input _vehicule_marque', name: '_vehicule_marque', autoComplete: "off" }}
                                                                shouldItemRender={(item, _vehicule_marque) => item.toLowerCase().indexOf(_vehicule_marque.toLowerCase()) > -1}
                                                                renderItem={(item, isHighlighted) =>
                                                                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
                                                                        {item}
                                                                    </div>
                                                                }
                                                                value={_vehicule_marque}
                                                                onChange={this.handleChange}
                                                                onSelect={(_vehicule_marque) => this.setState({ _vehicule_marque })}
                                                            />
                                                            <label htmlFor='_vehicule_marque' className={_vehicule_marque ? 'active' : ''}>Marque</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <Autocomplete
                                                                items={_.map(_vehicules, '_vehicule_fabricant')}
                                                                getItemValue={(item) => item}
                                                                inputProps={{ id: '_vehicule_fabricant', className: 'validate form-group-input _vehicule_fabricant', name: '_vehicule_fabricant', autoComplete: "off" }}
                                                                shouldItemRender={(item, _vehicule_fabricant) => item.toLowerCase().indexOf(_vehicule_fabricant.toLowerCase()) > -1}
                                                                renderItem={(item, isHighlighted) =>
                                                                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
                                                                        {item}
                                                                    </div>
                                                                }
                                                                value={_vehicule_fabricant}
                                                                onChange={this.handleChange}
                                                                onSelect={(_vehicule_fabricant) => this.setState({ _vehicule_fabricant })}
                                                            />
                                                            <label htmlFor='_vehicule_fabricant' className={_vehicule_fabricant ? 'active' : ''}>Fabricant</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_image"
                                                                id="_vehicule_image"
                                                                type="text"
                                                                name="_vehicule_image"
                                                                value={_vehicule_image}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_vehicule_image' className={_vehicule_image ? 'active' : ''}>Image de vehicule</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_numerochassis"
                                                                id="_vehicule_numerochassis"
                                                                type="text"
                                                                name="_vehicule_numerochassis"
                                                                value={_vehicule_numerochassis}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_vehicule_numerochassis' className={_vehicule_numerochassis ? 'active' : ''}>Numero de chassis</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_numeroregistration"
                                                                id="_vehicule_numeroregistration"
                                                                type="text"
                                                                name="_vehicule_numeroregistration"
                                                                value={_vehicule_numeroregistration}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_vehicule_numeroregistration' className={_vehicule_numeroregistration ? 'active' : ''}>Numero de registration</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <Autocomplete
                                                                items={_.map(_vehicules, '_vehicule_model')}
                                                                getItemValue={(item) => item}
                                                                inputProps={{ id: '_vehicule_model', className: 'validate form-group-input _vehicule_model', name: '_vehicule_model', autoComplete: "off" }}
                                                                shouldItemRender={(item, _vehicule_model) => item.toLowerCase().indexOf(_vehicule_model.toLowerCase()) > -1}
                                                                renderItem={(item, isHighlighted) =>
                                                                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
                                                                        {item}
                                                                    </div>
                                                                }
                                                                value={_vehicule_model}
                                                                onChange={this.handleChange}
                                                                onSelect={(_vehicule_model) => this.setState({ _vehicule_model })}
                                                            />
                                                            <label htmlFor='_vehicule_model' className={_vehicule_model ? 'active' : ''}>Model</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_datefabrication"
                                                                id="_vehicule_datefabrication"
                                                                type="date"
                                                                name="_vehicule_datefabrication"
                                                                value={_vehicule_datefabrication}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_vehicule_datefabrication' className={_vehicule_datefabrication ? 'active' : ''}>Date de fabrication</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <Autocomplete
                                                                items={_.map(_vehicules, '_vehicule_moteur')}
                                                                getItemValue={(item) => item}
                                                                inputProps={{ id: '_vehicule_moteur', className: 'validate form-group-input _vehicule_moteur', name: '_vehicule_moteur', autoComplete: "off" }}
                                                                shouldItemRender={(item, _vehicule_moteur) => item.toLowerCase().indexOf(_vehicule_moteur.toLowerCase()) > -1}
                                                                renderItem={(item, isHighlighted) =>
                                                                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
                                                                        {item}
                                                                    </div>
                                                                }
                                                                value={_vehicule_moteur}
                                                                onChange={this.handleChange}
                                                                onSelect={(_vehicule_moteur) => this.setState({ _vehicule_moteur })}
                                                            />
                                                            <label htmlFor='_vehicule_moteur' className={_vehicule_moteur ? 'active' : ''}>Moteur</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_volumereservoir"
                                                                id="_vehicule_volumereservoir"
                                                                type="text"
                                                                name="_vehicule_volumereservoir"
                                                                value={_vehicule_volumereservoir}
                                                                onChange={this.handleChangeOnlyNumbers}
                                                            />
                                                            <label htmlFor='_vehicule_volumereservoir' className={_vehicule_volumereservoir ? 'active' : ''}>Volume de reservoir (litres)</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_poidsavide"
                                                                id="_vehicule_poidsavide"
                                                                type="text"
                                                                name="_vehicule_poidsavide"
                                                                value={_vehicule_poidsavide}
                                                                onChange={this.handleChangeOnlyNumbers}
                                                            />
                                                            <label htmlFor='_vehicule_poidsavide' className={_vehicule_poidsavide ? 'active' : ''}>Poids à vide (kg)</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_kmparvidange"
                                                                id="_vehicule_kmparvidange"
                                                                type="text"
                                                                name="_vehicule_kmparvidange"
                                                                value={_vehicule_kmparvidange}
                                                                onChange={this.handleChangeOnlyNumbers}
                                                            />
                                                            <label htmlFor='_vehicule_kmparvidange' className={_vehicule_kmparvidange ? 'active' : ''}>Km par vidange</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <Autocomplete
                                                                items={_.map(_.map(_vehicules, '_vehicule_categorie'), '_vehicule_categorie_nom')}
                                                                getItemValue={(item) => item}
                                                                inputProps={{ id: '_vehicule_categorie_nom', className: 'validate form-group-input _vehicule_categorie_nom', name: '_vehicule_categorie_nom', autoComplete: "off" }}
                                                                shouldItemRender={(item, _vehicule_categorie_nom) => item.toLowerCase().indexOf(_vehicule_categorie_nom.toLowerCase()) > -1}
                                                                renderItem={(item, isHighlighted) =>
                                                                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
                                                                        {item}
                                                                    </div>
                                                                }
                                                                value={_vehicule_categorie._vehicule_categorie_nom}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_categorie', '_vehicule_categorie_nom', event.target.value)}
                                                                onSelect={(event) => this.handleChangeNested('_vehicule_categorie', '_vehicule_categorie_nom', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_categorie_nom' className={_vehicule_categorie._vehicule_categorie_nom ? 'active' : ''}>Categorie</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_categorie_nombrepassagers"
                                                                id="_vehicule_categorie_nombrepassagers"
                                                                type="text"
                                                                name="_vehicule_categorie_nombrepassagers"
                                                                value={_vehicule_categorie._vehicule_categorie_nombrepassagers}
                                                                onChange={(event) => this.handleChangeNestedOnlyNumbers('_vehicule_categorie', '_vehicule_categorie_nombrepassagers', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_categorie_nombrepassagers' className={_vehicule_categorie._vehicule_categorie_nombrepassagers ? 'active' : ''}>Nombre de passagers</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_categorie_bagage"
                                                                id="_vehicule_categorie_bagage"
                                                                type="text"
                                                                name="_vehicule_categorie_bagage"
                                                                value={_vehicule_categorie._vehicule_categorie_bagage}
                                                                onChange={(event) => this.handleChangeNestedOnlyNumbers('_vehicule_categorie', '_vehicule_categorie_bagage', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_categorie_bagage' className={_vehicule_categorie._vehicule_categorie_bagage ? 'active' : ''}>Bagage (litres)</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <Autocomplete
                                                                items={_.map(_.map(_vehicules, '_vehicule_categorie'), '_vehicule_categorie_carrosserie')}
                                                                getItemValue={(item) => item}
                                                                inputProps={{ id: '_vehicule_categorie_carrosserie', className: 'validate form-group-input _vehicule_categorie_carrosserie', name: '_vehicule_categorie_carrosserie', autoComplete: "off" }}
                                                                shouldItemRender={(item, _vehicule_categorie_carrosserie) => item.toLowerCase().indexOf(_vehicule_categorie_carrosserie.toLowerCase()) > -1}
                                                                renderItem={(item, isHighlighted) =>
                                                                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
                                                                        {item}
                                                                    </div>
                                                                }
                                                                value={_vehicule_categorie._vehicule_categorie_carrosserie}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_categorie', '_vehicule_categorie_carrosserie', event.target.value)}
                                                                onSelect={(event) => this.handleChangeNested('_vehicule_categorie', '_vehicule_categorie_carrosserie', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_categorie_carrosserie' className={_vehicule_categorie._vehicule_categorie_carrosserie ? 'active' : ''}>Carrosserie</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_consommation_ville"
                                                                id="_vehicule_consommation_ville"
                                                                type="text"
                                                                name="_vehicule_consommation_ville"
                                                                value={_vehicule_consommation._vehicule_consommation_ville}
                                                                onChange={(event) => this.handleChangeNestedOnlyNumbers('_vehicule_consommation', '_vehicule_consommation_ville', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_consommation_ville' className={_vehicule_consommation._vehicule_consommation_ville ? 'active' : ''}>Consommation ville (/100 km)</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_consommation_route"
                                                                id="_vehicule_consommation_route"
                                                                type="text"
                                                                name="_vehicule_consommation_route"
                                                                value={_vehicule_consommation._vehicule_consommation_route}
                                                                onChange={(event) => this.handleChangeNestedOnlyNumbers('_vehicule_consommation', '_vehicule_consommation_route', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_consommation_route' className={_vehicule_consommation._vehicule_consommation_route ? 'active' : ''}>Consommation route (/100 km)</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_consommation_mixte"
                                                                id="_vehicule_consommation_mixte"
                                                                type="text"
                                                                name="_vehicule_consommation_mixte"
                                                                value={_vehicule_consommation._vehicule_consommation_mixte}
                                                                onChange={(event) => this.handleChangeNestedOnlyNumbers('_vehicule_consommation', '_vehicule_consommation_mixte', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_consommation_mixte' className={_vehicule_consommation._vehicule_consommation_mixte ? 'active' : ''}>Consommation mixte (/100 km)</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6"></div>
                                                        <div className="input-field col s6"></div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right suivant action-button"
                                                                type="button"
                                                                name='suivant'
                                                                onClick={() => this.handleNext('first-of-type')}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span="Suivant.">
                                                                            Suivant.
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="fieldset second-of-type assurance">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <Autocomplete
                                                                items={_.map(_.map(_vehicules, '_vehicule_assurance'), '_vehicule_assurance_entrepriseassurance')}
                                                                getItemValue={(item) => item}
                                                                inputProps={{ id: '_vehicule_assurance_entrepriseassurance', className: 'validate form-group-input _vehicule_assurance_entrepriseassurance', name: '_vehicule_assurance_entrepriseassurance', autoComplete: "off" }}
                                                                shouldItemRender={(item, _vehicule_assurance_entrepriseassurance) => item.toLowerCase().indexOf(_vehicule_assurance_entrepriseassurance.toLowerCase()) > -1}
                                                                renderItem={(item, isHighlighted) =>
                                                                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
                                                                        {item}
                                                                    </div>
                                                                }
                                                                value={_vehicule_assurance._vehicule_assurance_entrepriseassurance}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_assurance', '_vehicule_assurance_entrepriseassurance', event.target.value)}
                                                                onSelect={(event) => this.handleChangeNested('_vehicule_assurance', '_vehicule_assurance_entrepriseassurance', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_assurance_entrepriseassurance' className={_vehicule_assurance._vehicule_assurance_entrepriseassurance ? 'active' : ''}>Entreprise d'assurance</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_assurance_montant"
                                                                id="_vehicule_assurance_montant"
                                                                type="text"
                                                                name="_vehicule_assurance_montant"
                                                                value={_vehicule_assurance._vehicule_assurance_montant}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_assurance', '_vehicule_assurance_montant', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_assurance_montant' className={_vehicule_assurance._vehicule_assurance_montant ? 'active' : ''}>Montant</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_assurance_datedebut"
                                                                id="_vehicule_assurance_datedebut"
                                                                type="date"
                                                                name="_vehicule_assurance_datedebut"
                                                                value={_vehicule_assurance._vehicule_assurance_datedebut}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_assurance', '_vehicule_assurance_datedebut', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_assurance_datedebut' className={_vehicule_assurance._vehicule_assurance_datedebut ? 'active' : ''}>Date de debut</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_assurance_datefin"
                                                                id="_vehicule_assurance_datefin"
                                                                type="date"
                                                                name="_vehicule_assurance_datefin"
                                                                value={_vehicule_assurance._vehicule_assurance_datefin}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_assurance', '_vehicule_assurance_datefin', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_assurance_datefin' className={_vehicule_assurance._vehicule_assurance_datefin ? 'active' : ''}>Date de fin</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_assurance_image1"
                                                                id="_vehicule_assurance_image1"
                                                                type="text"
                                                                name="_vehicule_assurance_image1"
                                                                value={_vehicule_assurance._vehicule_assurance_image1}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_assurance', '_vehicule_assurance_image1', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_assurance_image1' className={_vehicule_assurance._vehicule_assurance_image1 ? 'active' : ''}>1e image</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_assurance_image2"
                                                                id="_vehicule_assurance_image2"
                                                                type="text"
                                                                name="_vehicule_assurance_image2"
                                                                value={_vehicule_assurance._vehicule_assurance_image2}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_assurance', '_vehicule_assurance_image2', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_assurance_image2' className={_vehicule_assurance._vehicule_assurance_image2 ? 'active' : ''}>2e image</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right precedent action-button-precedent"
                                                                type="button"
                                                                name='precedent'
                                                                onClick={() => this.handlePrev('second-of-type')}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span="Precedent.">
                                                                            Precedent.
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right suivant action-button"
                                                                type="button"
                                                                name='suivant'
                                                                onClick={() => this.handleNext('second-of-type')}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span="Suivant.">
                                                                            Suivant.
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="fieldset third-of-type cartegrise">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_cartegrise_immatriculation"
                                                                id="_vehicule_cartegrise_immatriculation"
                                                                type="text"
                                                                name="_vehicule_cartegrise_immatriculation"
                                                                value={_vehicule_cartegrise._vehicule_cartegrise_immatriculation}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_cartegrise', '_vehicule_cartegrise_immatriculation', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_cartegrise_immatriculation' className={_vehicule_cartegrise._vehicule_cartegrise_immatriculation ? 'active' : ''}>Immatriculation</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_cartegrise_immatriculationanterieur"
                                                                id="_vehicule_cartegrise_immatriculationanterieur"
                                                                type="text"
                                                                name="_vehicule_cartegrise_immatriculationanterieur"
                                                                value={_vehicule_cartegrise._vehicule_cartegrise_immatriculationanterieur}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_cartegrise', '_vehicule_cartegrise_immatriculationanterieur', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_cartegrise_immatriculationanterieur' className={_vehicule_cartegrise._vehicule_cartegrise_immatriculationanterieur ? 'active' : ''}>Immatriculation anterieur</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_cartegrise_miseencriculation"
                                                                id="_vehicule_cartegrise_miseencriculation"
                                                                type="date"
                                                                name="_vehicule_cartegrise_miseencriculation"
                                                                value={_vehicule_cartegrise._vehicule_cartegrise_miseencriculation}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_cartegrise', '_vehicule_cartegrise_miseencriculation', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_cartegrise_miseencriculation' className={_vehicule_cartegrise._vehicule_cartegrise_miseencriculation ? 'active' : ''}>Mise en circulation</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_cartegrise_miseencirculationmaroc"
                                                                id="_vehicule_cartegrise_miseencirculationmaroc"
                                                                type="date"
                                                                name="_vehicule_cartegrise_miseencirculationmaroc"
                                                                value={_vehicule_cartegrise._vehicule_cartegrise_miseencirculationmaroc}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_cartegrise', '_vehicule_cartegrise_miseencirculationmaroc', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_cartegrise_miseencirculationmaroc' className={_vehicule_cartegrise._vehicule_cartegrise_miseencirculationmaroc ? 'active' : ''}>Mise en circulation au Maroc</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_cartegrise_mutation"
                                                                id="_vehicule_cartegrise_mutation"
                                                                type="text"
                                                                name="_vehicule_cartegrise_mutation"
                                                                value={_vehicule_cartegrise._vehicule_cartegrise_mutation}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_cartegrise', '_vehicule_cartegrise_mutation', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_cartegrise_mutation' className={_vehicule_cartegrise._vehicule_cartegrise_mutation ? 'active' : ''}>Mutation</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_cartegrise_debutdevalidite"
                                                                id="_vehicule_cartegrise_debutdevalidite"
                                                                type="date"
                                                                name="_vehicule_cartegrise_debutdevalidite"
                                                                value={_vehicule_cartegrise._vehicule_cartegrise_debutdevalidite}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_cartegrise', '_vehicule_cartegrise_debutdevalidite', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_cartegrise_debutdevalidite' className={_vehicule_cartegrise._vehicule_cartegrise_debutdevalidite ? 'active' : ''}>Debut de validite</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_cartegrise_image1"
                                                                id="_vehicule_cartegrise_image1"
                                                                type="text"
                                                                name="_vehicule_cartegrise_image1"
                                                                value={_vehicule_cartegrise._vehicule_cartegrise_image1}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_cartegrise', '_vehicule_cartegrise_image1', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_cartegrise_image1' className={_vehicule_cartegrise._vehicule_cartegrise_image1 ? 'active' : ''}>1e image</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_cartegrise_image2"
                                                                id="_vehicule_cartegrise_image2"
                                                                type="text"
                                                                name="_vehicule_cartegrise_image2"
                                                                value={_vehicule_cartegrise._vehicule_cartegrise_image2}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_cartegrise', '_vehicule_cartegrise_image2', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_cartegrise_image2' className={_vehicule_cartegrise._vehicule_cartegrise_image2 ? 'active' : ''}>2e image</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right precedent action-button-precedent"
                                                                type="button"
                                                                name='precedent'
                                                                onClick={() => this.handlePrev('third-of-type')}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span="Precedent.">
                                                                            Precedent.
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right suivant action-button"
                                                                type="button"
                                                                name='suivant'
                                                                onClick={() => this.handleNext('third-of-type')}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span="Suivant.">
                                                                            Suivant.
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="fieldset fourth-of-type vignette">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_vignette_montant"
                                                                id="_vehicule_vignette_montant"
                                                                type="text"
                                                                name="_vehicule_vignette_montant"
                                                                value={_vehicule_vignette._vehicule_vignette_montant}
                                                                onChange={(event) => this.handleChangeNestedOnlyNumbers('_vehicule_vignette', '_vehicule_vignette_montant', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_vignette_montant' className={_vehicule_vignette._vehicule_vignette_montant ? 'active' : ''}>Montant</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_vignette_penalite"
                                                                id="_vehicule_vignette_penalite"
                                                                type="text"
                                                                name="_vehicule_vignette_penalite"
                                                                value={_vehicule_vignette._vehicule_vignette_penalite}
                                                                onChange={(event) => this.handleChangeNestedOnlyNumbers('_vehicule_vignette', '_vehicule_vignette_penalite', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_vignette_penalite' className={_vehicule_vignette._vehicule_vignette_penalite ? 'active' : ''}>Penalite</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_vignette_migration"
                                                                id="_vehicule_vignette_migration"
                                                                type="text"
                                                                name="_vehicule_vignette_migration"
                                                                value={_vehicule_vignette._vehicule_vignette_migration}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_vignette', '_vehicule_vignette_migration', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_vignette_migration' className={_vehicule_vignette._vehicule_vignette_migration ? 'active' : ''}>Migration</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_vignette_tsava"
                                                                id="_vehicule_vignette_tsava"
                                                                type="text"
                                                                name="_vehicule_vignette_tsava"
                                                                value={_vehicule_vignette._vehicule_vignette_tsava}
                                                                onChange={(event) => this.handleChangeNestedOnlyNumbers('_vehicule_vignette', '_vehicule_vignette_tsava', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_vignette_tsava' className={_vehicule_vignette._vehicule_vignette_tsava ? 'active' : ''}>TSAVA</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_vignette_datepaiement"
                                                                id="_vehicule_vignette_datepaiement"
                                                                type="date"
                                                                name="_vehicule_vignette_datepaiement"
                                                                value={_vehicule_vignette._vehicule_vignette_datepaiement}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_vignette', '_vehicule_vignette_datepaiement', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_vignette_datepaiement' className={_vehicule_vignette._vehicule_vignette_datepaiement ? 'active' : ''}>Date de paiement</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_vignette_image"
                                                                id="_vehicule_vignette_image"
                                                                type="text"
                                                                name="_vehicule_vignette_image"
                                                                value={_vehicule_vignette._vehicule_vignette_image}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_vignette', '_vehicule_vignette_image', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_vignette_image' className={_vehicule_vignette._vehicule_vignette_image ? 'active' : ''}>Image de vignette</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right precedent action-button-precedent"
                                                                type="button"
                                                                name='precedent'
                                                                onClick={() => this.handlePrev('fourth-of-type')}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span="Precedent.">
                                                                            Precedent.
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right suivant action-button"
                                                                type="button"
                                                                name='suivant'
                                                                onClick={() => this.handleNext('fourth-of-type')}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span="Suivant.">
                                                                            Suivant.
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="fieldset last-of-type carteautorisation certificatinstallation extincteur">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_carteautorisation_dateetablie"
                                                                id="_vehicule_carteautorisation_dateetablie"
                                                                type="date"
                                                                name="_vehicule_carteautorisation_dateetablie"
                                                                value={_vehicule_carteautorisation._vehicule_carteautorisation_dateetablie}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_carteautorisation', '_vehicule_carteautorisation_dateetablie', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_carteautorisation_dateetablie' className={_vehicule_carteautorisation._vehicule_carteautorisation_dateetablie ? 'active' : ''}>Date etablie</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_carteautorisation_datefinvalidite"
                                                                id="_vehicule_carteautorisation_datefinvalidite"
                                                                type="date"
                                                                name="_vehicule_carteautorisation_datefinvalidite"
                                                                value={_vehicule_carteautorisation._vehicule_carteautorisation_datefinvalidite}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_carteautorisation', '_vehicule_carteautorisation_datefinvalidite', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_carteautorisation_datefinvalidite' className={_vehicule_carteautorisation._vehicule_carteautorisation_datefinvalidite ? 'active' : ''}>Date de fin de validite</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_autorisation_image"
                                                                id="_vehicule_autorisation_image"
                                                                type="text"
                                                                name="_vehicule_autorisation_image"
                                                                value={_vehicule_carteautorisation._vehicule_autorisation_image}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_carteautorisation', '_vehicule_autorisation_image', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_autorisation_image' className={_vehicule_carteautorisation._vehicule_autorisation_image ? 'active' : ''}>Image de carte d'autorisation</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_certificatinstallation_datedebut"
                                                                id="_vehicule_certificatinstallation_datedebut"
                                                                type="date"
                                                                name="_vehicule_certificatinstallation_datedebut"
                                                                value={_vehicule_certificatinstallation._vehicule_certificatinstallation_datedebut}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_certificatinstallation', '_vehicule_certificatinstallation_datedebut', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_certificatinstallation_datedebut' className={_vehicule_certificatinstallation._vehicule_certificatinstallation_datedebut ? 'active' : ''}>Date debut</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_certificatinstallation_datefin"
                                                                id="_vehicule_certificatinstallation_datefin"
                                                                type="date"
                                                                name="_vehicule_certificatinstallation_datefin"
                                                                value={_vehicule_certificatinstallation._vehicule_certificatinstallation_datefin}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_certificatinstallation', '_vehicule_certificatinstallation_datefin', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_certificatinstallation_datefin' className={_vehicule_certificatinstallation._vehicule_certificatinstallation_datefin ? 'active' : ''}>Date fin</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_certificatinstallation_image"
                                                                id="_vehicule_certificatinstallation_image"
                                                                type="text"
                                                                name="_vehicule_certificatinstallation_image"
                                                                value={_vehicule_certificatinstallation._vehicule_certificatinstallation_image}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_certificatinstallation', '_vehicule_certificatinstallation_image', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_certificatinstallation_image' className={_vehicule_certificatinstallation._vehicule_certificatinstallation_image ? 'active' : ''}>Image de certificat d'installation</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_extincteur_datedebut"
                                                                id="_vehicule_extincteur_datedebut"
                                                                type="date"
                                                                name="_vehicule_extincteur_datedebut"
                                                                value={_vehicule_extincteur._vehicule_extincteur_datedebut}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_extincteur', '_vehicule_extincteur_datedebut', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_extincteur_datedebut' className={_vehicule_extincteur._vehicule_extincteur_datedebut ? 'active' : ''}>Mutation</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_extincteur_datefin"
                                                                id="_vehicule_extincteur_datefin"
                                                                type="date"
                                                                name="_vehicule_extincteur_datefin"
                                                                value={_vehicule_extincteur._vehicule_extincteur_datefin}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_extincteur', '_vehicule_extincteur_datefin', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_extincteur_datefin' className={_vehicule_extincteur._vehicule_extincteur_datefin ? 'active' : ''}>Debut de validite</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6"></div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right precedent action-button-precedent"
                                                                type="button"
                                                                name='precedent'
                                                                onClick={() => this.handlePrev('last-of-type')}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span="Precedent.">
                                                                            Precedent.
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right"
                                                                type="submit"
                                                                name='btn_login'
                                                                onClick={this.handleSubmitVehicule}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span={_vehiculeToEdit ? 'Update.' : 'Submit.'}>
                                                                            {_vehiculeToEdit ? 'Update' : 'Submit'}.
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

    _vehiculeToEdit: state.home._vehiculeToEdit,
    _vehicules: state.home._vehicules,
});

const mapDispatchToProps = dispatch => ({
    setEditUser: user => dispatch({ type: 'SET_EDIT_USER', user }),

    onSubmitVehicule: data => dispatch({ type: 'SUBMIT_VEHICULE', data }),
    onEditVehicule: data => dispatch({ type: 'EDIT_VEHICULE', data }),
    onLoadVehicule: data => dispatch({ type: 'VEHICULE_PAGE_LOADED', data }),
    onDeleteVehicule: id => dispatch({ type: 'DELETE_VEHICULE', id }),
    setEditVehicule: _vehicule => dispatch({ type: 'SET_EDIT_VEHICULE', _vehicule }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);