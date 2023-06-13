
const { expressjwt: jwt } = require("express-jwt");


function authJwt() {
    const secret = process.env.secret;
    return jwt({
        secret,
        algorithms: ["HS256"],
    }).unless({
        path: [
            "localhost:4000/users/login",
            "localhost:4000/users/signup",
        ]
    })
}

module.exports = authJwt;

