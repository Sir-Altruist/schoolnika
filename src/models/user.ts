import { DataTypes} from "sequelize";
import { db } from "@datasources/index";
import bcrypt from "bcryptjs";
import { UserModel, UserRequestBody } from "@interfaces/index";
import blog from "./blog";

const user = db.define<UserModel, UserRequestBody>(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "username"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: "email"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "password"
        }
    },
    {
        timestamps: true
    }
);


// Hash password before registration
user.beforeCreate(async (user) => {
    try {
        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash;
    } catch (err) {
        throw new Error(err.message);
    }
});

user.hasMany(blog, {
    foreignKey: {
        name: "userId"
    },
    onDelete: "CASCADE"
});
blog.belongsTo(user);

export default user;
