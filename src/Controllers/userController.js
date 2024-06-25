const User = require("../Models/UserModel");

async function setupProfile(req, res) {

    const { location, age, bio, dob, work } = req.body;
    const _id = req.user._id;
    try {
        const updatedUser = await User.findOneAndUpdate({ _id }, {
            location, age, bio, dob, work
        }, { new : true});
        console.log(updatedUser)
        if (updatedUser._id.toString() !== _id.toString())
            throw new Error("Some Error in setting up profile");

        res.json({
            success: true,
            data: {
                updatedUser
            }
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    setupProfile,
};
