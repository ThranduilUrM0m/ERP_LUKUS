const mongoose = require('mongoose');
const router = require('express').Router();
const Employe = mongoose.model('Employe');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body._employe_prenom) {
		return res.status(422).json({
			errors: {
				_employe_prenom: 'is required',
			},
		});
	}

	if (!body._employe_nom) {
		return res.status(422).json({
			errors: {
				_employe_nom: 'is required',
			},
		});
	}

	if (!body._employe_telephone) {
		return res.status(422).json({
			errors: {
				_employe_telephone: 'is required',
			},
		});
	}

	if (!body._employe_datenaissance) {
		return res.status(422).json({
			errors: {
				_employe_datenaissance: 'is required',
			},
		});
	}

	if (!body._employe_CNIE) {
		return res.status(422).json({
			errors: {
				_employe_CNIE: 'is required',
			},
		});
	}

	if (!body._employe_situationfamille) {
		return res.status(422).json({
			errors: {
				_employe_situationfamille: 'is required',
			},
		});
	}

	if (!body._employe_adresse) {
		return res.status(422).json({
			errors: {
				_employe_adresse: 'is required',
			},
		});
	}

	if (!body._employe_CNSS) {
		return res.status(422).json({
			errors: {
				_employe_CNSS: 'is required',
			},
		});
	}

	if (!body._employe_permis) {
		return res.status(422).json({
			errors: {
				_employe_permis: 'is required',
			},
		});
	}

	if (!body._employe_datembauche) {
		return res.status(422).json({
			errors: {
				_employe_datembauche: 'is required',
			},
		});
	}

	if (!body._employe_image) {
		return res.status(422).json({
			errors: {
				_employe_image: 'is required',
			},
		});
	}

	if (!body.Poste) {
		return res.status(422).json({
			errors: {
				Poste: 'is required',
			},
		});
	}

	const finalEmploye = new Employe(body);
	return finalEmploye
		.save()
		.then(finalEmploye => finalEmploye
			.populate({
				path: 'Poste'
			})
			.populate({
				path: 'RevueDePerformance'
			})
			.execPopulate())
		.then(() => {
			res.json({ _employe: finalEmploye.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return Employe.find()
		.sort({ createdAt: 'descending' })
		.populate({
			path: 'Poste'
		})
		.populate({
			path: 'RevueDePerformance'
		})
		.then((_employes) => res.json({ _employes: _employes.map(_employe => _employe.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return Employe.findById(id, (err, _employe) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_employe) {
			req._employe = _employe;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_employe: req._employe.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body._employe_prenom !== 'undefined') {
		req._employe._employe_prenom = body._employe_prenom;
	}

	if (typeof body._employe_nom !== 'undefined') {
		req._employe._employe_nom = body._employe_nom;
	}

	if (typeof body._employe_telephone !== 'undefined') {
		req._employe._employe_telephone = body._employe_telephone;
	}

	if (typeof body._employe_datenaissance !== 'undefined') {
		req._employe._employe_datenaissance = body._employe_datenaissance;
	}

	if (typeof body._employe_CNIE !== 'undefined') {
		req._employe._employe_CNIE = body._employe_CNIE;
	}

	if (typeof body._employe_situationfamille !== 'undefined') {
		req._employe._employe_situationfamille = body._employe_situationfamille;
	}

	if (typeof body._employe_adresse !== 'undefined') {
		req._employe._employe_adresse = body._employe_adresse;
	}

	if (typeof body._employe_CNSS !== 'undefined') {
		req._employe._employe_CNSS = body._employe_CNSS;
	}

	if (typeof body._employe_permis !== 'undefined') {
		req._employe._employe_permis = body._employe_permis;
	}

	if (typeof body._employe_datembauche !== 'undefined') {
		req._employe._employe_datembauche = body._employe_datembauche;
	}

	if (typeof body._employe_image !== 'undefined') {
		req._employe._employe_image = body._employe_image;
	}

	if (typeof body.Poste !== 'undefined') {
		req._employe.Poste = body.Poste;
	}

	return req._employe
		.save()
		.then(() => req._employe
			.populate({
				path: 'Poste'
			})
			.populate({
				path: 'RevueDePerformance'
			})
			.execPopulate())
		.then(() => res.json({ _employe: req._employe.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return Employe.findByIdAndRemove(req._employe._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;