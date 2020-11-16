const mongoose = require('mongoose');
const router = require('express').Router();
const Agence = mongoose.model('Agence');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._agence_adresse) {
    return res.status(422).json({
      errors: {
        _agence_adresse: 'is required',
      },
    });
  }

  if(!body._agence_ville) {
    return res.status(422).json({
      errors: {
        _agence_ville: 'is required',
      },
    });
  }

  if(!body._agence_pays) {
    return res.status(422).json({
      errors: {
        _agence_pays: 'is required',
      },
    });
  }

  const finalAgence = new Agence(body);
  return finalAgence.save()
    .then(() => {
      res.json({ agence: finalAgence.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Agence.find()
    .sort({ createdAt: 'descending' })
    .then((agences) => res.json({ agences: agences.map(agence => agence.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Agence.findById(id, (err, agence) => {
    if(err) {
      return res.sendStatus(404);
    } else if(agence) {
      req.agence = agence;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    agence: req.agence.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._agence_adresse !== 'undefined') {
    req.agence._agence_adresse = body._agence_adresse;
  }

  if(typeof body._agence_ville !== 'undefined') {
    req.agence._agence_ville = body._agence_ville;
  }

  if(typeof body._agence_pays !== 'undefined') {
    req.agence._agence_pays = body._agence_pays;
  }
  
  return req.agence.save()
    .then(() => res.json({ agence: req.agence.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Agence.findByIdAndRemove(req.agence._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;