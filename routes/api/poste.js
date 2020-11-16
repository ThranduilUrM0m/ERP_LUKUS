const mongoose = require('mongoose');
const router = require('express').Router();
const Poste = mongoose.model('Poste');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._poste_titre) {
    return res.status(422).json({
      errors: {
        _poste_titre: 'is required',
      },
    });
  }

  if(!body._poste_salaireinitiale) {
    return res.status(422).json({
      errors: {
        _poste_salaireinitiale: 'is required',
      },
    });
  }

  const finalPoste = new Poste(body);
  return finalPoste.save()
    .then(() => {
      res.json({ poste: finalPoste.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Poste.find()
    .sort({ createdAt: 'descending' })
    .then((postes) => res.json({ postes: postes.map(poste => poste.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Poste.findById(id, (err, poste) => {
    if(err) {
      return res.sendStatus(404);
    } else if(poste) {
      req.poste = poste;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    poste: req.poste.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._poste_titre !== 'undefined') {
    req.poste._poste_titre = body._poste_titre;
  }

  if(typeof body._poste_salaireinitiale !== 'undefined') {
    req.poste._poste_salaireinitiale = body._poste_salaireinitiale;
  }

  return req.poste.save()
    .then(() => res.json({ poste: req.poste.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Poste.findByIdAndRemove(req.poste._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;