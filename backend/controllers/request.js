const RequestType = require("../models/RequestType");
const RequestOther = require("../models/RequestOther")
const RequestTopup = require("../models/RequestTopup")
const RequestWithdraw = require("../models/RequestWithdraw")
const RequestSignupSeller = require("../models/RequestSignupSeller");
const bcrypt = require("bcryptjs");

const User = require("../models/User")
const Wallet = require("../models/Wallet");



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
        const { amount, requestType, Userpassword } = req.body;
        let user = await User.findOne({ username: req.user.username }).exec();
        // Check Password
        const isMatch = await bcrypt.compare(Userpassword, user.password);

        if (isMatch) {
            let requesttype = await RequestType.findOne({ name: requestType }).exec()
            let data = {
                amount: amount,
                requestType: requesttype._id,
                requestBy: user._id,
                walletRequest: user.walletUser
            }
            const requestWithdraw = await new RequestWithdraw(data).save();
            res.send(requestWithdraw)
        } else {
            // return res.status(400).send("Password Invalid!!");
            return res.status(400).json("Password Invalid!!");

        }



    } catch (err) {
        console.log(err);
        res.status(500).send("Create Request Top Up Error!");

    }


};

exports.createRequestSignupSeller = async (req, res) => {
    try {
        const { ImageCard, ImageUser, requestType } = req.body;
        let user = await User.findOne({ username: req.user.username }).exec();
        let requesttype = await RequestType.findOne({ name: requestType }).exec()
        let data = {
            requestType: requesttype._id,
            requestBy: user._id,
            PersonImage: ImageUser,
            CardImage: ImageCard
        }
        const requestsignupseller = await new RequestSignupSeller(data).save();
        res.send(requestsignupseller)


    } catch (err) {
        console.log(err);
        res.status(500).send("Create Request Top Up Error!");

    }

};

exports.getRequestOther = async (req, res) => {
    try {
        const { status } = req.params
        const user = await User.findOne({ username: req.user.username }).exec();
        let requestother = await RequestOther.find({ requestBy: user._id, checkStatus: status })
            .populate('requestType').populate('requestBy').exec();

        res.json(requestother)

    } catch (err) {
        console.log(err);
        res.status(500).send("getOrders Error!");
    }

};

exports.getRequestTopup = async (req, res) => {
    try {
        const { status } = req.params
        const user = await User.findOne({ username: req.user.username }).exec();
        let requesttopup = await RequestTopup.find({ requestBy: user._id, checkStatus: status })
            .populate('requestType').populate('requestBy').exec();

        res.json(requesttopup)

    } catch (err) {
        console.log(err);
        res.status(500).send("getOrders Error!");
    }

};

exports.getRequestWithdraw = async (req, res) => {
    try {
        const { status } = req.params
        const user = await User.findOne({ username: req.user.username }).exec();
        let requestwithdraw = await RequestWithdraw.find({ requestBy: user._id, checkStatus: status })
            .populate('requestType').populate('requestBy').populate('walletRequest').exec();

        res.json(requestwithdraw)

    } catch (err) {
        console.log(err);
        res.status(500).send("getOrders Error!");
    }

};

//
exports.listRequestOther = async (req, res) => {
    try {
        const { status } = req.params
        let requestother = await RequestOther.find({ checkStatus: status })
            .populate('requestType').populate('requestBy').exec();

        res.json(requestother)

    } catch (err) {
        console.log(err);
        res.status(500).send("getOrders Error!");
    }

};

exports.listRequestTopup = async (req, res) => {
    try {
        const { status } = req.params
        let requesttopup = await RequestTopup.find({ checkStatus: status })
            .populate('requestType').populate('requestBy').exec();

        res.json(requesttopup)

    } catch (err) {
        console.log(err);
        res.status(500).send("getOrders Error!");
    }

};

exports.listRequestWithdraw = async (req, res) => {
    try {
        const { status } = req.params
        let requestwithdraw = await RequestWithdraw.find({ checkStatus: status })
            .populate('requestType').populate('requestBy').exec();

        res.json(requestwithdraw)

    } catch (err) {
        console.log(err);
        res.status(500).send("getOrders Error!");
    }

};

exports.listRequestSignupSeller = async (req, res) => {
    try {
        const { status } = req.params
        let requestsignupseller = await RequestSignupSeller.find({ checkStatus: status })
            .populate('requestType').populate('requestBy').exec();

        res.json(requestsignupseller)


    } catch (err) {
        console.log(err);
        res.status(500).send("getOrders Error!");

    }
}
//
exports.updateRequestOther = async (req, res) => {
    try {
        // Code
        var id = req.params.id;
        var { status } = req.body;
        const requestother = await RequestOther.findOneAndUpdate(
            { _id: id },
            { checkStatus: status }
        );
        res.send(requestother);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }

};

exports.updateRequestSignupSeller = async (req, res) => {
    try {
        // Code
        var id = req.params.id;
        var { status, requestBy } = req.body;
        if (status === 'Request success') {
            const seller = await User.findOneAndUpdate({ username: requestBy.username }, { role: 'seller' })
            const requestsignupseller = await RequestSignupSeller.findOneAndUpdate(
                { _id: id },
                { checkStatus: status }
            );
            if (seller && requestsignupseller) {
                res.send(requestsignupseller);
            }

        } else {
            const requestsignupseller = await RequestSignupSeller.findOneAndUpdate(
                { _id: id },
                { checkStatus: status }
            );
            res.send(requestsignupseller);


        }


    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.updateRequestTopup = async (req, res) => {
    try {
        // Code
        var id = req.params.id;
        var { status, userId } = req.body;
        if (status === 'Request success') {
            const requesttopup = await RequestTopup.findOneAndUpdate(
                { _id: id },
                { checkStatus: status }
            );
            const old_walletuser = await Wallet.findOne({ owner: userId }).exec()
            const old_walletadmin = await Wallet.findOne({ id: req.user._id }).exec()

            const new_pocketmoneyuser = Number(old_walletuser.pocketmoney) + Number(requesttopup.topupAmount)
            const new_pocketmoneyadmin = Number(old_walletadmin.pocketmoney) - Number(requesttopup.topupAmount)
            const new_walletuser = await Wallet.findOneAndUpdate({ owner: userId }, { pocketmoney: new_pocketmoneyuser })
            const new_walletadmin = await Wallet.findOneAndUpdate({ owner: req.user._id }, { pocketmoney: new_pocketmoneyadmin })

            res.send('Update Successfully');
        } else {
            const requesttopup = await RequestTopup.findOneAndUpdate(
                { _id: id },
                { checkStatus: status }
            );
            res.send(requesttopup);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }

};

exports.updateRequestWithdraw = async (req, res) => {
    try {
        // Code
        var id = req.params.id;
        var { status, userId, Image } = req.body;

        if (status === 'Request success') {
            // console.log('Test:;', requestwithdraw)
            const requestwithdraw = await RequestWithdraw.findOne(
                { _id: id }
            );

            const old_walletuser = await Wallet.findOne({ owner: userId }).exec()

            const new_pocketmoneyuser = Number(old_walletuser.pocketmoney) - Number(requestwithdraw.amount)
            const new_walletuser = await Wallet.findOneAndUpdate({ owner: userId }, { pocketmoney: new_pocketmoneyuser })
            const requestwithdrawupdate = await RequestWithdraw.findOneAndUpdate(
                { _id: id },
                { checkStatus: status, paymentImage: Image }
            );
            if (new_walletuser && requestwithdrawupdate) {
                res.send(requestwithdraw);
            }
        } else {
            const requestwithdraw = await RequestWithdraw.findOneAndUpdate(
                { _id: id },
                { checkStatus: status }
            );
            res.send(requestwithdraw);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }

};

exports.removeRequestOther = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const request = await RequestOther.findOneAndDelete({ _id: id });
        res.send(request);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.removeRequestTopup = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const request = await RequestTopup.findOneAndDelete({ _id: id });
        res.send(request);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.removeRequestWithdraw = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const request = await RequestWithdraw.findOneAndDelete({ _id: id });
        res.send(request);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};
