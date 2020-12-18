const mongoose = require('mongoose');
const router = require('express').Router();
const Client = mongoose.model('Client');

router.post('/', (req, res, next) => {
	const { body } = req;

	if (!body._client_prenomcontact) {
		return res.status(422).json({
			errors: {
				_client_prenomcontact: 'is required',
			},
		});
	}

	if (!body._client_nomcontact) {
		return res.status(422).json({
			errors: {
				_client_nomcontact: 'is required',
			},
		});
	}

	if (!body._client_adresse) {
		return res.status(422).json({
			errors: {
				_client_adresse: 'is required',
			},
		});
	}

	if (!body._client_telephone) {
		return res.status(422).json({
			errors: {
				_client_telephone: 'is required',
			},
		});
	}

	if (!body._client_email) {
		return res.status(422).json({
			errors: {
				_client_email: 'is required',
			},
		});
	}

	if (!body._client_ville) {
		return res.status(422).json({
			errors: {
				_client_ville: 'is required',
			},
		});
	}

	if (!body._client_pays) {
		return res.status(422).json({
			errors: {
				_client_pays: 'is required',
			},
		});
	}

	const finalClient = new Client(body);
	return finalClient.save()
		.then(() => {
			res.json({ _client: finalClient.toJSON() });
		})
		.catch(next);
});

router.get('/', (req, res, next) => {
	return Client.find()
		.sort({ createdAt: 'descending' })
		.then((_clients) => res.json({ _clients: _clients.map(_client => _client.toJSON()) }))
		.catch(next);
});

router.param('id', (req, res, next, id) => {
	return Client.findById(id, (err, _client) => {
		if (err) {
			return res.sendStatus(404);
		} else if (_client) {
			req._client = _client;
			return next();
		}
	}).catch(next);
});

router.get('/:id', (req, res, next) => {
	return res.json({
		_client: req._client.toJSON(),
	});
});

router.patch('/:id', (req, res, next) => {
	const { body } = req;

	if (typeof body._client_prenomcontact !== 'undefined') {
		req._client._client_prenomcontact = body._client_prenomcontact;
	}

	if (typeof body._client_nomcontact !== 'undefined') {
		req._client._client_nomcontact = body._client_nomcontact;
	}

	if (typeof body._client_adresse !== 'undefined') {
		req._client._client_adresse = body._client_adresse;
	}

	if (typeof body._client_telephone !== 'undefined') {
		req._client._client_telephone = body._client_telephone;
	}

	if (typeof body._client_email !== 'undefined') {
		req._client._client_email = body._client_email;
	}

	if (typeof body._client_ville !== 'undefined') {
		req._client._client_ville = body._client_ville;
	}

	if (typeof body._client_pays !== 'undefined') {
		req._client._client_pays = body._client_pays;
	}

	return req._client.save()
		.then(() => res.json({ _client: req._client.toJSON() }))
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	return Client.findByIdAndRemove(req._client._id)
		.then(() => res.sendStatus(200))
		.catch(next);
});

module.exports = router;