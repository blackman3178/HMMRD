const router = require('express').Router();
const { Comment, Review, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all drink reviews for homepage
router.get('/', async (req, res) => {
    try {
        // const userData = await User.findAll({
        //     attributes: { exclude: ['password'] },
        //     order: [['name', 'ASC']],
        //   });

        const dbDrinkData = await Review.findAll({
        include: [
            User,
            // {
            // // model: Review,
            // include: ['drink_name', 'review'],
            // },
        ],
        });

        // console.log(dbDrinkData);

        const drinks = dbDrinkData.map((drink) =>
        drink.get({ plain: true })
        );

        console.log(drinks);

        res.status(200).render('homepage', {
            drinks,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one drink review for homepage
router.get('/reviews/:id', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
          });

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
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;
