const mongoose = require('mongoose');
const router = require('express').Router();
const RevueDePerformance = mongoose.model('RevueDePerformance');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._revueDePerformance_date) {
    return res.status(422).json({
      errors: {
        _revueDePerformance_date: 'is required',
      },
    });
  }

  if(!body._revueDePerformance_resultat) {
    return res.status(422).json({
      errors: {
        _revueDePerformance_resultat: 'is required',
      },
    });
  }

  const finalRevueDePerformance = new RevueDePerformance(body);
  return finalRevueDePerformance.save()
    .then(() => {
      res.json({ revueDePerformance: finalRevueDePerformance.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return RevueDePerformance.find()
    .sort({ createdAt: 'descending' })
    .then((revueDePerformances) => res.json({ revueDePerformances: revueDePerformances.map(revueDePerformance => revueDePerformance.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return RevueDePerformance.findById(id, (err, revueDePerformance) => {
    if(err) {
      return res.sendStatus(404);
    } else if(revueDePerformance) {
      req.revueDePerformance = revueDePerformance;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    revueDePerformance: req.revueDePerformance.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._revueDePerformance_date !== 'undefined') {
    req.revueDePerformance._revueDePerformance_date = body._revueDePerformance_date;
  }

  if(typeof body._revueDePerformance_resultat !== 'undefined') {
    req.revueDePerformance._revueDePerformance_resultat = body._revueDePerformance_resultat;
  }
  
  return req.revueDePerformance.save()
    .then(() => res.json({ revueDePerformance: req.revueDePerformance.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return RevueDePerformance.findByIdAndRemove(req.revueDePerformance._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;