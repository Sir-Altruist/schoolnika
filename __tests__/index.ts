import { expect } from "chai";
import * as User from "../src/services/user";
import { Logger, validator } from "../src/libs";

describe("User", () => {
    // Creates user
    it("should create new user", async () => {
        const userObj = {
            firstName: "",
            lastName: "",
            email: ""
        };
        const message = validator.validateUser(
            ["firstName", "lastName", "email"],
            userObj
        );
        if (message) {
            Logger.info("Authentication Error: ", message);
            return;
        }
        const user = await User.createUser(userObj.email, userObj);
        Logger.info("user: ", user);
        expect(user).to.have.property("dataValues").to.haveOwnProperty("id");
    });

    // fetch all users
    it("should return all users", async () => {
        const attributes = {
            exclude: ["updatedAt", "createdAt"]
        };
        const query = {
            offset: 2,
            limit: 2,
            attributes,
            order: [["id", "DESC"]],
            separate: true
        };

        const user = await User.findAllUsers(query);
        Logger.info("user: ", user);
        expect(user).to.have.property("rows").with.lengthOf(user.count);
    });

    // fetch single user
    it("should return single user", async () => {
        const id = 1;
        const user = await User.findOne(id);
        Logger.info("user: ", user);
        expect(user).to.have.property("id").to.equal(id);
    });

    // update user info
    it("should update user information", async () => {
        const id = 5;
        const userObj = {
            email: ""
        };
        const user = await User.updateUser(id, userObj);
        Logger.info("user: ", user);
        expect(user).to.have.property("id").to.equal(id);
    });

    // delete user
    it("should delete user information", async () => {
        const id = 1;
        const user = await User.deleteUser(id);
        Logger.info("user: ", user);
        expect(user).to.be.a("number");
    });
});
