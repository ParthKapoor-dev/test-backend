async function adminRole(req, res, next) {
    try {
        req.userRole = 'admin-user';
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = adminRole