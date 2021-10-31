const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require('../config/connection');
const axios = require('axios').default;

class Review extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        drink_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
            },
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        popularity: {//TODO: do we wanna make this start at zero????
            type: DataTypes.INTEGER,
        },
        image: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newReviewData) => {
                if (newReviewData.popularity !== (0)) {
                    newReviewData.popularity = 0;
                    return newReviewData;
                }
            },
            beforeCreate: async (newReviewData) => {
                //future development
                function getDrinkImage(drinkName) {
                    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
                    axios.get(url + drinkName)
                        .then(function (response) {
                            //console.log(response);
                            if (response.data.drinks !== null) {
                                const data = response.data.drinks.map((drink, index) => {
                                    if (index === 0) {
                                        const newDrink = {
                                            name: drink.strDrink,
                                            img: drink.strDrinkThumb
                                        };
                                        console.log(drink.strDrinkThumb);
                                        return "../../public/images/hmmrdlight.png";
                                    }
                                });
                            } else {
                                const newDrink = {
                                    img: "../../public/images/hmmrdlight.png"
                                };
                                return newDrink;
                            }

                        }).catch(function (error) {
                            console.log(error);
                        })
                }
                if (newReviewData.id <= 10) {
                    const drinkFromApi = getDrinkImage(newReviewData.drink_name);
                    // const drinkImage = drinkFromApi.img;
                    newReviewData.image = drinkFromApi;
                }
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "review",
    }
);

module.exports = Review;