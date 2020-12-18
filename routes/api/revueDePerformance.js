const mongoose = require('mongoose');
const router = require('express').Router();
const RevueDePerformance = mongoose.model('RevueDePerformance');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body._revueDePerformance_date) {
		return res.status(422).json({
			errors: {
				_revueDePerformance_date: 'is required',
			},
		});
	}

	if (!body._revueDePerformance_resultat) {
		return res.status(422).json({
			errors: {
				_revueDePerformance_resultat: 'is required',
			},
		});
	}

	const finalRevueDePerformance = new RevueDePerformance(body);
	return finalRevueDePerformance.save()
		.then(() => {
			res.json({ _revueDePerformance: finalRevueDePerformance.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return RevueDePerformance.find()
		.sort({ createdAt: 'descending' })
		.then((_revueDePerformances) => res.json({ _revueDePerformances: _revueDePerformances.map(_revueDePerformance => _revueDePerformance.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return RevueDePerformance.findById(id, (err, _revueDePerformance) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_revueDePerformance) {
			req._revueDePerformance = _revueDePerformance;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_revueDePerformance: req._revueDePerformance.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body._revueDePerformance_date !== 'undefined') {
		req._revueDePerformance._revueDePerformance_date = body._revueDePerformance_date;
	}

	if (typeof body._revueDePerformance_resultat !== 'undefined') {
		req._revueDePerformance._revueDePerformance_resultat = body._revueDePerformance_resultat;
	}

	return req._revueDePerformance.save()
		.then(() => res.json({ _revueDePerformance: req._revueDePerformance.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return RevueDePerformance.findByIdAndRemove(req._revueDePerformance._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;