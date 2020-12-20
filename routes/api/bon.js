const mongoose = require('mongoose');
const router = require('express').Router();
const Bon = mongoose.model('Bon');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body._bon_numero) {
		return res.status(422).json({
			errors: {
				_bon_numero: 'is required',
			},
		});
	}

	if (!body._bon_date) {
		return res.status(422).json({
			errors: {
				_bon_date: 'is required',
			},
		});
	}

	if (!body._bon_type) {
		return res.status(422).json({
			errors: {
				_bon_type: 'is required',
			},
		});
	}

	if (!body._bon_produits) {
		return res.status(422).json({
			errors: {
				_bon_produits: 'is required',
			},
		});
	}

	if (!body.Facture) {
		return res.status(422).json({
			errors: {
				Facture: 'is required',
			},
		});
	}

	const finalBon = new Bon(body);
	return finalBon
		.save()
		.then(finalBon => finalBon
			.populate({
				path: 'Facture',
				populate: [{ 
					path: 'Client' 
				},{ 
					path: 'Produit' 
				},{ 
					path: 'Societe',
					populate: {
						path: 'Agence',
					},
				},{ 
					path: 'Fournisseur' 
				}]
			})
			.execPopulate())
		.then(() => {
			res.json({ _bon: finalBon.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return Bon.find()
		.sort({ createdAt: 'descending' })
		.populate({ 
			path: 'Facture', 
			populate: [{ 
				path: 'Client' 
			},{ 
				path: 'Produit' 
			},{ 
				path: 'Societe',
				populate: {
					path: 'Agence',
				},
			},{ 
				path: 'Fournisseur' 
			}]
		})
		.then((_bons) => res.json({ _bons: _bons.map(_bon => _bon.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return Bon.findById(id, (err, _bon) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_bon) {
			req._bon = _bon;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_bon: req._bon.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body._bon_numero !== 'undefined') {
		req._bon._bon_numero = body._bon_numero;
	}

	if (typeof body._bon_date !== 'undefined') {
		req._bon._bon_date = body._bon_date;
	}

	if (typeof body._bon_type !== 'undefined') {
		req._bon._bon_type = body._bon_type;
	}

	if (typeof body._bon_produits !== 'undefined') {
		req._bon._bon_produits = body._bon_produits;
	}

	if (typeof body.Facture !== 'undefined') {
		req._bon.Facture = body.Facture;
	}

	return req._bon
		.save()
		.then(() => req._bon
			.populate({
				path: 'Facture',
				populate: [{ 
					path: 'Client' 
				},{ 
					path: 'Produit' 
				},{ 
					path: 'Societe',
					populate: {
						path: 'Agence',
					},
				},{ 
					path: 'Fournisseur' 
				}]
			})
			.execPopulate())
		.then(() => res.json({ _bon: req._bon.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return Bon.findByIdAndRemove(req._bon._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;