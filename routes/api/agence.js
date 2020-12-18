const mongoose = require('mongoose');
const router = require('express').Router();
const Agence = mongoose.model('Agence');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body._agence_adresse) {
		return res.status(422).json({
			errors: {
				_agence_adresse: 'is required',
			},
		});
	}

	if (!body._agence_ville) {
		return res.status(422).json({
			errors: {
				_agence_ville: 'is required',
			},
		});
	}

	if (!body._agence_pays) {
		return res.status(422).json({
			errors: {
				_agence_pays: 'is required',
			},
		});
	}

	const finalAgence = new Agence(body);
	return finalAgence.save()
		.then(() => {
			res.json({ _agence: finalAgence.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return Agence.find()
		.sort({ createdAt: 'descending' })
		.then((_agences) => res.json({ _agences: _agences.map(_agence => _agence.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return Agence.findById(id, (err, _agence) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_agence) {
			req._agence = _agence;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_agence: req._agence.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body._agence_adresse !== 'undefined') {
		req._agence._agence_adresse = body._agence_adresse;
	}

	if (typeof body._agence_ville !== 'undefined') {
		req._agence._agence_ville = body._agence_ville;
	}

	if (typeof body._agence_pays !== 'undefined') {
		req._agence._agence_pays = body._agence_pays;
	}

	return req._agence.save()
		.then(() => res.json({ _agence: req._agence.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return Agence.findByIdAndRemove(req._agence._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;