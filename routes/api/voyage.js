const mongoose = require('mongoose');
const router = require('express').Router();
const Voyage = mongoose.model('Voyage');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._voyage_datedepart) {
    return res.status(422).json({
      errors: {
        _voyage_datedepart: 'is required',
      },
    });
  }

  if(!body._voyage_datearrive) {
    return res.status(422).json({
      errors: {
        _voyage_datearrive: 'is required',
      },
    });
  }

  if(!body._voyage_lieudepart) {
    return res.status(422).json({
      errors: {
        _voyage_lieudepart: 'is required',
      },
    });
  }

  if(!body._voyage_lieuarrive) {
    return res.status(422).json({
      errors: {
        _voyage_lieuarrive: 'is required',
      },
    });
  }
  
  if(!body.Vehicule) {
    return res.status(422).json({
      errors: {
        Vehicule: 'is required',
      },
    });
  }

  const finalVoyage = new Voyage(body);
  return finalVoyage.save()
    .then(() => {
      res.json({ voyage: finalVoyage.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Voyage.find()
    .sort({ createdAt: 'descending' })
    .then((voyages) => res.json({ voyages: voyages.map(voyage => voyage.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Voyage.findById(id, (err, voyage) => {
    if(err) {
      return res.sendStatus(404);
    } else if(voyage) {
      req.voyage = voyage;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    voyage: req.voyage.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._voyage_datedepart !== 'undefined') {
    req.voyage._voyage_datedepart = body._voyage_datedepart;
  }

  if(typeof body._voyage_datearrive !== 'undefined') {
    req.voyage._voyage_datearrive = body._voyage_datearrive;
  }

  if(typeof body._voyage_lieudepart !== 'undefined') {
    req.voyage._voyage_lieudepart = body._voyage_lieudepart;
  }

  if(typeof body._voyage_lieuarrive !== 'undefined') {
    req.voyage._voyage_lieuarrive = body._voyage_lieuarrive;
  }

  if(typeof body.Vehicule !== 'undefined') {
    req.voyage.Vehicule = body.Vehicule;
  }
  
  return req.voyage.save()
    .then(() => res.json({ voyage: req.voyage.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Voyage.findByIdAndRemove(req.voyage._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;