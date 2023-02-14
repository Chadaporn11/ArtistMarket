const Request = require("../models/RequestType");

exports.listRequestType = async (req, res) => {
    try {
        // Code
        const request = await Request.find({}).exec();
        res.send(request);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.createRequestType = async (req, res) => {
    try {
        const { name } = req.body;
        const request = await new Request({ name }).save();
        res.send(request);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};

exports.readRequestType = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const request = await Request.findOne({ _id: id }).exec();
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
        const request = await Request.findOneAndUpdate(
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
        const request = await Request.findOneAndDelete({ _id: id });
        res.send(request);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};