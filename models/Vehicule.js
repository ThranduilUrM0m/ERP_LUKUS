const mongoose = require('mongoose');
const { Schema } = mongoose;
const Vehicule = new Schema({
  _vehicule_numerochassis: {
    type: String
  },
  _vehicule_datefabrication: {
    type: Date
  },
  _vehicule_model: {
    type: String
  },
  _vehicule_numeroregistration: {
    type: String
  },
  _vehicule_marque: {
    type: String
  },
  _vehicule_fabricant: {
    type: String
  },
  _vehicule_moteur: {
    type: String
  },
  _vehicule_poidsavide: {
    type: Schema.Types.Decimal128
  },
  _vehicule_volumereservoir: {
    type: Schema.Types.Decimal128
  },
  _vehicule_image: {
    type: String
  },
  _vehicule_assurance: {
    _vehicule_assurance_entrepriseassurance: {
      type: String
    },
    _vehicule_assurance_datedebut: {
      type: Date
    },
    _vehicule_assurance_datefin: {
      type: Date
    },
    _vehicule_assurance_montant: {
      type: Schema.Types.Decimal128
    },
    _vehicule_assurance_image1: {
      type: String
    },
    _vehicule_assurance_image2: {
      type: String
    }
  },
  _vehicule_carteautorisation: {
    _vehicule_carteautorisation_dateetablie: {
      type: Date
    },
    _vehicule_carteautorisation_datefinvalidite: {
      type: Date
    },
    _vehicule_autorisation_image: {
      type: String
    }
  },
  _vehicule_cartegrise: {
    _vehicule_cartegrise_immatriculation: {
      type: String
    },
    _vehicule_cartegrise_immatriculationanterieur: {
      type: String
    },
    _vehicule_cartegrise_miseencriculation: {
      type: Date
    },
    _vehicule_cartegrise_miseencirculationmaroc: {
      type: Date
    },
    _vehicule_cartegrise_mutation: {
      type: String
    },
    _vehicule_cartegrise_debutdevalidite: {
      type: Date
    },
    _vehicule_cartegrise_image1: {
      type: String
    },
    _vehicule_cartegrise_image2: {
      type: String
    }
  },
  _vehicule_categorie: {
    _vehicule_categorie_nom: {
      type: String
    },
    _vehicule_categorie_nombrepassagers: {
      type: Number
    },
    _vehicule_categorie_bagage: {
      type: String
    },
    _vehicule_categorie_carrosserie: {
      type: String
    }
  },
  _vehicule_certificatinstallation: {
    _vehicule_certificatinstallation_datedebut: {
      type: Date
    },
    _vehicule_certificatinstallation_datefin: {
      type: Date
    },
    _vehicule_certificatinstallation_image: {
      type: String
    }
  },
  _vehicule_consommation: {
    _vehicule_consommation_ville: {
      type: Schema.Types.Decimal128
    },
    _vehicule_consommation_route: {
      type: Schema.Types.Decimal128
    },
    _vehicule_consommation_mixte: {
      type: Schema.Types.Decimal128
    }
  },
  _vehicule_extincteur: {
    _vehicule_extincteur_datedebut: {
      type: Date
    },
    _vehicule_extincteur_datefin: {
      type: Date
    }
  },
  _vehicule_recharge: [{
    _vehicule_recharge_date: {
      type: Date
    },
    _vehicule_recharge_litres: {
      type: Schema.Types.Decimal128
    },
    _vehicule_recharge_km: {
      type: Schema.Types.Decimal128
    },
    _vehicule_recharge_prixlitre: {
      type: Schema.Types.Decimal128
    },
    _vehicule_recharge_consommation: {
      type: Schema.Types.Decimal128
    }
  }],
  _vehicule_kmparvidange: {
    type: Schema.Types.Decimal128
  },
  _vehicule_vidange: [{
    _vehicule_vidange_km: {
      type: Schema.Types.Decimal128
    },
    _vehicule_vidange_date: {
      type: Date
    },
    _vehicule_vidange_type: {
      type: String
    }
  }],
  _vehicule_vignette: {
    _vehicule_vignette_montant: {
      type: Schema.Types.Decimal128
    },
    _vehicule_vignette_penalite: {
      type: Schema.Types.Decimal128
    },
    _vehicule_vignette_migration: {
      type: String
    },
    _vehicule_vignette_tsava: {
      type: String
    },
    _vehicule_vignette_datepaiement: {
      type: Date
    },
    _vehicule_vignette_image: {
      type: String
    }
  },
  _vehicule_visitetechnique: [{
    _vehicule_visitetechnique_datecontrole: {
      type: Date
    },
    _vehicule_visitetechnique_naturecontrole: {
      type: Date
    },
    _vehicule_visitetechnique_resultat: {
      type: String
    },
    _vehicule_visitetechnique_limitevalidite: {
      type: String
    },
    _vehicule_visitetechnique_numeroproces: {
      type: Number
    },
    _vehicule_visitetechnique_raisonsocialecontrolleur: {
      type: String
    },
    _vehicule_visitetechnique_kmreleve: {
      type: Schema.Types.Decimal128
    },
    _vehicule_visitetechnique_image: {
      type: String
    }
  }],
}, { timestamps: true });

mongoose.model('Vehicule', Vehicule);