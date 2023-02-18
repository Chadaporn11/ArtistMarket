const RequestType = require("../models/RequestType");
const RequestOther = require("../models/RequestOther")
const RequestTopup = require("../models/RequestTopup")
const RequestWithdraw = require("../models/RequestWithdraw")
const User = require("../models/User")
const Wallet = require("../models/Wallet")



exports.listRequestType = async (req, res) => {
    try {
        // Code
        const request = await RequestType.find({}).exec();
        res.send(request);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.createRequestType = async (req, res) => {
    try {
        const { name } = req.body;
        const request = await new RequestType({ name }).save();
        res.send(request);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};

exports.readRequestType = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const request = await RequestType.findOne({ _id: id }).exec();
        if (request) {
            res.send(request);
        } else {
            res.status(400).send('Not Found!');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.updateRequestType = async (req, res) => {
    try {
        // Code
        var id = req.params.id;
        var { name } = req.body;
        console.log(name, id);
        const request = await RequestType.findOneAndUpdate(
            { _id: id },
            { name: name }
        );
        res.send(request);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.removeRequestType = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const request = await RequestType.findOneAndDelete({ _id: id });
        res.send(request);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.createRequestOther = async (req, res) => {
    try {
        const { title, description, requestType } = req.body;
        let user = await User.findOne({ username: req.user.username }).exec();
        let requesttype = await RequestType.findOne({ name: requestType }).exec()

        let data = {
            title: title,
            description: description,
            requestType: requesttype._id,
            requestBy: user._id
        }
        console.log(data)
        const requestOther = await new RequestOther(data).save();
        res.send(requestOther)


    } catch (err) {
        console.log(err);
        res.status(500).send("Create Request Other Error!");

    }

};

exports.createRequestTopup = async (req, res) => {
    try {
        const { paymenttime, amount, name, lastpaymentnumber, paymentImage, requestType } = req.body;
        let user = await User.findOne({ username: req.user.username }).exec();
        let requesttype = await RequestType.findOne({ name: requestType }).exec()

        let data = {
            paymentname: name,
            topupAmount: amount,
            topupTime: paymenttime,
            requestType: requesttype._id,
            paymentImage: paymentImage,
            requestBy: user._id
        }
        console.log(data)
        const requestTopup = await new RequestTopup(data).save();
        res.send(requestTopup)


    } catch (err) {
        console.log(err);
        res.status(500).send("Create Request Top Up Error!");

    }


};

exports.createRequestWithdraw = async (req, res) => {
    try {
        const { amount, requestType } = req.body;
        let user = await User.findOne({ username: req.user.username }).exec();
        let requesttype = await RequestType.findOne({ name: requestType }).exec()
        let data = {
            amount: amount,
            requestType: requesttype._id,
            requestBy: user._id,
            walletRequest: user.walletUser
        }
        const requestWithdraw = await new RequestWithdraw(data).save();
        res.send(requestWithdraw)


    } catch (err) {
        console.log(err);
        res.status(500).send("Create Request Top Up Error!");

    }



};