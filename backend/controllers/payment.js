const PaymentMethod = require("../models/PaymentMethod");
const User = require("../models/User");

exports.createPayment = async (req, res) => {
    try {
        const { paymentmethod, accountnumber, accountname, qrcode, owner } = req.body;
        let user = await User.findOne({ username: owner }).exec();
        let data = {
            paymentmethod: paymentmethod,
            accountnumber: accountnumber,
            accountname: accountname,
            qrcode: qrcode,
            owner: user._id,
        }
        const paymentMethod = await new PaymentMethod(data).save();
        res.send(paymentMethod);
    } catch (err) {
        res.status(500).send("Create Payment Error!!");
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const id = req.params.id;
        const { paymentmethod, accountnumber, accountname, qrcode, owner } = req.body;
        let user = await User.findOne({ username: owner }).exec();
        let data = {
            paymentmethod: paymentmethod,
            accountnumber: accountnumber,
            accountname: accountname,
            qrcode: qrcode,
            owner: user._id,
        }
        const paymentMethod = await PaymentMethod.findByIdAndUpdate({ _id: id }, data, { new: true }).exec();
        res.send(paymentMethod);

    } catch (err) {
        console.log(err);
        res.status(500).send("Update Payment Error!!");
    }
};


exports.readPayment = async (req, res) => {
    try {
        // Code
        const username = req.params.id;
        const user = await User.findOne({ username: username });
        const paymentMathod = await PaymentMethod.findOne({ owner: user.id }).exec();
        if (!paymentMathod) {
            res.send(404).send({ message: 'Null' });
        } else {
            res.status(200).send(paymentMathod);
        }

    } catch (err) {
        res.status(500).send("Get Payment Error!!");
    }
}