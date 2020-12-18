const mongoose = require('mongoose');
const router = require('express').Router();
const Produit = mongoose.model('Produit');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body._produit_designation) {
		return res.status(422).json({
			errors: {
				_produit_designation: 'is required',
			},
		});
	}

	if (!body._produit_reference) {
		return res.status(422).json({
			errors: {
				_produit_reference: 'is required',
			},
		});
	}

	if (!body._produit_quantite) {
		return res.status(422).json({
			errors: {
				_produit_quantite: 'is required',
			},
		});
	}

	if (!body._produit_prixunitaire) {
		return res.status(422).json({
			errors: {
				_produit_prixunitaire: 'is required',
			},
		});
	}

	if (!body._produit_statut) {
		return res.status(422).json({
			errors: {
				_produit_statut: 'is required',
			},
		});
	}

	const finalProduit = new Produit(body);
	return finalProduit.save()
		.then(() => {
			res.json({ _produit: finalProduit.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return Produit.find()
		.sort({ createdAt: 'descending' })
		.then((_produits) => res.json({ _produits: _produits.map(_produit => _produit.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return Produit.findById(id, (err, _produit) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_produit) {
			req._produit = _produit;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_produit: req._produit.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body._produit_designation !== 'undefined') {
		req._produit._produit_designation = body._produit_designation;
	}

	if (typeof body._produit_reference !== 'undefined') {
		req._produit._produit_reference = body._produit_reference;
	}

	if (typeof body._produit_quantite !== 'undefined') {
		req._produit._produit_quantite = body._produit_quantite;
	}

	if (typeof body._produit_prixunitaire !== 'undefined') {
		req._produit._produit_prixunitaire = body._produit_prixunitaire;
	}

	if (typeof body._produit_statut !== 'undefined') {
		req._produit._produit_statut = body._produit_statut;
	}

	return req._produit.save()
		.then(() => res.json({ _produit: req._produit.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return Produit.findByIdAndRemove(req._produit._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;