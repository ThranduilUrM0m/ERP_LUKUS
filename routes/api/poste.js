const mongoose = require('mongoose');
const router = require('express').Router();
const Poste = mongoose.model('Poste');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body._poste_titre) {
		return res.status(422).json({
			errors: {
				_poste_titre: 'is required',
			},
		});
	}

	if (!body._poste_salaireinitiale) {
		return res.status(422).json({
			errors: {
				_poste_salaireinitiale: 'is required',
			},
		});
	}

	const finalPoste = new Poste(body);
	return finalPoste.save()
		.then(() => {
			res.json({ _poste: finalPoste.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return Poste.find()
		.sort({ createdAt: 'descending' })
		.then((_postes) => res.json({ _postes: _postes.map(_poste => _poste.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return Poste.findById(id, (err, _poste) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_poste) {
			req._poste = _poste;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_poste: req._poste.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body._poste_titre !== 'undefined') {
		req._poste._poste_titre = body._poste_titre;
	}

	if (typeof body._poste_salaireinitiale !== 'undefined') {
		req._poste._poste_salaireinitiale = body._poste_salaireinitiale;
	}

	return req._poste.save()
		.then(() => res.json({ _poste: req._poste.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return Poste.findByIdAndRemove(req._poste._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;