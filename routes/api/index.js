const router = require('express').Router();

router.use('/agence', require('./agence'));
router.use('/bon', require('./bon'));
router.use('/client', require('./client'));
router.use('/devis', require('./devis'));
router.use('/employe', require('./employe'));
router.use('/facture', require('./facture'));
router.use('/fournisseur', require('./fournisseur'));
router.use('/passager', require('./passager'));
router.use('/permission', require('./permission'));
router.use('/poste', require('./poste'));
router.use('/produit', require('./produit'));
router.use('/reservation', require('./reservation'));
router.use('/revueDePerformance', require('./revueDePerformance'));
router.use('/societe', require('./societe'));
router.use('/stock', require('./stock'));
router.use('/vehicule', require('./vehicule'));
router.use('/voyage', require('./voyage'));

module.exports = router;