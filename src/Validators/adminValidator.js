const joi = require("joi");

const usernameValidator = joi.object({
    username: joi.string()
})


module.exports = {
    usernameValidator
}