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
router.get('/new', withAuth, (req, res) => {
    res.render('new-review', {
      layout: 'main',
    });
  });

// GET one drink review for homepage
router.get('/reviews/:id', withAuth, async (req, res) => {
    try {

        const dbDrinkData = await Review.findByPk(req.params.id, {
        include: [
            {
                model: User,
            },
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
        console.log(drinkReviews);
        
        res.status(200).render('single-review',{ drinkReviews } );
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/reviews/name", async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            where: {
                drink_name: req.body.title,
            },
            order: [['popularity', 'ASC']],
        });
        const reviews = reviewData.map((review) => review.get({ plain: true }));

        res.status(200).render('homepage',{
            reviews,
            logged_in: req.session.logged_in,
        });
    }catch(err) {
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;
