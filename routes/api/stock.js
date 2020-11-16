const mongoose = require('mongoose');
const router = require('express').Router();
const Stock = mongoose.model('Stock');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body.Produit) {
    return res.status(422).json({
      errors: {
        Produitj: 'is required',
      },
    });
  }

  const finalStock = new Stock(body);
  return finalStock.save()
    .then(() => {
      res.json({ stock: finalStock.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Stock.find()
    .sort({ createdAt: 'descending' })
    .then((stocks) => res.json({ stocks: stocks.map(stock => stock.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Stock.findById(id, (err, stock) => {
    if(err) {
      return res.sendStatus(404);
    } else if(stock) {
      req.stock = stock;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    stock: req.stock.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.Produit !== 'undefined') {
    req.stock.Produit = body.Produit;
  }
  
  return req.stock.save()
    .then(() => res.json({ stock: req.stock.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Stock.findByIdAndRemove(req.stock._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;