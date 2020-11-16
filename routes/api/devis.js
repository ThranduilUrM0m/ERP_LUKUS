const mongoose = require('mongoose');
const router = require('express').Router();
const Devis = mongoose.model('Devis');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._devis_numero) {
    return res.status(422).json({
      errors: {
        _devis_numero: 'is required',
      },
    });
  }

  if(!body._devis_date) {
    return res.status(422).json({
      errors: {
        _devis_date: 'is required',
      },
    });
  }

  if(!body._devis_commentaire) {
    return res.status(422).json({
      errors: {
        _devis_commentaire: 'is required',
      },
    });
  }

  if(!body._devis_TVA) {
    return res.status(422).json({
      errors: {
        _devis_TVA: 'is required',
      },
    });
  }

  if(!body._devis_image) {
    return res.status(422).json({
      errors: {
        _devis_image: 'is required',
      },
    });
  }

  if(!body.Fournisseur) {
    return res.status(422).json({
      errors: {
        Fournisseur: 'is required',
      },
    });
  }

  if(!body.Client) {
    return res.status(422).json({
      errors: {
        Client: 'is required',
      },
    });
  }

  if(!body.Produit) {
    return res.status(422).json({
      errors: {
        Produit: 'is required',
      },
    });
  }

  if(!body.Societe) {
    return res.status(422).json({
      errors: {
        Societe: 'is required',
      },
    });
  }

  const finalDevis = new Devis(body);
  return finalDevis.save()
    .then(() => {
      res.json({ devis: finalDevis.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Devis.find()
    .sort({ createdAt: 'descending' })
    .then((deviss) => res.json({ deviss: deviss.map(devis => devis.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Devis.findById(id, (err, devis) => {
    if(err) {
      return res.sendStatus(404);
    } else if(devis) {
      req.devis = devis;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    devis: req.devis.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._devis_numero !== 'undefined') {
    req.devis._devis_numero = body._devis_numero;
  }

  if(typeof body._devis_date !== 'undefined') {
    req.devis._devis_date = body._devis_date;
  }

  if(typeof body._devis_commentaire !== 'undefined') {
    req.devis._devis_commentaire = body._devis_commentaire;
  }

  if(typeof body._devis_TVA !== 'undefined') {
    req.devis._devis_TVA = body._devis_TVA;
  }

  if(typeof body._devis_image !== 'undefined') {
    req.devis._devis_image = body._devis_image;
  }

  if(typeof body.Fournisseur !== 'undefined') {
    req.devis.Fournisseur = body.Fournisseur;
  }

  if(typeof body.Client !== 'undefined') {
    req.devis.Client = body.Client;
  }

  if(typeof body.Produit !== 'undefined') {
    req.devis.Produit = body.Produit;
  }

  if(typeof body.Societe !== 'undefined') {
    req.devis.Societe = body.Societe;
  }
  
  return req.devis.save()
    .then(() => res.json({ devis: req.devis.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Devis.findByIdAndRemove(req.devis._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;