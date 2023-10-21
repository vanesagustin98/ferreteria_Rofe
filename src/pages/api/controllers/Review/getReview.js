const { db } = require("../../db");

const { Review } = db;

module.exports = async () => {
    return await Review.findAll();
};
