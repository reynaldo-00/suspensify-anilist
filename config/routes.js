const authRouter = require('../auth/authRouter');

module.exports = server => {
    server.use('/auth', authRouter);
}