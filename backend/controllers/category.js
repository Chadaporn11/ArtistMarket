const Category = require("../models/Category");

exports.listCategory = async (req, res) => {
    try {
        // Code
        const category = await Category.find({}).exec();
        res.send(category);
    } catch (err) {
        res.status(500).send("Server Error!");
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name }).save();
        if (category) {
            res.send(category);
        } else {
            res.status(500).send('Create category failed!')
        }
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};

exports.readCategory = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const category = await Category.findOne({ _id: id }).exec();
        if (category) {
            res.send(category);
        } else {
            res.status(404).send('Not Found!');
        }
    } catch (err) {
        res.status(500).send("Server Error!");
    }
};

exports.updateCategory = async (req, res) => {
    try {
        // Code
        var id = req.params.id;
        var { name } = req.body;
        console.log(name, id);
        const category = await Category.findOneAndUpdate(
            { _id: id },
            { name: name }
        );
        if (category) {
            res.send(category);
        } else {
            res.status(500).send('Update Category failed!');
        }
    } catch (err) {
        res.status(500).send("Server Error!");
    }
};

exports.removeCategory = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const category = await Category.findOneAndDelete({ _id: id });
        if (category) {
            res.send(category);
        } else {
            res.status(500).send('Delete Category failed')

        }
    } catch (err) {
        res.status(500).send("Server Error!");
    }
};