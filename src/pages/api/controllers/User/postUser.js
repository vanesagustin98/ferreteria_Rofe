const { db } = require("../../db");
db.sequelize.sync();
const Users = db.Users;

module.exports = async (data) => {
    const existUser = await Users.findOne({
        where: {
            emailUser: data.emailUser,
        },
    });
    if (existUser) throw new Error(`User already exists`);
    else {
        const newUser = await Users.create(data);
        return newUser;
    }
};