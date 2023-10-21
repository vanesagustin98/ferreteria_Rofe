const { db } = require("../../db")
db.sequelize.sync()
const Users = db.Users

module.exports = async (data) => {
    const user = await Users.findOne(
        {
            where:
                { idUser: data.idUser }
        })
    if (!user) throw new Error("Cannot ")

    const userUpdated = await user.update(data)
    return userUpdated

}

