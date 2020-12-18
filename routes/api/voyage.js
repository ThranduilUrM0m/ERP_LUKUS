const mongoose = require('mongoose');
const router = require('express').Router();
const Voyage = mongoose.model('Voyage');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body._voyage_datedepart) {
		return res.status(422).json({
			errors: {
				_voyage_datedepart: 'is required',
			},
		});
	}

	if (!body._voyage_datearrive) {
		return res.status(422).json({
			errors: {
				_voyage_datearrive: 'is required',
			},
		});
	}

	if (!body._voyage_lieudepart) {
		return res.status(422).json({
			errors: {
				_voyage_lieudepart: 'is required',
			},
		});
	}

	if (!body._voyage_lieuarrive) {
		return res.status(422).json({
			errors: {
				_voyage_lieuarrive: 'is required',
			},
		});
	}

	if (!body.Vehicule) {
		return res.status(422).json({
			errors: {
				Vehicule: 'is required',
			},
		});
	}

	const finalVoyage = new Voyage(body);
	return finalVoyage
		.save()
		.then(finalVoyage => finalVoyage
			.populate({
				path: 'Passager'
			})
			.populate({
				path: 'Vehicule'
			})
			.execPopulate())
		.then(() => {
			res.json({ _voyage: finalVoyage.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return Voyage.find()
		.sort({ createdAt: 'descending' })
		.populate({
			path: 'Passager'
		})
		.populate({
			path: 'Vehicule'
		})
		.then((_voyages) => res.json({ _voyages: _voyages.map(_voyage => _voyage.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return Voyage.findById(id, (err, _voyage) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_voyage) {
			req._voyage = _voyage;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_voyage: req._voyage.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body._voyage_datedepart !== 'undefined') {
		req._voyage._voyage_datedepart = body._voyage_datedepart;
	}

	if (typeof body._voyage_datearrive !== 'undefined') {
		req._voyage._voyage_datearrive = body._voyage_datearrive;
	}

	if (typeof body._voyage_lieudepart !== 'undefined') {
		req._voyage._voyage_lieudepart = body._voyage_lieudepart;
	}

	if (typeof body._voyage_lieuarrive !== 'undefined') {
		req._voyage._voyage_lieuarrive = body._voyage_lieuarrive;
	}

	if (typeof body.Vehicule !== 'undefined') {
		req._voyage.Vehicule = body.Vehicule;
	}

	return req._voyage
		.save()
		.then(() => req._voyage
			.populate({
				path: 'Passager'
			})
			.populate({
				path: 'Vehicule'
			})
			.execPopulate())
		.then(() => res.json({ _voyage: req._voyage.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return Voyage.findByIdAndRemove(req._voyage._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;