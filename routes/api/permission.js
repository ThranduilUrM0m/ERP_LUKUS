const mongoose = require('mongoose');
const router = require('express').Router();
const Permission = mongoose.model('Permission');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._permission_titre) {
    return res.status(422).json({
      errors: {
        _permission_titre: 'is required',
      },
    });
  }

  const finalPermission = new Permission(body);
  return finalPermission.save()
    .then(() => {
      res.json({ permission: finalPermission.toJSON() });
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Permission.find()
    .sort({ createdAt: 'descending' })
    .then((permissions) => res.json({ permissions: permissions.map(permission => permission.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Permission.findById(id, (err, permission) => {
    if(err) {
      return res.sendStatus(404);
    } else if(permission) {
      req.permission = permission;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    permission: req.permission.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._permission_titre !== 'undefined') {
    req.permission._permission_titre = body._permission_titre;
  }
  
  return req.permission.save()
    .then(() => res.json({ permission: req.permission.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Permission.findByIdAndRemove(req.permission._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;