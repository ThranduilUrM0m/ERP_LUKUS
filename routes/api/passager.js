const mongoose = require('mongoose');
const router = require('express').Router();
const Passager = mongoose.model('Passager');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._passager_prenom) {
    return res.status(422).json({
      errors: {
        _passager_prenom: 'is required',
      },
    });
  }

  if(!body._passager_nom) {
    return res.status(422).json({
      errors: {
        _passager_nom: 'is required',
      },
    });
  }

  if(!body._passager_telephone) {
    return res.status(422).json({
      errors: {
        _passager_telephone: 'is required',
      },
    });
  }

  if(!body._passager_email) {
    return res.status(422).json({
      errors: {
        _passager_email: 'is required',
      },
    });
  }

  if(!body._passager_adresse) {
    return res.status(422).json({
      errors: {
        _passager_adresse: 'is required',
      },
    });
  }

  if(!body._passager_ville) {
    return res.status(422).json({
      errors: {
        _passager_ville: 'is required',
      },
    });
  }

  if(!body._passager_pays) {
    return res.status(422).json({
      errors: {
        _passager_pays: 'is required',
      },
    });
  }

  const finalPassager = new Passager(body);
  return finalPassager.save()
    .then(() => {
      res.json({ passager: finalPassager.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Passager.find()
    .sort({ createdAt: 'descending' })
    .then((passagers) => res.json({ passagers: passagers.map(passager => passager.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Passager.findById(id, (err, passager) => {
    if(err) {
      return res.sendStatus(404);
    } else if(passager) {
      req.passager = passager;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    passager: req.passager.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._passager_prenom !== 'undefined') {
    req.passager._passager_prenom = body._passager_prenom;
  }

  if(typeof body._passager_nom !== 'undefined') {
    req.passager._passager_nom = body._passager_nom;
  }

  if(typeof body._passager_telephone !== 'undefined') {
    req.passager._passager_telephone = body._passager_telephone;
  }

  if(typeof body._passager_email !== 'undefined') {
    req.passager._passager_email = body._passager_email;
  }

  if(typeof body._passager_adresse !== 'undefined') {
    req.passager._passager_adresse = body._passager_adresse;
  }

  if(typeof body._passager_ville !== 'undefined') {
    req.passager._passager_ville = body._passager_ville;
  }

  if(typeof body._passager_pays !== 'undefined') {
    req.passager._passager_pays = body._passager_pays;
  }
  
  return req.passager.save()
    .then(() => res.json({ passager: req.passager.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Passager.findByIdAndRemove(req.passager._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;