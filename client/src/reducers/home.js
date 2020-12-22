import {
    USER_PAGE_LOADED,
    SUBMIT_USER,
    DELETE_USER,
    SET_EDIT_USER,
    EDIT_USER,

    AGENCE_PAGE_LOADED,
    SUBMIT_AGENCE,
    DELETE_AGENCE,
    SET_EDIT_AGENCE,
    EDIT_AGENCE,

    BON_PAGE_LOADED,
    SUBMIT_BON,
    DELETE_BON,
    SET_EDIT_BON,
    EDIT_BON,

    CLIENT_PAGE_LOADED,
    SUBMIT_CLIENT,
    DELETE_CLIENT,
    SET_EDIT_CLIENT,
    EDIT_CLIENT,

    DEVIS_PAGE_LOADED,
    SUBMIT_DEVIS,
    DELETE_DEVIS,
    SET_EDIT_DEVIS,
    EDIT_DEVIS,

    EMPLOYE_PAGE_LOADED,
    SUBMIT_EMPLOYE,
    DELETE_EMPLOYE,
    SET_EDIT_EMPLOYE,
    EDIT_EMPLOYE,

    FACTURE_PAGE_LOADED,
    SUBMIT_FACTURE,
    DELETE_FACTURE,
    SET_EDIT_FACTURE,
    EDIT_FACTURE,

    FOURNISSEUR_PAGE_LOADED,
    SUBMIT_FOURNISSEUR,
    DELETE_FOURNISSEUR,
    SET_EDIT_FOURNISSEUR,
    EDIT_FOURNISSEUR,

    PASSAGER_PAGE_LOADED,
    SUBMIT_PASSAGER,
    DELETE_PASSAGER,
    SET_EDIT_PASSAGER,
    EDIT_PASSAGER,

    PERMISSION_PAGE_LOADED,
    SUBMIT_PERMISSION,
    DELETE_PERMISSION,
    SET_EDIT_PERMISSION,
    EDIT_PERMISSION,

    POSTE_PAGE_LOADED,
    SUBMIT_POSTE,
    DELETE_POSTE,
    SET_EDIT_POSTE,
    EDIT_POSTE,

    PRODUIT_PAGE_LOADED,
    SUBMIT_PRODUIT,
    DELETE_PRODUIT,
    SET_EDIT_PRODUIT,
    EDIT_PRODUIT,

    RESERVATION_PAGE_LOADED,
    SUBMIT_RESERVATION,
    DELETE_RESERVATION,
    SET_EDIT_RESERVATION,
    EDIT_RESERVATION,

    REVUEDEPERFORMANCE_PAGE_LOADED,
    SUBMIT_REVUEDEPERFORMANCE,
    DELETE_REVUEDEPERFORMANCE,
    SET_EDIT_REVUEDEPERFORMANCE,
    EDIT_REVUEDEPERFORMANCE,

    SOCIETE_PAGE_LOADED,
    SUBMIT_SOCIETE,
    DELETE_SOCIETE,
    SET_EDIT_SOCIETE,
    EDIT_SOCIETE,

    STOCK_PAGE_LOADED,
    SUBMIT_STOCK,
    DELETE_STOCK,
    SET_EDIT_STOCK,
    EDIT_STOCK,

    VEHICULE_PAGE_LOADED,
    SUBMIT_VEHICULE,
    DELETE_VEHICULE,
    SET_EDIT_VEHICULE,
    EDIT_VEHICULE,

    VOYAGE_PAGE_LOADED,
    SUBMIT_VOYAGE,
    DELETE_VOYAGE,
    SET_EDIT_VOYAGE,
    EDIT_VOYAGE
} from '../actions/types';

const initialState = {
    user: {},
    users: [],
    _agences: [],
    _bons: [],
    _clients: [],
    _deviss: [],
    _employes: [],
    _factures: [],
    _fournisseurs: [],
    _passagers: [],
    _permissions: [],
    _postes: [],
    _produits: [],
    _reservations: [],
    _revueDePerformances: [],
    _societes: [],
    _stocks: [],
    _vehicules: [],
    _voyages: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        //USER
        case USER_PAGE_LOADED:
            return {
                user: action.data.user,
            };
        case SUBMIT_USER:
            return {
                ...state,
                users: ([action.data.user]).concat(state.user),
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user._id !== action.id),
            };
        case SET_EDIT_USER:
            return {
                ...state,
                userToEdit: action.user,
            };
        case EDIT_USER:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user._id === action.data.user._id) {
                        return {
                            ...action.data.user,
                        }
                    }
                    return user;
                }),
                userToEdit: undefined,
            };

        //AGENCE
        case AGENCE_PAGE_LOADED:
            return {
                ...state,
                _agences: action.data._agences,
            };
        case SUBMIT_AGENCE:
            return {
                ...state,
                _agences: ([action.data._agence]).concat(state._agences),
            };
        case DELETE_AGENCE:
            return {
                ...state,
                _agences: state._agences.filter((_agence) => _agence._id !== action.id),
            };
        case SET_EDIT_AGENCE:
            return {
                ...state,
                _agenceToEdit: action._agence,
            };
        case EDIT_AGENCE:
            return {
                ...state,
                _agences: state._agences.map((_agence) => {
                    if (_agence._id === action.data._agence._id) {
                        return {
                            ...action.data._agence,
                        }
                    }
                    return _agence;
                }),
                _agenceToEdit: undefined,
            };

        //BON
        case BON_PAGE_LOADED:
            return {
                ...state,
                _bons: action.data._bons,
            };
        case SUBMIT_BON:
            return {
                ...state,
                _bons: ([action.data._bon]).concat(state._bons),
            };
        case DELETE_BON:
            return {
                ...state,
                _bons: state._bons.filter((_bon) => _bon._id !== action.id),
            };
        case SET_EDIT_BON:
            return {
                ...state,
                _bonToEdit: action._bon,
            };
        case EDIT_BON:
            return {
                ...state,
                _bons: state._bons.map((_bon) => {
                    if (_bon._id === action.data._bon._id) {
                        return {
                            ...action.data._bon,
                        }
                    }
                    return _bon;
                }),
                _bonToEdit: undefined,
            };

        //CLIENT
        case CLIENT_PAGE_LOADED:
            return {
                ...state,
                _clients: action.data._clients,
            };
        case SUBMIT_CLIENT:
            return {
                ...state,
                _clients: ([action.data._client]).concat(state._clients),
            };
        case DELETE_CLIENT:
            return {
                ...state,
                _clients: state._clients.filter((_client) => _client._id !== action.id),
            };
        case SET_EDIT_CLIENT:
            return {
                ...state,
                _clientToEdit: action._client,
            };
        case EDIT_CLIENT:
            return {
                ...state,
                _clients: state._clients.map((_client) => {
                    if (_client._id === action.data._client._id) {
                        return {
                            ...action.data._client,
                        }
                    }
                    return _client;
                }),
                _clientToEdit: undefined,
            };

        //DEVIS
        case DEVIS_PAGE_LOADED:
            return {
                ...state,
                _deviss: action.data._deviss,
            };
        case SUBMIT_DEVIS:
            return {
                ...state,
                _deviss: ([action.data._devis]).concat(state._deviss),
            };
        case DELETE_DEVIS:
            return {
                ...state,
                _deviss: state._deviss.filter((_devis) => _devis._id !== action.id),
            };
        case SET_EDIT_DEVIS:
            return {
                ...state,
                _devisToEdit: action._devis,
            };
        case EDIT_DEVIS:
            return {
                ...state,
                _deviss: state._deviss.map((_devis) => {
                    if (_devis._id === action.data._devis._id) {
                        return {
                            ...action.data._devis,
                        }
                    }
                    return _devis;
                }),
                _devisToEdit: undefined,
            };

        //EMPLOYE
        case EMPLOYE_PAGE_LOADED:
            return {
                ...state,
                _employes: action.data._employes,
            };
        case SUBMIT_EMPLOYE:
            return {
                ...state,
                _employes: ([action.data._employe]).concat(state._employes),
            };
        case DELETE_EMPLOYE:
            return {
                ...state,
                _employes: state._employes.filter((_employe) => _employe._id !== action.id),
            };
        case SET_EDIT_EMPLOYE:
            return {
                ...state,
                _employeToEdit: action._employe,
            };
        case EDIT_EMPLOYE:
            return {
                ...state,
                _employes: state._employes.map((_employe) => {
                    if (_employe._id === action.data._employe._id) {
                        return {
                            ...action.data._employe,
                        }
                    }
                    return _employe;
                }),
                _employeToEdit: undefined,
            };

        //FACTURE
        case FACTURE_PAGE_LOADED:
            return {
                ...state,
                _factures: action.data._factures,
            };
        case SUBMIT_FACTURE:
            return {
                ...state,
                _factures: ([action.data._facture]).concat(state._factures),
            };
        case DELETE_FACTURE:
            return {
                ...state,
                _factures: state._factures.filter((_facture) => _facture._id !== action.id),
            };
        case SET_EDIT_FACTURE:
            return {
                ...state,
                _factureToEdit: action._facture,
            };
        case EDIT_FACTURE:
            return {
                ...state,
                _factures: state._factures.map((_facture) => {
                    if (_facture._id === action.data._facture._id) {
                        return {
                            ...action.data._facture,
                        }
                    }
                    return _facture;
                }),
                _factureToEdit: undefined,
            };

        //FOURNISSEUR
        case FOURNISSEUR_PAGE_LOADED:
            return {
                ...state,
                _fournisseurs: action.data._fournisseurs,
            };
        case SUBMIT_FOURNISSEUR:
            return {
                ...state,
                _fournisseurs: ([action.data._fournisseur]).concat(state._fournisseurs),
            };
        case DELETE_FOURNISSEUR:
            return {
                ...state,
                _fournisseurs: state._fournisseurs.filter((_fournisseur) => _fournisseur._id !== action.id),
            };
        case SET_EDIT_FOURNISSEUR:
            return {
                ...state,
                _fournisseurToEdit: action._fournisseur,
            };
        case EDIT_FOURNISSEUR:
            return {
                ...state,
                _fournisseurs: state._fournisseurs.map((_fournisseur) => {
                    if (_fournisseur._id === action.data._fournisseur._id) {
                        return {
                            ...action.data._fournisseur,
                        }
                    }
                    return _fournisseur;
                }),
                _fournisseurToEdit: undefined,
            };

        //PASSAGER
        case PASSAGER_PAGE_LOADED:
            return {
                ...state,
                _passagers: action.data._passagers,
            };
        case SUBMIT_PASSAGER:
            return {
                ...state,
                _passagers: ([action.data._passager]).concat(state._passagers),
            };
        case DELETE_PASSAGER:
            return {
                ...state,
                _passagers: state._passagers.filter((_passager) => _passager._id !== action.id),
            };
        case SET_EDIT_PASSAGER:
            return {
                ...state,
                _passagerToEdit: action._passager,
            };
        case EDIT_PASSAGER:
            return {
                ...state,
                _passagers: state._passagers.map((_passager) => {
                    if (_passager._id === action.data._passager._id) {
                        return {
                            ...action.data._passager,
                        }
                    }
                    return _passager;
                }),
                _passagerToEdit: undefined,
            };

        //PERMISSION
        case PERMISSION_PAGE_LOADED:
            return {
                ...state,
                _permissions: action.data._permissions,
            };
        case SUBMIT_PERMISSION:
            return {
                ...state,
                _permissions: ([action.data._permission]).concat(state._permissions),
            };
        case DELETE_PERMISSION:
            return {
                ...state,
                _permissions: state._permissions.filter((_permission) => _permission._id !== action.id),
            };
        case SET_EDIT_PERMISSION:
            return {
                ...state,
                _permissionToEdit: action._permission,
            };
        case EDIT_PERMISSION:
            return {
                ...state,
                _permissions: state._permissions.map((_permission) => {
                    if (_permission._id === action.data._permission._id) {
                        return {
                            ...action.data._permission,
                        }
                    }
                    return _permission;
                }),
                _permissionToEdit: undefined,
            };

        //POSTE
        case POSTE_PAGE_LOADED:
            return {
                ...state,
                _postes: action.data._postes,
            };
        case SUBMIT_POSTE:
            return {
                ...state,
                _postes: ([action.data._poste]).concat(state._postes),
            };
        case DELETE_POSTE:
            return {
                ...state,
                _postes: state._postes.filter((_poste) => _poste._id !== action.id),
            };
        case SET_EDIT_POSTE:
            return {
                ...state,
                _posteToEdit: action._poste,
            };
        case EDIT_POSTE:
            return {
                ...state,
                _postes: state._postes.map((_poste) => {
                    if (_poste._id === action.data._poste._id) {
                        return {
                            ...action.data._poste,
                        }
                    }
                    return _poste;
                }),
                _posteToEdit: undefined,
            };

        //PRODUIT
        case PRODUIT_PAGE_LOADED:
            return {
                ...state,
                _produits: action.data._produits,
            };
        case SUBMIT_PRODUIT:
            return {
                ...state,
                _produits: ([action.data._produit]).concat(state._produits),
            };
        case DELETE_PRODUIT:
            return {
                ...state,
                _produits: state._produits.filter((_produit) => _produit._id !== action.id),
            };
        case SET_EDIT_PRODUIT:
            return {
                ...state,
                _produitToEdit: action._produit,
            };
        case EDIT_PRODUIT:
            return {
                ...state,
                _produits: state._produits.map((_produit) => {
                    if (_produit._id === action.data._produit._id) {
                        return {
                            ...action.data._produit,
                        }
                    }
                    return _produit;
                }),
                _produitToEdit: undefined,
            };

        //RESERVATION
        case RESERVATION_PAGE_LOADED:
            return {
                ...state,
                _reservations: action.data._reservations,
            };
        case SUBMIT_RESERVATION:
            return {
                ...state,
                _reservations: ([action.data._reservation]).concat(state._reservations),
            };
        case DELETE_RESERVATION:
            return {
                ...state,
                _reservations: state._reservations.filter((_reservation) => _reservation._id !== action.id),
            };
        case SET_EDIT_RESERVATION:
            return {
                ...state,
                _reservationToEdit: action._reservation,
            };
        case EDIT_RESERVATION:
            return {
                ...state,
                _reservations: state._reservations.map((_reservation) => {
                    if (_reservation._id === action.data._reservation._id) {
                        return {
                            ...action.data._reservation,
                        }
                    }
                    return _reservation;
                }),
                _reservationToEdit: undefined,
            };

        //REVUEDEPERFORMANCE
        case REVUEDEPERFORMANCE_PAGE_LOADED:
            return {
                ...state,
                _revueDePerformances: action.data._revueDePerformances,
            };
        case SUBMIT_REVUEDEPERFORMANCE:
            return {
                ...state,
                _revueDePerformances: ([action.data._revueDePerformance]).concat(state._revueDePerformances),
            };
        case DELETE_REVUEDEPERFORMANCE:
            return {
                ...state,
                _revueDePerformances: state._revueDePerformances.filter((_revueDePerformance) => _revueDePerformance._id !== action.id),
            };
        case SET_EDIT_REVUEDEPERFORMANCE:
            return {
                ...state,
                _revueDePerformanceToEdit: action._revueDePerformance,
            };
        case EDIT_REVUEDEPERFORMANCE:
            return {
                ...state,
                _revueDePerformances: state._revueDePerformances.map((_revueDePerformance) => {
                    if (_revueDePerformance._id === action.data._revueDePerformance._id) {
                        return {
                            ...action.data._revueDePerformance,
                        }
                    }
                    return _revueDePerformance;
                }),
                _revueDePerformanceToEdit: undefined,
            };

        //SOCIETE
        case SOCIETE_PAGE_LOADED:
            return {
                ...state,
                _societes: action.data._societes,
            };
        case SUBMIT_SOCIETE:
            return {
                ...state,
                _societes: ([action.data._societe]).concat(state._societes),
            };
        case DELETE_SOCIETE:
            return {
                ...state,
                _societes: state._societes.filter((_societe) => _societe._id !== action.id),
            };
        case SET_EDIT_SOCIETE:
            return {
                ...state,
                _societeToEdit: action._societe,
            };
        case EDIT_SOCIETE:
            return {
                ...state,
                _societes: state._societes.map((_societe) => {
                    if (_societe._id === action.data._societe._id) {
                        return {
                            ...action.data._societe,
                        }
                    }
                    return _societe;
                }),
                _societeToEdit: undefined,
            };

        //STOCK
        case STOCK_PAGE_LOADED:
            return {
                ...state,
                _stocks: action.data._stocks,
            };
        case SUBMIT_STOCK:
            return {
                ...state,
                _stocks: ([action.data._stock]).concat(state._stocks),
            };
        case DELETE_STOCK:
            return {
                ...state,
                _stocks: state._stocks.filter((_stock) => _stock._id !== action.id),
            };
        case SET_EDIT_STOCK:
            return {
                ...state,
                _stockToEdit: action._stock,
            };
        case EDIT_STOCK:
            return {
                ...state,
                _stocks: state._stocks.map((_stock) => {
                    if (_stock._id === action.data._stock._id) {
                        return {
                            ...action.data._stock,
                        }
                    }
                    return _stock;
                }),
                _stockToEdit: undefined,
            };

        //VEHICULE
        case VEHICULE_PAGE_LOADED:
            return {
                ...state,
                _vehicules: action.data._vehicules,
            };
        case SUBMIT_VEHICULE:
            return {
                ...state,
                _vehicules: ([action.data._vehicule]).concat(state._vehicules),
            };
        case DELETE_VEHICULE:
            return {
                ...state,
                _vehicules: state._vehicules.filter((_vehicule) => _vehicule._id !== action.id),
            };
        case SET_EDIT_VEHICULE:
            return {
                ...state,
                _vehiculeToEdit: action._vehicule,
            };
        case EDIT_VEHICULE:
            return {
                ...state,
                _vehicules: state._vehicules.map((_vehicule) => {
                    if (_vehicule._id === action.data._vehicule._id) {
                        return {
                            ...action.data._vehicule,
                        }
                    }
                    return _vehicule;
                }),
                _vehiculeToEdit: undefined,
            };

        //VOYAGE
        case VOYAGE_PAGE_LOADED:
            return {
                ...state,
                _voyages: action.data._voyages,
            };
        case SUBMIT_VOYAGE:
            return {
                ...state,
                _voyages: ([action.data._voyage]).concat(state._voyages),
            };
        case DELETE_VOYAGE:
            return {
                ...state,
                _voyages: state._voyages.filter((_voyage) => _voyage._id !== action.id),
            };
        case SET_EDIT_VOYAGE:
            return {
                ...state,
                _voyageToEdit: action._voyage,
            };
        case EDIT_VOYAGE:
            return {
                ...state,
                _voyages: state._voyages.map((_voyage) => {
                    if (_voyage._id === action.data._voyage._id) {
                        return {
                            ...action.data._voyage,
                        }
                    }
                    return _voyage;
                }),
                _voyageToEdit: undefined,
            };

        default:
            return state;
    }
};