const mongoose = require('mongoose');
const router = require('express').Router();
const Bon = mongoose.model('Bon');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._bon_numero) {
    return res.status(422).json({
      errors: {
        _bon_numero: 'is required',
      },
    });
  }

  if(!body._bon_date) {
    return res.status(422).json({
      errors: {
        _bon_date: 'is required',
      },
    });
  }

  if(!body._bon_type) {
    return res.status(422).json({
      errors: {
        _bon_type: 'is required',
      },
    });
  }

  if(!body._bon_produits) {
    return res.status(422).json({
      errors: {
        _bon_produits: 'is required',
      },
    });
  }

  if(!body.Facture) {
    return res.status(422).json({
      errors: {
        Facture: 'is required',
      },
    });
  }

  const finalBon = new Bon(body);
  return finalBon.save()
    .then(() => {
      res.json({ bon: finalBon.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Bon.find()
    .sort({ createdAt: 'descending' })
    .then((bons) => res.json({ bons: bons.map(bon => bon.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Bon.findById(id, (err, bon) => {
    if(err) {
      return res.sendStatus(404);
    } else if(bon) {
      req.bon = bon;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    bon: req.bon.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._bon_numero !== 'undefined') {
    req.bon._bon_numero = body._bon_numero;
  }

  if(typeof body._bon_date !== 'undefined') {
    req.bon._bon_date = body._bon_date;
  }

  if(typeof body._bon_type !== 'undefined') {
    req.bon._bon_type = body._bon_type;
  }

  if(typeof body._bon_produits !== 'undefined') {
    req.bon._bon_produits = body._bon_produits;
  }

  if(typeof body.Facture !== 'undefined') {
    req.bon.Facture = body.Facture;
  }
  
  return req.bon.save()
    .then(() => res.json({ bon: req.bon.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Bon.findByIdAndRemove(req.bon._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;