import React from "react";
import axios from 'axios';
import moment from 'moment';
import PhoneInput from 'react-phone-number-input';
import Autocomplete from 'react-autocomplete';
import Select from 'react-select';
import { connect } from 'react-redux';
import API from "../../utils/API";
import { FullPage, Slide } from 'react-full-page';
import 'whatwg-fetch';
import * as $ from "jquery";
import jQuery from 'jquery';
import 'bootstrap';
import socketIOClient from "socket.io-client";
import favicon from '../../favicon.svg';
import update from 'immutability-helper';
import 'react-phone-number-input/style.css';
import validator from 'validator';

// import Swiper core and required components
import SwiperCore, { Scrollbar, A11y, EffectCoverflow, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/effect-coverflow/effect-coverflow.scss';

// install Virtual module
SwiperCore.use([Scrollbar, A11y, Virtual, EffectCoverflow]);

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

            _user: {
                _user_email: '',
                _user_username: '',
                _user_password: '',
                _user_passwordResetToken: '',
                _user_passwordResetExpires: moment().format('YYYY-MM-DD'),
                _user_fingerprint: '',
                _user_isVerified: false,
                _user_logindate: [null],
                Employe: {
                    _employe_prenom: '',
                    _employe_nom: '',
                    _employe_telephone: '',
                    _employe_datenaissance: moment().format('YYYY-MM-DD'),
                    _employe_CNIE: '',
                    _employe_situationfamille: '',
                    _employe_nombreenfants: 0,
                    _employe_adresse: '',
                    _employe_CNSS: {
                        _employe_CNSS_dateimmatriculation: moment().format('YYYY-MM-DD'),
                        _employe_CNSS_numeroimmatriculation: '',
                        _employe_CNSS_montant: 0
                    },
                    _employe_permis: {
                        _employe_permis_numero: '',
                        _employe_permis_categorie: '',
                        _employe_permis_datedelivrance: moment().format('YYYY-MM-DD'),
                        _employe_permis_datefinvalidite: moment().format('YYYY-MM-DD'),
                        _employe_permis_image1: '',
                        _employe_permis_image2: ''
                    },
                    _employe_datembauche: moment().format('YYYY-MM-DD'),
                    _employe_image: '',
                    Poste: {
                        _poste_titre: '',
                        _poste_salaireinitiale: 0
                    },
                    RevueDePerformance: {
                        _revueDePerformance_date: moment().format('YYYY-MM-DD'),
                        _revueDePerformance_resultat: ''
                    }
                },
                Permission: [{
                    _permission_titre: ''
                }]
            },
            _users: [],

            _client_email_valid: true,
            _fournisseur_email_valid: true,
            _passager_email_valid: true,
            _societe_email_valid: true,
            _user_email_valid: true,

            _search_value_vehicules: '',
            _search_value_parametres: '',

            _agence_adresse: '',
            _agence_ville: '',
            _agence_pays: '',
            _bon_numero: '',
            _bon_date: moment().format('YYYY-MM-DD'),
            _bon_type: '',
            Facture: null,
            _client_prenomcontact: '',
            _client_nomcontact: '',
            _client_raison: '',
            _client_adresse: '',
            _client_telephone: '',
            _client_email: '',
            _client_ville: '',
            _client_pays: '',
            _client_ICE: '',
            _client_IF: '',
            _client_RC: '',
            _client_patente: '',
            _client_contrat: '',
            _devis_numero: 0,
            _devis_date: moment().format('YYYY-MM-DD'),
            _devis_commentaire: '',
            _devis_TVA: 0,
            _devis_image: '',
            _employe_prenom: '',
            _employe_nom: '',
            _employe_telephone: '',
            _employe_datenaissance: moment().format('YYYY-MM-DD'),
            _employe_CNIE: '',
            _employe_situationfamille: '',
            _employe_nombreenfants: 0,
            _employe_adresse: '',
            _employe_CNSS: {
                _employe_CNSS_dateimmatriculation: moment().format('YYYY-MM-DD'),
                _employe_CNSS_numeroimmatriculation: '',
                _employe_CNSS_montant: 0
            },
            _employe_permis: {
                _employe_permis_numero: '',
                _employe_permis_categorie: '',
                _employe_permis_datedelivrance: moment().format('YYYY-MM-DD'),
                _employe_permis_datefinvalidite: moment().format('YYYY-MM-DD'),
                _employe_permis_image1: '',
                _employe_permis_image2: ''
            },
            _employe_datembauche: moment().format('YYYY-MM-DD'),
            _employe_image: '',
            Poste: null,
            RevueDePerformance: null,
            _facture_numero: '',
            _facture_date: moment().format('YYYY-MM-DD'),
            _facture_commentaire: '',
            _facture_TVA: 0,
            _facture_venteachat: '',
            _facture_ispayed: false,
            _facture_numeropaiement: 0,
            _facture_datepaiement: moment().format('YYYY-MM-DD'),
            _facture_type: '',
            _facture_image: '',
            Societe: null,
            Fournisseur: null,
            _fournisseur_prenomcontact: '',
            _fournisseur_nomcontact: '',
            _fournisseur_raison: '',
            _fournisseur_siege: '',
            _fournisseur_telephone: '',
            _fournisseur_email: '',
            _fournisseur_ville: '',
            _fournisseur_pays: '',
            _fournisseur_ICE: '',
            _fournisseur_IF: '',
            _fournisseur_RC: '',
            _fournisseur_patente: '',
            _passager_prenom: '',
            _passager_nom: '',
            _passager_telephone: '',
            _passager_email: '',
            _passager_adresse: '',
            _passager_ville: '',
            _passager_pays: '',
            _permission_titre: '',
            _poste_titre: '',
            _poste_salaireinitiale: 0,
            _produit_designation: '',
            _produit_reference: '',
            _produit_quantite: 0,
            _produit_prixunitaire: 0,
            _produit_statut: '',
            _reservation_nombreadultes: 0,
            _reservation_nombreenfants: 0,
            _reservation_datereservation: moment().format('YYYY-MM-DD'),
            _reservation_commentaire: '',
            _reservation_status: '',
            Voyage: null,
            Client: null,
            _revueDePerformance_date: moment().format('YYYY-MM-DD'),
            _revueDePerformance_resultat: '',
            _societe_raison: '',
            _societe_siege: '',
            _societe_numeroTP: '',
            _societe_IF: '',
            _societe_telephone: '',
            _societe_fax: '',
            _societe_email: '',
            _societe_ICE: '',
            _societe_CNSS: '',
            _societe_logo: '',
            Agence: null,
            Produit: [],
            _user_email: '',
            _user_username: '',
            _user_password: '',
            _user_fingerprint: '',
            _user_isVerified: false,
            _user_logindate: moment().format('YYYY-MM-DD'),
            Employe: null,
            Permission: null,
            _vehicule_marque: '',
            _vehicule_fabricant: '',
            _vehicule_numerochassis: '',
            _vehicule_numeroregistration: '',
            _vehicule_model: '',
            _vehicule_datefabrication: moment().format('YYYY-MM-DD'),
            _vehicule_moteur: '',
            _vehicule_volumereservoir: 0,
            _vehicule_image: '',
            _vehicule_poidsavide: 0,
            _vehicule_kmparvidange: 0,
            _vehicule_categorie: {
                _vehicule_categorie_nom: '',
                _vehicule_categorie_nombrepassagers: 0,
                _vehicule_categorie_bagage: '',
                _vehicule_categorie_carrosserie: ''
            },
            _vehicule_recharge: [{
                _vehicule_recharge_date: moment().format('YYYY-MM-DD'),
                _vehicule_recharge_litres: 0,
                _vehicule_recharge_km: 0,
                _vehicule_recharge_prixlitre: 0,
                _vehicule_recharge_consommation: 0
            }],
            _vehicule_consommation: {
                _vehicule_consommation_ville: 0,
                _vehicule_consommation_route: 0,
                _vehicule_consommation_mixte: 0
            },
            _vehicule_assurance: {
                _vehicule_assurance_entrepriseassurance: '',
                _vehicule_assurance_datedebut: moment().format('YYYY-MM-DD'),
                _vehicule_assurance_datefin: moment().format('YYYY-MM-DD'),
                _vehicule_assurance_montant: 0,
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
            _vehicule_vidange: [{
                _vehicule_vidange_km: 0,
                _vehicule_vidange_date: moment().format('YYYY-MM-DD'),
                _vehicule_vidange_type: ''
            }],
            _vehicule_vignette: {
                _vehicule_vignette_montant: 0,
                _vehicule_vignette_penalite: 0,
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
            _vehicule_visitetechnique: [{
                _vehicule_visitetechnique_datecontrole: moment().format('YYYY-MM-DD'),
                _vehicule_visitetechnique_naturecontrole: moment().format('YYYY-MM-DD'),
                _vehicule_visitetechnique_resultat: '',
                _vehicule_visitetechnique_limitevalidite: '',
                _vehicule_visitetechnique_numeroproces: 0,
                _vehicule_visitetechnique_raisonsocialecontrolleur: '',
                _vehicule_visitetechnique_kmreleve: 0,
                _vehicule_visitetechnique_image: ''
            }],
            _voyage_datedepart: moment().format('YYYY-MM-DD'),
            _voyage_datearrive: moment().format('YYYY-MM-DD'),
            _voyage_lieudepart: '',
            _voyage_lieuarrive: '',
            _voyage_statut: '',
            Passager: null,
            Vehicule: null
        };

        this.disconnect = this.disconnect.bind(this);
        this.get_users = this.get_users.bind(this);
        this.get_user = this.get_user.bind(this);
        this.set_user = this.set_user.bind(this);

        this.handleDeleteAgence = this.handleDeleteAgence.bind(this);
        this.handleEditAgence = this.handleEditAgence.bind(this);
        this.handleSubmitAgence = this.handleSubmitAgence.bind(this);

        this.handleDeleteBon = this.handleDeleteBon.bind(this);
        this.handleEditBon = this.handleEditBon.bind(this);
        this.handleSubmitBon = this.handleSubmitBon.bind(this);

        this.handleDeleteClient = this.handleDeleteClient.bind(this);
        this.handleEditClient = this.handleEditClient.bind(this);
        this.handleSubmitClient = this.handleSubmitClient.bind(this);

        this.handleDeleteDevis = this.handleDeleteDevis.bind(this);
        this.handleEditDevis = this.handleEditDevis.bind(this);
        this.handleSubmitDevis = this.handleSubmitDevis.bind(this);

        this.handleDeleteEmploye = this.handleDeleteEmploye.bind(this);
        this.handleEditEmploye = this.handleEditEmploye.bind(this);
        this.handleSubmitEmploye = this.handleSubmitEmploye.bind(this);

        this.handleDeleteFacture = this.handleDeleteFacture.bind(this);
        this.handleEditFacture = this.handleEditFacture.bind(this);
        this.handleSubmitFacture = this.handleSubmitFacture.bind(this);

        this.handleDeleteFournisseur = this.handleDeleteFournisseur.bind(this);
        this.handleEditFournisseur = this.handleEditFournisseur.bind(this);
        this.handleSubmitFournisseur = this.handleSubmitFournisseur.bind(this);

        this.handleDeletePassager = this.handleDeletePassager.bind(this);
        this.handleEditPassager = this.handleEditPassager.bind(this);
        this.handleSubmitPassager = this.handleSubmitPassager.bind(this);

        this.handleDeletePermission = this.handleDeletePermission.bind(this);
        this.handleEditPermission = this.handleEditPermission.bind(this);
        this.handleSubmitPermission = this.handleSubmitPermission.bind(this);

        this.handleDeletePoste = this.handleDeletePoste.bind(this);
        this.handleEditPoste = this.handleEditPoste.bind(this);
        this.handleSubmitPoste = this.handleSubmitPoste.bind(this);

        this.handleDeleteProduit = this.handleDeleteProduit.bind(this);
        this.handleEditProduit = this.handleEditProduit.bind(this);
        this.handleSubmitProduit = this.handleSubmitProduit.bind(this);

        this.handleDeleteReservation = this.handleDeleteReservation.bind(this);
        this.handleEditReservation = this.handleEditReservation.bind(this);
        this.handleSubmitReservation = this.handleSubmitReservation.bind(this);

        this.handleDeleteRevueDePerformance = this.handleDeleteRevueDePerformance.bind(this);
        this.handleEditRevueDePerformance = this.handleEditRevueDePerformance.bind(this);
        this.handleSubmitRevueDePerformance = this.handleSubmitRevueDePerformance.bind(this);

        this.handleDeleteSociete = this.handleDeleteSociete.bind(this);
        this.handleEditSociete = this.handleEditSociete.bind(this);
        this.handleSubmitSociete = this.handleSubmitSociete.bind(this);

        this.handleDeleteStock = this.handleDeleteStock.bind(this);
        this.handleEditStock = this.handleEditStock.bind(this);
        this.handleSubmitStock = this.handleSubmitStock.bind(this);

        this.handleDeleteVehicule = this.handleDeleteVehicule.bind(this);
        this.handleEditVehicule = this.handleEditVehicule.bind(this);
        this.handleSubmitVehicule = this.handleSubmitVehicule.bind(this);

        this.handleDeleteVoyage = this.handleDeleteVoyage.bind(this);
        this.handleEditVoyage = this.handleEditVoyage.bind(this);
        this.handleSubmitVoyage = this.handleSubmitVoyage.bind(this);

        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangeNested = this.handleChangeNested.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangePhoneAutocomplete = this.handleChangePhoneAutocomplete.bind(this);
        this.handleChangeNestedProduits = this.handleChangeNestedProduits.bind(this);

        this._handleClickEvents = this._handleClickEvents.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    componentWillMount() {
        const self = this;

        this.get_user();
        socket.on("USER_UPDATED_GET", data => self.get_user());

        const {
            onLoadAgence,
            onLoadBon,
            onLoadClient,
            onLoadDevis,
            onLoadEmploye,
            onLoadFacture,
            onLoadFournisseur,
            onLoadPassager,
            onLoadPermission,
            onLoadPoste,
            onLoadProduit,
            onLoadReservation,
            onLoadRevueDePerformance,
            onLoadSociete,
            onLoadStock,
            onLoadVehicule,
            onLoadVoyage
        } = this.props;

        axios('/api/agence')
            .then((response) => {
                onLoadAgence(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/bon')
            .then((response) => {
                onLoadBon(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/client')
            .then((response) => {
                onLoadClient(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/devis')
            .then((response) => {
                onLoadDevis(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/employe')
            .then((response) => {
                onLoadEmploye(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/facture')
            .then((response) => {
                onLoadFacture(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/fournisseur')
            .then((response) => {
                onLoadFournisseur(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/passager')
            .then((response) => {
                onLoadPassager(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/permission')
            .then((response) => {
                onLoadPermission(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/poste')
            .then((response) => {
                onLoadPoste(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/produit')
            .then((response) => {
                onLoadProduit(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/reservation')
            .then((response) => {
                onLoadReservation(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/revueDePerformance')
            .then((response) => {
                onLoadRevueDePerformance(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/societe')
            .then((response) => {
                onLoadSociete(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/stock')
            .then((response) => {
                onLoadStock(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/vehicule')
            .then((response) => {
                onLoadVehicule(response.data);
            })
            .catch((errors) => {
                console.log(errors);
            });

        axios('/api/voyage')
            .then((response) => {
                onLoadVoyage(response.data);
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
        if (nextProps._agenceToEdit) {
            this.setState({
                _agence_adresse: nextProps._agenceToEdit._agence_adresse,
                _agence_ville: nextProps._agenceToEdit._agence_ville,
                _agence_pays: nextProps._agenceToEdit._agence_pays
            });
        }

        if (nextProps._bonToEdit) {
            this.setState({
                _bon_numero: nextProps._bonToEdit._bon_numero,
                _bon_date: nextProps._bonToEdit._bon_date,
                _bon_type: nextProps._bonToEdit._bon_type,
                Facture: nextProps._bonToEdit.Facture
            });
        }

        if (nextProps._clientToEdit) {
            this.setState({
                _client_prenomcontact: nextProps._clientToEdit._client_prenomcontact,
                _client_nomcontact: nextProps._clientToEdit._client_nomcontact,
                _client_raison: nextProps._clientToEdit._client_raison,
                _client_adresse: nextProps._clientToEdit._client_adresse,
                _client_telephone: nextProps._clientToEdit._client_telephone,
                _client_email: nextProps._clientToEdit._client_email,
                _client_ville: nextProps._clientToEdit._client_ville,
                _client_pays: nextProps._clientToEdit._client_pays,
                _client_ICE: nextProps._clientToEdit._client_ICE,
                _client_IF: nextProps._clientToEdit._client_IF,
                _client_RC: nextProps._clientToEdit._client_RC,
                _client_patente: nextProps._clientToEdit._client_patente,
                _client_contrat: nextProps._clientToEdit._client_contrat
            });
        }

        if (nextProps._devisToEdit) {
            this.setState({
                _devis_numero: nextProps._devisToEdit._devis_numero,
                _devis_date: nextProps._devisToEdit._devis_date,
                _devis_commentaire: nextProps._devisToEdit._devis_commentaire,
                _devis_TVA: nextProps._devisToEdit._devis_TVA,
                _devis_image: nextProps._devisToEdit._devis_image,
                Fournisseur: nextProps._devisToEdit.Fournisseur,
                Client: nextProps._devisToEdit.Client,
                Produit: nextProps._devisToEdit.Produit,
                Societe: nextProps._devisToEdit.Societe
            });
        }

        if (nextProps._employeToEdit) {
            this.setState({
                _employe_prenom: nextProps._employeToEdit._employe_prenom,
                _employe_nom: nextProps._employeToEdit._employe_nom,
                _employe_telephone: nextProps._employeToEdit._employe_telephone,
                _employe_datenaissance: nextProps._employeToEdit._employe_datenaissance,
                _employe_CNIE: nextProps._employeToEdit._employe_CNIE,
                _employe_situationfamille: nextProps._employeToEdit._employe_situationfamille,
                _employe_nombreenfants: nextProps._employeToEdit._employe_nombreenfants,
                _employe_adresse: nextProps._employeToEdit._employe_adresse,
                _employe_CNSS: nextProps._employeToEdit._employe_CNSS,
                _employe_permis: nextProps._employeToEdit._employe_permis,
                _employe_datembauche: nextProps._employeToEdit._employe_datembauche,
                _employe_image: nextProps._employeToEdit._employe_image,
                Poste: nextProps._employeToEdit.Poste,
                RevueDePerformance: nextProps._employeToEdit.RevueDePerformance
            });
        }

        if (nextProps._factureToEdit) {
            this.setState({
                _facture_numero: nextProps._factureToEdit._facture_numero,
                _facture_date: nextProps._factureToEdit._facture_date,
                _facture_commentaire: nextProps._factureToEdit._facture_commentaire,
                _facture_TVA: nextProps._factureToEdit._facture_TVA,
                _facture_venteachat: nextProps._factureToEdit._facture_venteachat,
                _facture_ispayed: nextProps._factureToEdit._facture_ispayed,
                _facture_numeropaiement: nextProps._factureToEdit._facture_numeropaiement,
                _facture_datepaiement: nextProps._factureToEdit._facture_datepaiement,
                _facture_type: nextProps._factureToEdit._facture_type,
                _facture_image: nextProps._factureToEdit._facture_image,
                Client: nextProps._factureToEdit.Client,
                Produit: nextProps._factureToEdit.Produit,
                Societe: nextProps._factureToEdit.Societe,
                Fournisseur: nextProps._factureToEdit.Fournisseur
            });
        }

        if (nextProps._fournisseurToEdit) {
            this.setState({
                _fournisseur_prenomcontact: nextProps._fournisseurToEdit._fournisseur_prenomcontact,
                _fournisseur_nomcontact: nextProps._fournisseurToEdit._fournisseur_nomcontact,
                _fournisseur_raison: nextProps._fournisseurToEdit._fournisseur_raison,
                _fournisseur_siege: nextProps._fournisseurToEdit._fournisseur_siege,
                _fournisseur_telephone: nextProps._fournisseurToEdit._fournisseur_telephone,
                _fournisseur_email: nextProps._fournisseurToEdit._fournisseur_email,
                _fournisseur_ville: nextProps._fournisseurToEdit._fournisseur_ville,
                _fournisseur_pays: nextProps._fournisseurToEdit._fournisseur_pays,
                _fournisseur_ICE: nextProps._fournisseurToEdit._fournisseur_ICE,
                _fournisseur_IF: nextProps._fournisseurToEdit._fournisseur_IF,
                _fournisseur_RC: nextProps._fournisseurToEdit._fournisseur_RC,
                _fournisseur_patente: nextProps._fournisseurToEdit._fournisseur_patente
            });
        }

        if (nextProps._passagerToEdit) {
            this.setState({
                _passager_prenom: nextProps._passagerToEdit._passager_prenom,
                _passager_nom: nextProps._passagerToEdit._passager_nom,
                _passager_telephone: nextProps._passagerToEdit._passager_telephone,
                _passager_email: nextProps._passagerToEdit._passager_email,
                _passager_adresse: nextProps._passagerToEdit._passager_adresse,
                _passager_ville: nextProps._passagerToEdit._passager_ville,
                _passager_pays: nextProps._passagerToEdit._passager_pays
            });
        }

        if (nextProps._permissionToEdit) {
            this.setState({
                _permission_titre: nextProps._permissionToEdit._permission_titre
            });
        }

        if (nextProps._posteToEdit) {
            this.setState({
                _poste_titre: nextProps._posteToEdit._poste_titre,
                _poste_salaireinitiale: nextProps._posteToEdit._poste_salaireinitiale
            });
        }

        if (nextProps._produitToEdit) {
            this.setState({
                _produit_designation: nextProps._produitToEdit._produit_designation,
                _produit_reference: nextProps._produitToEdit._produit_reference,
                _produit_quantite: nextProps._produitToEdit._produit_quantite,
                _produit_prixunitaire: nextProps._produitToEdit._produit_prixunitaire,
                _produit_statut: nextProps._produitToEdit._produit_statut
            });
        }

        if (nextProps._reservationToEdit) {
            this.setState({
                _reservation_nombreadultes: nextProps._reservationToEdit._reservation_nombreadultes,
                _reservation_nombreenfants: nextProps._reservationToEdit._reservation_nombreenfants,
                _reservation_datereservation: nextProps._reservationToEdit._reservation_datereservation,
                _reservation_commentaire: nextProps._reservationToEdit._reservation_commentaire,
                _reservation_status: nextProps._reservationToEdit._reservation_status,
                Voyage: nextProps._reservationToEdit.Voyage,
                Client: nextProps._reservationToEdit.Client
            });
        }

        if (nextProps._revueDePerformanceToEdit) {
            this.setState({
                _revueDePerformance_date: nextProps._revueDePerformanceToEdit._revueDePerformance_date,
                _revueDePerformance_resultat: nextProps._revueDePerformanceToEdit._revueDePerformance_resultat
            });
        }

        if (nextProps._societeToEdit) {
            this.setState({
                Societe: nextProps._societeToEdit,
                _societe_raison: nextProps._societeToEdit._societe_raison,
                _societe_siege: nextProps._societeToEdit._societe_siege,
                _societe_numeroTP: nextProps._societeToEdit._societe_numeroTP,
                _societe_IF: nextProps._societeToEdit._societe_IF,
                _societe_telephone: nextProps._societeToEdit._societe_telephone,
                _societe_fax: nextProps._societeToEdit._societe_fax,
                _societe_email: nextProps._societeToEdit._societe_email,
                _societe_ICE: nextProps._societeToEdit._societe_ICE,
                _societe_CNSS: nextProps._societeToEdit._societe_CNSS,
                _societe_logo: nextProps._societeToEdit._societe_logo,
                Agence: nextProps._societeToEdit.Agence,
                Employe: nextProps._societeToEdit.Employe
            });
        }

        if (nextProps._stockToEdit) {
            this.setState({
                Produit: nextProps._societeToEdit.Produit
            });
        }

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
                _vehicule_image: nextProps._vehiculeToEdit._vehicule_image,
                _vehicule_poidsavide: nextProps._vehiculeToEdit._vehicule_poidsavide,
                _vehicule_kmparvidange: nextProps._vehiculeToEdit._vehicule_kmparvidange,
                _vehicule_categorie: nextProps._vehiculeToEdit._vehicule_categorie,
                _vehicule_consommation: nextProps._vehiculeToEdit._vehicule_consommation,
                _vehicule_assurance: nextProps._vehiculeToEdit._vehicule_assurance,
                _vehicule_cartegrise: nextProps._vehiculeToEdit._vehicule_cartegrise,
                _vehicule_vignette: nextProps._vehiculeToEdit._vehicule_vignette,
                _vehicule_carteautorisation: nextProps._vehiculeToEdit._vehicule_carteautorisation,
                _vehicule_certificatinstallation: nextProps._vehiculeToEdit._vehicule_certificatinstallation,
                _vehicule_extincteur: nextProps._vehiculeToEdit._vehicule_extincteur,
                _vehicule_recharge: nextProps._vehiculeToEdit._vehicule_recharge,
                _vehicule_vidange: nextProps._vehiculeToEdit._vehicule_vidange,
                _vehicule_visitetechnique: nextProps._vehiculeToEdit._vehicule_visitetechnique
            });
        }

        if (nextProps._voyageToEdit) {
            this.setState({
                _voyage_datedepart: nextProps._voyageToEdit._voyage_datedepart,
                _voyage_datearrive: nextProps._voyageToEdit._voyage_datearrive,
                _voyage_lieudepart: nextProps._voyageToEdit._voyage_lieudepart,
                _voyage_lieuarrive: nextProps._voyageToEdit._voyage_lieuarrive,
                _voyage_statut: nextProps._voyageToEdit._voyage_statut,
                Passager: nextProps._voyageToEdit.Passager,
                Vehicule: nextProps._voyageToEdit.Vehicule
            });
        }
    }

    async get_users() {
        const self = this;
        const { _user } = this.state;
        if (_.includes(_user.Permission, 'Founder')) {
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
        await API.get_user(localStorage.getItem('_user_email'))
            .then((res) => {
                self.setState({
                    _user: res.data._user,
                }, () => {
                    self.get_users();
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }
    async set_user() {
        const {
            _user,
            _user_password,
            _user_password_new,
            _user_password_new_confirm
        } = this.state;
        const { onEditEmploye } = this.props;

        try {
            await API.set_user({ _user, _user_password, _user_password_new, _user_password_new_confirm })
                .then((res) => {
                    return axios.patch(`/api/employe/${_user.Employe._id}`, {
                        _employe_prenom: _user.Employe._employe_prenom,
                        _employe_nom: _user.Employe._employe_nom,
                        _employe_telephone: _user.Employe._employe_telephone,
                        _employe_datenaissance: _user.Employe._employe_datenaissance,
                        _employe_CNIE: _user.Employe._employe_CNIE,
                        _employe_situationfamille: _user.Employe._employe_situationfamille,
                        _employe_nombreenfants: _user.Employe._employe_nombreenfants,
                        _employe_adresse: _user.Employe._employe_adresse,
                        _employe_CNSS: _user.Employe._employe_CNSS,
                        _employe_permis: _user.Employe._employe_permis,
                        _employe_datembauche: _user.Employe._employe_datembauche,
                        _employe_image: _user.Employe._employe_image,
                        Poste: _user.Employe.Poste,
                        RevueDePerformance: _user.Employe.RevueDePerformance
                    })
                        .then((resE) => {
                            onEditEmploye(resE.data);
                            this.get_users();
                            this.get_user();
                            socket.emit("USER_UPDATED", res.data.text);

                            this.setState({
                                modal_msg: 'Vos information ont été modifié et un email a été envoyé à votre adresse email pour vous notifier de ce fait.'
                            }, () => {
                                $('#_edit_modal').modal('toggle');
                            });
                        });
                })
                .catch((error) => {
                    this.setState({
                        modal_msg: error.response.data.text
                    }, () => {
                        $('#edit_modal').modal('toggle');
                    });
                });
        } catch (error) {
            this.setState({
                modal_msg: JSON.stringify(error)
            }, () => {
                $('#edit_modal').modal('toggle');
            });
        }
    }

    handleDeleteAgence(id) {
        const { onDeleteAgence } = this.props;
        return axios.delete(`/api/agence/${id}`)
            .then(() => {
                onDeleteAgence(id);
            });
    }
    handleEditAgence(agence) {
        const { setEditAgence } = this.props;
        setEditAgence(agence);
    }
    handleSubmitAgence() {
        const { onSubmitAgence, _agenceToEdit, onEditAgence } = this.props;
        const {
            _agence_adresse,
            _agence_ville,
            _agence_pays,
            Societe,
            Agence
        } = this.state;

        if (!_agenceToEdit) {
            return axios.post('/api/agence', {
                _agence_adresse,
                _agence_ville,
                _agence_pays
            })
                .then((res) => {
                    onSubmitAgence(res.data);
                    this.handleEditSociete(Societe);

                    if (Agence)
                        this.setState({
                            Agence: [...Agence, res.data._agence]
                        }, () => {
                            this.handleSubmitSociete();
                        });
                    else
                        this.setState({
                            Agence: [res.data._agence]
                        }, () => {
                            this.handleSubmitSociete();
                        });
                })
                .then(() => {
                    this.setState(
                        {
                            _agence_adresse: '',
                            _agence_ville: '',
                            _agence_pays: '',
                            Societe: null
                        }
                    )
                });
        } else {
            return axios.patch(`/api/agence/${_agenceToEdit._id}`, {
                _agence_adresse,
                _agence_ville,
                _agence_pays
            })
                .then((res) => {
                    onEditAgence(res.data);
                    this.handleEditSociete(Societe);

                    if (Agence)
                        this.setState({
                            Agence: [...Agence, res.data._agence]
                        }, () => {
                            this.handleSubmitSociete();
                        });
                    else
                        this.setState({
                            Agence: [res.data._agence]
                        }, () => {
                            this.handleSubmitSociete();
                        });
                })
                .then(() => {
                    this.setState({
                        _agence_adresse: '',
                        _agence_ville: '',
                        _agence_pays: '',
                        Societe: null
                    })
                });
        }
    }

    handleDeleteBon(id) {
        const { onDeleteBon } = this.props;
        return axios.delete(`/api/bon/${id}`)
            .then(() => {
                onDeleteBon(id);
            });
    }
    handleEditBon(bon) {
        const { setEditBon } = this.props;
        setEditBon(bon);
    }
    handleSubmitBon() {
        const { onSubmitBon, _bonToEdit, onEditBon } = this.props;
        const {
            _bon_numero,
            _bon_date,
            _bon_type,
            Facture
        } = this.state;

        if (!_bonToEdit) {
            return axios.post('/api/bon', {
                _bon_numero,
                _bon_date,
                _bon_type,
                Facture
            })
                .then((res) => {
                    onSubmitBon(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _bon_numero: '',
                            _bon_date: moment().format('YYYY-MM-DD'),
                            _bon_type: '',
                            Facture: null
                        }
                    )
                });
        } else {
            return axios.patch(`/api/bon/${_bonToEdit._id}`, {
                _bon_numero,
                _bon_date,
                _bon_type,
                Facture
            })
                .then((res) => {
                    onEditBon(res.data);
                })
                .then(() => {
                    this.setState({
                        _bon_numero: '',
                        _bon_date: moment().format('YYYY-MM-DD'),
                        _bon_type: '',
                        Facture: null
                    })
                });
        }
    }

    handleDeleteClient(id) {
        const { onDeleteClient } = this.props;
        return axios.delete(`/api/client/${id}`)
            .then(() => {
                onDeleteClient(id);
            });
    }
    handleEditClient(client) {
        const { setEditClient } = this.props;
        setEditClient(client);
    }
    handleSubmitClient() {
        const { onSubmitClient, _clientToEdit, onEditClient } = this.props;
        const {
            _client_prenomcontact,
            _client_nomcontact,
            _client_raison,
            _client_adresse,
            _client_telephone,
            _client_email,
            _client_ville,
            _client_pays,
            _client_ICE,
            _client_IF,
            _client_RC,
            _client_patente,
            _client_contrat
        } = this.state;

        if (!_clientToEdit) {
            return axios.post('/api/client', {
                _client_prenomcontact,
                _client_nomcontact,
                _client_raison,
                _client_adresse,
                _client_telephone,
                _client_email,
                _client_ville,
                _client_pays,
                _client_ICE,
                _client_IF,
                _client_RC,
                _client_patente,
                _client_contrat
            })
                .then((res) => {
                    onSubmitClient(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _client_prenomcontact: '',
                            _client_nomcontact: '',
                            _client_raison: '',
                            _client_adresse: '',
                            _client_telephone: '',
                            _client_email: '',
                            _client_ville: '',
                            _client_pays: '',
                            _client_ICE: '',
                            _client_IF: '',
                            _client_RC: '',
                            _client_patente: '',
                            _client_contrat: ''
                        }
                    )
                });
        } else {
            return axios.patch(`/api/client/${_clientToEdit._id}`, {
                _client_prenomcontact,
                _client_nomcontact,
                _client_raison,
                _client_adresse,
                _client_telephone,
                _client_email,
                _client_ville,
                _client_pays,
                _client_ICE,
                _client_IF,
                _client_RC,
                _client_patente,
                _client_contrat
            })
                .then((res) => {
                    onEditClient(res.data);
                })
                .then(() => {
                    this.setState({
                        _client_prenomcontact: '',
                        _client_nomcontact: '',
                        _client_raison: '',
                        _client_adresse: '',
                        _client_telephone: '',
                        _client_email: '',
                        _client_ville: '',
                        _client_pays: '',
                        _client_ICE: '',
                        _client_IF: '',
                        _client_RC: '',
                        _client_patente: '',
                        _client_contrat: ''
                    })
                });
        }
    }

    handleDeleteDevis(id) {
        const { onDeleteDevis } = this.props;
        return axios.delete(`/api/devis/${id}`)
            .then(() => {
                onDeleteDevis(id);
            });
    }
    handleEditDevis(devis) {
        const { setEditDevis } = this.props;
        setEditDevis(devis);
    }
    handleSubmitDevis() {
        const { onSubmitDevis, _devisToEdit, onEditDevis, onSubmitProduit } = this.props;
        const {
            _deviss,
            _devis_numero,
            _devis_date,
            _devis_commentaire,
            _devis_TVA,
            _devis_image,
            Fournisseur,
            Client,
            Produit,
            Societe
        } = this.state;

        const requests = _.map(Produit, (P, index) => {
            return axios.post('/api/produit', {
                _produit_designation: P._produit_designation,
                _produit_reference: P._produit_reference,
                _produit_quantite: P._produit_quantite,
                _produit_prixunitaire: P._produit_prixunitaire,
                _produit_statut: 'Devis'
            })
                .then((res) => {
                    onSubmitProduit(res.data);
                    this.setState({
                        Produit: _.map(this.state.Produit, (_P, _I) => {
                            return _I === index ? res.data._produit : _P;
                        })
                    });
                });
        });

        axios
            .all(requests)
            .then(
                axios.spread((...responses) => {
                    if (!_devisToEdit) {
                        return axios.post('/api/devis', {
                            _devis_numero: _.add(_.get(_.last(_deviss), '_devis_numero'), 1),
                            _devis_date: moment().format(),
                            _devis_commentaire,
                            _devis_TVA,
                            _devis_image,
                            Fournisseur,
                            Client,
                            Produit: this.state.Produit,
                            Societe
                        })
                            .then((res) => {
                                onSubmitDevis(res.data);
                            })
                            .then(() => {
                                this.setState(
                                    {
                                        _devis_numero: 0,
                                        _devis_date: moment().format('YYYY-MM-DD'),
                                        _devis_commentaire: '',
                                        _devis_TVA: 0,
                                        _devis_image: '',
                                        Fournisseur: null,
                                        Client: null,
                                        Produit: [],
                                        Societe: null
                                    }
                                )
                            });
                    } else {
                        return axios.patch(`/api/devis/${_devisToEdit._id}`, {
                            _devis_numero,
                            _devis_date,
                            _devis_commentaire,
                            _devis_TVA,
                            _devis_image,
                            Fournisseur,
                            Client,
                            Produit: this.state.Produit,
                            Societe
                        })
                            .then((res) => {
                                onEditDevis(res.data);
                            })
                            .then(() => {
                                this.setState({
                                    _devis_numero: 0,
                                    _devis_date: moment().format('YYYY-MM-DD'),
                                    _devis_commentaire: '',
                                    _devis_TVA: 0,
                                    _devis_image: '',
                                    Fournisseur: null,
                                    Client: null,
                                    Produit: [],
                                    Societe: null
                                })
                            });
                    }
                })
            )
            .catch(errors => {
                console.error(errors);
            });
    }

    handleDeleteEmploye(id) {
        const { onDeleteEmploye } = this.props;
        return axios.delete(`/api/employe/${id}`)
            .then(() => {
                onDeleteEmploye(id);
            });
    }
    handleEditEmploye(employe) {
        const { setEditEmploye } = this.props;
        setEditEmploye(employe);
    }
    handleSubmitEmploye() {
        const { onSubmitEmploye, _employeToEdit, onEditEmploye } = this.props;
        const {
            _employe_prenom,
            _employe_nom,
            _employe_telephone,
            _employe_datenaissance,
            _employe_CNIE,
            _employe_situationfamille,
            _employe_nombreenfants,
            _employe_adresse,
            _employe_CNSS: {
                _employe_CNSS_dateimmatriculation,
                _employe_CNSS_numeroimmatriculation,
                _employe_CNSS_montant
            },
            _employe_permis: {
                _employe_permis_numero,
                _employe_permis_categorie,
                _employe_permis_datedelivrance,
                _employe_permis_datefinvalidite,
                _employe_permis_image1,
                _employe_permis_image2
            },
            _employe_datembauche,
            _employe_image,
            Poste,
            RevueDePerformance
        } = this.state;

        if (!_employeToEdit) {
            return axios.post('/api/employe', {
                _employe_prenom,
                _employe_nom,
                _employe_telephone,
                _employe_datenaissance,
                _employe_CNIE,
                _employe_situationfamille,
                _employe_nombreenfants,
                _employe_adresse,
                _employe_CNSS: {
                    _employe_CNSS_dateimmatriculation,
                    _employe_CNSS_numeroimmatriculation,
                    _employe_CNSS_montant
                },
                _employe_permis: {
                    _employe_permis_numero,
                    _employe_permis_categorie,
                    _employe_permis_datedelivrance,
                    _employe_permis_datefinvalidite,
                    _employe_permis_image1,
                    _employe_permis_image2
                },
                _employe_datembauche,
                _employe_image,
                Poste,
                RevueDePerformance
            })
                .then((res) => {
                    onSubmitEmploye(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _employe_prenom: '',
                            _employe_nom: '',
                            _employe_telephone: '',
                            _employe_datenaissance: moment().format('YYYY-MM-DD'),
                            _employe_CNIE: '',
                            _employe_situationfamille: '',
                            _employe_nombreenfants: 0,
                            _employe_adresse: '',
                            _employe_CNSS: {
                                _employe_CNSS_dateimmatriculation: moment().format('YYYY-MM-DD'),
                                _employe_CNSS_numeroimmatriculation: '',
                                _employe_CNSS_montant: 0
                            },
                            _employe_permis: {
                                _employe_permis_numero: '',
                                _employe_permis_categorie: '',
                                _employe_permis_datedelivrance: moment().format('YYYY-MM-DD'),
                                _employe_permis_datefinvalidite: moment().format('YYYY-MM-DD'),
                                _employe_permis_image1: '',
                                _employe_permis_image2: ''
                            },
                            _employe_datembauche: moment().format('YYYY-MM-DD'),
                            _employe_image: '',
                            Poste: null,
                            RevueDePerformance: null
                        }
                    )
                });
        } else {
            return axios.patch(`/api/employe/${_employeToEdit._id}`, {
                _employe_prenom,
                _employe_nom,
                _employe_telephone,
                _employe_datenaissance,
                _employe_CNIE,
                _employe_situationfamille,
                _employe_nombreenfants,
                _employe_adresse,
                _employe_CNSS: {
                    _employe_CNSS_dateimmatriculation,
                    _employe_CNSS_numeroimmatriculation,
                    _employe_CNSS_montant
                },
                _employe_permis: {
                    _employe_permis_numero,
                    _employe_permis_categorie,
                    _employe_permis_datedelivrance,
                    _employe_permis_datefinvalidite,
                    _employe_permis_image1,
                    _employe_permis_image2
                },
                _employe_datembauche,
                _employe_image,
                Poste,
                RevueDePerformance
            })
                .then((res) => {
                    onEditEmploye(res.data);
                })
                .then(() => {
                    this.setState({
                        _employe_prenom: '',
                        _employe_nom: '',
                        _employe_telephone: '',
                        _employe_datenaissance: moment().format('YYYY-MM-DD'),
                        _employe_CNIE: '',
                        _employe_situationfamille: '',
                        _employe_nombreenfants: 0,
                        _employe_adresse: '',
                        _employe_CNSS: {
                            _employe_CNSS_dateimmatriculation: moment().format('YYYY-MM-DD'),
                            _employe_CNSS_numeroimmatriculation: '',
                            _employe_CNSS_montant: 0
                        },
                        _employe_permis: {
                            _employe_permis_numero: '',
                            _employe_permis_categorie: '',
                            _employe_permis_datedelivrance: moment().format('YYYY-MM-DD'),
                            _employe_permis_datefinvalidite: moment().format('YYYY-MM-DD'),
                            _employe_permis_image1: '',
                            _employe_permis_image2: ''
                        },
                        _employe_datembauche: moment().format('YYYY-MM-DD'),
                        _employe_image: '',
                        Poste: null,
                        RevueDePerformance: null
                    })
                });
        }
    }

    handleDeleteFacture(id) {
        const { onDeleteFacture } = this.props;
        return axios.delete(`/api/facture/${id}`)
            .then(() => {
                onDeleteFacture(id);
            });
    }
    handleEditFacture(facture) {
        const { setEditFacture } = this.props;
        setEditFacture(facture);
    }
    handleSubmitFacture() {
        const { onSubmitFacture, _factureToEdit, onEditFacture, onSubmitProduit } = this.props;
        const {
            _factures,
            _facture_numero,
            _facture_date,
            _facture_commentaire,
            _facture_TVA,
            _facture_venteachat,
            _facture_ispayed,
            _facture_numeropaiement,
            _facture_datepaiement,
            _facture_type,
            _facture_image,
            Client,
            Produit,
            Societe,
            Fournisseur
        } = this.state;

        const requests = _.map(Produit, (P, index) => {
            return axios.post('/api/produit', {
                _produit_designation: P._produit_designation,
                _produit_reference: P._produit_reference,
                _produit_quantite: P._produit_quantite,
                _produit_prixunitaire: P._produit_prixunitaire,
                _produit_statut: 'Facture'
            })
                .then((res) => {
                    onSubmitProduit(res.data);
                    this.setState({
                        Produit: _.map(this.state.Produit, (_P, _I) => {
                            return _I === index ? res.data._produit : _P;
                        })
                    });
                });
        });

        axios
            .all(requests)
            .then(
                axios.spread((...responses) => {
                    if (!_factureToEdit) {
                        return axios.post('/api/facture', {
                            _facture_numero: _.add(_.get(_.last(_factures), '_facture_numero'), 1),
                            _facture_date: moment().format(),
                            _facture_commentaire,
                            _facture_TVA,
                            _facture_image,
                            Fournisseur,
                            Client,
                            Produit: this.state.Produit,
                            Societe
                        })
                            .then((res) => {
                                onSubmitFacture(res.data);
                            })
                            .then(() => {
                                this.setState(
                                    {
                                        _facture_numero: 0,
                                        _facture_date: moment().format('YYYY-MM-DD'),
                                        _facture_commentaire: '',
                                        _facture_TVA: 0,
                                        _facture_image: '',
                                        Fournisseur: null,
                                        Client: null,
                                        Produit: [],
                                        Societe: null
                                    }
                                )
                            });
                    } else {
                        return axios.patch(`/api/facture/${_factureToEdit._id}`, {
                            _facture_numero,
                            _facture_date,
                            _facture_commentaire,
                            _facture_TVA,
                            _facture_image,
                            Fournisseur,
                            Client,
                            Produit: this.state.Produit,
                            Societe
                        })
                            .then((res) => {
                                onEditFacture(res.data);
                            })
                            .then(() => {
                                this.setState({
                                    _facture_numero: 0,
                                    _facture_date: moment().format('YYYY-MM-DD'),
                                    _facture_commentaire: '',
                                    _facture_TVA: 0,
                                    _facture_image: '',
                                    Fournisseur: null,
                                    Client: null,
                                    Produit: [],
                                    Societe: null
                                })
                            });
                    }
                })
            )
            .catch(errors => {
                console.error(errors);
            });
    }

    handleDeleteFournisseur(id) {
        const { onDeleteFournisseur } = this.props;
        return axios.delete(`/api/fournisseur/${id}`)
            .then(() => {
                onDeleteFournisseur(id);
            });
    }
    handleEditFournisseur(fournisseur) {
        const { setEditFournisseur } = this.props;
        setEditFournisseur(fournisseur);
    }
    handleSubmitFournisseur() {
        const { onSubmitFournisseur, _fournisseurToEdit, onEditFournisseur } = this.props;
        const {
            _fournisseur_prenomcontact,
            _fournisseur_nomcontact,
            _fournisseur_raison,
            _fournisseur_siege,
            _fournisseur_telephone,
            _fournisseur_email,
            _fournisseur_ville,
            _fournisseur_pays,
            _fournisseur_ICE,
            _fournisseur_IF,
            _fournisseur_RC,
            _fournisseur_patente
        } = this.state;

        if (!_fournisseurToEdit) {
            return axios.post('/api/fournisseur', {
                _fournisseur_prenomcontact,
                _fournisseur_nomcontact,
                _fournisseur_raison,
                _fournisseur_siege,
                _fournisseur_telephone,
                _fournisseur_email,
                _fournisseur_ville,
                _fournisseur_pays,
                _fournisseur_ICE,
                _fournisseur_IF,
                _fournisseur_RC,
                _fournisseur_patente
            })
                .then((res) => {
                    onSubmitFournisseur(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _fournisseur_prenomcontact: '',
                            _fournisseur_nomcontact: '',
                            _fournisseur_raison: '',
                            _fournisseur_siege: '',
                            _fournisseur_telephone: '',
                            _fournisseur_email: '',
                            _fournisseur_ville: '',
                            _fournisseur_pays: '',
                            _fournisseur_ICE: '',
                            _fournisseur_IF: '',
                            _fournisseur_RC: '',
                            _fournisseur_patente: ''
                        }
                    )
                });
        } else {
            return axios.patch(`/api/fournisseur/${_fournisseurToEdit._id}`, {
                _fournisseur_prenomcontact,
                _fournisseur_nomcontact,
                _fournisseur_raison,
                _fournisseur_siege,
                _fournisseur_telephone,
                _fournisseur_email,
                _fournisseur_ville,
                _fournisseur_pays,
                _fournisseur_ICE,
                _fournisseur_IF,
                _fournisseur_RC,
                _fournisseur_patente
            })
                .then((res) => {
                    onEditFournisseur(res.data);
                })
                .then(() => {
                    this.setState({
                        _fournisseur_prenomcontact: '',
                        _fournisseur_nomcontact: '',
                        _fournisseur_raison: '',
                        _fournisseur_siege: '',
                        _fournisseur_telephone: '',
                        _fournisseur_email: '',
                        _fournisseur_ville: '',
                        _fournisseur_pays: '',
                        _fournisseur_ICE: '',
                        _fournisseur_IF: '',
                        _fournisseur_RC: '',
                        _fournisseur_patente: ''
                    })
                });
        }
    }

    handleDeletePassager(id) {
        const { onDeletePassager } = this.props;
        return axios.delete(`/api/passager/${id}`)
            .then(() => {
                onDeletePassager(id);
            });
    }
    handleEditPassager(passager) {
        const { setEditPassager } = this.props;
        setEditPassager(passager);
    }
    handleSubmitPassager() {
        const { onSubmitPassager, _passagerToEdit, onEditPassager } = this.props;
        const {
            _passager_prenom,
            _passager_nom,
            _passager_telephone,
            _passager_email,
            _passager_adresse,
            _passager_ville,
            _passager_pays
        } = this.state;

        if (!_passagerToEdit) {
            return axios.post('/api/passager', {
                _passager_prenom,
                _passager_nom,
                _passager_telephone,
                _passager_email,
                _passager_adresse,
                _passager_ville,
                _passager_pays
            })
                .then((res) => {
                    onSubmitPassager(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _passager_prenom: '',
                            _passager_nom: '',
                            _passager_telephone: '',
                            _passager_email: '',
                            _passager_adresse: '',
                            _passager_ville: '',
                            _passager_pays: ''
                        }
                    )
                });
        } else {
            return axios.patch(`/api/passager/${_passagerToEdit._id}`, {
                _passager_prenom,
                _passager_nom,
                _passager_telephone,
                _passager_email,
                _passager_adresse,
                _passager_ville,
                _passager_pays
            })
                .then((res) => {
                    onEditPassager(res.data);
                })
                .then(() => {
                    this.setState({
                        _passager_prenom: '',
                        _passager_nom: '',
                        _passager_telephone: '',
                        _passager_email: '',
                        _passager_adresse: '',
                        _passager_ville: '',
                        _passager_pays: ''
                    })
                });
        }
    }

    handleDeletePermission(id) {
        const { onDeletePermission } = this.props;
        return axios.delete(`/api/permission/${id}`)
            .then(() => {
                onDeletePermission(id);
            });
    }
    handleEditPermission(permission) {
        const { setEditPermission } = this.props;
        setEditPermission(permission);
    }
    handleSubmitPermission() {
        const { onSubmitPermission, _permissionToEdit, onEditPermission } = this.props;
        const {
            _permission_titre
        } = this.state;

        if (!_permissionToEdit) {
            return axios.post('/api/permission', {
                _permission_titre
            })
                .then((res) => {
                    onSubmitPermission(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _permission_titre: ''
                        }
                    )
                });
        } else {
            return axios.patch(`/api/permission/${_permissionToEdit._id}`, {
                _permission_titre
            })
                .then((res) => {
                    onEditPermission(res.data);
                })
                .then(() => {
                    this.setState({
                        _permission_titre: ''
                    })
                });
        }
    }

    handleDeletePoste(id) {
        const { onDeletePoste } = this.props;
        return axios.delete(`/api/poste/${id}`)
            .then(() => {
                onDeletePoste(id);
            });
    }
    handleEditPoste(poste) {
        const { setEditPoste } = this.props;
        setEditPoste(poste);
    }
    handleSubmitPoste() {
        const { onSubmitPoste, _posteToEdit, onEditPoste } = this.props;
        const {
            _poste_titre,
            _poste_salaireinitiale
        } = this.state;

        if (!_posteToEdit) {
            return axios.post('/api/poste', {
                _poste_titre,
                _poste_salaireinitiale
            })
                .then((res) => {
                    onSubmitPoste(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _poste_titre: '',
                            _poste_salaireinitiale: 0
                        }
                    )
                });
        } else {
            return axios.patch(`/api/poste/${_posteToEdit._id}`, {
                _poste_titre,
                _poste_salaireinitiale
            })
                .then((res) => {
                    onEditPoste(res.data);
                })
                .then(() => {
                    this.setState({
                        _poste_titre: '',
                        _poste_salaireinitiale: 0
                    })
                });
        }
    }

    handleDeleteProduit(id) {
        const { onDeleteProduit } = this.props;
        return axios.delete(`/api/produit/${id}`)
            .then(() => {
                onDeleteProduit(id);
            });
    }
    handleEditProduit(produit) {
        const { setEditProduit } = this.props;
        setEditProduit(produit);
    }
    handleSubmitProduit() {
        const { onSubmitProduit, _produitToEdit, onEditProduit } = this.props;
        const {
            _produit_designation,
            _produit_reference,
            _produit_quantite,
            _produit_prixunitaire,
            _produit_statut
        } = this.state;

        if (!_produitToEdit) {
            return axios.post('/api/produit', {
                _produit_designation,
                _produit_reference,
                _produit_quantite,
                _produit_prixunitaire,
                _produit_statut
            })
                .then((res) => {
                    onSubmitProduit(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _produit_designation: '',
                            _produit_reference: '',
                            _produit_quantite: 0,
                            _produit_prixunitaire: 0,
                            _produit_statut: ''
                        }
                    )
                });
        } else {
            return axios.patch(`/api/produit/${_produitToEdit._id}`, {
                _produit_designation,
                _produit_reference,
                _produit_quantite,
                _produit_prixunitaire,
                _produit_statut
            })
                .then((res) => {
                    onEditProduit(res.data);
                })
                .then(() => {
                    this.setState({
                        _produit_designation: '',
                        _produit_reference: '',
                        _produit_quantite: 0,
                        _produit_prixunitaire: 0,
                        _produit_statut: ''
                    })
                });
        }
    }

    handleDeleteReservation(id) {
        const { onDeleteReservation } = this.props;
        return axios.delete(`/api/reservation/${id}`)
            .then(() => {
                onDeleteReservation(id);
            });
    }
    handleEditReservation(reservation) {
        const { setEditReservation } = this.props;
        setEditReservation(reservation);
    }
    handleSubmitReservation() {
        const { onSubmitReservation, _reservationToEdit, onEditReservation } = this.props;
        const {
            _reservation_nombreadultes,
            _reservation_nombreenfants,
            _reservation_datereservation,
            _reservation_commentaire,
            _reservation_status,
            Voyage,
            Client
        } = this.state;

        if (!_reservationToEdit) {
            return axios.post('/api/reservation', {
                _reservation_nombreadultes,
                _reservation_nombreenfants,
                _reservation_datereservation,
                _reservation_commentaire,
                _reservation_status,
                Voyage,
                Client
            })
                .then((res) => {
                    onSubmitReservation(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _reservation_nombreadultes: 0,
                            _reservation_nombreenfants: 0,
                            _reservation_datereservation: moment().format('YYYY-MM-DD'),
                            _reservation_commentaire: '',
                            _reservation_status: '',
                            Voyage: null,
                            Client: null
                        }
                    )
                });
        } else {
            return axios.patch(`/api/reservation/${_reservationToEdit._id}`, {
                _reservation_nombreadultes,
                _reservation_nombreenfants,
                _reservation_datereservation,
                _reservation_commentaire,
                _reservation_status,
                Voyage,
                Client
            })
                .then((res) => {
                    onEditReservation(res.data);
                })
                .then(() => {
                    this.setState({
                        _reservation_nombreadultes: 0,
                        _reservation_nombreenfants: 0,
                        _reservation_datereservation: moment().format('YYYY-MM-DD'),
                        _reservation_commentaire: '',
                        _reservation_status: '',
                        Voyage: null,
                        Client: null
                    })
                });
        }
    }

    handleDeleteRevueDePerformance(id) {
        const { onDeleteRevueDePerformance } = this.props;
        return axios.delete(`/api/revueDePerformance/${id}`)
            .then(() => {
                onDeleteRevueDePerformance(id);
            });
    }
    handleEditRevueDePerformance(revueDePerformance) {
        const { setEditRevueDePerformance } = this.props;
        setEditRevueDePerformance(revueDePerformance);
    }
    handleSubmitRevueDePerformance() {
        const { onSubmitRevueDePerformance, _revueDePerformanceToEdit, onEditRevueDePerformance } = this.props;
        const {
            _revueDePerformance_date,
            _revueDePerformance_resultat
        } = this.state;

        if (!_revueDePerformanceToEdit) {
            return axios.post('/api/revueDePerformance', {
                _revueDePerformance_date,
                _revueDePerformance_resultat
            })
                .then((res) => {
                    onSubmitRevueDePerformance(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _revueDePerformance_date: moment().format('YYYY-MM-DD'),
                            _revueDePerformance_resultat: ''
                        }
                    )
                });
        } else {
            return axios.patch(`/api/revueDePerformance/${_revueDePerformanceToEdit._id}`, {
                _revueDePerformance_date,
                _revueDePerformance_resultat
            })
                .then((res) => {
                    onEditRevueDePerformance(res.data);
                })
                .then(() => {
                    this.setState({
                        _revueDePerformance_date: moment().format('YYYY-MM-DD'),
                        _revueDePerformance_resultat: ''
                    })
                });
        }
    }

    handleDeleteSociete(id) {
        const { onDeleteSociete } = this.props;
        return axios.delete(`/api/societe/${id}`)
            .then(() => {
                onDeleteSociete(id);
            });
    }
    handleEditSociete(societe) {
        const { setEditSociete } = this.props;
        setEditSociete(societe);
    }
    handleSubmitSociete() {
        const { onSubmitSociete, _societeToEdit, onEditSociete } = this.props;
        const {
            _societe_raison,
            _societe_siege,
            _societe_numeroTP,
            _societe_IF,
            _societe_telephone,
            _societe_fax,
            _societe_email,
            _societe_ICE,
            _societe_CNSS,
            _societe_logo,
            Agence,
            Employe
        } = this.state;

        if (!_societeToEdit) {
            return axios.post('/api/societe', {
                _societe_raison,
                _societe_siege,
                _societe_numeroTP,
                _societe_IF,
                _societe_telephone,
                _societe_fax,
                _societe_email,
                _societe_ICE,
                _societe_CNSS,
                _societe_logo,
                Agence,
                Employe
            })
                .then((res) => {
                    onSubmitSociete(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _societe_raison: '',
                            _societe_siege: '',
                            _societe_numeroTP: '',
                            _societe_IF: '',
                            _societe_telephone: '',
                            _societe_fax: '',
                            _societe_email: '',
                            _societe_ICE: '',
                            _societe_CNSS: '',
                            _societe_logo: '',
                            Agence: null,
                            Employe: null
                        }
                    )
                });
        } else {
            return axios.patch(`/api/societe/${_societeToEdit._id}`, {
                _societe_raison,
                _societe_siege,
                _societe_numeroTP,
                _societe_IF,
                _societe_telephone,
                _societe_fax,
                _societe_email,
                _societe_ICE,
                _societe_CNSS,
                _societe_logo,
                Agence,
                Employe
            })
                .then((res) => {
                    onEditSociete(res.data);
                })
                .then(() => {
                    this.setState({
                        _societe_raison: '',
                        _societe_siege: '',
                        _societe_numeroTP: '',
                        _societe_IF: '',
                        _societe_telephone: '',
                        _societe_fax: '',
                        _societe_email: '',
                        _societe_ICE: '',
                        _societe_CNSS: '',
                        _societe_logo: '',
                        Agence: null,
                        Employe: null
                    })
                });
        }
    }

    handleDeleteStock(id) {
        const { onDeleteStock } = this.props;
        return axios.delete(`/api/stock/${id}`)
            .then(() => {
                onDeleteStock(id);
            });
    }
    handleEditStock(stock) {
        const { setEditStock } = this.props;
        setEditStock(stock);
    }
    handleSubmitStock() {
        const { onSubmitStock, _stockToEdit, onEditStock } = this.props;
        const {
            Produit
        } = this.state;

        if (!_stockToEdit) {
            return axios.post('/api/stock', {
                Produit
            })
                .then((res) => {
                    onSubmitStock(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            Produit: null
                        }
                    )
                });
        } else {
            return axios.patch(`/api/stock/${_stockToEdit._id}`, {
                Produit
            })
                .then((res) => {
                    onEditStock(res.data);
                })
                .then(() => {
                    this.setState({
                        Produit: null
                    })
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
            _vehicule_image,
            _vehicule_poidsavide,
            _vehicule_kmparvidange,
            _vehicule_categorie: {
                _vehicule_categorie_nom,
                _vehicule_categorie_nombrepassagers,
                _vehicule_categorie_bagage,
                _vehicule_categorie_carrosserie
            },
            _vehicule_recharge: [{
                _vehicule_recharge_date,
                _vehicule_recharge_litres,
                _vehicule_recharge_km,
                _vehicule_recharge_prixlitre,
                _vehicule_recharge_consommation
            }],
            _vehicule_consommation: {
                _vehicule_consommation_ville,
                _vehicule_consommation_route,
                _vehicule_consommation_mixte
            },
            _vehicule_assurance: {
                _vehicule_assurance_entrepriseassurance,
                _vehicule_assurance_datedebut,
                _vehicule_assurance_datefin,
                _vehicule_assurance_montant,
                _vehicule_assurance_image1,
                _vehicule_assurance_image2
            },
            _vehicule_cartegrise: {
                _vehicule_cartegrise_immatriculation,
                _vehicule_cartegrise_immatriculationanterieur,
                _vehicule_cartegrise_miseencriculation,
                _vehicule_cartegrise_miseencirculationmaroc,
                _vehicule_cartegrise_mutation,
                _vehicule_cartegrise_debutdevalidite,
                _vehicule_cartegrise_image1,
                _vehicule_cartegrise_image2
            },
            _vehicule_vidange: [{
                _vehicule_vidange_km,
                _vehicule_vidange_date,
                _vehicule_vidange_type
            }],
            _vehicule_vignette: {
                _vehicule_vignette_montant,
                _vehicule_vignette_penalite,
                _vehicule_vignette_migration,
                _vehicule_vignette_tsava,
                _vehicule_vignette_datepaiement,
                _vehicule_vignette_image
            },
            _vehicule_carteautorisation: {
                _vehicule_carteautorisation_dateetablie,
                _vehicule_carteautorisation_datefinvalidite,
                _vehicule_autorisation_image
            },
            _vehicule_certificatinstallation: {
                _vehicule_certificatinstallation_datedebut,
                _vehicule_certificatinstallation_datefin,
                _vehicule_certificatinstallation_image
            },
            _vehicule_extincteur: {
                _vehicule_extincteur_datedebut,
                _vehicule_extincteur_datefin
            },
            _vehicule_visitetechnique: [{
                _vehicule_visitetechnique_datecontrole,
                _vehicule_visitetechnique_naturecontrole,
                _vehicule_visitetechnique_resultat,
                _vehicule_visitetechnique_limitevalidite,
                _vehicule_visitetechnique_numeroproces,
                _vehicule_visitetechnique_raisonsocialecontrolleur,
                _vehicule_visitetechnique_kmreleve,
                _vehicule_visitetechnique_image
            }]
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
                _vehicule_image,
                _vehicule_poidsavide,
                _vehicule_kmparvidange,
                _vehicule_categorie: {
                    _vehicule_categorie_nom,
                    _vehicule_categorie_nombrepassagers,
                    _vehicule_categorie_bagage,
                    _vehicule_categorie_carrosserie
                },
                _vehicule_recharge: [{
                    _vehicule_recharge_date,
                    _vehicule_recharge_litres,
                    _vehicule_recharge_km,
                    _vehicule_recharge_prixlitre,
                    _vehicule_recharge_consommation
                }],
                _vehicule_consommation: {
                    _vehicule_consommation_ville,
                    _vehicule_consommation_route,
                    _vehicule_consommation_mixte
                },
                _vehicule_assurance: {
                    _vehicule_assurance_entrepriseassurance,
                    _vehicule_assurance_datedebut,
                    _vehicule_assurance_datefin,
                    _vehicule_assurance_montant,
                    _vehicule_assurance_image1,
                    _vehicule_assurance_image2
                },
                _vehicule_cartegrise: {
                    _vehicule_cartegrise_immatriculation,
                    _vehicule_cartegrise_immatriculationanterieur,
                    _vehicule_cartegrise_miseencriculation,
                    _vehicule_cartegrise_miseencirculationmaroc,
                    _vehicule_cartegrise_mutation,
                    _vehicule_cartegrise_debutdevalidite,
                    _vehicule_cartegrise_image1,
                    _vehicule_cartegrise_image2
                },
                _vehicule_vidange: [{
                    _vehicule_vidange_km,
                    _vehicule_vidange_date,
                    _vehicule_vidange_type
                }],
                _vehicule_vignette: {
                    _vehicule_vignette_montant,
                    _vehicule_vignette_penalite,
                    _vehicule_vignette_migration,
                    _vehicule_vignette_tsava,
                    _vehicule_vignette_datepaiement,
                    _vehicule_vignette_image
                },
                _vehicule_carteautorisation: {
                    _vehicule_carteautorisation_dateetablie,
                    _vehicule_carteautorisation_datefinvalidite,
                    _vehicule_autorisation_image
                },
                _vehicule_certificatinstallation: {
                    _vehicule_certificatinstallation_datedebut,
                    _vehicule_certificatinstallation_datefin,
                    _vehicule_certificatinstallation_image
                },
                _vehicule_extincteur: {
                    _vehicule_extincteur_datedebut,
                    _vehicule_extincteur_datefin
                },
                _vehicule_visitetechnique: [{
                    _vehicule_visitetechnique_datecontrole,
                    _vehicule_visitetechnique_naturecontrole,
                    _vehicule_visitetechnique_resultat,
                    _vehicule_visitetechnique_limitevalidite,
                    _vehicule_visitetechnique_numeroproces,
                    _vehicule_visitetechnique_raisonsocialecontrolleur,
                    _vehicule_visitetechnique_kmreleve,
                    _vehicule_visitetechnique_image
                }]
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
                            _vehicule_volumereservoir: 0,
                            _vehicule_image: '',
                            _vehicule_poidsavide: 0,
                            _vehicule_kmparvidange: 0,
                            _vehicule_categorie: {
                                _vehicule_categorie_nom: '',
                                _vehicule_categorie_nombrepassagers: 0,
                                _vehicule_categorie_bagage: '',
                                _vehicule_categorie_carrosserie: ''
                            },
                            _vehicule_recharge: [{
                                _vehicule_recharge_date: moment().format('YYYY-MM-DD'),
                                _vehicule_recharge_litres: 0,
                                _vehicule_recharge_km: 0,
                                _vehicule_recharge_prixlitre: 0,
                                _vehicule_recharge_consommation: 0
                            }],
                            _vehicule_consommation: {
                                _vehicule_consommation_ville: 0,
                                _vehicule_consommation_route: 0,
                                _vehicule_consommation_mixte: 0
                            },
                            _vehicule_assurance: {
                                _vehicule_assurance_entrepriseassurance: '',
                                _vehicule_assurance_datedebut: moment().format('YYYY-MM-DD'),
                                _vehicule_assurance_datefin: moment().format('YYYY-MM-DD'),
                                _vehicule_assurance_montant: 0,
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
                            _vehicule_vidange: [{
                                _vehicule_vidange_km: 0,
                                _vehicule_vidange_date: moment().format('YYYY-MM-DD'),
                                _vehicule_vidange_type: ''
                            }],
                            _vehicule_vignette: {
                                _vehicule_vignette_montant: 0,
                                _vehicule_vignette_penalite: 0,
                                _vehicule_vignette_migration: '',
                                _vehicule_vignette_tsava: '',
                                _vehicule_vignette_datepaiement: moment().format('YYYY-MM-DD'),
                                _vehicule_vignette_image
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
                            _vehicule_visitetechnique: [{
                                _vehicule_visitetechnique_datecontrole: moment().format('YYYY-MM-DD'),
                                _vehicule_visitetechnique_naturecontrole: moment().format('YYYY-MM-DD'),
                                _vehicule_visitetechnique_resultat: '',
                                _vehicule_visitetechnique_limitevalidite: '',
                                _vehicule_visitetechnique_numeroproces: 0,
                                _vehicule_visitetechnique_raisonsocialecontrolleur: '',
                                _vehicule_visitetechnique_kmreleve: 0,
                                _vehicule_visitetechnique_image: ''
                            }]
                        }, () => {
                            var first_fs, last_fs;
                            var left, opacity, scale;
                            var animating;

                            if (animating)
                                return false;

                            animating = true;

                            first_fs = $('.first-of-type');
                            last_fs = $('.last-of-type');

                            $('.progressbar li.' + last_fs.attr('id')).removeClass('active');
                            $('.progressbar li.' + first_fs.attr('id')).addClass('active');

                            last_fs.animate({ opacity }, {
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
                                        'display': 'grid'
                                    });
                                    animating = false;
                                }
                            });
                        });
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
                _vehicule_image,
                _vehicule_poidsavide,
                _vehicule_kmparvidange,
                _vehicule_categorie: {
                    _vehicule_categorie_nom,
                    _vehicule_categorie_nombrepassagers,
                    _vehicule_categorie_bagage,
                    _vehicule_categorie_carrosserie
                },
                _vehicule_recharge: [{
                    _vehicule_recharge_date,
                    _vehicule_recharge_litres,
                    _vehicule_recharge_km,
                    _vehicule_recharge_prixlitre,
                    _vehicule_recharge_consommation
                }],
                _vehicule_consommation: {
                    _vehicule_consommation_ville,
                    _vehicule_consommation_route,
                    _vehicule_consommation_mixte
                },
                _vehicule_assurance: {
                    _vehicule_assurance_entrepriseassurance,
                    _vehicule_assurance_datedebut,
                    _vehicule_assurance_datefin,
                    _vehicule_assurance_montant,
                    _vehicule_assurance_image1,
                    _vehicule_assurance_image2
                },
                _vehicule_cartegrise: {
                    _vehicule_cartegrise_immatriculation,
                    _vehicule_cartegrise_immatriculationanterieur,
                    _vehicule_cartegrise_miseencriculation,
                    _vehicule_cartegrise_miseencirculationmaroc,
                    _vehicule_cartegrise_mutation,
                    _vehicule_cartegrise_debutdevalidite,
                    _vehicule_cartegrise_image1,
                    _vehicule_cartegrise_image2
                },
                _vehicule_vidange: [{
                    _vehicule_vidange_km,
                    _vehicule_vidange_date,
                    _vehicule_vidange_type
                }],
                _vehicule_vignette: {
                    _vehicule_vignette_montant,
                    _vehicule_vignette_penalite,
                    _vehicule_vignette_migration,
                    _vehicule_vignette_tsava,
                    _vehicule_vignette_datepaiement,
                    _vehicule_vignette_image
                },
                _vehicule_carteautorisation: {
                    _vehicule_carteautorisation_dateetablie,
                    _vehicule_carteautorisation_datefinvalidite,
                    _vehicule_autorisation_image
                },
                _vehicule_certificatinstallation: {
                    _vehicule_certificatinstallation_datedebut,
                    _vehicule_certificatinstallation_datefin,
                    _vehicule_certificatinstallation_image
                },
                _vehicule_extincteur: {
                    _vehicule_extincteur_datedebut,
                    _vehicule_extincteur_datefin
                },
                _vehicule_visitetechnique: [{
                    _vehicule_visitetechnique_datecontrole,
                    _vehicule_visitetechnique_naturecontrole,
                    _vehicule_visitetechnique_resultat,
                    _vehicule_visitetechnique_limitevalidite,
                    _vehicule_visitetechnique_numeroproces,
                    _vehicule_visitetechnique_raisonsocialecontrolleur,
                    _vehicule_visitetechnique_kmreleve,
                    _vehicule_visitetechnique_image
                }]
            })
                .then((res) => {
                    onEditVehicule(res.data);
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
                            _vehicule_volumereservoir: 0,
                            _vehicule_image: '',
                            _vehicule_poidsavide: 0,
                            _vehicule_kmparvidange: 0,
                            _vehicule_categorie: {
                                _vehicule_categorie_nom: '',
                                _vehicule_categorie_nombrepassagers: 0,
                                _vehicule_categorie_bagage: '',
                                _vehicule_categorie_carrosserie: ''
                            },
                            _vehicule_recharge: [{
                                _vehicule_recharge_date: moment().format('YYYY-MM-DD'),
                                _vehicule_recharge_litres: 0,
                                _vehicule_recharge_km: 0,
                                _vehicule_recharge_prixlitre: 0,
                                _vehicule_recharge_consommation: 0
                            }],
                            _vehicule_consommation: {
                                _vehicule_consommation_ville: 0,
                                _vehicule_consommation_route: 0,
                                _vehicule_consommation_mixte: 0
                            },
                            _vehicule_assurance: {
                                _vehicule_assurance_entrepriseassurance: '',
                                _vehicule_assurance_datedebut: moment().format('YYYY-MM-DD'),
                                _vehicule_assurance_datefin: moment().format('YYYY-MM-DD'),
                                _vehicule_assurance_montant: 0,
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
                            _vehicule_vidange: [{
                                _vehicule_vidange_km: 0,
                                _vehicule_vidange_date: moment().format('YYYY-MM-DD'),
                                _vehicule_vidange_type: ''
                            }],
                            _vehicule_vignette: {
                                _vehicule_vignette_montant: 0,
                                _vehicule_vignette_penalite: 0,
                                _vehicule_vignette_migration: '',
                                _vehicule_vignette_tsava: '',
                                _vehicule_vignette_datepaiement: moment().format('YYYY-MM-DD'),
                                _vehicule_vignette_image
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
                            _vehicule_visitetechnique: [{
                                _vehicule_visitetechnique_datecontrole: moment().format('YYYY-MM-DD'),
                                _vehicule_visitetechnique_naturecontrole: moment().format('YYYY-MM-DD'),
                                _vehicule_visitetechnique_resultat: '',
                                _vehicule_visitetechnique_limitevalidite: '',
                                _vehicule_visitetechnique_numeroproces: 0,
                                _vehicule_visitetechnique_raisonsocialecontrolleur: '',
                                _vehicule_visitetechnique_kmreleve: 0,
                                _vehicule_visitetechnique_image: ''
                            }]
                        }, () => {
                            var first_fs, last_fs;
                            var left, opacity, scale;
                            var animating;

                            if (animating)
                                return false;

                            animating = true;

                            first_fs = $('.first-of-type');
                            last_fs = $('.last-of-type');

                            $('.progressbar li.' + last_fs.attr('id')).removeClass('active');
                            $('.progressbar li.' + first_fs.attr('id')).addClass('active');

                            last_fs.animate({ opacity }, {
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
                                        'display': 'grid'
                                    });
                                    animating = false;
                                }
                            });
                        });
                });
        }
    }

    handleDeleteVoyage(id) {
        const { onDeleteVoyage } = this.props;
        return axios.delete(`/api/voyage/${id}`)
            .then(() => {
                onDeleteVoyage(id);
            });
    }
    handleEditVoyage(voyage) {
        const { setEditVoyage } = this.props;
        setEditVoyage(voyage);
    }
    handleSubmitVoyage() {
        const { onSubmitVoyage, _voyageToEdit, onEditVoyage } = this.props;
        const {
            _voyage_datedepart,
            _voyage_datearrive,
            _voyage_lieudepart,
            _voyage_lieuarrive,
            _voyage_statut,
            Passager,
            Vehicule
        } = this.state;

        if (!_voyageToEdit) {
            return axios.post('/api/voyage', {
                _voyage_datedepart,
                _voyage_datearrive,
                _voyage_lieudepart,
                _voyage_lieuarrive,
                _voyage_statut,
                Passager,
                Vehicule
            })
                .then((res) => {
                    onSubmitVoyage(res.data);
                })
                .then(() => {
                    this.setState(
                        {
                            _voyage_datedepart: moment().format('YYYY-MM-DD'),
                            _voyage_datearrive: moment().format('YYYY-MM-DD'),
                            _voyage_lieudepart: '',
                            _voyage_lieuarrive: '',
                            _voyage_statut: '',
                            Passager: null,
                            Vehicule: null
                        }
                    )
                });
        } else {
            return axios.patch(`/api/voyage/${_voyageToEdit._id}`, {
                _voyage_datedepart,
                _voyage_datearrive,
                _voyage_lieudepart,
                _voyage_lieuarrive,
                _voyage_statut,
                Passager,
                Vehicule
            })
                .then((res) => {
                    onEditVoyage(res.data);
                })
                .then(() => {
                    this.setState({
                        _voyage_datedepart: moment().format('YYYY-MM-DD'),
                        _voyage_datearrive: moment().format('YYYY-MM-DD'),
                        _voyage_lieudepart: '',
                        _voyage_lieuarrive: '',
                        _voyage_statut: '',
                        Passager: null,
                        Vehicule: null
                    })
                });
        }
    }

    handleChangeUser(parentObject, childObject, value) {
        const reg = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
        const childObject_Parent = _.join(_.take(_.split(childObject, '_'), 3), '_');

        if (_.startsWith(childObject, '_employe_CNSS') || _.startsWith(childObject, '_employe_permis'))
            if (['_employe_CNSS_montant'].indexOf(childObject) + 1) {
                if (reg.test(value))
                    this.setState({
                        _user: update(this.state._user, {
                            [parentObject]: {
                                [childObject_Parent]: {
                                    [childObject]: {
                                        $set: value
                                    }
                                }
                            }
                        })
                    });
            } else {
                this.setState({
                    _user: update(this.state._user, {
                        [parentObject]: {
                            [childObject_Parent]: {
                                [childObject]: {
                                    $set: value
                                }
                            }
                        }
                    })
                });
            }
        else
            if (['_employe_nombreenfants'].indexOf(childObject) + 1) {
                if (reg.test(value))
                    this.setState({
                        _user: update(this.state._user, {
                            [parentObject]: {
                                [childObject]: {
                                    $set: value
                                }
                            }
                        })
                    });
            } else {
                if (['_user_email'].indexOf(childObject) + 1)
                    this.setState({
                        _user_email_valid: validator.isEmail(this.state._user_email)
                    })
                else
                    this.setState({
                        _user: update(this.state._user, {
                            [parentObject]: {
                                [childObject]: {
                                    $set: value
                                }
                            }
                        })
                    });
            }
    }
    handleChangeNested(parentObject, childObject, value) {
        const reg = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

        if (['_vehicule_categorie_nombrepassagers', '_vehicule_categorie_bagage', '_vehicule_consommation_ville', '_vehicule_consommation_route', '_vehicule_consommation_mixte', '_vehicule_vignette_montant', '_vehicule_vignette_penalite', '_vehicule_vignette_tsava'].indexOf(childObject) + 1) {
            if (reg.test(value))
                this.setState({
                    [parentObject]: update(this.state[parentObject], {
                        [childObject]: {
                            $set: value
                        }
                    })
                });
        } else {
            this.setState({
                [parentObject]: update(this.state[parentObject], {
                    [childObject]: {
                        $set: value
                    }
                })
            });
        }
    }
    handleChange(event) {
        const reg = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

        if (['_vehicule_volumereservoir', '_vehicule_poidsavide', '_vehicule_kmparvidange'].indexOf(event.target.id) + 1) {
            if (reg.test(event.target.value))
                this.setState({
                    [event.target.id]: event.target.value
                });
        } else {
            if (['_client_email', '_fournisseur_email', '_societe_email', '_passager_email'].indexOf(event.target.id) + 1)
                this.setState({
                    [event.target.id]: event.target.value,
                    _societe_email_valid: validator.isEmail(this.state._societe_email)
                })
            else
                this.setState({
                    [event.target.id]: event.target.value
                });
        }
    }
    handleChangeSelect(name, value) {
        this.setState({
            [name]: value,
        });
    }
    handleChangePhoneAutocomplete(parentObject, value) {
        this.setState({
            [parentObject]: value
        });
    }
    handleChangeNestedProduits(index, childObject, value) {
        this.setState(({ Produit }) => ({
            Produit: [
                ...Produit.slice(0, index),
                {
                    ...Produit[index],
                    [childObject]: value,
                },
                ...Produit.slice(index + 1)
            ]
        }));
    }
    handleChangeNestedProduits(index, childObject, value) {
        this.setState(({ Produit }) => ({
            Produit: [
                ...Produit.slice(0, index),
                {
                    ...Produit[index],
                    [childObject]: value,
                },
                ...Produit.slice(index + 1)
            ]
        }));
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

        $('.progressbar li.' + current_fs.attr('id')).removeClass('active');
        $('.progressbar li.' + next_fs.attr('id')).addClass('active');

        current_fs.animate({ opacity: 0 }, {
            step: (now, mx) => {
                scale = 1 - (1 - now) * 0.2;
                left = (now * 50) + '%';
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')'
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
                    'display': 'grid'
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

        $('.progressbar li.' + current_fs.attr('id')).removeClass('active');
        $('.progressbar li.' + previous_fs.attr('id')).addClass('active');

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
                    'display': 'grid'
                });
                animating = false;
            }
        });
    }
    handleAdd(event) {
        this.setState(state => ({
            Produit: [...state.Produit, {
                _produit_designation: '',
                _produit_reference: '',
                _produit_quantite: 0,
                _produit_prixunitaire: 0,
                _produit_statut: ''
            }],
        }));
    }
    handleRemove(_P) {
        this.setState((prevState) => ({
            Produit: [...prevState.Produit.slice(0, this.state.Produit.indexOf(_P)), ...prevState.Produit.slice(this.state.Produit.indexOf(_P) + 1)]
        }))
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

    disconnect() {
        API.logout();
        window.location = "/login";
    }

    render() {
        const {
            modal_msg,

            _user,
            _users,

            _client_email_valid,
            _fournisseur_email_valid,
            _passager_email_valid,
            _societe_email_valid,
            _user_email_valid,

            _search_value_vehicules,
            _search_value_parametres,

            _agence_adresse,
            _agence_ville,
            _agence_pays,
            _bon_numero,
            _bon_date,
            _bon_type,
            Facture,
            _client_prenomcontact,
            _client_nomcontact,
            _client_raison,
            _client_adresse,
            _client_telephone,
            _client_email,
            _client_ville,
            _client_pays,
            _client_ICE,
            _client_IF,
            _client_RC,
            _client_patente,
            _client_contrat,
            _devis_numero,
            _devis_date,
            _devis_commentaire,
            _devis_TVA,
            _devis_image,
            _employe_prenom,
            _employe_nom,
            _employe_telephone,
            _employe_datenaissance,
            _employe_CNIE,
            _employe_situationfamille,
            _employe_nombreenfants,
            _employe_adresse,
            _employe_CNSS,
            _employe_permis,
            _employe_datembauche,
            _employe_image,
            Poste,
            RevueDePerformance,
            _facture_numero,
            _facture_date,
            _facture_commentaire,
            _facture_TVA,
            _facture_venteachat,
            _facture_ispayed,
            _facture_numeropaiement,
            _facture_datepaiement,
            _facture_type,
            _facture_image,
            Societe,
            Fournisseur,
            _fournisseur_prenomcontact,
            _fournisseur_nomcontact,
            _fournisseur_raison,
            _fournisseur_siege,
            _fournisseur_telephone,
            _fournisseur_email,
            _fournisseur_ville,
            _fournisseur_pays,
            _fournisseur_ICE,
            _fournisseur_IF,
            _fournisseur_RC,
            _fournisseur_patente,
            _passager_prenom,
            _passager_nom,
            _passager_telephone,
            _passager_email,
            _passager_adresse,
            _passager_ville,
            _passager_pays,
            _permission_titre,
            _poste_titre,
            _poste_salaireinitiale,
            _produit_designation,
            _produit_reference,
            _produit_quantite,
            _produit_prixunitaire,
            _produit_statut,
            _reservation_nombreadultes,
            _reservation_nombreenfants,
            _reservation_datereservation,
            _reservation_commentaire,
            _reservation_status,
            Voyage,
            Client,
            _revueDePerformance_date,
            _revueDePerformance_resultat,
            _societe_raison,
            _societe_siege,
            _societe_numeroTP,
            _societe_IF,
            _societe_telephone,
            _societe_fax,
            _societe_email,
            _societe_ICE,
            _societe_CNSS,
            _societe_logo,
            Agence,
            Produit,
            _user_email,
            _user_username,
            _user_password,
            _user_password_new,
            _user_password_new_confirm,
            _user_fingerprint,
            _user_isVerified,
            _user_logindate,
            Employe,
            Permission,
            _vehicule_marque,
            _vehicule_fabricant,
            _vehicule_numerochassis,
            _vehicule_numeroregistration,
            _vehicule_model,
            _vehicule_datefabrication,
            _vehicule_moteur,
            _vehicule_volumereservoir,
            _vehicule_image,
            _vehicule_poidsavide,
            _vehicule_kmparvidange,
            _vehicule_categorie,
            _vehicule_recharge,
            _vehicule_consommation,
            _vehicule_assurance,
            _vehicule_cartegrise,
            _vehicule_vidange,
            _vehicule_vignette,
            _vehicule_carteautorisation,
            _vehicule_certificatinstallation,
            _vehicule_extincteur,
            _vehicule_visitetechnique,
            _voyage_datedepart,
            _voyage_datearrive,
            _voyage_lieudepart,
            _voyage_lieuarrive,
            _voyage_statut,
            Passager,
            Vehicule
        } = this.state;
        const {
            _agences,
            _agenceToEdit,
            _bons,
            _bonToEdit,
            _clients,
            _clientToEdit,
            _deviss,
            _devisToEdit,
            _employes,
            _employeToEdit,
            _factures,
            _factureToEdit,
            _fournisseurs,
            _fournisseurToEdit,
            _passagers,
            _passagerToEdit,
            _permissions,
            _permissionToEdit,
            _postes,
            _posteToEdit,
            _produits,
            _produitToEdit,
            _reservations,
            _reservationToEdit,
            _revueDePerformances,
            _revueDePerformanceToEdit,
            _societes,
            _societeToEdit,
            _stocks,
            _stockToEdit,
            _vehicules,
            _vehiculeToEdit,
            _voyages,
            _voyageToEdit
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
                                <div className="tab-pane active" id="1a">
                                    <div className="_sub_pane">
                                        <div className="_sub_pane_header">

                                        </div>
                                        <div className="_sub_pane_content">
                                            <ul className="cards">
                                                <li className="cards__item">{/* calendar */}</li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item">
                                                    <div className="card">
                                                        <div className="card__content">
                                                            <div className="_pane">
                                                                <div className="_content">
                                                                    <div className="_head">
                                                                        <h6>Les Societes</h6>
                                                                        <button id="_add_societe" type="button" data-toggle="modal" data-target="#_societe_modal">
                                                                            <span className="icon" aria-hidden="true">
                                                                                <i className="fas fa-minus"></i>
                                                                            </span>
                                                                            <span className="button-text">Ajouter Societe.</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="_data">
                                                                        <Swiper
                                                                            spaceBetween={0}
                                                                            slidesPerView={3.25}
                                                                            direction='vertical'
                                                                            effect='coverflow'
                                                                            coverflowEffect={{
                                                                                rotate: 0,
                                                                                stretch: 0,
                                                                                depth: 0,
                                                                                modifier: 3,
                                                                                slideShadows: false
                                                                            }}
                                                                            grabCursor='true'
                                                                            watchOverflow='true'
                                                                            slideToClickedSlide='true'
                                                                            observer='true'
                                                                            scrollbar={{ draggable: true }}
                                                                        >
                                                                            {
                                                                                _societes.map((_societe, index) => {
                                                                                    return (
                                                                                        <SwiperSlide virtualIndex={index}>
                                                                                            <div className={"card card_societes card_" + index} data-title={_.snakeCase(_societe._societe_raison)} data-index={_.add(index, 1)}>
                                                                                                <div className="card-body">
                                                                                                    <div className="_corps">
                                                                                                        <h6>{_societe._societe_raison}</h6>
                                                                                                        <p className="text-muted"><i className="fas fa-map-marker-alt"></i><b>{_societe._societe_siege}</b></p>
                                                                                                    </div>
                                                                                                    <div className="_heads_up">
                                                                                                        <div className="dropdown">
                                                                                                            <span className="dropdown-toggle" id="dropdownMenuButton_societes" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                                                <i className="fas fa-ellipsis-h"></i>
                                                                                                            </span>
                                                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton_societes">
                                                                                                                <a href="# " className="dropdown-item edit" data-toggle="modal" data-target="#_societe_modal" onClick={() => this.handleEditSociete(_societe)}><i className="fas fa-edit"></i></a>
                                                                                                                <a href="# " className="dropdown-item delete" onClick={() => this.handleDeleteSociete(_societe._id)}><i className="far fa-trash-alt"></i></a>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </SwiperSlide>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Swiper>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="cards__item">
                                                    <div className="card">
                                                        <div className="card__content">
                                                            <div className="_pane">
                                                                <div className="_content">
                                                                    <div className="_head">
                                                                        <h6>Les Agences</h6>
                                                                        <button id="_add_agence" type="button" data-toggle="modal" data-target="#_agence_modal">
                                                                            <span className="icon" aria-hidden="true">
                                                                                <i className="fas fa-minus"></i>
                                                                            </span>
                                                                            <span className="button-text">Ajouter Agence.</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="_data">
                                                                        <Swiper
                                                                            spaceBetween={0}
                                                                            slidesPerView={3.25}
                                                                            direction='vertical'
                                                                            effect='coverflow'
                                                                            coverflowEffect={{
                                                                                rotate: 0,
                                                                                stretch: 0,
                                                                                depth: 0,
                                                                                modifier: 3,
                                                                                slideShadows: false
                                                                            }}
                                                                            grabCursor='true'
                                                                            watchOverflow='true'
                                                                            slideToClickedSlide='true'
                                                                            observer='true'
                                                                            scrollbar={{ draggable: true }}
                                                                        >
                                                                            {
                                                                                _agences.map((_agence, index) => {
                                                                                    return (
                                                                                        <SwiperSlide virtualIndex={index}>
                                                                                            <div className={"card card_agences card_" + index} data-title={_.snakeCase(_agence._agence_numero)} data-index={_.add(index, 1)}>
                                                                                                <div className="card-body">
                                                                                                    <div className="_corps">
                                                                                                        <h6>{_agence._agence_pays}, {_agence._agence_ville}</h6>
                                                                                                        <p className="text-muted"><i className="fas fa-map-marker-alt"></i><b>{_agence._agence_adresse}</b></p>
                                                                                                    </div>
                                                                                                    <div className="_heads_up">
                                                                                                        <div className="dropdown">
                                                                                                            <span className="dropdown-toggle" id="dropdownMenuButton_agences" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                                                <i className="fas fa-ellipsis-h"></i>
                                                                                                            </span>
                                                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton_agences">
                                                                                                                <a href="# " className="dropdown-item edit" data-toggle="modal" data-target="#_agence_modal" onClick={() => { this.handleEditAgence(_agence); this.handleEditSociete(_.find(_societes, (_s) => { return _.find(_s.Agence, { _id: _agence._id }) })); }}><i className="fas fa-edit"></i></a>
                                                                                                                <a href="# " className="dropdown-item delete" onClick={() => this.handleDeleteAgence(_agence._id)}><i className="far fa-trash-alt"></i></a>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </SwiperSlide>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Swiper>
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
                                <div className="tab-pane active" id="2a">
                                    <div className="_sub_pane">
                                        <div className="_sub_pane_header">

                                        </div>
                                        <div className="_sub_pane_content">
                                            <ul className="cards">
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item">
                                                    <div className="card">
                                                        <div className="card__content">
                                                            <div className="_pane">
                                                                <div className="_content">
                                                                    <div className="_head">
                                                                        <h6>Les Factures</h6>
                                                                        <button id="_add_facture" type="button" data-toggle="modal" data-target="#_facture_modal">
                                                                            <span className="icon" aria-hidden="true">
                                                                                <i className="fas fa-minus"></i>
                                                                            </span>
                                                                            <span className="button-text">Ajouter Facture.</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="_data">
                                                                        <Swiper
                                                                            spaceBetween={0}
                                                                            slidesPerView={3.25}
                                                                            direction='vertical'
                                                                            effect='coverflow'
                                                                            coverflowEffect={{
                                                                                rotate: 0,
                                                                                stretch: 0,
                                                                                depth: 0,
                                                                                modifier: 3,
                                                                                slideShadows: false
                                                                            }}
                                                                            grabCursor='true'
                                                                            watchOverflow='true'
                                                                            slideToClickedSlide='true'
                                                                            observer='true'
                                                                            scrollbar={{ draggable: true }}
                                                                        >
                                                                            {
                                                                                _factures.map((_facture, index) => {
                                                                                    return (
                                                                                        <SwiperSlide virtualIndex={index}>
                                                                                            <div className={"card card_factures card_" + index} data-title={_.snakeCase(_facture._facture_numero)} data-index={_.add(index, 1)}>
                                                                                                <div className="card-body">
                                                                                                    <div className="_corps">
                                                                                                        <h6>{_facture._facture_numero}</h6>
                                                                                                        <p className="text-muted"><i className="far fa-calendar-alt"></i><b>{moment(_facture._facture_date).format('MMMM Do YYYY, HH:mm')}</b></p>
                                                                                                    </div>
                                                                                                    <div className="_heads_up">
                                                                                                        <div className="dropdown">
                                                                                                            <span className="dropdown-toggle" id="dropdownMenuButton_factures" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                                                <i className="fas fa-ellipsis-h"></i>
                                                                                                            </span>
                                                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton_factures">
                                                                                                                <a href="# " className="dropdown-item delete" onClick={() => this.handleDeleteFacture(_facture._id)}><i className="far fa-trash-alt"></i></a>
                                                                                                                <a href="# " className="dropdown-item _view" onClick={() => { this.setState({ __facture: _facture }); }} data-id={_facture._id} data-toggle="modal" data-target="#_facture_modal"><i className="fas fa-expand-alt"></i></a>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </SwiperSlide>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Swiper>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="cards__item">
                                                    <div className="card">
                                                        <div className="card__content">
                                                            <div className="_pane">
                                                                <div className="_content">
                                                                    <div className="_head">
                                                                        <h6>Les Devis</h6>
                                                                        <button id="_add_devis" type="button" data-toggle="modal" data-target="#_devis_modal">
                                                                            <span className="icon" aria-hidden="true">
                                                                                <i className="fas fa-minus"></i>
                                                                            </span>
                                                                            <span className="button-text">Ajouter Devis.</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="_data">
                                                                        <Swiper
                                                                            spaceBetween={0}
                                                                            slidesPerView={3.25}
                                                                            direction='vertical'
                                                                            effect='coverflow'
                                                                            coverflowEffect={{
                                                                                rotate: 0,
                                                                                stretch: 0,
                                                                                depth: 0,
                                                                                modifier: 3,
                                                                                slideShadows: false
                                                                            }}
                                                                            grabCursor='true'
                                                                            watchOverflow='true'
                                                                            slideToClickedSlide='true'
                                                                            observer='true'
                                                                            scrollbar={{ draggable: true }}
                                                                        >
                                                                            {
                                                                                _deviss.map((_devis, index) => {
                                                                                    return (
                                                                                        <SwiperSlide virtualIndex={index}>
                                                                                            <div className={"card card_deviss card_" + index} data-title={_.snakeCase(_devis._devis_numero)} data-index={_.add(index, 1)}>
                                                                                                <div className="card-body">
                                                                                                    <div className="_corps">
                                                                                                        <h6>{_devis._devis_numero}</h6>
                                                                                                        <p className="text-muted"><i className="far fa-calendar-alt"></i><b>{moment(_devis._devis_date).format('MMMM Do YYYY, HH:mm')}</b></p>
                                                                                                    </div>
                                                                                                    <div className="_heads_up">
                                                                                                        <div className="dropdown">
                                                                                                            <span className="dropdown-toggle" id="dropdownMenuButton_deviss" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                                                <i className="fas fa-ellipsis-h"></i>
                                                                                                            </span>
                                                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton_deviss">
                                                                                                                <a href="# " className="dropdown-item delete" onClick={() => this.handleDeleteDevis(_devis._id)}><i className="far fa-trash-alt"></i></a>
                                                                                                                <a href="# " className="dropdown-item _view" onClick={() => { this.setState({ __devis: _devis }); }} data-id={_devis._id} data-toggle="modal" data-target="#_devis_modal"><i className="fas fa-expand-alt"></i></a>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </SwiperSlide>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Swiper>
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
                                <div className="tab-pane active" id="3a">
                                    <div className="_sub_pane">
                                        <div className="_sub_pane_header"></div>
                                        <div className="_sub_pane_content"></div>
                                    </div>
                                </div>
                                <div className="tab-pane active" id="4a">
                                    <div className="_sub_pane">
                                        <div className="_sub_pane_header">

                                        </div>
                                        <div className="_sub_pane_content">
                                            <ul className="cards">
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item">
                                                    <div className="card">
                                                        <div className="card__content">
                                                            <div className="_pane">
                                                                <div className="_content">
                                                                    <div className="_head">
                                                                        <h6>Les Clients</h6>
                                                                        <button id="_add_client" type="button" data-toggle="modal" data-target="#_client_modal">
                                                                            <span className="icon" aria-hidden="true">
                                                                                <i className="fas fa-minus"></i>
                                                                            </span>
                                                                            <span className="button-text">Ajouter Client.</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="_data">
                                                                        <Swiper
                                                                            spaceBetween={0}
                                                                            slidesPerView={3.25}
                                                                            direction='vertical'
                                                                            effect='coverflow'
                                                                            coverflowEffect={{
                                                                                rotate: 0,
                                                                                stretch: 0,
                                                                                depth: 0,
                                                                                modifier: 3,
                                                                                slideShadows: false
                                                                            }}
                                                                            grabCursor='true'
                                                                            watchOverflow='true'
                                                                            slideToClickedSlide='true'
                                                                            observer='true'
                                                                            scrollbar={{ draggable: true }}
                                                                        >
                                                                            {
                                                                                _clients.map((_client, index) => {
                                                                                    return (
                                                                                        <SwiperSlide virtualIndex={index}>
                                                                                            <div className={"card card_clients card_" + index} data-title={_.snakeCase(_client._client_raison ? _client._client_raison : _client._client_prenomcontact + ' ' + _client._client_nomcontact)} data-index={_.add(index, 1)}>
                                                                                                <div className="card-body">
                                                                                                    <div className="_corps">
                                                                                                        <h6>{_client._client_raison ? _client._client_raison : _client._client_prenomcontact + ' ' + _client._client_nomcontact}</h6>
                                                                                                        <p className="text-muted"><i className="fas fa-map-marker-alt"></i><b>{_client._client_adresse}</b></p>
                                                                                                    </div>
                                                                                                    <div className="_heads_up">
                                                                                                        <div className="dropdown">
                                                                                                            <span className="dropdown-toggle" id="dropdownMenuButton_clients" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                                                <i className="fas fa-ellipsis-h"></i>
                                                                                                            </span>
                                                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton_clients">
                                                                                                                <a href="# " className="dropdown-item edit" data-toggle="modal" data-target="#_client_modal" onClick={() => this.handleEditClient(_client)}><i className="fas fa-edit"></i></a>
                                                                                                                <a href="# " className="dropdown-item delete" onClick={() => this.handleDeleteClient(_client._id)}><i className="far fa-trash-alt"></i></a>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </SwiperSlide>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Swiper>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="cards__item"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane active" id="5a">
                                    <div className="_sub_pane">
                                        <div className="_sub_pane_header">

                                        </div>
                                        <div className="_sub_pane_content">
                                            <ul className="cards">
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item"></li>
                                                <li className="cards__item">
                                                    <div className="card">
                                                        <div className="card__content">
                                                            <div className="_pane">
                                                                <div className="_content">
                                                                    <div className="_head">
                                                                        <h6>Les Fournisseurs</h6>
                                                                        <button id="_add_fournisseur" type="button" data-toggle="modal" data-target="#_fournisseur_modal">
                                                                            <span className="icon" aria-hidden="true">
                                                                                <i className="fas fa-minus"></i>
                                                                            </span>
                                                                            <span className="button-text">Ajouter Fournisseur.</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="_data">
                                                                        <Swiper
                                                                            spaceBetween={0}
                                                                            slidesPerView={3.25}
                                                                            direction='vertical'
                                                                            effect='coverflow'
                                                                            coverflowEffect={{
                                                                                rotate: 0,
                                                                                stretch: 0,
                                                                                depth: 0,
                                                                                modifier: 3,
                                                                                slideShadows: false
                                                                            }}
                                                                            grabCursor='true'
                                                                            watchOverflow='true'
                                                                            slideToClickedSlide='true'
                                                                            observer='true'
                                                                            scrollbar={{ draggable: true }}
                                                                        >
                                                                            {
                                                                                _fournisseurs.map((_fournisseur, index) => {
                                                                                    return (
                                                                                        <SwiperSlide virtualIndex={index}>
                                                                                            <div className={"card card_fournisseurs card_" + index} data-title={_.snakeCase(_fournisseur._fournisseur_raison)} data-index={_.add(index, 1)}>
                                                                                                <div className="card-body">
                                                                                                    <div className="_corps">
                                                                                                        <h6>{_fournisseur._fournisseur_raison}</h6>
                                                                                                        <p className="text-muted"><i className="fas fa-map-marker-alt"></i><b>{_fournisseur._fournisseur_siege}</b></p>
                                                                                                    </div>
                                                                                                    <div className="_heads_up">
                                                                                                        <div className="dropdown">
                                                                                                            <span className="dropdown-toggle" id="dropdownMenuButton_fournisseurs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                                                <i className="fas fa-ellipsis-h"></i>
                                                                                                            </span>
                                                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton_fournisseurs">
                                                                                                                <a href="# " className="dropdown-item edit" data-toggle="modal" data-target="#_fournisseur_modal" onClick={() => this.handleEditFournisseur(_fournisseur)}><i className="fas fa-edit"></i></a>
                                                                                                                <a href="# " className="dropdown-item delete" onClick={() => this.handleDeleteFournisseur(_fournisseur._id)}><i className="far fa-trash-alt"></i></a>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </SwiperSlide>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Swiper>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="cards__item"></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane active" id="6a">
                                    <div className="_sub_pane">
                                        <div className="_sub_pane_header">
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
                                        <div className="_sub_pane_content">
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
                                <div className="tab-pane active" id="7a">
                                    <div className="_sub_pane">
                                        <div className="_sub_pane_header"></div>
                                        <div className="_sub_pane_content"></div>
                                    </div>
                                </div>
                                <div className="tab-pane active" id="8a">
                                    <div className="_sub_pane">
                                        <div className="_sub_pane_header"></div>
                                        <div className="_sub_pane_content"></div>
                                    </div>
                                </div>
                                <div className="tab-pane active" id="9a">
                                    <div className="_sub_pane">
                                        <div className="_sub_pane_header"></div>
                                        <div className="_sub_pane_content"></div>
                                    </div>
                                </div>
                                <div className="tab-pane active" id="10a">
                                    <div className="_sub_pane">
                                        <div className="_sub_pane_header">
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
                                        <div className="_sub_pane_content">
                                            <div className="forms__item">
                                                <div className="card">
                                                    <div className="card__content">
                                                        <div className="_account_pane _pane">
                                                            <div className="_account_content _content">
                                                                <div className="_account_head">
                                                                    <h4>Parametres General.</h4>
                                                                    <p className="text-muted">Changez votre profil et parametres</p>
                                                                </div>
                                                                <div className="_account_data data_container">
                                                                    <div className="fieldset">
                                                                        <div className='row'>
                                                                            <div className='input-field col'>
                                                                                <input
                                                                                    className="validate form-group-input _employe_prenom"
                                                                                    id="_employe_prenom"
                                                                                    type="text"
                                                                                    name="_employe_prenom"
                                                                                    value={_user.Employe._employe_prenom}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_prenom', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_prenom' className={_user.Employe._employe_prenom ? 'active' : ''}>Prénom</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className='input-field col'>
                                                                                <input
                                                                                    className="validate form-group-input _employe_nom"
                                                                                    id="_employe_nom"
                                                                                    type="text"
                                                                                    name="_employe_nom"
                                                                                    value={_user.Employe._employe_nom}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_nom', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_nom' className={_user.Employe._employe_nom ? 'active' : ''}>Nom</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className='input-field col'>
                                                                                <PhoneInput
                                                                                    className="validate form-group-input _employe_telephone"
                                                                                    id="_employe_telephone"
                                                                                    name="_employe_telephone"
                                                                                    value={_user.Employe._employe_telephone}
                                                                                    onChange={(value) => this.handleChangeUser('Employe', '_employe_telephone', value)}
                                                                                />
                                                                                <label htmlFor='_employe_telephone' className={_user.Employe._employe_telephone ? 'active phone_label' : 'phone_label'}>Telephone</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className='input-field col'>
                                                                                <input
                                                                                    className="validate form-group-input _employe_datenaissance"
                                                                                    id="_employe_datenaissance"
                                                                                    type="date"
                                                                                    name="_employe_datenaissance"
                                                                                    value={moment(_user.Employe._employe_datenaissance).format('YYYY-MM-DD')}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_datenaissance', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_datenaissance' className={_user.Employe._employe_datenaissance ? 'active' : ''}>Date de naissance</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='input-field col'>
                                                                                <input
                                                                                    className="validate form-group-input _employe_CNIE"
                                                                                    id="_employe_CNIE"
                                                                                    type="text"
                                                                                    name="_employe_CNIE"
                                                                                    value={_user.Employe._employe_CNIE}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_CNIE', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_CNIE' className={_user.Employe._employe_CNIE ? 'active' : ''}>CNIE</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className='input-field col'>
                                                                                <select
                                                                                    name="_employe_situationfamille"
                                                                                    className="validate form-group-input _employe_situationfamille"
                                                                                    value={_user.Employe._employe_situationfamille}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_situationfamille', event.target.value)}
                                                                                    id="_employe_situationfamille"
                                                                                >
                                                                                    <option value=""></option>
                                                                                    <option value="Marié">Marié</option>
                                                                                    <option value="Pacsé">Pacsé</option>
                                                                                    <option value="Divorcé">Divorcé</option>
                                                                                    <option value="Séparé">Séparé</option>
                                                                                    <option value="Célibataire">Célibataire</option>
                                                                                    <option value="Veuf">Veuf</option>
                                                                                </select>
                                                                                <label htmlFor='_employe_situationfamille' className={_user.Employe._employe_situationfamille ? 'active' : ''}>Situation familiale</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className='input-field col'>
                                                                                <input
                                                                                    className="validate form-group-input _employe_nombreenfants"
                                                                                    id="_employe_nombreenfants"
                                                                                    type="text"
                                                                                    name="_employe_nombreenfants"
                                                                                    value={_user.Employe._employe_nombreenfants}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_nombreenfants', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_nombreenfants' className={(_user.Employe._employe_nombreenfants === 0 ? true : _user.Employe._employe_nombreenfants) ? 'active' : ''}>Nombre d'enfants</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className='input-field col'>
                                                                                <input
                                                                                    className="validate form-group-input _employe_adresse"
                                                                                    id="_employe_adresse"
                                                                                    type="text"
                                                                                    name="_employe_adresse"
                                                                                    value={_user.Employe._employe_adresse}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_adresse', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_adresse' className={_user.Employe._employe_adresse ? 'active' : ''}>Adresse</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                        </div>
                                                                        <legend>CNSS</legend>
                                                                        <div className="row">
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _employe_CNSS_dateimmatriculation"
                                                                                    id="_employe_CNSS_dateimmatriculation"
                                                                                    type="date"
                                                                                    name="_employe_CNSS_dateimmatriculation"
                                                                                    value={moment(_user.Employe._employe_CNSS._employe_CNSS_dateimmatriculation).format('YYYY-MM-DD')}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_CNSS_dateimmatriculation', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_CNSS_dateimmatriculation' className={_user.Employe._employe_CNSS._employe_CNSS_dateimmatriculation ? 'active' : ''}>Date d'immatriculation</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _employe_CNSS_numeroimmatriculation"
                                                                                    id="_employe_CNSS_numeroimmatriculation"
                                                                                    type="text"
                                                                                    name="_employe_CNSS_numeroimmatriculation"
                                                                                    value={_user.Employe._employe_CNSS._employe_CNSS_numeroimmatriculation}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_CNSS_numeroimmatriculation', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_CNSS_numeroimmatriculation' className={_user.Employe._employe_CNSS._employe_CNSS_numeroimmatriculation ? 'active' : ''}>Numero d'Immatriculation</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _employe_CNSS_montant"
                                                                                    id="_employe_CNSS_montant"
                                                                                    type="text"
                                                                                    name="_employe_CNSS_montant"
                                                                                    value={_user.Employe._employe_CNSS._employe_CNSS_montant}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_CNSS_montant', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_CNSS_montant' className={(_user.Employe._employe_CNSS._employe_CNSS_montant === 0 ? true : _user.Employe._employe_CNSS._employe_CNSS_montant) ? 'active' : ''}>Montant</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col"></div>
                                                                        </div>
                                                                        <legend>Permis</legend>
                                                                        <div className="row">
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _employe_permis_numero"
                                                                                    id="_employe_permis_numero"
                                                                                    type="text"
                                                                                    name="_employe_permis_numero"
                                                                                    value={_user.Employe._employe_permis._employe_permis_numero}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_permis_numero', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_permis_numero' className={_user.Employe._employe_permis._employe_permis_numero ? 'active' : ''}>Numero de Permis</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _employe_permis_categorie"
                                                                                    id="_employe_permis_categorie"
                                                                                    type="text"
                                                                                    name="_employe_permis_categorie"
                                                                                    value={_user.Employe._employe_permis._employe_permis_categorie}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_permis_categorie', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_permis_categorie' className={_user.Employe._employe_permis._employe_permis_categorie ? 'active' : ''}>Categorie de Permis</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _employe_permis_datedelivrance"
                                                                                    id="_employe_permis_datedelivrance"
                                                                                    type="date"
                                                                                    name="_employe_permis_datedelivrance"
                                                                                    value={moment(_user.Employe._employe_permis._employe_permis_datedelivrance).format('YYYY-MM-DD')}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_permis_datedelivrance', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_permis_datedelivrance' className={_user.Employe._employe_permis._employe_permis_datedelivrance ? 'active' : ''}>Date de livrance</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col"></div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _employe_permis_image1"
                                                                                    id="_employe_permis_image1"
                                                                                    type="text"
                                                                                    name="_employe_permis_image1"
                                                                                    value={_user.Employe._employe_permis._employe_permis_image1}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_permis_image1', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_permis_image1' className={_user.Employe._employe_permis._employe_permis_image1 ? 'active' : ''}>1e Face de la Carte</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _employe_permis_image2"
                                                                                    id="_employe_permis_image2"
                                                                                    type="text"
                                                                                    name="_employe_permis_image2"
                                                                                    value={_user.Employe._employe_permis._employe_permis_image2}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_permis_image2', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_permis_image2' className={_user.Employe._employe_permis._employe_permis_image2 ? 'active' : ''}>2e Face de la Carte</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col"></div>
                                                                            <div className="input-field col"></div>
                                                                        </div>
                                                                        <legend>Poste</legend>
                                                                        <div className="row">
                                                                            <div className='input-field col'>
                                                                                <input
                                                                                    className="validate form-group-input _employe_datembauche"
                                                                                    id="_employe_datembauche"
                                                                                    type="date"
                                                                                    name="_employe_datembauche"
                                                                                    value={moment(_user.Employe._employe_datembauche).format('YYYY-MM-DD')}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_datembauche', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_datembauche' className={_user.Employe._employe_datembauche ? 'active' : ''}>Date d'embauche</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className='input-field col'>
                                                                                <input
                                                                                    className="validate form-group-input _employe_image"
                                                                                    id="_employe_image"
                                                                                    type="text"
                                                                                    name="_employe_image"
                                                                                    value={_user.Employe._employe_image}
                                                                                    onChange={(event) => this.handleChangeUser('Employe', '_employe_image', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_employe_image' className={_user.Employe._employe_image ? 'active' : ''}>Image</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col">
                                                                                <Select
                                                                                    id="Poste"
                                                                                    className="validate form-group-input Poste"
                                                                                    classNamePrefix="select"
                                                                                    defaultValue={{}}
                                                                                    isClearable="true"
                                                                                    isSearchable="true"
                                                                                    name="Poste"
                                                                                    value={_user.Employe.Poste}
                                                                                    getOptionLabel={(option) => option._poste_titre}
                                                                                    getOptionValue={(option) => option}
                                                                                    onChange={(value) => this.handleChangeUser('Employe', 'Poste', value)}
                                                                                    onSelect={(value) => this.handleChangeUser('Employe', 'Poste', value)}
                                                                                    options={_postes}
                                                                                    width='100%'
                                                                                />
                                                                                <label htmlFor='Poste' className={_user.Employe.Poste ? 'active' : ''}>Poste</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col"></div>
                                                                        </div>
                                                                        <legend>Parametres de Compte</legend>
                                                                        <div className="row">
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _user_email"
                                                                                    id="_user_email"
                                                                                    type="text"
                                                                                    name="_user_email"
                                                                                    value={_user._user_email}
                                                                                    onChange={(event) => this.handleChangeUser('_user', '_user_email', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_user_email' className={_user._user_email ? 'active' : ''}>Email</label>
                                                                                <div className="form-group-line"></div>
                                                                                <small id="emailHelp" className={_user_email_valid ? 'text-danger' : 'text-danger active'}>
                                                                                    Veuillez fournir une adresse mail valide.
                                                                                </small>
                                                                            </div>
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _user_username"
                                                                                    id="_user_username"
                                                                                    type="text"
                                                                                    name="_user_username"
                                                                                    value={_user._user_username}
                                                                                    onChange={(event) => this.handleChangeUser('_user', '_user_username', event.target.value)}
                                                                                />
                                                                                <label htmlFor='_user_username' className={_user._user_username ? 'active' : ''}>Username</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col">
                                                                                <Select
                                                                                    id="Permission"
                                                                                    className="validate form-group-input Permission"
                                                                                    classNamePrefix="select"
                                                                                    isMulti
                                                                                    defaultValue={{}}
                                                                                    isClearable="true"
                                                                                    isSearchable="true"
                                                                                    name="Permission"
                                                                                    value={_user.Permission}
                                                                                    getOptionLabel={(option) => option._permission_titre}
                                                                                    getOptionValue={(option) => option}
                                                                                    onChange={(value) => this.handleChangeUser('_user', 'Permission', value)}
                                                                                    onSelect={(value) => this.handleChangeUser('_user', 'Permission', value)}
                                                                                    options={_permissions}
                                                                                    width='100%'
                                                                                />
                                                                                <label htmlFor='Permission' className={_user.Permission ? 'active' : ''}>Permissions</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col"></div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _user_password"
                                                                                    id="_user_password"
                                                                                    type="text"
                                                                                    name="_user_password"
                                                                                    value={_user_password}
                                                                                    onChange={(event) => this.handleChange(event)}
                                                                                />
                                                                                <label htmlFor='_user_password' className={_user_password ? 'active' : ''}>Current Password</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _user_password_new"
                                                                                    id="_user_password_new"
                                                                                    type="text"
                                                                                    name="_user_password_new"
                                                                                    value={_user_password_new}
                                                                                    onChange={(event) => this.handleChange(event)}
                                                                                />
                                                                                <label htmlFor='_user_password' className={_user_password_new ? 'active' : ''}>New Password</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col">
                                                                                <input
                                                                                    className="validate form-group-input _user_password_new_confirm"
                                                                                    id="_user_password_new_confirm"
                                                                                    type="text"
                                                                                    name="_user_password_new_confirm"
                                                                                    value={_user_password_new_confirm}
                                                                                    onChange={(event) => this.handleChange(event)}
                                                                                />
                                                                                <label htmlFor='_user_password_new_confirm' className={_user_password_new_confirm ? 'active' : ''}>Confirm Password</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col"></div>
                                                                        </div>
                                                                        <div className="row button_row">
                                                                            <div className="input-field col">

                                                                            </div>
                                                                            <div className="input-field col">

                                                                            </div>
                                                                            <div className="input-field col">

                                                                            </div>
                                                                            <div className="input-field col">
                                                                                <button
                                                                                    className="pull-right"
                                                                                    type="submit"
                                                                                    onClick={this.set_user}
                                                                                >
                                                                                    <span>
                                                                                        <span>
                                                                                            <span data-attr-span='Modifier.'>
                                                                                                Modifier.
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
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="_edit_modal modal fade" id="_edit_modal" tabIndex="-1" role="dialog" aria-labelledby="_edit_modalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <h5 className="modal-title" id="edit_modalLabel">Hey!</h5>
                                            <div className="modal-body">{modal_msg}</div>
                                            <div><small>Thanks {_user._user_username}</small></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="_societes_modal modal fade" id="_societe_modal" tabIndex="-1" role="dialog" aria-labelledby="_societe_modalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <div className="mail_form card">
                                                <div className="fieldset societes_fieldset">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _societe_raison"
                                                                id="_societe_raison"
                                                                type="text"
                                                                name="_societe_raison"
                                                                value={_societe_raison}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_societe_raison' className={_societe_raison ? 'active' : ''}>_societe_raison</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _societe_siege"
                                                                id="_societe_siege"
                                                                type="text"
                                                                name="_societe_siege"
                                                                value={_societe_siege}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_societe_siege' className={_societe_siege ? 'active' : ''}>_societe_siege</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <PhoneInput
                                                                className="validate form-group-input _societe_telephone"
                                                                id="_societe_telephone"
                                                                name="_societe_telephone"
                                                                value={_societe_telephone}
                                                                onChange={(value) => this.handleChangePhoneAutocomplete("_societe_telephone", value)}
                                                            />
                                                            <label htmlFor='_societe_telephone' className={_societe_telephone ? 'active phone_label' : 'phone_label'}>_societe_telephone</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <PhoneInput
                                                                className="validate form-group-input _societe_fax"
                                                                id="_societe_fax"
                                                                name="_societe_fax"
                                                                value={_societe_fax}
                                                                onChange={(value) => this.handleChangePhoneAutocomplete("_societe_fax", value)}
                                                            />
                                                            <label htmlFor='_societe_fax' className={_societe_fax ? 'active phone_label' : 'phone_label'}>_societe_fax</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _societe_email"
                                                                id="_societe_email"
                                                                type="text"
                                                                name="_societe_email"
                                                                value={_societe_email}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_societe_email' className={_societe_email ? 'active' : ''}>_societe_email</label>
                                                            <div className="form-group-line"></div>
                                                            <small id="emailHelp" className={_societe_email_valid ? 'text-danger' : 'text-danger active'}>
                                                                Veuillez fournir une adresse mail valide.
                                                            </small>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _societe_logo"
                                                                id="_societe_logo"
                                                                type="text"
                                                                name="_societe_logo"
                                                                value={_societe_logo}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_societe_logo' className={_societe_logo ? 'active' : ''}>_societe_logo</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _societe_numeroTP"
                                                                id="_societe_numeroTP"
                                                                type="text"
                                                                name="_societe_numeroTP"
                                                                value={_societe_numeroTP}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_societe_numeroTP' className={_societe_numeroTP ? 'active' : ''}>_societe_numeroTP</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _societe_IF"
                                                                id="_societe_IF"
                                                                type="text"
                                                                name="_societe_IF"
                                                                value={_societe_IF}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_societe_IF' className={_societe_IF ? 'active' : ''}>_societe_IF</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _societe_CNSS"
                                                                id="_societe_CNSS"
                                                                type="text"
                                                                name="_societe_CNSS"
                                                                value={_societe_CNSS}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_societe_CNSS' className={_societe_CNSS ? 'active' : ''}>_societe_CNSS</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _societe_ICE"
                                                                id="_societe_ICE"
                                                                type="text"
                                                                name="_societe_ICE"
                                                                value={_societe_ICE}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_societe_ICE' className={_societe_ICE ? 'active' : ''}>_societe_ICE</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6"></div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right"
                                                                type="submit"
                                                                name='btn_login'
                                                                onClick={this.handleSubmitSociete}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span={_societeToEdit ? 'Update.' : 'Submit.'}>
                                                                            {_societeToEdit ? 'Update' : 'Submit'}.
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
                            <div className="_agences_modal modal fade" id="_agence_modal" tabIndex="-1" role="dialog" aria-labelledby="_agence_modalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <div className="mail_form card">
                                                <div className="fieldset agences_fieldset">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _agence_adresse"
                                                                id="_agence_adresse"
                                                                type="text"
                                                                name="_agence_adresse"
                                                                value={_agence_adresse}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_agence_adresse' className={_agence_adresse ? 'active' : ''}>_agence_adresse</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <Select
                                                                id="Societe"
                                                                className="validate form-group-input Societe"
                                                                classNamePrefix="select"
                                                                defaultValue={Societe}
                                                                isClearable="true"
                                                                isSearchable="true"
                                                                name="Societe"
                                                                value={Societe}
                                                                getOptionLabel={(option) => option._societe_raison}
                                                                getOptionValue={(option) => option}
                                                                onChange={(value) => this.handleChangePhoneAutocomplete('Societe', value)}
                                                                onSelect={(value) => this.handleChangePhoneAutocomplete('Societe', value)}
                                                                options={_societes}
                                                                width='100%'
                                                            />
                                                            <label htmlFor='Societe' className={Societe ? 'active' : ''}>Societe</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6 _autocomplete">
                                                            <Autocomplete
                                                                items={["Afghanistan",
                                                                    "Albania",
                                                                    "Algeria",
                                                                    "American Samoa",
                                                                    "Andorra",
                                                                    "Angola",
                                                                    "Anguilla",
                                                                    "Antarctica",
                                                                    "Antigua and Barbuda",
                                                                    "Argentina",
                                                                    "Armenia",
                                                                    "Aruba",
                                                                    "Australia",
                                                                    "Austria",
                                                                    "Azerbaijan",
                                                                    "Bahamas (the)",
                                                                    "Bahrain",
                                                                    "Bangladesh",
                                                                    "Barbados",
                                                                    "Belarus",
                                                                    "Belgium",
                                                                    "Belize",
                                                                    "Benin",
                                                                    "Bermuda",
                                                                    "Bhutan",
                                                                    "Bolivia (Plurinational State of)",
                                                                    "Bonaire, Sint Eustatius and Saba",
                                                                    "Bosnia and Herzegovina",
                                                                    "Botswana",
                                                                    "Bouvet Island",
                                                                    "Brazil",
                                                                    "British Indian Ocean Territory (the)",
                                                                    "Brunei Darussalam",
                                                                    "Bulgaria",
                                                                    "Burkina Faso",
                                                                    "Burundi",
                                                                    "Cabo Verde",
                                                                    "Cambodia",
                                                                    "Cameroon",
                                                                    "Canada",
                                                                    "Cayman Islands (the)",
                                                                    "Central African Republic (the)",
                                                                    "Chad",
                                                                    "Chile",
                                                                    "China",
                                                                    "Christmas Island",
                                                                    "Cocos (Keeling) Islands (the)",
                                                                    "Colombia",
                                                                    "Comoros (the)",
                                                                    "Congo (the Democratic Republic of the)",
                                                                    "Congo (the)",
                                                                    "Cook Islands (the)",
                                                                    "Costa Rica",
                                                                    "Croatia",
                                                                    "Cuba",
                                                                    "Curaçao",
                                                                    "Cyprus",
                                                                    "Czechia",
                                                                    "Côte d'Ivoire",
                                                                    "Denmark",
                                                                    "Djibouti",
                                                                    "Dominica",
                                                                    "Dominican Republic (the)",
                                                                    "Ecuador",
                                                                    "Egypt",
                                                                    "El Salvador",
                                                                    "Equatorial Guinea",
                                                                    "Eritrea",
                                                                    "Estonia",
                                                                    "Eswatini",
                                                                    "Ethiopia",
                                                                    "Falkland Islands (the) [Malvinas]",
                                                                    "Faroe Islands (the)",
                                                                    "Fiji",
                                                                    "Finland",
                                                                    "France",
                                                                    "French Guiana",
                                                                    "French Polynesia",
                                                                    "French Southern Territories (the)",
                                                                    "Gabon",
                                                                    "Gambia (the)",
                                                                    "Georgia",
                                                                    "Germany",
                                                                    "Ghana",
                                                                    "Gibraltar",
                                                                    "Greece",
                                                                    "Greenland",
                                                                    "Grenada",
                                                                    "Guadeloupe",
                                                                    "Guam",
                                                                    "Guatemala",
                                                                    "Guernsey",
                                                                    "Guinea",
                                                                    "Guinea-Bissau",
                                                                    "Guyana",
                                                                    "Haiti",
                                                                    "Heard Island and McDonald Islands",
                                                                    "Holy See (the)",
                                                                    "Honduras",
                                                                    "Hong Kong",
                                                                    "Hungary",
                                                                    "Iceland",
                                                                    "India",
                                                                    "Indonesia",
                                                                    "Iran (Islamic Republic of)",
                                                                    "Iraq",
                                                                    "Ireland",
                                                                    "Isle of Man",
                                                                    "Israel",
                                                                    "Italy",
                                                                    "Jamaica",
                                                                    "Japan",
                                                                    "Jersey",
                                                                    "Jordan",
                                                                    "Kazakhstan",
                                                                    "Kenya",
                                                                    "Kiribati",
                                                                    "Korea (the Democratic People's Republic of)",
                                                                    "Korea (the Republic of)",
                                                                    "Kuwait",
                                                                    "Kyrgyzstan",
                                                                    "Lao People's Democratic Republic (the)",
                                                                    "Latvia",
                                                                    "Lebanon",
                                                                    "Lesotho",
                                                                    "Liberia",
                                                                    "Libya",
                                                                    "Liechtenstein",
                                                                    "Lithuania",
                                                                    "Luxembourg",
                                                                    "Macao",
                                                                    "Madagascar",
                                                                    "Malawi",
                                                                    "Malaysia",
                                                                    "Maldives",
                                                                    "Mali",
                                                                    "Malta",
                                                                    "Marshall Islands (the)",
                                                                    "Martinique",
                                                                    "Mauritania",
                                                                    "Mauritius",
                                                                    "Mayotte",
                                                                    "Mexico",
                                                                    "Micronesia (Federated States of)",
                                                                    "Moldova (the Republic of)",
                                                                    "Monaco",
                                                                    "Mongolia",
                                                                    "Montenegro",
                                                                    "Montserrat",
                                                                    "Morocco",
                                                                    "Mozambique",
                                                                    "Myanmar",
                                                                    "Namibia",
                                                                    "Nauru",
                                                                    "Nepal",
                                                                    "Netherlands (the)",
                                                                    "New Caledonia",
                                                                    "New Zealand",
                                                                    "Nicaragua",
                                                                    "Niger (the)",
                                                                    "Nigeria",
                                                                    "Niue",
                                                                    "Norfolk Island",
                                                                    "Northern Mariana Islands (the)",
                                                                    "Norway",
                                                                    "Oman",
                                                                    "Pakistan",
                                                                    "Palau",
                                                                    "Palestine, State of",
                                                                    "Panama",
                                                                    "Papua New Guinea",
                                                                    "Paraguay",
                                                                    "Peru",
                                                                    "Philippines (the)",
                                                                    "Pitcairn",
                                                                    "Poland",
                                                                    "Portugal",
                                                                    "Puerto Rico",
                                                                    "Qatar",
                                                                    "Republic of North Macedonia",
                                                                    "Romania",
                                                                    "Russian Federation (the)",
                                                                    "Rwanda",
                                                                    "Réunion",
                                                                    "Saint Barthélemy",
                                                                    "Saint Helena, Ascension and Tristan da Cunha",
                                                                    "Saint Kitts and Nevis",
                                                                    "Saint Lucia",
                                                                    "Saint Martin (French part)",
                                                                    "Saint Pierre and Miquelon",
                                                                    "Saint Vincent and the Grenadines",
                                                                    "Samoa",
                                                                    "San Marino",
                                                                    "Sao Tome and Principe",
                                                                    "Saudi Arabia",
                                                                    "Senegal",
                                                                    "Serbia",
                                                                    "Seychelles",
                                                                    "Sierra Leone",
                                                                    "Singapore",
                                                                    "Sint Maarten (Dutch part)",
                                                                    "Slovakia",
                                                                    "Slovenia",
                                                                    "Solomon Islands",
                                                                    "Somalia",
                                                                    "South Africa",
                                                                    "South Georgia and the South Sandwich Islands",
                                                                    "South Sudan",
                                                                    "Spain",
                                                                    "Sri Lanka",
                                                                    "Sudan (the)",
                                                                    "Suriname",
                                                                    "Svalbard and Jan Mayen",
                                                                    "Sweden",
                                                                    "Switzerland",
                                                                    "Syrian Arab Republic",
                                                                    "Taiwan",
                                                                    "Tajikistan",
                                                                    "Tanzania, United Republic of",
                                                                    "Thailand",
                                                                    "Timor-Leste",
                                                                    "Togo",
                                                                    "Tokelau",
                                                                    "Tonga",
                                                                    "Trinidad and Tobago",
                                                                    "Tunisia",
                                                                    "Turkey",
                                                                    "Turkmenistan",
                                                                    "Turks and Caicos Islands (the)",
                                                                    "Tuvalu",
                                                                    "Uganda",
                                                                    "Ukraine",
                                                                    "United Arab Emirates (the)",
                                                                    "United Kingdom of Great Britain and Northern Ireland (the)",
                                                                    "United States Minor Outlying Islands (the)",
                                                                    "United States of America (the)",
                                                                    "Uruguay",
                                                                    "Uzbekistan",
                                                                    "Vanuatu",
                                                                    "Venezuela (Bolivarian Republic of)",
                                                                    "Viet Nam",
                                                                    "Virgin Islands (British)",
                                                                    "Virgin Islands (U.S.)",
                                                                    "Wallis and Futuna",
                                                                    "Western Sahara",
                                                                    "Yemen",
                                                                    "Zambia",
                                                                    "Zimbabwe",
                                                                    "Åland Islands"]}
                                                                getItemValue={(item) => item}
                                                                inputProps={{ id: '_agence_pays', className: 'validate form-group-input _agence_pays', name: '_agence_pays', autoComplete: "off" }}
                                                                shouldItemRender={(item, _agence_pays) => item.toLowerCase().indexOf(_agence_pays.toLowerCase()) > -1}
                                                                renderItem={(item, isHighlighted) =>
                                                                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
                                                                        {item}
                                                                    </div>
                                                                }
                                                                value={_agence_pays}
                                                                onChange={this.handleChange}
                                                                onSelect={(_agence_pays) => this.setState({ _agence_pays })}
                                                            />
                                                            <label htmlFor='_agence_pays' className={_agence_pays ? 'active' : ''}>_agence_pays</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _agence_ville"
                                                                id="_agence_ville"
                                                                type="text"
                                                                name="_agence_ville"
                                                                value={_agence_ville}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_agence_ville' className={_agence_ville ? 'active' : ''}>_agence_ville</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6"></div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right"
                                                                type="submit"
                                                                name='btn_login'
                                                                onClick={this.handleSubmitAgence}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span={_agenceToEdit ? 'Update.' : 'Submit.'}>
                                                                            {_agenceToEdit ? 'Update' : 'Submit'}.
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
                            <div className="_factures_modal modal fade" id="_facture_modal" tabIndex="-1" role="dialog" aria-labelledby="_facture_modalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <div className="mail_form card">
                                                <div className="fieldset factures_fieldset">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <Select
                                                                id="Fournisseur"
                                                                className="validate form-group-input Fournisseur"
                                                                classNamePrefix="select"
                                                                defaultValue={_.find(_societes, (_s) => { _.includes(_s.Employe, _user.Employe) })}
                                                                isClearable="true"
                                                                isSearchable="true"
                                                                name="Fournisseur"
                                                                value={Fournisseur}
                                                                getOptionLabel={(option) => option._fournisseur_raison}
                                                                getOptionValue={(option) => option}
                                                                onChange={(value) => this.handleChangeSelect('Fournisseur', value)}
                                                                onSelect={(value) => this.handleChangeSelect('Fournisseur', value)}
                                                                options={_fournisseurs}
                                                                width='100%'
                                                            />
                                                            <label htmlFor='Fournisseur' className={Fournisseur ? 'active' : ''}>Fournisseur</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <Select
                                                                id="Client"
                                                                className="validate form-group-input Client"
                                                                classNamePrefix="select"
                                                                defaultValue={_.find(_societes, (_s) => { _.includes(_s.Employe, _user.Employe) })}
                                                                isClearable="true"
                                                                isSearchable="true"
                                                                name="Client"
                                                                value={Client}
                                                                getOptionLabel={(option) => option._client_raison ? option._client_raison : option._client_prenomcontact + ' ' + option._client_nomcontact}
                                                                getOptionValue={(option) => option}
                                                                onChange={(value) => this.handleChangeSelect('Client', value)}
                                                                onSelect={(value) => this.handleChangeSelect('Client', value)}
                                                                options={_clients}
                                                                width='100%'
                                                            />
                                                            <label htmlFor='Client' className={Client ? 'active' : ''}>Client</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <fieldset className="Produit border">
                                                        <legend className="w-auto" onClick={this.handleAdd}>Ajouter des Produits</legend>
                                                        {
                                                            _.map(Produit, (_P, i) => {
                                                                return (
                                                                    <div className="_P">
                                                                        <div className="row">
                                                                            <div className="input-field col s6">
                                                                                <input
                                                                                    className="validate form-group-input _produit_designation"
                                                                                    id={"_produit_designation" + i}
                                                                                    type="text"
                                                                                    name={"_produit_designation" + i}
                                                                                    value={_P._produit_designation}
                                                                                    onChange={(event) => this.handleChangeNestedProduits(Produit.indexOf(_P), '_produit_designation', event.target.value)}
                                                                                />
                                                                                <label htmlFor={"_produit_designation" + i} className={_P._produit_designation ? 'active' : ''}>Designation</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col s6">
                                                                                <input
                                                                                    className="validate form-group-input _produit_reference"
                                                                                    id={"_produit_reference" + i}
                                                                                    type="text"
                                                                                    name={"_produit_reference" + i}
                                                                                    value={_P._produit_reference}
                                                                                    onChange={(event) => this.handleChangeNestedProduits(Produit.indexOf(_P), '_produit_reference', event.target.value)}
                                                                                />
                                                                                <label htmlFor={"_produit_reference" + i} className={_P._produit_reference ? 'active' : ''}>Reference</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="input-field col s6">
                                                                                <input
                                                                                    className="validate form-group-input _produit_quantite"
                                                                                    id={"_produit_quantite" + i}
                                                                                    type="text"
                                                                                    name={"_produit_quantite" + i}
                                                                                    value={_P._produit_quantite}
                                                                                    onChange={(event) => this.handleChangeNestedProduits(Produit.indexOf(_P), '_produit_quantite', event.target.value)}
                                                                                />
                                                                                <label htmlFor={"_produit_quantite" + i} className={(_produit_quantite === 0 ? true : _produit_quantite) ? 'active' : ''}>Quantite</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col s6">
                                                                                <input
                                                                                    className="validate form-group-input _produit_prixunitaire"
                                                                                    id={"_produit_prixunitaire" + i}
                                                                                    type="text"
                                                                                    name={"_produit_prixunitaire" + i}
                                                                                    value={_P._produit_prixunitaire}
                                                                                    onChange={(event) => this.handleChangeNestedProduits(Produit.indexOf(_P), '_produit_prixunitaire', event.target.value)}
                                                                                />
                                                                                <label htmlFor={"_produit_prixunitaire" + i} className={(_produit_prixunitaire === 0 ? true : _produit_prixunitaire) ? 'active' : ''}>Prix Unitaire</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row button_row">
                                                                            <div className="input-field col s6"></div>
                                                                            <div className="input-field col s6">
                                                                                <button
                                                                                    className="pull-right"
                                                                                    type="submit"
                                                                                    onClick={() => this.handleRemove(_P)}
                                                                                >
                                                                                    <span>
                                                                                        <span>
                                                                                            <span data-attr-span="Supprimer le Produit">
                                                                                                Supprimer le Produit
                                                                                            </span>
                                                                                        </span>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </fieldset>
                                                    <div className="row">
                                                        <div className="input-field col s12">
                                                            <Select
                                                                id="Societe"
                                                                className="validate form-group-input Societe"
                                                                classNamePrefix="select"
                                                                defaultValue={{}}
                                                                isClearable="true"
                                                                isSearchable="true"
                                                                name="Societe"
                                                                value={Societe}
                                                                getOptionLabel={(option) => option._societe_raison}
                                                                getOptionValue={(option) => option}
                                                                onChange={(value) => this.handleChangeSelect('Societe', value)}
                                                                onSelect={(value) => this.handleChangeSelect('Societe', value)}
                                                                options={_societes}
                                                                width='100%'
                                                            />
                                                            <label htmlFor='Societe' className={Societe ? 'active' : ''}>Societe</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _facture_commentaire"
                                                                id="_facture_commentaire"
                                                                type="text"
                                                                name="_facture_commentaire"
                                                                value={_facture_commentaire}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_facture_commentaire' className={_facture_commentaire ? 'active' : ''}>_facture_commentaire</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _facture_TVA"
                                                                id="_facture_TVA"
                                                                type="text"
                                                                name="_facture_TVA"
                                                                value={_facture_TVA}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_facture_TVA' className={(_facture_TVA === 0 ? true : _facture_TVA) ? 'active' : ''}>_facture_TVA</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6"></div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right"
                                                                type="submit"
                                                                name='btn_login'
                                                                onClick={this.handleSubmitFacture}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span={_factureToEdit ? 'Update.' : 'Submit.'}>
                                                                            {_factureToEdit ? 'Update' : 'Submit'}.
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
                            <div className="_deviss_modal modal fade" id="_devis_modal" tabIndex="-1" role="dialog" aria-labelledby="_devis_modalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <div className="mail_form card">
                                                <div className="fieldset deviss_fieldset">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <Select
                                                                id="Fournisseur"
                                                                className="validate form-group-input Fournisseur"
                                                                classNamePrefix="select"
                                                                defaultValue={_.find(_societes, (_s) => { _.includes(_s.Employe, _user.Employe) })}
                                                                isClearable="true"
                                                                isSearchable="true"
                                                                name="Fournisseur"
                                                                value={Fournisseur}
                                                                getOptionLabel={(option) => option._fournisseur_raison}
                                                                getOptionValue={(option) => option}
                                                                onChange={(value) => this.handleChangeSelect('Fournisseur', value)}
                                                                onSelect={(value) => this.handleChangeSelect('Fournisseur', value)}
                                                                options={_fournisseurs}
                                                                width='100%'
                                                            />
                                                            <label htmlFor='Fournisseur' className={Fournisseur ? 'active' : ''}>Fournisseur</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <Select
                                                                id="Client"
                                                                className="validate form-group-input Client"
                                                                classNamePrefix="select"
                                                                defaultValue={_.find(_societes, (_s) => { _.includes(_s.Employe, _user.Employe) })}
                                                                isClearable="true"
                                                                isSearchable="true"
                                                                name="Client"
                                                                value={Client}
                                                                getOptionLabel={(option) => option._client_raison ? option._client_raison : option._client_prenomcontact + ' ' + option._client_nomcontact}
                                                                getOptionValue={(option) => option}
                                                                onChange={(value) => this.handleChangeSelect('Client', value)}
                                                                onSelect={(value) => this.handleChangeSelect('Client', value)}
                                                                options={_clients}
                                                                width='100%'
                                                            />
                                                            <label htmlFor='Client' className={Client ? 'active' : ''}>Client</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <fieldset className="Produit border">
                                                        <legend className="w-auto" onClick={this.handleAdd}>Ajouter des Produits</legend>
                                                        {
                                                            _.map(Produit, (_P, i) => {
                                                                return (
                                                                    <div className="_P">
                                                                        <div className="row">
                                                                            <div className="input-field col s6">
                                                                                <input
                                                                                    className="validate form-group-input _produit_designation"
                                                                                    id={"_produit_designation" + i}
                                                                                    type="text"
                                                                                    name={"_produit_designation" + i}
                                                                                    value={_P._produit_designation}
                                                                                    onChange={(event) => this.handleChangeNestedProduits(Produit.indexOf(_P), '_produit_designation', event.target.value)}
                                                                                />
                                                                                <label htmlFor={"_produit_designation" + i} className={_P._produit_designation ? 'active' : ''}>Designation</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col s6">
                                                                                <input
                                                                                    className="validate form-group-input _produit_reference"
                                                                                    id={"_produit_reference" + i}
                                                                                    type="text"
                                                                                    name={"_produit_reference" + i}
                                                                                    value={_P._produit_reference}
                                                                                    onChange={(event) => this.handleChangeNestedProduits(Produit.indexOf(_P), '_produit_reference', event.target.value)}
                                                                                />
                                                                                <label htmlFor={"_produit_reference" + i} className={_P._produit_reference ? 'active' : ''}>Reference</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="input-field col s6">
                                                                                <input
                                                                                    className="validate form-group-input _produit_quantite"
                                                                                    id={"_produit_quantite" + i}
                                                                                    type="text"
                                                                                    name={"_produit_quantite" + i}
                                                                                    value={_P._produit_quantite}
                                                                                    onChange={(event) => this.handleChangeNestedProduits(Produit.indexOf(_P), '_produit_quantite', event.target.value)}
                                                                                />
                                                                                <label htmlFor={"_produit_quantite" + i} className={(_produit_quantite === 0 ? true : _produit_quantite) ? 'active' : ''}>Quantite</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                            <div className="input-field col s6">
                                                                                <input
                                                                                    className="validate form-group-input _produit_prixunitaire"
                                                                                    id={"_produit_prixunitaire" + i}
                                                                                    type="text"
                                                                                    name={"_produit_prixunitaire" + i}
                                                                                    value={_P._produit_prixunitaire}
                                                                                    onChange={(event) => this.handleChangeNestedProduits(Produit.indexOf(_P), '_produit_prixunitaire', event.target.value)}
                                                                                />
                                                                                <label htmlFor={"_produit_prixunitaire" + i} className={(_produit_prixunitaire === 0 ? true : _produit_prixunitaire) ? 'active' : ''}>Prix Unitaire</label>
                                                                                <div className="form-group-line"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row button_row">
                                                                            <div className="input-field col s6"></div>
                                                                            <div className="input-field col s6">
                                                                                <button
                                                                                    className="pull-right"
                                                                                    type="submit"
                                                                                    onClick={() => this.handleRemove(_P)}
                                                                                >
                                                                                    <span>
                                                                                        <span>
                                                                                            <span data-attr-span="Supprimer le Produit">
                                                                                                Supprimer le Produit
                                                                                            </span>
                                                                                        </span>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </fieldset>
                                                    <div className="row">
                                                        <div className="input-field col s12">
                                                            <Select
                                                                id="Societe"
                                                                className="validate form-group-input Societe"
                                                                classNamePrefix="select"
                                                                defaultValue={{}}
                                                                isClearable="true"
                                                                isSearchable="true"
                                                                name="Societe"
                                                                value={Societe}
                                                                getOptionLabel={(option) => option._societe_raison}
                                                                getOptionValue={(option) => option}
                                                                onChange={(value) => this.handleChangeSelect('Societe', value)}
                                                                onSelect={(value) => this.handleChangeSelect('Societe', value)}
                                                                options={_societes}
                                                                width='100%'
                                                            />
                                                            <label htmlFor='Societe' className={Societe ? 'active' : ''}>Societe</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _devis_commentaire"
                                                                id="_devis_commentaire"
                                                                type="text"
                                                                name="_devis_commentaire"
                                                                value={_devis_commentaire}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_devis_commentaire' className={_devis_commentaire ? 'active' : ''}>_devis_commentaire</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _devis_TVA"
                                                                id="_devis_TVA"
                                                                type="text"
                                                                name="_devis_TVA"
                                                                value={_devis_TVA}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_devis_TVA' className={(_devis_TVA === 0 ? true : _devis_TVA) ? 'active' : ''}>_devis_TVA</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6"></div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right"
                                                                type="submit"
                                                                name='btn_login'
                                                                onClick={this.handleSubmitDevis}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span={_devisToEdit ? 'Update.' : 'Submit.'}>
                                                                            {_devisToEdit ? 'Update' : 'Submit'}.
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

                            <div className="_clients_modal modal fade" id="_client_modal" tabIndex="-1" role="dialog" aria-labelledby="_client_modalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <div className="mail_form card">
                                                <div className="fieldset clients_fieldset">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _client_raison"
                                                                id="_client_raison"
                                                                type="text"
                                                                name="_client_raison"
                                                                value={_client_raison}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_client_raison' className={_client_raison ? 'active' : ''}>_client_raison</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _client_adresse"
                                                                id="_client_adresse"
                                                                type="text"
                                                                name="_client_adresse"
                                                                value={_client_adresse}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_client_adresse' className={_client_adresse ? 'active' : ''}>_client_adresse</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6 _autocomplete">
                                                            <Autocomplete
                                                                items={["Afghanistan",
                                                                    "Albania",
                                                                    "Algeria",
                                                                    "American Samoa",
                                                                    "Andorra",
                                                                    "Angola",
                                                                    "Anguilla",
                                                                    "Antarctica",
                                                                    "Antigua and Barbuda",
                                                                    "Argentina",
                                                                    "Armenia",
                                                                    "Aruba",
                                                                    "Australia",
                                                                    "Austria",
                                                                    "Azerbaijan",
                                                                    "Bahamas (the)",
                                                                    "Bahrain",
                                                                    "Bangladesh",
                                                                    "Barbados",
                                                                    "Belarus",
                                                                    "Belgium",
                                                                    "Belize",
                                                                    "Benin",
                                                                    "Bermuda",
                                                                    "Bhutan",
                                                                    "Bolivia (Plurinational State of)",
                                                                    "Bonaire, Sint Eustatius and Saba",
                                                                    "Bosnia and Herzegovina",
                                                                    "Botswana",
                                                                    "Bouvet Island",
                                                                    "Brazil",
                                                                    "British Indian Ocean Territory (the)",
                                                                    "Brunei Darussalam",
                                                                    "Bulgaria",
                                                                    "Burkina Faso",
                                                                    "Burundi",
                                                                    "Cabo Verde",
                                                                    "Cambodia",
                                                                    "Cameroon",
                                                                    "Canada",
                                                                    "Cayman Islands (the)",
                                                                    "Central African Republic (the)",
                                                                    "Chad",
                                                                    "Chile",
                                                                    "China",
                                                                    "Christmas Island",
                                                                    "Cocos (Keeling) Islands (the)",
                                                                    "Colombia",
                                                                    "Comoros (the)",
                                                                    "Congo (the Democratic Republic of the)",
                                                                    "Congo (the)",
                                                                    "Cook Islands (the)",
                                                                    "Costa Rica",
                                                                    "Croatia",
                                                                    "Cuba",
                                                                    "Curaçao",
                                                                    "Cyprus",
                                                                    "Czechia",
                                                                    "Côte d'Ivoire",
                                                                    "Denmark",
                                                                    "Djibouti",
                                                                    "Dominica",
                                                                    "Dominican Republic (the)",
                                                                    "Ecuador",
                                                                    "Egypt",
                                                                    "El Salvador",
                                                                    "Equatorial Guinea",
                                                                    "Eritrea",
                                                                    "Estonia",
                                                                    "Eswatini",
                                                                    "Ethiopia",
                                                                    "Falkland Islands (the) [Malvinas]",
                                                                    "Faroe Islands (the)",
                                                                    "Fiji",
                                                                    "Finland",
                                                                    "France",
                                                                    "French Guiana",
                                                                    "French Polynesia",
                                                                    "French Southern Territories (the)",
                                                                    "Gabon",
                                                                    "Gambia (the)",
                                                                    "Georgia",
                                                                    "Germany",
                                                                    "Ghana",
                                                                    "Gibraltar",
                                                                    "Greece",
                                                                    "Greenland",
                                                                    "Grenada",
                                                                    "Guadeloupe",
                                                                    "Guam",
                                                                    "Guatemala",
                                                                    "Guernsey",
                                                                    "Guinea",
                                                                    "Guinea-Bissau",
                                                                    "Guyana",
                                                                    "Haiti",
                                                                    "Heard Island and McDonald Islands",
                                                                    "Holy See (the)",
                                                                    "Honduras",
                                                                    "Hong Kong",
                                                                    "Hungary",
                                                                    "Iceland",
                                                                    "India",
                                                                    "Indonesia",
                                                                    "Iran (Islamic Republic of)",
                                                                    "Iraq",
                                                                    "Ireland",
                                                                    "Isle of Man",
                                                                    "Israel",
                                                                    "Italy",
                                                                    "Jamaica",
                                                                    "Japan",
                                                                    "Jersey",
                                                                    "Jordan",
                                                                    "Kazakhstan",
                                                                    "Kenya",
                                                                    "Kiribati",
                                                                    "Korea (the Democratic People's Republic of)",
                                                                    "Korea (the Republic of)",
                                                                    "Kuwait",
                                                                    "Kyrgyzstan",
                                                                    "Lao People's Democratic Republic (the)",
                                                                    "Latvia",
                                                                    "Lebanon",
                                                                    "Lesotho",
                                                                    "Liberia",
                                                                    "Libya",
                                                                    "Liechtenstein",
                                                                    "Lithuania",
                                                                    "Luxembourg",
                                                                    "Macao",
                                                                    "Madagascar",
                                                                    "Malawi",
                                                                    "Malaysia",
                                                                    "Maldives",
                                                                    "Mali",
                                                                    "Malta",
                                                                    "Marshall Islands (the)",
                                                                    "Martinique",
                                                                    "Mauritania",
                                                                    "Mauritius",
                                                                    "Mayotte",
                                                                    "Mexico",
                                                                    "Micronesia (Federated States of)",
                                                                    "Moldova (the Republic of)",
                                                                    "Monaco",
                                                                    "Mongolia",
                                                                    "Montenegro",
                                                                    "Montserrat",
                                                                    "Morocco",
                                                                    "Mozambique",
                                                                    "Myanmar",
                                                                    "Namibia",
                                                                    "Nauru",
                                                                    "Nepal",
                                                                    "Netherlands (the)",
                                                                    "New Caledonia",
                                                                    "New Zealand",
                                                                    "Nicaragua",
                                                                    "Niger (the)",
                                                                    "Nigeria",
                                                                    "Niue",
                                                                    "Norfolk Island",
                                                                    "Northern Mariana Islands (the)",
                                                                    "Norway",
                                                                    "Oman",
                                                                    "Pakistan",
                                                                    "Palau",
                                                                    "Palestine, State of",
                                                                    "Panama",
                                                                    "Papua New Guinea",
                                                                    "Paraguay",
                                                                    "Peru",
                                                                    "Philippines (the)",
                                                                    "Pitcairn",
                                                                    "Poland",
                                                                    "Portugal",
                                                                    "Puerto Rico",
                                                                    "Qatar",
                                                                    "Republic of North Macedonia",
                                                                    "Romania",
                                                                    "Russian Federation (the)",
                                                                    "Rwanda",
                                                                    "Réunion",
                                                                    "Saint Barthélemy",
                                                                    "Saint Helena, Ascension and Tristan da Cunha",
                                                                    "Saint Kitts and Nevis",
                                                                    "Saint Lucia",
                                                                    "Saint Martin (French part)",
                                                                    "Saint Pierre and Miquelon",
                                                                    "Saint Vincent and the Grenadines",
                                                                    "Samoa",
                                                                    "San Marino",
                                                                    "Sao Tome and Principe",
                                                                    "Saudi Arabia",
                                                                    "Senegal",
                                                                    "Serbia",
                                                                    "Seychelles",
                                                                    "Sierra Leone",
                                                                    "Singapore",
                                                                    "Sint Maarten (Dutch part)",
                                                                    "Slovakia",
                                                                    "Slovenia",
                                                                    "Solomon Islands",
                                                                    "Somalia",
                                                                    "South Africa",
                                                                    "South Georgia and the South Sandwich Islands",
                                                                    "South Sudan",
                                                                    "Spain",
                                                                    "Sri Lanka",
                                                                    "Sudan (the)",
                                                                    "Suriname",
                                                                    "Svalbard and Jan Mayen",
                                                                    "Sweden",
                                                                    "Switzerland",
                                                                    "Syrian Arab Republic",
                                                                    "Taiwan",
                                                                    "Tajikistan",
                                                                    "Tanzania, United Republic of",
                                                                    "Thailand",
                                                                    "Timor-Leste",
                                                                    "Togo",
                                                                    "Tokelau",
                                                                    "Tonga",
                                                                    "Trinidad and Tobago",
                                                                    "Tunisia",
                                                                    "Turkey",
                                                                    "Turkmenistan",
                                                                    "Turks and Caicos Islands (the)",
                                                                    "Tuvalu",
                                                                    "Uganda",
                                                                    "Ukraine",
                                                                    "United Arab Emirates (the)",
                                                                    "United Kingdom of Great Britain and Northern Ireland (the)",
                                                                    "United States Minor Outlying Islands (the)",
                                                                    "United States of America (the)",
                                                                    "Uruguay",
                                                                    "Uzbekistan",
                                                                    "Vanuatu",
                                                                    "Venezuela (Bolivarian Republic of)",
                                                                    "Viet Nam",
                                                                    "Virgin Islands (British)",
                                                                    "Virgin Islands (U.S.)",
                                                                    "Wallis and Futuna",
                                                                    "Western Sahara",
                                                                    "Yemen",
                                                                    "Zambia",
                                                                    "Zimbabwe",
                                                                    "Åland Islands"]}
                                                                getItemValue={(item) => item}
                                                                inputProps={{ id: '_client_pays', className: 'validate form-group-input _client_pays', name: '_client_pays', autoComplete: "off" }}
                                                                shouldItemRender={(item, _client_pays) => item.toLowerCase().indexOf(_client_pays.toLowerCase()) > -1}
                                                                renderItem={(item, isHighlighted) =>
                                                                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
                                                                        {item}
                                                                    </div>
                                                                }
                                                                value={_client_pays}
                                                                onChange={this.handleChange}
                                                                onSelect={(_client_pays) => this.setState({ _client_pays })}
                                                            />
                                                            <label htmlFor='_client_pays' className={_client_pays ? 'active' : ''}>_client_pays</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _client_ville"
                                                                id="_client_ville"
                                                                type="text"
                                                                name="_client_ville"
                                                                value={_client_ville}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_client_ville' className={_client_ville ? 'active' : ''}>_client_ville</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _client_prenomcontact"
                                                                id="_client_prenomcontact"
                                                                type="text"
                                                                name="_client_prenomcontact"
                                                                value={_client_prenomcontact}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_client_prenomcontact' className={_client_prenomcontact ? 'active' : ''}>_client_prenomcontact</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _client_nomcontact"
                                                                id="_client_nomcontact"
                                                                type="text"
                                                                name="_client_nomcontact"
                                                                value={_client_nomcontact}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_client_nomcontact' className={_client_nomcontact ? 'active' : ''}>_client_nomcontact</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _client_email"
                                                                id="_client_email"
                                                                type="text"
                                                                name="_client_email"
                                                                value={_client_email}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_client_email' className={_client_email ? 'active' : ''}>_client_email</label>
                                                            <div className="form-group-line"></div>
                                                            <small id="emailHelp" className={_client_email_valid ? 'text-danger' : 'text-danger active'}>
                                                                Veuillez fournir une adresse mail valide.
                                                            </small>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <PhoneInput
                                                                className="validate form-group-input _client_telephone"
                                                                id="_client_telephone"
                                                                name="_client_telephone"
                                                                value={_client_telephone}
                                                                onChange={(value) => this.handleChangePhoneAutocomplete("_client_telephone", value)}
                                                            />
                                                            <label htmlFor='_client_telephone' className={_client_telephone ? 'active phone_label' : 'phone_label'}>_client_telephone</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _client_patente"
                                                                id="_client_patente"
                                                                type="text"
                                                                name="_client_patente"
                                                                value={_client_patente}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_client_patente' className={_client_patente ? 'active' : ''}>_client_patente</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _client_IF"
                                                                id="_client_IF"
                                                                type="text"
                                                                name="_client_IF"
                                                                value={_client_IF}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_client_IF' className={_client_IF ? 'active' : ''}>_client_IF</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _client_RC"
                                                                id="_client_RC"
                                                                type="text"
                                                                name="_client_RC"
                                                                value={_client_RC}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_client_RC' className={_client_RC ? 'active' : ''}>_client_RC</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _client_ICE"
                                                                id="_client_ICE"
                                                                type="text"
                                                                name="_client_ICE"
                                                                value={_client_ICE}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_client_ICE' className={_client_ICE ? 'active' : ''}>_client_ICE</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _client_contrat"
                                                                id="_client_contrat"
                                                                type="text"
                                                                name="_client_contrat"
                                                                value={_client_contrat}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_client_contrat' className={_client_contrat ? 'active' : ''}>_client_contrat</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6"></div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right"
                                                                type="submit"
                                                                name='btn_login'
                                                                onClick={this.handleSubmitClient}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span={_clientToEdit ? 'Update.' : 'Submit.'}>
                                                                            {_clientToEdit ? 'Update' : 'Submit'}.
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
                            <div className="_fournisseurs_modal modal fade" id="_fournisseur_modal" tabIndex="-1" role="dialog" aria-labelledby="_fournisseur_modalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <div className="mail_form card">
                                                <div className="fieldset fournisseurs_fieldset">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _fournisseur_raison"
                                                                id="_fournisseur_raison"
                                                                type="text"
                                                                name="_fournisseur_raison"
                                                                value={_fournisseur_raison}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_fournisseur_raison' className={_fournisseur_raison ? 'active' : ''}>_fournisseur_raison</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _fournisseur_siege"
                                                                id="_fournisseur_siege"
                                                                type="text"
                                                                name="_fournisseur_siege"
                                                                value={_fournisseur_siege}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_fournisseur_siege' className={_fournisseur_siege ? 'active' : ''}>_fournisseur_siege</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6 _autocomplete">
                                                            <Autocomplete
                                                                items={["Afghanistan",
                                                                    "Albania",
                                                                    "Algeria",
                                                                    "American Samoa",
                                                                    "Andorra",
                                                                    "Angola",
                                                                    "Anguilla",
                                                                    "Antarctica",
                                                                    "Antigua and Barbuda",
                                                                    "Argentina",
                                                                    "Armenia",
                                                                    "Aruba",
                                                                    "Australia",
                                                                    "Austria",
                                                                    "Azerbaijan",
                                                                    "Bahamas (the)",
                                                                    "Bahrain",
                                                                    "Bangladesh",
                                                                    "Barbados",
                                                                    "Belarus",
                                                                    "Belgium",
                                                                    "Belize",
                                                                    "Benin",
                                                                    "Bermuda",
                                                                    "Bhutan",
                                                                    "Bolivia (Plurinational State of)",
                                                                    "Bonaire, Sint Eustatius and Saba",
                                                                    "Bosnia and Herzegovina",
                                                                    "Botswana",
                                                                    "Bouvet Island",
                                                                    "Brazil",
                                                                    "British Indian Ocean Territory (the)",
                                                                    "Brunei Darussalam",
                                                                    "Bulgaria",
                                                                    "Burkina Faso",
                                                                    "Burundi",
                                                                    "Cabo Verde",
                                                                    "Cambodia",
                                                                    "Cameroon",
                                                                    "Canada",
                                                                    "Cayman Islands (the)",
                                                                    "Central African Republic (the)",
                                                                    "Chad",
                                                                    "Chile",
                                                                    "China",
                                                                    "Christmas Island",
                                                                    "Cocos (Keeling) Islands (the)",
                                                                    "Colombia",
                                                                    "Comoros (the)",
                                                                    "Congo (the Democratic Republic of the)",
                                                                    "Congo (the)",
                                                                    "Cook Islands (the)",
                                                                    "Costa Rica",
                                                                    "Croatia",
                                                                    "Cuba",
                                                                    "Curaçao",
                                                                    "Cyprus",
                                                                    "Czechia",
                                                                    "Côte d'Ivoire",
                                                                    "Denmark",
                                                                    "Djibouti",
                                                                    "Dominica",
                                                                    "Dominican Republic (the)",
                                                                    "Ecuador",
                                                                    "Egypt",
                                                                    "El Salvador",
                                                                    "Equatorial Guinea",
                                                                    "Eritrea",
                                                                    "Estonia",
                                                                    "Eswatini",
                                                                    "Ethiopia",
                                                                    "Falkland Islands (the) [Malvinas]",
                                                                    "Faroe Islands (the)",
                                                                    "Fiji",
                                                                    "Finland",
                                                                    "France",
                                                                    "French Guiana",
                                                                    "French Polynesia",
                                                                    "French Southern Territories (the)",
                                                                    "Gabon",
                                                                    "Gambia (the)",
                                                                    "Georgia",
                                                                    "Germany",
                                                                    "Ghana",
                                                                    "Gibraltar",
                                                                    "Greece",
                                                                    "Greenland",
                                                                    "Grenada",
                                                                    "Guadeloupe",
                                                                    "Guam",
                                                                    "Guatemala",
                                                                    "Guernsey",
                                                                    "Guinea",
                                                                    "Guinea-Bissau",
                                                                    "Guyana",
                                                                    "Haiti",
                                                                    "Heard Island and McDonald Islands",
                                                                    "Holy See (the)",
                                                                    "Honduras",
                                                                    "Hong Kong",
                                                                    "Hungary",
                                                                    "Iceland",
                                                                    "India",
                                                                    "Indonesia",
                                                                    "Iran (Islamic Republic of)",
                                                                    "Iraq",
                                                                    "Ireland",
                                                                    "Isle of Man",
                                                                    "Israel",
                                                                    "Italy",
                                                                    "Jamaica",
                                                                    "Japan",
                                                                    "Jersey",
                                                                    "Jordan",
                                                                    "Kazakhstan",
                                                                    "Kenya",
                                                                    "Kiribati",
                                                                    "Korea (the Democratic People's Republic of)",
                                                                    "Korea (the Republic of)",
                                                                    "Kuwait",
                                                                    "Kyrgyzstan",
                                                                    "Lao People's Democratic Republic (the)",
                                                                    "Latvia",
                                                                    "Lebanon",
                                                                    "Lesotho",
                                                                    "Liberia",
                                                                    "Libya",
                                                                    "Liechtenstein",
                                                                    "Lithuania",
                                                                    "Luxembourg",
                                                                    "Macao",
                                                                    "Madagascar",
                                                                    "Malawi",
                                                                    "Malaysia",
                                                                    "Maldives",
                                                                    "Mali",
                                                                    "Malta",
                                                                    "Marshall Islands (the)",
                                                                    "Martinique",
                                                                    "Mauritania",
                                                                    "Mauritius",
                                                                    "Mayotte",
                                                                    "Mexico",
                                                                    "Micronesia (Federated States of)",
                                                                    "Moldova (the Republic of)",
                                                                    "Monaco",
                                                                    "Mongolia",
                                                                    "Montenegro",
                                                                    "Montserrat",
                                                                    "Morocco",
                                                                    "Mozambique",
                                                                    "Myanmar",
                                                                    "Namibia",
                                                                    "Nauru",
                                                                    "Nepal",
                                                                    "Netherlands (the)",
                                                                    "New Caledonia",
                                                                    "New Zealand",
                                                                    "Nicaragua",
                                                                    "Niger (the)",
                                                                    "Nigeria",
                                                                    "Niue",
                                                                    "Norfolk Island",
                                                                    "Northern Mariana Islands (the)",
                                                                    "Norway",
                                                                    "Oman",
                                                                    "Pakistan",
                                                                    "Palau",
                                                                    "Palestine, State of",
                                                                    "Panama",
                                                                    "Papua New Guinea",
                                                                    "Paraguay",
                                                                    "Peru",
                                                                    "Philippines (the)",
                                                                    "Pitcairn",
                                                                    "Poland",
                                                                    "Portugal",
                                                                    "Puerto Rico",
                                                                    "Qatar",
                                                                    "Republic of North Macedonia",
                                                                    "Romania",
                                                                    "Russian Federation (the)",
                                                                    "Rwanda",
                                                                    "Réunion",
                                                                    "Saint Barthélemy",
                                                                    "Saint Helena, Ascension and Tristan da Cunha",
                                                                    "Saint Kitts and Nevis",
                                                                    "Saint Lucia",
                                                                    "Saint Martin (French part)",
                                                                    "Saint Pierre and Miquelon",
                                                                    "Saint Vincent and the Grenadines",
                                                                    "Samoa",
                                                                    "San Marino",
                                                                    "Sao Tome and Principe",
                                                                    "Saudi Arabia",
                                                                    "Senegal",
                                                                    "Serbia",
                                                                    "Seychelles",
                                                                    "Sierra Leone",
                                                                    "Singapore",
                                                                    "Sint Maarten (Dutch part)",
                                                                    "Slovakia",
                                                                    "Slovenia",
                                                                    "Solomon Islands",
                                                                    "Somalia",
                                                                    "South Africa",
                                                                    "South Georgia and the South Sandwich Islands",
                                                                    "South Sudan",
                                                                    "Spain",
                                                                    "Sri Lanka",
                                                                    "Sudan (the)",
                                                                    "Suriname",
                                                                    "Svalbard and Jan Mayen",
                                                                    "Sweden",
                                                                    "Switzerland",
                                                                    "Syrian Arab Republic",
                                                                    "Taiwan",
                                                                    "Tajikistan",
                                                                    "Tanzania, United Republic of",
                                                                    "Thailand",
                                                                    "Timor-Leste",
                                                                    "Togo",
                                                                    "Tokelau",
                                                                    "Tonga",
                                                                    "Trinidad and Tobago",
                                                                    "Tunisia",
                                                                    "Turkey",
                                                                    "Turkmenistan",
                                                                    "Turks and Caicos Islands (the)",
                                                                    "Tuvalu",
                                                                    "Uganda",
                                                                    "Ukraine",
                                                                    "United Arab Emirates (the)",
                                                                    "United Kingdom of Great Britain and Northern Ireland (the)",
                                                                    "United States Minor Outlying Islands (the)",
                                                                    "United States of America (the)",
                                                                    "Uruguay",
                                                                    "Uzbekistan",
                                                                    "Vanuatu",
                                                                    "Venezuela (Bolivarian Republic of)",
                                                                    "Viet Nam",
                                                                    "Virgin Islands (British)",
                                                                    "Virgin Islands (U.S.)",
                                                                    "Wallis and Futuna",
                                                                    "Western Sahara",
                                                                    "Yemen",
                                                                    "Zambia",
                                                                    "Zimbabwe",
                                                                    "Åland Islands"]}
                                                                getItemValue={(item) => item}
                                                                inputProps={{ id: '_fournisseur_pays', className: 'validate form-group-input _fournisseur_pays', name: '_fournisseur_pays', autoComplete: "off" }}
                                                                shouldItemRender={(item, _fournisseur_pays) => item.toLowerCase().indexOf(_fournisseur_pays.toLowerCase()) > -1}
                                                                renderItem={(item, isHighlighted) =>
                                                                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}>
                                                                        {item}
                                                                    </div>
                                                                }
                                                                value={_fournisseur_pays}
                                                                onChange={this.handleChange}
                                                                onSelect={(_fournisseur_pays) => this.setState({ _fournisseur_pays })}
                                                            />
                                                            <label htmlFor='_fournisseur_pays' className={_fournisseur_pays ? 'active' : ''}>_fournisseur_pays</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _fournisseur_ville"
                                                                id="_fournisseur_ville"
                                                                type="text"
                                                                name="_fournisseur_ville"
                                                                value={_fournisseur_ville}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_fournisseur_ville' className={_fournisseur_ville ? 'active' : ''}>_fournisseur_ville</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _fournisseur_prenomcontact"
                                                                id="_fournisseur_prenomcontact"
                                                                type="text"
                                                                name="_fournisseur_prenomcontact"
                                                                value={_fournisseur_prenomcontact}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_fournisseur_prenomcontact' className={_fournisseur_prenomcontact ? 'active' : ''}>_fournisseur_prenomcontact</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _fournisseur_nomcontact"
                                                                id="_fournisseur_nomcontact"
                                                                type="text"
                                                                name="_fournisseur_nomcontact"
                                                                value={_fournisseur_nomcontact}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_fournisseur_nomcontact' className={_fournisseur_nomcontact ? 'active' : ''}>_fournisseur_nomcontact</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _fournisseur_email"
                                                                id="_fournisseur_email"
                                                                type="text"
                                                                name="_fournisseur_email"
                                                                value={_fournisseur_email}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_fournisseur_email' className={_fournisseur_email ? 'active' : ''}>_fournisseur_email</label>
                                                            <div className="form-group-line"></div>
                                                            <small id="emailHelp" className={_fournisseur_email_valid ? 'text-danger' : 'text-danger active'}>
                                                                Veuillez fournir une adresse mail valide.
                                                            </small>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <PhoneInput
                                                                className="validate form-group-input _fournisseur_telephone"
                                                                id="_fournisseur_telephone"
                                                                name="_fournisseur_telephone"
                                                                value={_fournisseur_telephone}
                                                                onChange={(value) => this.handleChangePhoneAutocomplete("_fournisseur_telephone", value)}
                                                            />
                                                            <label htmlFor='_fournisseur_telephone' className={_fournisseur_telephone ? 'active phone_label' : 'phone_label'}>_fournisseur_telephone</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _fournisseur_patente"
                                                                id="_fournisseur_patente"
                                                                type="text"
                                                                name="_fournisseur_patente"
                                                                value={_fournisseur_patente}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_fournisseur_patente' className={_fournisseur_patente ? 'active' : ''}>_fournisseur_patente</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _fournisseur_IF"
                                                                id="_fournisseur_IF"
                                                                type="text"
                                                                name="_fournisseur_IF"
                                                                value={_fournisseur_IF}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_fournisseur_IF' className={_fournisseur_IF ? 'active' : ''}>_fournisseur_IF</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _fournisseur_RC"
                                                                id="_fournisseur_RC"
                                                                type="text"
                                                                name="_fournisseur_RC"
                                                                value={_fournisseur_RC}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_fournisseur_RC' className={_fournisseur_RC ? 'active' : ''}>_fournisseur_RC</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _fournisseur_ICE"
                                                                id="_fournisseur_ICE"
                                                                type="text"
                                                                name="_fournisseur_ICE"
                                                                value={_fournisseur_ICE}
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_fournisseur_ICE' className={_fournisseur_ICE ? 'active' : ''}>_fournisseur_ICE</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6"></div>
                                                        <div className="input-field col s6">
                                                            <button
                                                                className="pull-right"
                                                                type="submit"
                                                                name='btn_login'
                                                                onClick={this.handleSubmitFournisseur}
                                                            >
                                                                <span>
                                                                    <span>
                                                                        <span data-attr-span={_fournisseurToEdit ? 'Update.' : 'Submit.'}>
                                                                            {_fournisseurToEdit ? 'Update' : 'Submit'}.
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

                            <div className="_vehicules_modal modal fade" id="_vehicule_modal" tabIndex="-1" role="dialog" aria-labelledby="_vehicule_modalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <ul className="progressbar">
                                                <li className="general active"><span className="item item-0"> Information general. </span></li>
                                                <li className="assurance"><span className="item item-1"> Assurance. </span></li>
                                                <li className="cartegrise"><span className="item item-2"> Carte grise. </span></li>
                                                <li className="vignette"><span className="item item-3"> Vignette. </span></li>
                                                <li className="carteautorisation"><span className="item item-4"> Final. </span></li>
                                            </ul>
                                            <a href="# " title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                            <div className="mail_form card">
                                                <div id="general" className="fieldset first-of-type general">
                                                    <div className="row">
                                                        <div className="input-field col s6 _autocomplete">
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
                                                        <div className="input-field col s6 _autocomplete">
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
                                                        <div className="input-field col s6 _autocomplete">
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
                                                        <div className="input-field col s6 _autocomplete">
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
                                                                onChange={this.handleChange}
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
                                                                onChange={this.handleChange}
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
                                                                onChange={this.handleChange}
                                                            />
                                                            <label htmlFor='_vehicule_kmparvidange' className={_vehicule_kmparvidange ? 'active' : ''}>Km par vidange</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6 _autocomplete">
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
                                                                onChange={(event) => this.handleChangeNested('_vehicule_categorie', '_vehicule_categorie_nombrepassagers', event.target.value)}
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
                                                                onChange={(event) => this.handleChangeNested('_vehicule_categorie', '_vehicule_categorie_bagage', event.target.value)}
                                                            />
                                                            <label htmlFor='_vehicule_categorie_bagage' className={_vehicule_categorie._vehicule_categorie_bagage ? 'active' : ''}>Bagage (litres)</label>
                                                            <div className="form-group-line"></div>
                                                        </div>
                                                        <div className="input-field col s6 _autocomplete">
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
                                                                onChange={(event) => this.handleChangeNested('_vehicule_consommation', '_vehicule_consommation_ville', event.target.value)}
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
                                                                onChange={(event) => this.handleChangeNested('_vehicule_consommation', '_vehicule_consommation_route', event.target.value)}
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
                                                                onChange={(event) => this.handleChangeNested('_vehicule_consommation', '_vehicule_consommation_mixte', event.target.value)}
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
                                                <div id="assurance" className="fieldset second-of-type assurance">
                                                    <div className="row">
                                                        <div className="input-field col s6 _autocomplete">
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
                                                <div id="cartegrise" className="fieldset third-of-type cartegrise">
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
                                                <div id="vignette" className="fieldset fourth-of-type vignette">
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input
                                                                className="validate form-group-input _vehicule_vignette_montant"
                                                                id="_vehicule_vignette_montant"
                                                                type="text"
                                                                name="_vehicule_vignette_montant"
                                                                value={_vehicule_vignette._vehicule_vignette_montant}
                                                                onChange={(event) => this.handleChangeNested('_vehicule_vignette', '_vehicule_vignette_montant', event.target.value)}
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
                                                                onChange={(event) => this.handleChangeNested('_vehicule_vignette', '_vehicule_vignette_penalite', event.target.value)}
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
                                                                onChange={(event) => this.handleChangeNested('_vehicule_vignette', '_vehicule_vignette_tsava', event.target.value)}
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
                                                <div id="carteautorisation" className="fieldset last-of-type carteautorisation certificatinstallation extincteur">
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

    _agences: state.home._agences,
    _bons: state.home._bons,
    _clients: state.home._clients,
    _deviss: state.home._deviss,
    _employes: state.home._employes,
    _factures: state.home._factures,
    _fournisseurs: state.home._fournisseurs,
    _passagers: state.home._passagers,
    _permissions: state.home._permissions,
    _postes: state.home._postes,
    _produits: state.home._produits,
    _reservations: state.home._reservations,
    _revueDePerformances: state.home._revueDePerformances,
    _societes: state.home._societes,
    _stocks: state.home._stocks,
    _vehicules: state.home._vehicules,
    _voyages: state.home._voyages,

    _agenceToEdit: state.home._agenceToEdit,
    _bonToEdit: state.home._bonToEdit,
    _clientToEdit: state.home._clientToEdit,
    _devisToEdit: state.home._devisToEdit,
    _employeToEdit: state.home._employeToEdit,
    _factureToEdit: state.home._factureToEdit,
    _fournisseurToEdit: state.home._fournisseurToEdit,
    _passagerToEdit: state.home._passagerToEdit,
    _permissionToEdit: state.home._permissionToEdit,
    _posteToEdit: state.home._posteToEdit,
    _produitToEdit: state.home._produitToEdit,
    _reservationToEdit: state.home._reservationToEdit,
    _revueDePerformanceToEdit: state.home._revueDePerformanceToEdit,
    _societeToEdit: state.home._societeToEdit,
    _stockToEdit: state.home._stockToEdit,
    _vehiculeToEdit: state.home._vehiculeToEdit,
    _voyageToEdit: state.home._voyageToEdit
});

const mapDispatchToProps = dispatch => ({
    setEditUser: user => dispatch({ type: 'SET_EDIT_USER', user }),

    onSubmitAgence: data => dispatch({ type: 'SUBMIT_AGENCE', data }),
    onEditAgence: data => dispatch({ type: 'EDIT_AGENCE', data }),
    onLoadAgence: data => dispatch({ type: 'AGENCE_PAGE_LOADED', data }),
    onDeleteAgence: id => dispatch({ type: 'DELETE_AGENCE', id }),
    setEditAgence: _agence => dispatch({ type: 'SET_EDIT_AGENCE', _agence }),

    onSubmitBon: data => dispatch({ type: 'SUBMIT_BON', data }),
    onEditBon: data => dispatch({ type: 'EDIT_BON', data }),
    onLoadBon: data => dispatch({ type: 'BON_PAGE_LOADED', data }),
    onDeleteBon: id => dispatch({ type: 'DELETE_BON', id }),
    setEditBon: _bon => dispatch({ type: 'SET_EDIT_BON', _bon }),

    onSubmitClient: data => dispatch({ type: 'SUBMIT_CLIENT', data }),
    onEditClient: data => dispatch({ type: 'EDIT_CLIENT', data }),
    onLoadClient: data => dispatch({ type: 'CLIENT_PAGE_LOADED', data }),
    onDeleteClient: id => dispatch({ type: 'DELETE_CLIENT', id }),
    setEditClient: _client => dispatch({ type: 'SET_EDIT_CLIENT', _client }),

    onSubmitDevis: data => dispatch({ type: 'SUBMIT_DEVIS', data }),
    onEditDevis: data => dispatch({ type: 'EDIT_DEVIS', data }),
    onLoadDevis: data => dispatch({ type: 'DEVIS_PAGE_LOADED', data }),
    onDeleteDevis: id => dispatch({ type: 'DELETE_DEVIS', id }),
    setEditDevis: _devis => dispatch({ type: 'SET_EDIT_DEVIS', _devis }),

    onSubmitEmploye: data => dispatch({ type: 'SUBMIT_EMPLOYE', data }),
    onEditEmploye: data => dispatch({ type: 'EDIT_EMPLOYE', data }),
    onLoadEmploye: data => dispatch({ type: 'EMPLOYE_PAGE_LOADED', data }),
    onDeleteEmploye: id => dispatch({ type: 'DELETE_EMPLOYE', id }),
    setEditEmploye: _employe => dispatch({ type: 'SET_EDIT_EMPLOYE', _employe }),

    onSubmitFacture: data => dispatch({ type: 'SUBMIT_FACTURE', data }),
    onEditFacture: data => dispatch({ type: 'EDIT_FACTURE', data }),
    onLoadFacture: data => dispatch({ type: 'FACTURE_PAGE_LOADED', data }),
    onDeleteFacture: id => dispatch({ type: 'DELETE_FACTURE', id }),
    setEditFacture: _facture => dispatch({ type: 'SET_EDIT_FACTURE', _facture }),

    onSubmitFournisseur: data => dispatch({ type: 'SUBMIT_FOURNISSEUR', data }),
    onEditFournisseur: data => dispatch({ type: 'EDIT_FOURNISSEUR', data }),
    onLoadFournisseur: data => dispatch({ type: 'FOURNISSEUR_PAGE_LOADED', data }),
    onDeleteFournisseur: id => dispatch({ type: 'DELETE_FOURNISSEUR', id }),
    setEditFournisseur: _fournisseur => dispatch({ type: 'SET_EDIT_FOURNISSEUR', _fournisseur }),

    onSubmitPassager: data => dispatch({ type: 'SUBMIT_PASSAGER', data }),
    onEditPassager: data => dispatch({ type: 'EDIT_PASSAGER', data }),
    onLoadPassager: data => dispatch({ type: 'PASSAGER_PAGE_LOADED', data }),
    onDeletePassager: id => dispatch({ type: 'DELETE_PASSAGER', id }),
    setEditPassager: _passager => dispatch({ type: 'SET_EDIT_PASSAGER', _passager }),

    onSubmitPermission: data => dispatch({ type: 'SUBMIT_PERMISSION', data }),
    onEditPermission: data => dispatch({ type: 'EDIT_PERMISSION', data }),
    onLoadPermission: data => dispatch({ type: 'PERMISSION_PAGE_LOADED', data }),
    onDeletePermission: id => dispatch({ type: 'DELETE_PERMISSION', id }),
    setEditPermission: _permission => dispatch({ type: 'SET_EDIT_PERMISSION', _permission }),

    onSubmitPoste: data => dispatch({ type: 'SUBMIT_POSTE', data }),
    onEditPoste: data => dispatch({ type: 'EDIT_POSTE', data }),
    onLoadPoste: data => dispatch({ type: 'POSTE_PAGE_LOADED', data }),
    onDeletePoste: id => dispatch({ type: 'DELETE_POSTE', id }),
    setEditPoste: _poste => dispatch({ type: 'SET_EDIT_POSTE', _poste }),

    onSubmitProduit: data => dispatch({ type: 'SUBMIT_PRODUIT', data }),
    onEditProduit: data => dispatch({ type: 'EDIT_PRODUIT', data }),
    onLoadProduit: data => dispatch({ type: 'PRODUIT_PAGE_LOADED', data }),
    onDeleteProduit: id => dispatch({ type: 'DELETE_PRODUIT', id }),
    setEditProduit: _produit => dispatch({ type: 'SET_EDIT_PRODUIT', _produit }),

    onSubmitReservation: data => dispatch({ type: 'SUBMIT_RESERVATION', data }),
    onEditReservation: data => dispatch({ type: 'EDIT_RESERVATION', data }),
    onLoadReservation: data => dispatch({ type: 'RESERVATION_PAGE_LOADED', data }),
    onDeleteReservation: id => dispatch({ type: 'DELETE_RESERVATION', id }),
    setEditReservation: _reservation => dispatch({ type: 'SET_EDIT_RESERVATION', _reservation }),

    onSubmitRevueDePerformance: data => dispatch({ type: 'SUBMIT_REVUEDEPERFORMANCE', data }),
    onEditRevueDePerformance: data => dispatch({ type: 'EDIT_REVUEDEPERFORMANCE', data }),
    onLoadRevueDePerformance: data => dispatch({ type: 'REVUEDEPERFORMANCE_PAGE_LOADED', data }),
    onDeleteRevueDePerformance: id => dispatch({ type: 'DELETE_REVUEDEPERFORMANCE', id }),
    setEditRevueDePerformance: _revueDePerformance => dispatch({ type: 'SET_EDIT_REVUEDEPERFORMANCE', _revueDePerformance }),

    onSubmitSociete: data => dispatch({ type: 'SUBMIT_SOCIETE', data }),
    onEditSociete: data => dispatch({ type: 'EDIT_SOCIETE', data }),
    onLoadSociete: data => dispatch({ type: 'SOCIETE_PAGE_LOADED', data }),
    onDeleteSociete: id => dispatch({ type: 'DELETE_SOCIETE', id }),
    setEditSociete: _societe => dispatch({ type: 'SET_EDIT_SOCIETE', _societe }),

    onSubmitStock: data => dispatch({ type: 'SUBMIT_STOCK', data }),
    onEditStock: data => dispatch({ type: 'EDIT_STOCK', data }),
    onLoadStock: data => dispatch({ type: 'STOCK_PAGE_LOADED', data }),
    onDeleteStock: id => dispatch({ type: 'DELETE_STOCK', id }),
    setEditStock: _stock => dispatch({ type: 'SET_EDIT_STOCK', _stock }),

    onSubmitVehicule: data => dispatch({ type: 'SUBMIT_VEHICULE', data }),
    onEditVehicule: data => dispatch({ type: 'EDIT_VEHICULE', data }),
    onLoadVehicule: data => dispatch({ type: 'VEHICULE_PAGE_LOADED', data }),
    onDeleteVehicule: id => dispatch({ type: 'DELETE_VEHICULE', id }),
    setEditVehicule: _vehicule => dispatch({ type: 'SET_EDIT_VEHICULE', _vehicule }),

    onSubmitVoyage: data => dispatch({ type: 'SUBMIT_VOYAGE', data }),
    onEditVoyage: data => dispatch({ type: 'EDIT_VOYAGE', data }),
    onLoadVoyage: data => dispatch({ type: 'VOYAGE_PAGE_LOADED', data }),
    onDeleteVoyage: id => dispatch({ type: 'DELETE_VOYAGE', id }),
    setEditVoyage: _voyage => dispatch({ type: 'SET_EDIT_VOYAGE', _voyage })
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);