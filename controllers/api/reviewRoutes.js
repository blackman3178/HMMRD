const router = require('express').Router();
const { User, Review, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route created that allows a user to start a new drink conversation by adding their own review
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        const newPost = await Review.create({ ...body, user_id: req.session.user_id });
        res.json(newPost);
        console.log(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;