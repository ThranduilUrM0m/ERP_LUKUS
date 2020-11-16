const mongoose = require('mongoose');
const router = require('express').Router();
const Vehicule = mongoose.model('Vehicule');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._vehicule_numerochassis) {
    return res.status(422).json({
      errors: {
        _vehicule_numerochassis: 'is required',
      },
    });
  }

  if(!body._vehicule_datefabrication) {
    return res.status(422).json({
      errors: {
        _vehicule_datefabrication: 'is required',
      },
    });
  }

  if(!body._vehicule_model) {
    return res.status(422).json({
      errors: {
        _vehicule_model: 'is required',
      },
    });
  }

  if(!body._vehicule_numeroregistration) {
    return res.status(422).json({
      errors: {
        _vehicule_numeroregistration: 'is required',
      },
    });
  }

  if(!body._vehicule_marque) {
    return res.status(422).json({
      errors: {
        _vehicule_marque: 'is required',
      },
    });
  }

  if(!body._vehicule_fabricant) {
    return res.status(422).json({
      errors: {
        _vehicule_fabricant: 'is required',
      },
    });
  }

  if(!body._vehicule_moteur) {
    return res.status(422).json({
      errors: {
        _vehicule_moteur: 'is required',
      },
    });
  }

  if(!body._vehicule_poidsavide) {
    return res.status(422).json({
      errors: {
        _vehicule_poidsavide: 'is required',
      },
    });
  }

  if(!body._vehicule_volumereservoir) {
    return res.status(422).json({
      errors: {
        _vehicule_volumereservoir: 'is required',
      },
    });
  }

  if(!body._vehicule_assurance) {
    return res.status(422).json({
      errors: {
        _vehicule_assurance: 'is required',
      },
    });
  }

  if(!body._vehicule_carteautorisation) {
    return res.status(422).json({
      errors: {
        _vehicule_carteautorisation: 'is required',
      },
    });
  }

  if(!body._vehicule_cartegrise) {
    return res.status(422).json({
      errors: {
        _vehicule_cartegrise: 'is required',
      },
    });
  }

  if(!body._vehicule_categorie) {
    return res.status(422).json({
      errors: {
        _vehicule_categoriej: 'is required',
      },
    });
  }

  if(!body._vehicule_certificatinstallation) {
    return res.status(422).json({
      errors: {
        _vehicule_certificatinstallation: 'is required',
      },
    });
  }

  if(!body._vehicule_consommation) {
    return res.status(422).json({
      errors: {
        _vehicule_consommation: 'is required',
      },
    });
  }

  if(!body._vehicule_extincteur) {
    return res.status(422).json({
      errors: {
        _vehicule_extincteur: 'is required',
      },
    });
  }

  if(!body._vehicule_recharge) {
    return res.status(422).json({
      errors: {
        _vehicule_recharge: 'is required',
      },
    });
  }

  if(!body._vehicule_kmparvidange) {
    return res.status(422).json({
      errors: {
        _vehicule_kmparvidange: 'is required',
      },
    });
  }

  if(!body._vehicule_vidange) {
    return res.status(422).json({
      errors: {
        _vehicule_vidange: 'is required',
      },
    });
  }

  if(!body._vehicule_vignette) {
    return res.status(422).json({
      errors: {
        _vehicule_vignette: 'is required',
      },
    });
  }

  if(!body._vehicule_visitetechnique) {
    return res.status(422).json({
      errors: {
        _vehicule_visitetechnique: 'is required',
      },
    });
  }

  const finalVehicule = new Vehicule(body);
  return finalVehicule.save()
    .then(() => {
      res.json({ vehicule: finalVehicule.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Vehicule.find()
    .sort({ createdAt: 'descending' })
    .then((vehicules) => res.json({ vehicules: vehicules.map(vehicule => vehicule.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Vehicule.findById(id, (err, vehicule) => {
    if(err) {
      return res.sendStatus(404);
    } else if(vehicule) {
      req.vehicule = vehicule;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    vehicule: req.vehicule.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._vehicule_numerochassis !== 'undefined') {
    req.vehicule._vehicule_numerochassis = body._vehicule_numerochassis;
  }

  if(typeof body._vehicule_datefabrication !== 'undefined') {
    req.vehicule._vehicule_datefabrication = body._vehicule_datefabrication;
  }

  if(typeof body._vehicule_model !== 'undefined') {
    req.vehicule._vehicule_model = body._vehicule_model;
  }

  if(typeof body._vehicule_numeroregistration !== 'undefined') {
    req.vehicule._vehicule_numeroregistration = body._vehicule_numeroregistration;
  }

  if(typeof body._vehicule_marque !== 'undefined') {
    req.vehicule._vehicule_marque = body._vehicule_marque;
  }

  if(typeof body._vehicule_fabricant !== 'undefined') {
    req.vehicule._vehicule_fabricant = body._vehicule_fabricant;
  }

  if(typeof body._vehicule_moteur !== 'undefined') {
    req.vehicule._vehicule_moteur = body._vehicule_moteur;
  }

  if(typeof body._vehicule_poidsavide !== 'undefined') {
    req.vehicule._vehicule_poidsavide = body._vehicule_poidsavide;
  }

  if(typeof body._vehicule_volumereservoir !== 'undefined') {
    req.vehicule._vehicule_volumereservoir = body._vehicule_volumereservoir;
  }

  if(typeof body._vehicule_assurance !== 'undefined') {
    req.vehicule._vehicule_assurance = body._vehicule_assurance;
  }

  if(typeof body._vehicule_carteautorisation !== 'undefined') {
    req.vehicule._vehicule_carteautorisation = body._vehicule_carteautorisation;
  }

  if(typeof body._vehicule_cartegrise !== 'undefined') {
    req.vehicule._vehicule_cartegrise = body._vehicule_cartegrise;
  }

  if(typeof body._vehicule_categorie !== 'undefined') {
    req.vehicule._vehicule_categorie = body._vehicule_categorie;
  }

  if(typeof body._vehicule_certificatinstallation !== 'undefined') {
    req.reservation._vehicule_certificatinstallation = body._vehicule_certificatinstallation;
  }

  if(typeof body._vehicule_consommation !== 'undefined') {
    req.reservation._vehicule_consommation = body._vehicule_consommation;
  }

  if(typeof body._vehicule_extincteur !== 'undefined') {
    req.reservation._vehicule_extincteur = body._vehicule_extincteur;
  }

  if(typeof body._vehicule_recharge !== 'undefined') {
    req.reservation._vehicule_recharge = body._vehicule_recharge;
  }

  if(typeof body._vehicule_kmparvidange !== 'undefined') {
    req.reservation._vehicule_kmparvidange = body._vehicule_kmparvidange;
  }

  if(typeof body._vehicule_vidange !== 'undefined') {
    req.reservation._vehicule_vidange = body._vehicule_vidange;
  }

  if(typeof body._vehicule_vignette !== 'undefined') {
    req.reservation._vehicule_vignette = body._vehicule_vignette;
  }

  if(typeof body._vehicule_visitetechnique !== 'undefined') {
    req.reservation._vehicule_visitetechnique = body._vehicule_visitetechnique;
  }
  
  return req.vehicule.save()
    .then(() => res.json({ vehicule: req.vehicule.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Vehicule.findByIdAndRemove(req.vehicule._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;