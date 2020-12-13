const mongoose = require('mongoose');
const { Schema } = mongoose;
const Employe = new Schema({
  _employe_prenom: {
    type: String
  },
  _employe_nom: {
    type: String
  },
  _employe_telephone: {
    type: String
  },
  _employe_datenaissance: {
    type: Date
  },
  _employe_CNIE: {
    type: String
  },
  _employe_situationfamille: {
    type: String
  },
  _employe_nombreenfants: {
    type: Number
  },
  _employe_adresse: {
    type: String
  },
  _employe_CNSS: {
    _employe_CNSS_dateimmatriculation: {
      type: Date
    },
    _employe_CNSS_numeroimmatriculation: {
      type: String
    },
    _employe_CNSS_montant: {
      type: Number
    }
  },
  _employe_permis: {
    _employe_permis_numero: {
      type: String
    },
    _employe_permis_categorie: {
      type: String
    },
    _employe_permis_datedelivrance: {
      type: Date
    },
    _employe_permis_datefinvalidite: {
      type: Date
    },
    _employe_permis_image1: {
      type: String
    },
    _employe_permis_image2: {
      type: String
    }
  },
  _employe_datembauche: {
    type: Date
  },
  _employe_image: {
    type: String
  },
  Poste: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Poste'
  },
  RevueDePerformance: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'RevueDePerformance'
  }]
}, { timestamps: true });

mongoose.model('Employe', Employe);