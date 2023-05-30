const { verifyToken } = require('../helpers/jwt');
const { User, Admin, Employer } = require('../models');

async function authUser(req, res, next) {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: 'token_error', message: 'Invalid token' }
        }

        const payload = verifyToken(access_token);

        if (!payload) {
            throw { name: 'token_error', message: 'Invalid token' }
        }

        const checkUser = await User.findByPk(payload.id);
        if (!checkUser) {
            throw { name: 'unauthorized', message: 'Unauthorized Access' }
        }

        req.identity = { id: checkUser.id, email: checkUser.email, role: "user" };

        next();
    } catch (err) {
        next(err);
    }
}
async function authEmployer(req, res, next) {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: 'token_error', message: 'Invalid token' }
        }

        const payload = verifyToken(access_token);

        if (!payload) {
            throw { name: 'token_error', message: 'Invalid token' }
        }

        const checkEmployer = await Employer.findByPk(payload.id);
        if (!checkEmployer) {
            throw { name: 'unauthorized', message: 'Unauthorized Access' }
        }

        req.identity = { id: checkEmployer.id, email: checkEmployer.email, role: "employer" };

        next();
    } catch (err) {
        next(err);
    }
}
async function authAdmin(req, res, next) {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: 'token_error', message: 'Invalid token' }
        }

        const payload = verifyToken(access_token);

        if (!payload) {
            throw { name: 'token_error', message: 'Invalid token' }
        }

        const checkAdmin = await Admin.findByPk(payload.id);
        if (!checkAdmin) {
            throw { name: 'unauthorized', message: 'Unauthorized Access' }
        }

        req.identity = { id: checkAdmin.id, email: checkAdmin.email, role: "admin" };

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = { authUser, authAdmin, authEmployer }