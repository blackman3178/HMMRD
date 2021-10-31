const router = require('express').Router();

const reviewRoutes = require('./reviewRoutes');
const userRoutes = require('./user-routes');
const apiRoutes = require('./apiRoutes');

router.use('/users', userRoutes);
router.use('/', apiRoutes)
router.use('/review',reviewRoutes);

module.exports = router;
