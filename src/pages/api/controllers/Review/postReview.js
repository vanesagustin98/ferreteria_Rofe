const { db } = require("../../db");
db.sequelize.sync();
const Review = db.Review;

module.exports = async (data) => {
    const newReview = await Review.create(data);
    return newReview;
};