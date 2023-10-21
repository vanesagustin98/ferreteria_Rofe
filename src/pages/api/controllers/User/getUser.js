const { db } = require("../../db");

const { Users } = db;

module.exports = async () => {
    return await Users.findAll();
};
