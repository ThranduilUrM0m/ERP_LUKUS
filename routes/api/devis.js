const mongoose = require('mongoose');
const router = require('express').Router();
const Devis = mongoose.model('Devis');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body._devis_numero) {
		return res.status(422).json({
			errors: {
				_devis_numero: 'is required',
			},
		});
	}

	if (!body._devis_date) {
		return res.status(422).json({
			errors: {
				_devis_date: 'is required',
			},
		});
	}

	if (!body._devis_commentaire) {
		return res.status(422).json({
			errors: {
				_devis_commentaire: 'is required',
			},
		});
	}

	if (!body._devis_TVA) {
		return res.status(422).json({
			errors: {
				_devis_TVA: 'is required',
			},
		});
	}

	if (!body._devis_image) {
		return res.status(422).json({
			errors: {
				_devis_image: 'is required',
			},
		});
	}

	if (!body.Fournisseur) {
		return res.status(422).json({
			errors: {
				Fournisseur: 'is required',
			},
		});
	}

	if (!body.Client) {
		return res.status(422).json({
			errors: {
				Client: 'is required',
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

	const finalDevis = new Devis(body);
	return finalDevis
		.save()
		.then(finalDevis => finalDevis
			.populate({
				path: 'Fournisseur'
			})
			.populate({
				path: 'Client'
			})
			.populate({
				path: 'Produit'
			})
			.populate({
				path: 'Societe'
			})
			.execPopulate())
		.then(() => {
			res.json({ _devis: finalDevis.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return Devis.find()
		.sort({ createdAt: 'descending' })
		.populate({
			path: 'Fournisseur'
		})
		.populate({
			path: 'Client'
		})
		.populate({
			path: 'Produit'
		})
		.populate({
			path: 'Societe'
		})
		.then((_deviss) => res.json({ _deviss: _deviss.map(_devis => _devis.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return Devis.findById(id, (err, _devis) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_devis) {
			req._devis = _devis;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_devis: req._devis.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body._devis_numero !== 'undefined') {
		req._devis._devis_numero = body._devis_numero;
	}

	if (typeof body._devis_date !== 'undefined') {
		req._devis._devis_date = body._devis_date;
	}

	if (typeof body._devis_commentaire !== 'undefined') {
		req._devis._devis_commentaire = body._devis_commentaire;
	}

	if (typeof body._devis_TVA !== 'undefined') {
		req._devis._devis_TVA = body._devis_TVA;
	}

	if (typeof body._devis_image !== 'undefined') {
		req._devis._devis_image = body._devis_image;
	}

	if (typeof body.Fournisseur !== 'undefined') {
		req._devis.Fournisseur = body.Fournisseur;
	}

	if (typeof body.Client !== 'undefined') {
		req._devis.Client = body.Client;
	}

	if (typeof body.Produit !== 'undefined') {
		req._devis.Produit = body.Produit;
	}

	if (typeof body.Societe !== 'undefined') {
		req._devis.Societe = body.Societe;
	}

	return req._devis
		.save()
		.then(() => req._devis
			.populate({
				path: 'Fournisseur'
			})
			.populate({
				path: 'Client'
			})
			.populate({
				path: 'Produit'
			})
			.populate({
				path: 'Societe'
			})
			.execPopulate())
		.then(() => res.json({ _devis: req._devis.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return Devis.findByIdAndRemove(req._devis._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;