import { 
    USER_PAGE_LOADED, 
    SUBMIT_USER, 
    DELETE_USER, 
    SET_EDIT_USER, 
    EDIT_USER,

    VEHICULE_PAGE_LOADED, 
    SUBMIT_VEHICULE, 
    DELETE_VEHICULE, 
    SET_EDIT_VEHICULE, 
    EDIT_VEHICULE, 

    VOYAGE_PAGE_LOADED, 
    SUBMIT_VOYAGE, 
    DELETE_VOYAGE, 
    SET_EDIT_VOYAGE, 
    EDIT_VOYAGE, 

    RESERVATION_PAGE_LOADED, 
    SUBMIT_RESERVATION, 
    DELETE_RESERVATION, 
    SET_EDIT_RESERVATION, 
    EDIT_RESERVATION, 
} from '../actions/types';

const initialState = {
    user: {},
    users: [],
    _vehicules: [],
    _voyages: [],
    _reservations: [],
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

        default:
            return state;
    }
};