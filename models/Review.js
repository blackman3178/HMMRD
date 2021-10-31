const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require('../config/connection');

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
        hooks: { //TODO: tried to use hooks to create logic to make review 0 or not!!!
            beforeCreate: async (newReviewData)=> {
                if(newReviewData.popularity !== (0)){
                    newReviewData.popularity = 0;
                    return newReviewData;
                } 
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "review",
    }
);

module.exports = Review;