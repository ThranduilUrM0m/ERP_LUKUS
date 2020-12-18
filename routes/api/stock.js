const mongoose = require('mongoose');
const router = require('express').Router();
const Stock = mongoose.model('Stock');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body.Produit) {
		return res.status(422).json({
			errors: {
				Produitj: 'is required',
			},
		});
	}

	const finalStock = new Stock(body);
	return finalStock
		.save()
		.then(finalStock => finalStock
			.populate({
				path: 'Produit'
			})
			.execPopulate())
		.then(() => {
			res.json({ _stock: finalStock.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return Stock.find()
		.sort({ createdAt: 'descending' })
		.populate({
			path: 'Produit'
		})
		.then((_stocks) => res.json({ _stocks: _stocks.map(_stock => _stock.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return Stock.findById(id, (err, _stock) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_stock) {
			req._stock = _stock;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_stock: req._stock.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body.Produit !== 'undefined') {
		req._stock.Produit = body.Produit;
	}

	return req._stock
		.save()
		.then(() => req._stock
			.populate({
				path: 'Produit'
			})
			.execPopulate())
		.then(() => res.json({ _stock: req._stock.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return Stock.findByIdAndRemove(req._stock._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;