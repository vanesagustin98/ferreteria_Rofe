import { db } from "../../db";
const { Users } = db;

module.exports = async (id, permanently) => {
    const UserUpdate = await Users.findByPk(id);
    if (!UserUpdate) throw new Error(`User whit id${id} not exists`);
    await Users.update(
        { isActive: false },
        {
            where: {
                id: id,
                isActive: true
            }
        }
    )

    return UserUpdate;
};

