const { db } = require("../../db");
const { Users } = db;

module.exports = async (username, password) => {
    const user = await Users.findOne({
        where: {
            emailUser: username,
            passwordUser: password,
        },
    });

    return user !== null;
}