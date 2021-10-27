const router = require('express').Router();
const { Comment, Review } = require('../../HMMRD/models');

// GET all drink reviews for homepage
router.get('/', async (req, res) => {
  try {
    const dbDrinkData = await Drinks.findAll({
      include: [
        {
          model: apiData,
          attributes: ['image_source', 'description'],
        },
      ],
    });

    const drinks = dbDrinkData.map((drink) =>
      drink.get({ plain: true })
    );

    res.render('homepage', {
      drinks,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
router.get('/gallery/:id', async (req, res) => {
  try {
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],
    });

    const gallery = dbGalleryData.get({ plain: true });
    res.render('gallery', { gallery });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
router.get('/painting/:id', async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });

    res.render('painting', { painting });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
