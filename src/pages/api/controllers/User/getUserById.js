const { db } = require("../../db");
const { Users } = db;

module.exports = async (id) => {
    const user = await Users.findByPk(id);
    if (!user) throw new Error(`No user found with id: ${id}`);
    return user;
};
