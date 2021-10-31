const router = require('express').Router();
const { User, Review, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


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