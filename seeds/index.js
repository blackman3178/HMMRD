const { request } = require('express');
const Sequelize = require('../config/connection');
const { Review, Comment, User } = require('../models');

const commentData = require("./commentData.json");
const userData = require("./userData.json");
const reviewData = require("./reviewData.json");

const seedDataBase = async () => {
  await Sequelize.sync({ force: true});

  console.log("THIS IS USER DATA!");
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("THIS IS REVIEW DAta");
  await Review.bulkCreate(reviewData, {
    individualHooks: true,
    returning: true,
  });
  console.log("THIS IS COMMENT DATA");
  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  
  process.exit(0);
};


seedDataBase();
