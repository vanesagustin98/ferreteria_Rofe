const { db } = require("../../db");
const { Users } = db;

module.exports = async (emailUser) => {
    const user = await Users.findOne({ where: { emailUser: emailUser } });
    if (!user) throw new Error(`No user found with email: ${emailUser}`);
    return user;
};
