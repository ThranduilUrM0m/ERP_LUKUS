const mongoose = require('mongoose');
const router = require('express').Router();
const Produit = mongoose.model('Produit');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._produit_designation) {
    return res.status(422).json({
      errors: {
        _produit_designation: 'is required',
      },
    });
  }

  if(!body._produit_reference) {
    return res.status(422).json({
      errors: {
        _produit_reference: 'is required',
      },
    });
  }

  if(!body._produit_quantite) {
    return res.status(422).json({
      errors: {
        _produit_quantite: 'is required',
      },
    });
  }

  if(!body._produit_prixunitaire) {
    return res.status(422).json({
      errors: {
        _produit_prixunitaire: 'is required',
      },
    });
  }

  if(!body._produit_statut) {
    return res.status(422).json({
      errors: {
        _produit_statut: 'is required',
      },
    });
  }

  const finalProduit = new Produit(body);
  return finalProduit.save()
    .then(() => {
      res.json({ produit: finalProduit.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Produit.find()
    .sort({ createdAt: 'descending' })
    .then((produits) => res.json({ produits: produits.map(produit => produit.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Produit.findById(id, (err, produit) => {
    if(err) {
      return res.sendStatus(404);
    } else if(produit) {
      req.produit = produit;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    produit: req.produit.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._produit_designation !== 'undefined') {
    req.produit._produit_designation = body._produit_designation;
  }

  if(typeof body._produit_reference !== 'undefined') {
    req.produit._produit_reference = body._produit_reference;
  }

  if(typeof body._produit_quantite !== 'undefined') {
    req.produit._produit_quantite = body._produit_quantite;
  }

  if(typeof body._produit_prixunitaire !== 'undefined') {
    req.produit._produit_prixunitaire = body._produit_prixunitaire;
  }

  if(typeof body._produit_statut !== 'undefined') {
    req.produit._produit_statut = body._produit_statut;
  }
  
  return req.produit.save()
    .then(() => res.json({ produit: req.produit.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Produit.findByIdAndRemove(req.produit._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;