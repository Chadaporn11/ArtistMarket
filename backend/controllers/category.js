const Category = require("../models/Category");

exports.listCategory = async (req, res) => {
    try {
        // Code
        const category = await Category.find({}).exec();
        res.send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name }).save();
        res.send(category);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};

exports.readCategory = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const category = await Category.findOne({ _id: id }).exec();
        if(category){
            res.send(category);
        } else {
            res.status(400).send('Not Found!');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.updateCategory = async (req, res) => {
    try {
        // Code
        var id = req.params.id;
        var { name } = req.body;
        console.log(name,id);
        const category = await Category.findOneAndUpdate(
            { _id: id },
            { name: name }
        );
        res.send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.removeCategory = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const category = await Category.findOneAndDelete({ _id: id });
        res.send(category);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};