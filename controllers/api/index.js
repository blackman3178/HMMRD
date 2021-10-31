const router = require('express').Router();

const reviewRoutes = require('./reviewRoutes');
const userRoutes = require('./user-routes');
const apiRoutes = require('./apiRoutes');
const commentRoutes = require("./commentRoutes");

router.use('/users', userRoutes);
router.use('/', apiRoutes);
router.use('/review',reviewRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
