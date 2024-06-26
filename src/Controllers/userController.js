const User = require("../Models/UserModel");

async function setupProfile(req, res, next) {

    const { location, age, bio, dob, work } = req.body;
    const _id = req.user._id;
    try {
        const updatedUser = await User.findOneAndUpdate({ _id }, {
            location, age, bio, dob, work
        }, { new: true });
        console.log(updatedUser)
        if (updatedUser._id.toString() !== _id.toString())
            throw new Error("Some Error in setting up profile");

        res.json({ updatedUser })
    } catch (error) {
        next(error)
    }
}

async function getProfile(req, res, next) {

    const user = req.user;

    try {
        res.json({ user })

    } catch (error) {
        next(error)
    }
}


async function updateProfile(req, res, next) {
    const userId = req.user._id;
    const updatedData = req.data.updatedData;
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, {
            ...updatedData
        }, { new: true });

        res.json({ updatedUser })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    setupProfile,
    getProfile,
    updateProfile
};
