const Product = require("../models/Product");
const User = require("../models/User");

exports.createProduct = async (req, res) => {
    try {
        const { productName, description, category, price, quantity, images } = req.body;
        let user = await User.findOne({ username: req.user.username }).exec();
        let data = {
            productName: productName,
            description: description,
            category: category,
            price: price,
            quantity: quantity,
            productImages: images,
            owner: user._id,
        }
        const product = await new Product(data).save();
        res.send(product);
    } catch (err) {
        res.status(500).send("Server Error!!");
    }
};

exports.listProduct = async (req, res) => {
    try {
        // Code
        const count = parseInt(req.params.count);
        const product = await Product.find().limit(count).populate('category').populate("owner", "_id username").sort([["createdAt", "desc"]]);
        res.send(product);
    } catch (err) {
        res.status(500).send("Server Error!");
    }
};

exports.removeProduct = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const product = await Product.findOneAndDelete({ _id: id }).exec();
        res.send(product);
    } catch (err) {
        res.status(500).send("Server Error!");
    }
};

exports.readProduct = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const product = await Product.findOne({ _id: id }).populate('category').populate("owner", "_id username").exec();
        res.send(product);
    } catch (err) {
        res.status(500).send("Server Error!");
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate({ _id: id }, req.body, { new: true }).populate('category').exec();
        res.send(product);

    } catch (err) {
        res.status(500).send("Server Error!");
    }
};

exports.listProductBy = async (req, res) => {
    try {
        // Code
        const { sort, order, limit } = req.body;
        const product = await Product.find().limit(limit).populate('category').sort([[sort, order]]);
        res.send(product);
    } catch (err) {
        res.status(500).send("Server Error!");
    }
};

//listProductByOwner
exports.listProductByOwner = async (req, res) => {
    try {
        //Code
        const id = req.params.id;
        let user = await User.findOne({ username: id }).exec();
        const product = await Product.find({ owner: user._id }).populate('category')
        res.send(product);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

//========search=========//
// Query
const handleQuery = async (req, res, query) => {
    let products = await Product.find({ $text: { $search: query } }).populate('category', "_id name")

    res.send(products);

};

//Price
const handlePrice = async (req, res, price) => {
    let products = await Product.find({
        price: {
            $gte: price[0],
            $lte: price[1]
        }
    }).populate('category', "_id name")

    res.send(products);

};

// Category
const handleCategory = async (req, res, category) => {
    let products = await Product.find({ category }).populate('category', "_id name")

    res.send(products);

};

exports.searchProductFilters = async (req, res) => {

    const { query, price, category } = req.body;
    console.log(query);
    if (query) {
        console.log(query);
        await handleQuery(req, res, query);
    }
    if (price != undefined) {
        console.log(price);
        await handlePrice(req, res, price);
    }
    if (category) {
        console.log(category);
        await handleCategory(req, res, category);
    }


};