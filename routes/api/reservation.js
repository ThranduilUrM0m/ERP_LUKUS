const mongoose = require('mongoose');
const router = require('express').Router();
const Reservation = mongoose.model('Reservation');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._reservation_nombreadultes) {
    return res.status(422).json({
      errors: {
        _reservation_nombreadultes: 'is required',
      },
    });
  }

  if(!body._reservation_nombreenfants) {
    return res.status(422).json({
      errors: {
        _reservation_nombreenfants: 'is required',
      },
    });
  }

  if(!body._reservation_datereservation) {
    return res.status(422).json({
      errors: {
        _reservation_datereservation: 'is required',
      },
    });
  }

  if(!body._reservation_commentaire) {
    return res.status(422).json({
      errors: {
        _reservation_commentaire: 'is required',
      },
    });
  }

  if(!body.Voyage) {
    return res.status(422).json({
      errors: {
        Voyage: 'is required',
      },
    });
  }

  if(!body.Client) {
    return res.status(422).json({
      errors: {
        Client: 'is required',
      },
    });
  }

  const finalReservation = new Reservation(body);
  return finalReservation.save()
    .then(() => {
      res.json({ reservation: finalReservation.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Reservation.find()
    .sort({ createdAt: 'descending' })
    .then((reservations) => res.json({ reservations: reservations.map(reservation => reservation.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Reservation.findById(id, (err, reservation) => {
    if(err) {
      return res.sendStatus(404);
    } else if(reservation) {
      req.reservation = reservation;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    reservation: req.reservation.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._reservation_nombreadultes !== 'undefined') {
    req.reservation._reservation_nombreadultes = body._reservation_nombreadultes;
  }

  if(typeof body._reservation_nombreenfants !== 'undefined') {
    req.reservation._reservation_nombreenfants = body._reservation_nombreenfants;
  }

  if(typeof body._reservation_datereservation !== 'undefined') {
    req.reservation._reservation_datereservation = body._reservation_datereservation;
  }

  if(typeof body._reservation_commentaire !== 'undefined') {
    req.reservation._reservation_commentaire = body._reservation_commentaire;
  }

  if(typeof body.Voyage !== 'undefined') {
    req.reservation.Voyage = body.Voyage;
  }

  if(typeof body.Client !== 'undefined') {
    req.reservation.Client = body.Client;
  }
  
  return req.reservation.save()
    .then(() => res.json({ reservation: req.reservation.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Reservation.findByIdAndRemove(req.reservation._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;