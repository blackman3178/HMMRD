const { Drinks } = require('../models');

const drinkData = [
    {
        "drink": "Dry Martini",
        "instructions": "Straight: Pour all ingredients into mixing glass with ice cubes. Stir well. Strain in chilled martini cocktail glass. Squeeze oil from lemon peel onto the drink, or garnish with olive.",
        "ingredients": "", 
        "popularity": 2,
        "image": "https://www.thecocktaildb.com/images/media/drink/6ck9yi1589574317.jpg",
    }, 
];

const seedDrinks = () => Drinks.bulkCreate(drinkData);

module.exports = seedDrinks;
