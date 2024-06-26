async function isAdmin(req, res, next) {
    const user = req.user
    try {

        console.log(user);
        if (user.role !== "admin-user")
            throw new Error("Unauthorized : Admin Access Denied");

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = isAdmin