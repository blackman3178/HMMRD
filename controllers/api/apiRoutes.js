const router = require('express').Router();
const axios = require('axios').default;

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

// Call api form cocktaildb api source to compare drink names and bring in images to a local database
router.get('/drink/:drinkName', (req, res) => {
    axios.get(url + req.params.drinkName)
    .then(function (response) {

        const data = response.data.drinks.map(drink => {
            const newDrink = {
                name: drink.strDrink,
                id: drink.idDrink,
                instructions: drink.strInstructions,
                img: drink.strDrinkThumb
            };
              return newDrink;
        });
        console.log(data);
        res.json(data);
    })
    .catch(function (error) {
        console.log(error);
    });
});

module.exports = router;