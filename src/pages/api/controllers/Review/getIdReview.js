const { db } = require("../../db");
const { Review } = db;

module.exports = async (id) => {
    const rev = await Review.findByPk(id);
    if (!rev) throw new Error(`No review found with id: ${id}`);
    return rev;
};
