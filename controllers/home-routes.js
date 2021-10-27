const router = require('express').Router();
const { Comment, Review } = require('../../HMMRD/models');
const withAuth = require('../utils/auth');

// GET all drink reviews for homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const dbDrinkData = await Review.findAll({
        include: [
            {
            model: Review,
            attributes: ['drink_name', 'image', 'review'],
            },
        ],
        });

        const drinks = dbDrinkData.map((drink) =>
        drink.get({ plain: true })
        );

        res.status(200).render('homepage', {
            drinks,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one drink review for homepage
router.get('/reviews/:id', withAuth, async (req, res) => {
    try {
        const dbDrinkData = await Review.findByPk(req.params.id, {
        include: [
            {
            model: Comment,
            attributes: [
                'id',
                'popularity',
                'user_id',
                'drink_id',
                'comment',
            ],
            },
        ],
        });
  
        const drinkReviews = dbDrinkData.get({ plain: true });
  
        res.status(200).render('ctreviews-details', {
            drinkReviews,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;
