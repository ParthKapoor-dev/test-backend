const User = require("../Models/UserModel");

async function getUsers(req, res, next) {

    try {
        const users = await User.find({ role : 'default-user' });
        console.log(users);

        res.status(200).json({
            users
        });
    } catch (error) {
        next(error)
    }
};

async function getUserByUsername(req, res, next) {
    const username = req.params.username.toLowerCase();
    try {

        const user = await User.findOne({ username });
        if (!user)
            throw new Error("Invalid UserName");

        res.status(200).json({
            user
        })
    } catch (error) {
        next(error);
    }
}

async function deleteUserByUsername(req, res, next) {
    const username = req.body.username.toLowerCase();
    try {

        const user = await User.findOneAndDelete({ username });
        if (!user)
            throw new Error("Invalid UserName");

        res.status(200).json({
            user
        })
    } catch (error) {
        next(error);
    }
}




module.exports = {
    getUsers,
    getUserByUsername,
    deleteUserByUsername
}