const mongoose = require('mongoose');
const router = require('express').Router();
const Fournisseur = mongoose.model('Fournisseur');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._fournisseur_prenomcontact) {
    return res.status(422).json({
      errors: {
        _fournisseur_prenomcontact: 'is required',
      },
    });
  }

  if(!body._fournisseur_nomcontact) {
    return res.status(422).json({
      errors: {
        _fournisseur_nomcontact: 'is required',
      },
    });
  }

  if(!body._fournisseur_raison) {
    return res.status(422).json({
      errors: {
        _fournisseur_raison: 'is required',
      },
    });
  }

  if(!body._fournisseur_adresse) {
    return res.status(422).json({
      errors: {
        _fournisseur_adresse: 'is required',
      },
    });
  }

  if(!body._fournisseur_telephone) {
    return res.status(422).json({
      errors: {
        _fournisseur_telephone: 'is required',
      },
    });
  }

  if(!body._fournisseur_email) {
    return res.status(422).json({
      errors: {
        _fournisseur_email: 'is required',
      },
    });
  }

  if(!body._fournisseur_ville) {
    return res.status(422).json({
      errors: {
        _fournisseur_ville: 'is required',
      },
    });
  }

  if(!body._fournisseur_pays) {
    return res.status(422).json({
      errors: {
        _fournisseur_pays: 'is required',
      },
    });
  }

  if(!body._fournisseur_ICE) {
    return res.status(422).json({
      errors: {
        _fournisseur_ICE: 'is required',
      },
    });
  }

  if(!body._fournisseur_IF) {
    return res.status(422).json({
      errors: {
        _fournisseur_IF: 'is required',
      },
    });
  }

  if(!body._fournisseur_RC) {
    return res.status(422).json({
      errors: {
        _fournisseur_RC: 'is required',
      },
    });
  }

  if(!body._fournisseur_patente) {
    return res.status(422).json({
      errors: {
        _fournisseur_patente: 'is required',
      },
    });
  }

  const finalFournisseur = new Fournisseur(body);
  return finalFournisseur.save()
    .then(() => {
      res.json({ fournisseur: finalFournisseur.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Fournisseur.find()
    .sort({ createdAt: 'descending' })
    .then((fournisseurs) => res.json({ fournisseurs: fournisseurs.map(fournisseur => fournisseur.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Fournisseur.findById(id, (err, fournisseur) => {
    if(err) {
      return res.sendStatus(404);
    } else if(fournisseur) {
      req.fournisseur = fournisseur;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    fournisseur: req.fournisseur.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._fournisseur_prenomcontact !== 'undefined') {
    req.fournisseur._fournisseur_prenomcontact = body._fournisseur_prenomcontact;
  }

  if(typeof body._fournisseur_nomcontact !== 'undefined') {
    req.fournisseur._fournisseur_nomcontact = body._fournisseur_nomcontact;
  }

  if(typeof body._fournisseur_raison !== 'undefined') {
    req.fournisseur._fournisseur_raison = body._fournisseur_raison;
  }

  if(typeof body._fournisseur_adresse !== 'undefined') {
    req.fournisseur._fournisseur_adresse = body._fournisseur_adresse;
  }

  if(typeof body._fournisseur_telephone !== 'undefined') {
    req.fournisseur._fournisseur_telephone = body._fournisseur_telephone;
  }

  if(typeof body._fournisseur_email !== 'undefined') {
    req.fournisseur._fournisseur_email = body._fournisseur_email;
  }

  if(typeof body._fournisseur_ville !== 'undefined') {
    req.fournisseur._fournisseur_ville = body._fournisseur_ville;
  }

  if(typeof body._fournisseur_pays !== 'undefined') {
    req.fournisseur._fournisseur_pays = body._fournisseur_pays;
  }

  if(typeof body._fournisseur_ICE !== 'undefined') {
    req.fournisseur._fournisseur_ICE = body._fournisseur_ICE;
  }

  if(typeof body._fournisseur_IF !== 'undefined') {
    req.fournisseur._fournisseur_IF = body._fournisseur_IF;
  }

  if(typeof body._fournisseur_RC !== 'undefined') {
    req.fournisseur._fournisseur_RC = body._fournisseur_RC;
  }

  if(typeof body._fournisseur_patente !== 'undefined') {
    req.fournisseur._fournisseur_patente = body._fournisseur_patente;
  }
  
  return req.fournisseur.save()
    .then(() => res.json({ fournisseur: req.fournisseur.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Fournisseur.findByIdAndRemove(req.fournisseur._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;