const mongoose = require('mongoose');
const router = require('express').Router();
const Societe = mongoose.model('Societe');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._societe_raison) {
    return res.status(422).json({
      errors: {
        _societe_raison: 'is required',
      },
    });
  }

  if(!body._societe_siege) {
    return res.status(422).json({
      errors: {
        _societe_siege: 'is required',
      },
    });
  }

  if(!body._societe_numeroTP) {
    return res.status(422).json({
      errors: {
        _societe_numeroTP: 'is required',
      },
    });
  }

  if(!body._societe_IF) {
    return res.status(422).json({
      errors: {
        _societe_IF: 'is required',
      },
    });
  }

  if(!body._societe_telephone) {
    return res.status(422).json({
      errors: {
        _societe_telephone: 'is required',
      },
    });
  }

  if(!body._societe_fax) {
    return res.status(422).json({
      errors: {
        _societe_fax: 'is required',
      },
    });
  }

  if(!body._societe_email) {
    return res.status(422).json({
      errors: {
        _societe_email: 'is required',
      },
    });
  }

  if(!body._societe_ICE) {
    return res.status(422).json({
      errors: {
        _societe_ICE: 'is required',
      },
    });
  }

  if(!body._societe_CNSS) {
    return res.status(422).json({
      errors: {
        _societe_CNSS: 'is required',
      },
    });
  }

  if(!body.Agence) {
    return res.status(422).json({
      errors: {
        Agencej: 'is required',
      },
    });
  }

  const finalSociete = new Societe(body);
  return finalSociete.save()
    .then(() => {
      res.json({ societe: finalSociete.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Societe.find()
    .sort({ createdAt: 'descending' })
    .then((societes) => res.json({ societes: societes.map(societe => societe.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Societe.findById(id, (err, societe) => {
    if(err) {
      return res.sendStatus(404);
    } else if(societe) {
      req.societe = societe;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    societe: req.societe.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._societe_raison !== 'undefined') {
    req.societe._societe_raison = body._societe_raison;
  }

  if(typeof body._societe_siege !== 'undefined') {
    req.societe._societe_siege = body._societe_siege;
  }

  if(typeof body._societe_numeroTP !== 'undefined') {
    req.societe._societe_numeroTP = body._societe_numeroTP;
  }

  if(typeof body._societe_IF !== 'undefined') {
    req.societe._societe_IF = body._societe_IF;
  }

  if(typeof body._societe_telephone !== 'undefined') {
    req.societe._societe_telephone = body._societe_telephone;
  }

  if(typeof body._societe_fax !== 'undefined') {
    req.societe._societe_fax = body._societe_fax;
  }

  if(typeof body._societe_email !== 'undefined') {
    req.societe._societe_email = body._societe_email;
  }

  if(typeof body._societe_ICE !== 'undefined') {
    req.societe._societe_ICE = body._societe_ICE;
  }

  if(typeof body._societe_CNSS !== 'undefined') {
    req.societe._societe_CNSS = body._societe_CNSS;
  }

  if(typeof body.Agence !== 'undefined') {
    req.societe.Agence = body.Agence;
  }
  
  return req.societe.save()
    .then(() => res.json({ societe: req.societe.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Societe.findByIdAndRemove(req.societe._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;