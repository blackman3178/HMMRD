const Sequelize = require('sequelize');
const { Review } = require('../models');

const commentData = requite("./commentData.json");

const seedDataBase = async () => {
  await Sequelize.sync({ force: true});

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
}

