const mongoose = require('mongoose');
const router = require('express').Router();
const Client = mongoose.model('Client');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._client_prenomcontact) {
    return res.status(422).json({
      errors: {
        _client_prenomcontact: 'is required',
      },
    });
  }

  if(!body._client_nomcontact) {
    return res.status(422).json({
      errors: {
        _client_nomcontact: 'is required',
      },
    });
  }

  if(!body._client_raison) {
    return res.status(422).json({
      errors: {
        _client_raison: 'is required',
      },
    });
  }

  if(!body._client_adresse) {
    return res.status(422).json({
      errors: {
        _client_adresse: 'is required',
      },
    });
  }

  if(!body._client_telephone) {
    return res.status(422).json({
      errors: {
        _client_telephone: 'is required',
      },
    });
  }

  if(!body._client_email) {
    return res.status(422).json({
      errors: {
        _client_email: 'is required',
      },
    });
  }

  if(!body._client_ville) {
    return res.status(422).json({
      errors: {
        _client_ville: 'is required',
      },
    });
  }

  if(!body._client_pays) {
    return res.status(422).json({
      errors: {
        _client_pays: 'is required',
      },
    });
  }

  if(!body._client_ICE) {
    return res.status(422).json({
      errors: {
        _client_ICE: 'is required',
      },
    });
  }

  if(!body._client_IF) {
    return res.status(422).json({
      errors: {
        _client_IF: 'is required',
      },
    });
  }

  if(!body._client_RC) {
    return res.status(422).json({
      errors: {
        _client_RC: 'is required',
      },
    });
  }

  if(!body._client_patente) {
    return res.status(422).json({
      errors: {
        _client_patente: 'is required',
      },
    });
  }

  if(!body._client_contrat) {
    return res.status(422).json({
      errors: {
        _client_contratj: 'is required',
      },
    });
  }

  const finalClient = new Client(body);
  return finalClient.save()
    .then(() => {
      res.json({ client: finalClient.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Client.find()
    .sort({ createdAt: 'descending' })
    .then((clients) => res.json({ clients: clients.map(client => client.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Client.findById(id, (err, client) => {
    if(err) {
      return res.sendStatus(404);
    } else if(client) {
      req.client = client;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    client: req.client.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._client_prenomcontact !== 'undefined') {
    req.client._client_prenomcontact = body._client_prenomcontact;
  }

  if(typeof body._client_nomcontact !== 'undefined') {
    req.client._client_nomcontact = body._client_nomcontact;
  }

  if(typeof body._client_raison !== 'undefined') {
    req.client._client_raison = body._client_raison;
  }

  if(typeof body._client_adresse !== 'undefined') {
    req.client._client_adresse = body._client_adresse;
  }

  if(typeof body._client_telephone !== 'undefined') {
    req.client._client_telephone = body._client_telephone;
  }

  if(typeof body._client_email !== 'undefined') {
    req.client._client_email = body._client_email;
  }

  if(typeof body._client_ville !== 'undefined') {
    req.client._client_ville = body._client_ville;
  }

  if(typeof body._client_pays !== 'undefined') {
    req.client._client_pays = body._client_pays;
  }

  if(typeof body._client_ICE !== 'undefined') {
    req.client._client_ICE = body._client_ICE;
  }

  if(typeof body._client_IF !== 'undefined') {
    req.client._client_IF = body._client_IF;
  }

  if(typeof body._client_RC !== 'undefined') {
    req.client._client_RC = body._client_RC;
  }

  if(typeof body._client_patente !== 'undefined') {
    req.client._client_patente = body._client_patente;
  }

  if(typeof body._client_contrat !== 'undefined') {
    req.client._client_contrat = body._client_contrat;
  }
  
  return req.client.save()
    .then(() => res.json({ client: req.client.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Client.findByIdAndRemove(req.client._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;