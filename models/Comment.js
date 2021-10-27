const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require('../config/connection');

class Comment extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Comment.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        popularity: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        drink_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'review',
                key: 'id',
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newCommentData)=> {
                if(newCommentData.popularity !== 0){
                    return newCommentData;
                } else {
                    newCommentData.popularity = 0;
                    return newCommentData;
                }
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;