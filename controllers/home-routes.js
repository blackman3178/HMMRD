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
            loggedIn: req.session.loggedIn,
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
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;
