const mongoose = require('mongoose');
const router = require('express').Router();
const Facture = mongoose.model('Facture');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body._facture_numero) {
		return res.status(422).json({
			errors: {
				_facture_numero: 'is required',
			},
		});
	}

	if (!body._facture_date) {
		return res.status(422).json({
			errors: {
				_facture_date: 'is required',
			},
		});
	}

	if (!body._facture_TVA) {
		return res.status(422).json({
			errors: {
				_facture_TVA: 'is required',
			},
		});
	}

	if (!body._facture_numeropaiement) {
		return res.status(422).json({
			errors: {
				_facture_numeropaiement: 'is required',
			},
		});
	}

	if (!body._facture_datepaiement) {
		return res.status(422).json({
			errors: {
				_facture_datepaiement: 'is required',
			},
		});
	}

	if (!body.Produit) {
		return res.status(422).json({
			errors: {
				Produit: 'is required',
			},
		});
	}

	if (!body.Societe) {
		return res.status(422).json({
			errors: {
				Societe: 'is required',
			},
		});
	}

	if (!body.Fournisseur && !body.Client) {
		return res.status(422).json({
			errors: {
				Fournisseur: 'is required',
				Client: 'is required'
			},
		});
	}

	const finalFacture = new Facture(body);
	return finalFacture
		.save()
		.then(finalFacture => finalFacture
			.populate({
				path: 'Client'
			})
			.populate({
				path: 'Produit'
			})
			.populate({
				path: 'Societe'
			})
			.populate({
				path: 'Fournisseur'
			})
			.execPopulate())
		.then(() => {
			res.json({ _facture: finalFacture.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return Facture.find()
		.sort({ createdAt: 'descending' })
		.populate({
			path: 'Client'
		})
		.populate({
			path: 'Produit'
		})
		.populate({
			path: 'Societe'
		})
		.populate({
			path: 'Fournisseur'
		})
		.then((_factures) => res.json({ _factures: _factures.map(_facture => _facture.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return Facture.findById(id, (err, _facture) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_facture) {
			req._facture = _facture;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_facture: req._facture.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body._facture_numero !== 'undefined') {
		req._facture._facture_numero = body._facture_numero;
	}

	if (typeof body._facture_date !== 'undefined') {
		req._facture._facture_date = body._facture_date;
	}

	if (typeof body._facture_commentaire !== 'undefined') {
		req._facture._facture_commentaire = body._facture_commentaire;
	}

	if (typeof body._facture_TVA !== 'undefined') {
		req._facture._facture_TVA = body._facture_TVA;
	}

	if (typeof body._facture_ispayed !== 'undefined') {
		req._facture._facture_ispayed = body._facture_ispayed;
	}

	if (typeof body._facture_numeropaiement !== 'undefined') {
		req._facture._facture_numeropaiement = body._facture_numeropaiement;
	}

	if (typeof body._facture_datepaiement !== 'undefined') {
		req._facture._facture_datepaiement = body._facture_datepaiement;
	}

	if (typeof body._facture_type !== 'undefined') {
		req._facture._facture_type = body._facture_type;
	}

	if (typeof body._facture_image !== 'undefined') {
		req._facture._facture_image = body._facture_image;
	}

	if (typeof body.Client !== 'undefined') {
		req._facture.Client = body.Client;
	}

	if (typeof body.Produit !== 'undefined') {
		req._facture.Produit = body.Produit;
	}

	if (typeof body.Societe !== 'undefined') {
		req._facture.Societe = body.Societe;
	}

	if (typeof body.Fournisseur !== 'undefined') {
		req._facture.Fournisseur = body.Fournisseur;
	}

	return req._facture
		.save()
		.then(() => req._facture
			.populate({
				path: 'Client'
			})
			.populate({
				path: 'Produit'
			})
			.populate({
				path: 'Societe'
			})
			.populate({
				path: 'Fournisseur'
			})
			.execPopulate())
		.then(() => res.json({ _facture: req._facture.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return Facture.findByIdAndRemove(req._facture._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;