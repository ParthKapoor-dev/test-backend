async function isAdmin(){
    const user = req.user
    try {
        if(user.role !== "admin-user")
            throw new Error("Unauthorized : Admin Access Denied");

        next();
    } catch (error) {
        next(error);        
    }
}

module.exports = isAdmin