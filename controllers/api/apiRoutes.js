const router = require('express').Router();
const axios = require('axios').default;

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

router.get('/test', (req, res) => {
    res.send('It worked!');
});

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
            // const ingredients = [];
            // for (let i=1; i<=15; i++){
            //     let ingredient = drink["strIngredient" + i];
            //       if (!ingredient) break;
            //       ingredients.push(ingredient);
            // }
            //   newDrink.ingredients = ingredients;
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

//future development
// function getDrinkImage(drinkName){
//     const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
//     axios.get(url + drinkName)
//     .then(function (response) {
//         //console.log(response);
//     if (response.data.drinks !== null){
//         const data = response.data.drinks.map((drink,index) => {
//             if (index === 0){
//                 const newDrink = {
//                     name: drink.strDrink,
//                     img: drink.strDrinkThumb
//                    };
//                    console.log(drink.strDrinkThumb);
//                    return "../../public/images/hmmrdlight.png";
//             }
//         });   
//     }else {
//         const newDrink = {
//             img:"../../public/images/hmmrdlight.png"
//         };
//         return newDrink;
//     }

//     }).catch(function(error) {
//         console.log(error);
//     })
// }

// module.exports = { getDrinkImage} ;