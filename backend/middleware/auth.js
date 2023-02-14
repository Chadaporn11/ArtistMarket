const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = (req, res, next) => {
    try {
        const token = req.headers['authtoken'];

        if (token === undefined) {
            return res.status(401).send("No Token, Unauthorized!");
        }
        const decoded = jwt.verify(token, 'jwtSecret');

        console.log("middleware ", decoded);
        req.user = decoded.user;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).send("Token Invalid, Unauthorized!");

    }
};

exports.adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user;
        const adminUser = await User.findOne({ email }).exec();
        if (adminUser.role !== 'admin') {
            res.status(403).send(err+', Admin Access denied');
        } else {
            next();
        }

    } catch (err) {
        console.log(err);
        res.status(401).send('Admin Access denied');
    }
};

exports.sellerCheck = async (req, res, next) => {
    try {
        const { email } = req.user;
        const sellerUser = await User.findOne({ email }).exec();
        if (sellerUser.role !== 'seller') {
            res.status(403).send(err+', Seller Access denied');
        } else {
            next();
        }

    } catch (err) {
        console.log(err);
        res.status(401).send('Seller Access denied');
    }
};