const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    // Check user
    const { username, email, password, phone } = req.body;
    var user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User Already exists");
    }
    user = new User({
      username,
      email,
      password,
      phone,
    });
    // Encrypt (makeHash)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save((err, data) => {
      if (err) {
        res.status(401).send("Can not Register!, " + err)

      } else {
        console.log(data);
        console.log('Register Success')
        req.wallet = data;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!",);
  }
};

exports.registerSeller = async (req, res, next) => {
  try {
    // Check user
    const { username, email, password, phone, role } = req.body;
    console.log(role)
    var user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User Already exists");
    }
    user = new User({
      username,
      email,
      password,
      phone,
      role,
    });
    // Encrypt (makeHash)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save((err, data) => {
      if (err) {
        res.status(401).send("Can not Register!, " + err)

      } else {
        console.log(data);
        console.log('Register Success')
        req.wallet = data;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!",);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    var user = await User.findOneAndUpdate({ email }, { new: true }).populate('walletUser');
    if (user) {
      // Check Password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json("Password Invalid!!");
      }
      // Payload
      const payload = {
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
          walletUser: user.walletUser,
        },
      };
      // Generate Token
      jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).send({ token, payload });
      });
    } else {
      return res.status(400).send("User Not found!!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!",);
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
      .populate('walletUser', '_id walletName pocketmoney')
      .select("-password")
      .exec();
    console.log('currentUser', user);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!",);

  }
};

