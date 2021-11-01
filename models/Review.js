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
                console.log('FIRST BEFORE CREATE FUNCTION RUNNING...')
                if (newReviewData.popularity !== (0)) {
                    newReviewData.popularity = 0;
                    return newReviewData;
                }
            },
            beforeCreate: async (newReviewData) => {
                //future development

                console.log('NEW REVIEW DATA', newReviewData)
                console.log('BEFORE AXIOS REQUEST... ')
                const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
                let response = await axios.get(url + newReviewData.drink_name)
                //console.log('REVIEW DATA', response)

                if (response.data.drinks !== null) {
                    console.log('RESPONSE DATA NOT NULL; ABOUT TO MAP')
                    const data = response.data.drinks.map((drink, index) => {
                        if (index === 0) {
                            console.log('INDEX == 0')
                            const newDrink = {
                                name: drink.strDrink,
                                img: drink.strDrinkThumb
                            };
                            console.log('DRINK OBJ: --- ', newDrink);

                            if (newReviewData.id <= 10) {
                                console.log('id is less than/equal to 10 ', newReviewData.id)


                                // const drinkImage = drinkFromApi.img;
                                newReviewData.image = drink.strDrinkThumb
                                console.log('RETURNING NEWREVIEWDATA WITH IMAGE', newReviewData)
                                return newReviewData
                            }
                            else {
                                console.log('ID > 10', newReviewData.id)
                            }

                        }
                    });
                } else {
                    console.log('RESPONSE DATA NULL')
                    const newDrink = {
                        img: "../public/images/hmmrdlight.png"
                    };
                    return null
                }

                return null
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