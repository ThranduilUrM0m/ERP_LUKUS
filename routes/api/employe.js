const mongoose = require('mongoose');
const router = require('express').Router();
const Employe = mongoose.model('Employe');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._employe_prenom) {
    return res.status(422).json({
      errors: {
        _employe_prenom: 'is required',
      },
    });
  }

  if(!body._employe_nom) {
    return res.status(422).json({
      errors: {
        _employe_nom: 'is required',
      },
    });
  }

  if(!body._employe_telephone) {
    return res.status(422).json({
      errors: {
        _employe_telephone: 'is required',
      },
    });
  }

  if(!body._employe_datenaissance) {
    return res.status(422).json({
      errors: {
        _employe_datenaissance: 'is required',
      },
    });
  }

  if(!body._employe_CNIE) {
    return res.status(422).json({
      errors: {
        _employe_CNIE: 'is required',
      },
    });
  }

  if(!body._employe_situationfamille) {
    return res.status(422).json({
      errors: {
        _employe_situationfamille: 'is required',
      },
    });
  }

  if(!body._employe_nombreenfants) {
    return res.status(422).json({
      errors: {
        _employe_nombreenfants: 'is required',
      },
    });
  }

  if(!body._employe_adresse) {
    return res.status(422).json({
      errors: {
        _employe_adresse: 'is required',
      },
    });
  }

  if(!body._employe_CNSS) {
    return res.status(422).json({
      errors: {
        _employe_CNSS: 'is required',
      },
    });
  }

  if(!body._employe_permis) {
    return res.status(422).json({
      errors: {
        _employe_permis: 'is required',
      },
    });
  }

  if(!body._employe_datembauche) {
    return res.status(422).json({
      errors: {
        _employe_datembauche: 'is required',
      },
    });
  }

  if(!body._employe_image) {
    return res.status(422).json({
      errors: {
        _employe_image: 'is required',
      },
    });
  }

  if(!body.Poste) {
    return res.status(422).json({
      errors: {
        Poste: 'is required',
      },
    });
  }

  if(!body.RevueDePerformance) {
    return res.status(422).json({
      errors: {
        RevueDePerformance: 'is required',
      },
    });
  }

  const finalEmploye = new Employe(body);
  return finalEmploye.save()
    .then(() => {
      res.json({ employe: finalEmploye.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Employe.find()
    .sort({ createdAt: 'descending' })
    .then((employes) => res.json({ employes: employes.map(employe => employe.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Employe.findById(id, (err, employe) => {
    if(err) {
      return res.sendStatus(404);
    } else if(employe) {
      req.employe = employe;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    employe: req.employe.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._employe_prenom !== 'undefined') {
    req.employe._employe_prenom = body._employe_prenom;
  }

  if(typeof body._employe_nom !== 'undefined') {
    req.employe._employe_nom = body._employe_nom;
  }

  if(typeof body._employe_telephone !== 'undefined') {
    req.employe._employe_telephone = body._employe_telephone;
  }

  if(typeof body._employe_datenaissance !== 'undefined') {
    req.employe._employe_datenaissance = body._employe_datenaissance;
  }

  if(typeof body._employe_CNIE !== 'undefined') {
    req.employe._employe_CNIE = body._employe_CNIE;
  }

  if(typeof body._employe_situationfamille !== 'undefined') {
    req.employe._employe_situationfamille = body._employe_situationfamille;
  }

  if(typeof body._employe_nombreenfants !== 'undefined') {
    req.employe._employe_nombreenfants = body._employe_nombreenfants;
  }

  if(typeof body._employe_adresse !== 'undefined') {
    req.employe._employe_adresse = body._employe_adresse;
  }

  if(typeof body._employe_CNSS !== 'undefined') {
    req.employe._employe_CNSS = body._employe_CNSS;
  }

  if(typeof body._employe_permis !== 'undefined') {
    req.employe._employe_permis = body._employe_permis;
  }

  if(typeof body._employe_datembauche !== 'undefined') {
    req.employe._employe_datembauche = body._employe_datembauche;
  }

  if(typeof body._employe_image !== 'undefined') {
    req.employe._employe_image = body._employe_image;
  }

  if(typeof body.Poste !== 'undefined') {
    req.employe.Poste = body.Poste;
  }

  if(typeof body.RevueDePerformance !== 'undefined') {
    req.employe.RevueDePerformance = body.RevueDePerformance;
  }
  
  return req.employe.save()
    .then(() => res.json({ employe: req.employe.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Employe.findByIdAndRemove(req.employe._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;