require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (user) => {
    const payload = {
        subject: user.userId,
        username: user.username,
        roles: ['admin']
    }
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, secret, options)
}