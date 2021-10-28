const router = require('express').Router();

const userRoutes = require('./user-routes');
const apiRoutes = require('./apiRoutes');

router.use('/users', userRoutes);
router.use('/', apiRoutes)

module.exports = router;
