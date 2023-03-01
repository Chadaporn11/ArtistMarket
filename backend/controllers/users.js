const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const AddressOrder = require("../models/AddressOrder");
const Order = require("../models/Order");

//User//
exports.listUsers = async (req, res) => {
    try {
        // Code
        const user = await User.find().populate('walletUser', '_id walletName pocketmoney').select("-password").sort([["createdAt", "desc"]]);
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("listUsers Error!");
    }
};

exports.removeUsers = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        const user = await User.findOneAndDelete({ _id: id });
        await Wallet.findOneAndDelete({ owner: id });
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("removeUsers Error!");
    }
};

exports.changeRole = async (req, res) => {
    try {
        // Code
        const { id, role } = req.body;
        const user = await User.findOneAndUpdate(
            { _id: id },
            { role: role }
        );
        res.send(user);

    } catch (err) {
        console.log(err);
        res.status(500).send("ChangeRole Error!");
    }
};

exports.updateUsers = async (req, res) => {
    try {
        // Code
        const id = req.params.id;
        var { username, email, phone, password } = req.body
        // 1 gen salt
        const salt = await bcrypt.genSalt(10);
        // 2 encrypt
        var enPassword = await bcrypt.hash(password, salt);

        const user = await User.findOneAndUpdate(
            { _id: id },
            {
                username: username,
                email: email,
                phone: phone,
                password: enPassword
            }
        );
        // update wallet
        const wallet = await Wallet.findOneAndUpdate(
            { owner: id },
            {
                walletName: username + phone,
                password: enPassword
            }
        )
        res.send({ user, wallet });
    } catch (err) {
        console.log(err);
        res.status(500).send("updateUsers Error!");
    }
};
//User//
//Cart//
exports.userCart = async (req, res) => {
    try {
        const { cart } = req.body;
        //Check User
        let user = await User.findOne({ username: req.user.username }).exec();
        let products = [];
        //Check CartOld
        let cartOld = await Cart.findOne({ orderBy: user._id }).exec();
        if (cartOld) {
            cartOld.remove();
        }
        //แต่งสินค้า
        for (let i = 0; i < cart.length; i++) {
            let object = {}

            object.product = cart[i]._id;
            object.owner = cart[i].owner._id;
            object.count = cart[i].count;
            object.price = cart[i].price;

            products.push(object)
        }

        //หาผลรวมของตะกร้า
        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count;
        }

        let newCart = await Cart({
            products,
            cartTotal,
            orderBy: user._id,
        }).save();

        if (newCart) {
            res.send('Save UserCart Success!');
        } else {
            res.status(500).send('Save UserCart Error!');
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};

exports.getUserCart = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username }).exec();
        const cart = await Cart.findOne({ orderBy: user._id })
            .populate('products.product', '_id productName price')
            .exec();

        const { _id, products, cartTotal } = cart;
        res.json({ _id, products, cartTotal });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");

    }

};

exports.emptyCart = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username }).exec();
        const empty = await Cart.findOneAndRemove({ orderBy: user._id }).exec();
        if (empty) {
            res.send(empty);
        } else {
            res.status(500).send('Delete Cart failed')
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("emptyCart Error!");

    }

};

//Cart//

//AddressOrder//
exports.saveAddressOrder = async (req, res) => {
    try {
        const { sendOrder } = req.body;
        const user = await User.findOne({ username: req.user.username }).exec();
        let data = {
            orderBy: user._id,
            sendOrder: sendOrder
        }
        const addressOrder = await new AddressOrder(data).save();
        res.send(addressOrder);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");

    }

};

exports.removeAddressOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const addressOrder = await AddressOrder.findOneAndRemove({ _id: id }).exec();
        res.send('addressOrder')
    } catch (err) {
        console.log(err);
        res.status(500).send("Remove Address Error");
    }
};

exports.getAddressOrder = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username }).exec();
        const addressOrder = await AddressOrder.find({ orderBy: user._id }).populate('orderBy').exec();
        res.send(addressOrder);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");

    }

};
//AddressOrder//

//Order//
exports.saveOrder = async (req, res) => {
    try {
        let { sendOrder, id } = req.body;
        let user = await User.findOne({ username: req.user.username }).exec();
        let userCart = await Cart.findOne({ _id: id })
            .populate('products.product').populate('products.owner').exec();
        const orderTotal = userCart.cartTotal

        //Groub Owner seller//
        let groub_owner = await Cart.aggregate([
            { $group: { _id: '$products.owner' } }])

        let seller_arr = groub_owner[0]._id
        let sellerID = seller_arr.map((item) => {
            return item.toString()
        })

        let fixowner = [...new Set(sellerID)]

        //loop save order
        fixowner.map(async (seller) => {
            let userseller = await User.findOne({ _id: seller }).exec();
            let order = {}
            const productsresult = []
            let result = {}
            let cartTotal = 0;

            for (const product of userCart.products) {

                if (product.owner.username === userseller.username) {
                    cartTotal = cartTotal + product.price * product.count;
                    productsresult.push(product)
                }
            }

            if (productsresult.length > 0) {
                order.products = productsresult
                order.cartTotal = cartTotal
                result = order
            }

            let ans = await new Order({
                products: result.products,
                orderBy: user._id,
                cartTotal: result.cartTotal,
                addressOrder: sendOrder._id,
            }).save();

        })

        // + - product
        let bulkOption = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    // update: { $inc: { quantity: -item.count, sold: +item.count } }
                    update: { $inc: { quantity: -item.count } }

                }
            }
        })

        //+ - wallet 
        let admin = await User.findOne({ username: 'admin' }).exec();
        let wallet_oldadmin = await Wallet.findOne({ owner: admin._id })
        let wallet_olduser = await Wallet.findOne({ owner: user._id })

        let wallet_totaladmin = Number(wallet_oldadmin.pocketmoney) + orderTotal
        let wallet_totaluser = Number(wallet_olduser.pocketmoney) - orderTotal

        let totalsadmin = await Wallet.findOneAndUpdate({ owner: admin._id }, { pocketmoney: wallet_totaladmin })
        let totalsuser = await Wallet.findOneAndUpdate({ owner: user._id }, { pocketmoney: wallet_totaluser })

        let updated = await Product.bulkWrite(bulkOption, {})

        if (totalsadmin && totalsuser && updated) {
            res.send(updated);
        }
    } catch (err) {
        res.status(500).send("Server Error!");
    }

};

exports.getOrder = async (req, res) => {
    try {

        const user = await User.findOne({ username: req.user.username }).exec();
        let order = await Order.find({ orderBy: user._id }).populate('products.product').populate('addressOrder', '_id sendOrder ').exec();
        res.json(order);

    } catch (err) {
        res.status(500).send("getOrders Error!");
    }

};

exports.getOrderSeller = async (req, res) => {
    try {
        const { status } = req.params
        const user = await User.findOne({ username: req.user.username }).exec();
        let orderseller = await Order.find({ products: { $elemMatch: { owner: user._id } }, orderStatus: status })
            .populate('products.product').populate('products.owner').populate('addressOrder', '_id sendOrder ')
            .exec();
        res.json(orderseller)

    } catch (err) {
        res.status(500).send("getOrders Error!");
    }

};

exports.getOrderStatus = async (req, res) => {
    try {
        const { status } = req.params
        const user = await User.findOne({ username: req.user.username }).exec();
        let order = await Order.find({ orderBy: user._id, orderStatus: status }).populate('products.product').populate('addressOrder', '_id sendOrder ').exec();
        res.json(order);

    } catch (err) {
        console.log(err);
        res.status(500).send("getOrders Error!");
    }

};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body;
        if (status === 'Confirm received') {

            let order = await Order.findOne({ _id: id }).exec()

            //+ - wallet 
            let admin = await User.findOne({ username: 'admin' }).exec();

            let wallet_oldadmin = await Wallet.findOne({ owner: admin._id })
            let wallet_oldseller = await Wallet.findOne({ owner: order.products[0].owner })

            let wallet_totaladmin = Number(wallet_oldadmin.pocketmoney) - order.cartTotal
            let wallet_totalseller = Number(wallet_oldseller.pocketmoney) + order.cartTotal

            let totalsadmin = await Wallet.findOneAndUpdate({ owner: admin._id }, { pocketmoney: wallet_totaladmin })
            let totalsseller = await Wallet.findOneAndUpdate({ owner: order.products[0].owner }, { pocketmoney: wallet_totalseller })

            if (totalsadmin && totalsseller) {
                let orderupdate = await Order.findOneAndUpdate({ _id: id }, { orderStatus: status }).exec();
                res.json(orderupdate);
            }

        } else {
            let order = await Order.findOneAndUpdate({ _id: id }, { orderStatus: status }).exec();
            res.json(order);

        }

    } catch (err) {
        console.log(err);
        res.status(500).send("getOrders Error!");
    }

};

exports.updateDeliveryStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status, deliveryName, parcelNumber, deliveryTime } = req.body;
        let data = {
            deliveryName: deliveryName,
            parcelNumber: parcelNumber,
            deliveryTime: deliveryTime
        }
        let order = await Order.findOneAndUpdate({ _id: id }, { orderStatus: status, delivery: data }).exec();
        res.json(order);

    } catch (err) {
        res.status(500).send("getOrders Error!");
    }

};

//Wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        let user = await User.findOneAndUpdate(
            { username: req.user.username },
            { $addToSet: { wishlist: productId } }
        ).exec();
        res.send(user);

    } catch (err) {
        res.status(500).send("AddTo Wishlist Error");
    }
};

exports.getWishlist = async (req, res) => {
    try {
        let list = await User.findOne({ username: req.user.username })
            .select('wishlist')
            .populate('wishlist').exec();
        res.json(list);

    } catch (err) {
        res.status(500).send("Get Wishlist Error");
    }
};

exports.removeWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        let user = await User.findOneAndUpdate(
            { username: req.user.username },
            { $pull: { wishlist: productId } }).exec();

        res.send(user);

    } catch (err) {
        res.status(500).send("Remove Wishlist Error");
    }
};
//Wishlist