const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// Route designed for when a user wants to add a new comment to an existing review
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      drink_id: req.body.drink_id,
      userId: req.session.user_id,
    });

    console.log("THIS IS THE NEW COMMENT", newComment);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
