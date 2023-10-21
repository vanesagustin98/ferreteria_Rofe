const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Review = sequelize.define("Review", {
        idReview: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
    }, { timestamps: false });

    return Review;
}
