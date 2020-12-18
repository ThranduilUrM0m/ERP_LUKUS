const mongoose = require('mongoose');
const router = require('express').Router();
const Societe = mongoose.model('Societe');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body._societe_raison) {
		return res.status(422).json({
			errors: {
				_societe_raison: 'is required',
			},
		});
	}

	if (!body._societe_siege) {
		return res.status(422).json({
			errors: {
				_societe_siege: 'is required',
			},
		});
	}

	if (!body._societe_numeroTP) {
		return res.status(422).json({
			errors: {
				_societe_numeroTP: 'is required',
			},
		});
	}

	if (!body._societe_IF) {
		return res.status(422).json({
			errors: {
				_societe_IF: 'is required',
			},
		});
	}

	if (!body._societe_telephone) {
		return res.status(422).json({
			errors: {
				_societe_telephone: 'is required',
			},
		});
	}

	if (!body._societe_fax) {
		return res.status(422).json({
			errors: {
				_societe_fax: 'is required',
			},
		});
	}

	if (!body._societe_email) {
		return res.status(422).json({
			errors: {
				_societe_email: 'is required',
			},
		});
	}

	if (!body._societe_ICE) {
		return res.status(422).json({
			errors: {
				_societe_ICE: 'is required',
			},
		});
	}

	if (!body._societe_CNSS) {
		return res.status(422).json({
			errors: {
				_societe_CNSS: 'is required',
			},
		});
	}

	if (!body.Agence) {
		return res.status(422).json({
			errors: {
				Agencej: 'is required',
			},
		});
	}

	const finalSociete = new Societe(body);
	return finalSociete
		.save()
		.then(finalSociete => finalSociete
			.populate({
				path: 'Agence'
			})
			.execPopulate())
		.then(() => {
			res.json({ _societe: finalSociete.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return Societe.find()
		.sort({ createdAt: 'descending' })
		.populate({
			path: 'Agence'
		})
		.then((_societes) => res.json({ _societes: _societes.map(_societe => _societe.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return Societe.findById(id, (err, _societe) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_societe) {
			req._societe = _societe;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_societe: req._societe.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body._societe_raison !== 'undefined') {
		req._societe._societe_raison = body._societe_raison;
	}

	if (typeof body._societe_siege !== 'undefined') {
		req._societe._societe_siege = body._societe_siege;
	}

	if (typeof body._societe_numeroTP !== 'undefined') {
		req._societe._societe_numeroTP = body._societe_numeroTP;
	}

	if (typeof body._societe_IF !== 'undefined') {
		req._societe._societe_IF = body._societe_IF;
	}

	if (typeof body._societe_telephone !== 'undefined') {
		req._societe._societe_telephone = body._societe_telephone;
	}

	if (typeof body._societe_fax !== 'undefined') {
		req._societe._societe_fax = body._societe_fax;
	}

	if (typeof body._societe_email !== 'undefined') {
		req._societe._societe_email = body._societe_email;
	}

	if (typeof body._societe_ICE !== 'undefined') {
		req._societe._societe_ICE = body._societe_ICE;
	}

	if (typeof body._societe_CNSS !== 'undefined') {
		req._societe._societe_CNSS = body._societe_CNSS;
	}

	if (typeof body.Agence !== 'undefined') {
		req._societe.Agence = body.Agence;
	}

	return req._societe
		.save()
		.then(() => req._societe
			.populate({
				path: 'Agence'
			})
			.execPopulate())
		.then(() => res.json({ _societe: req._societe.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return Societe.findByIdAndRemove(req._societe._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;