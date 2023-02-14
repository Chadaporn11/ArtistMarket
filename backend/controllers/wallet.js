const Wallet = require("../models/Wallet");
const User = require("../models/User");


exports.createWallet = async (req, res) => {
  try {
    const { _id, username, password, phone } = req.wallet;
    var userwallet = await Wallet.findOne({ owner: _id }).exec();
    if (userwallet) {
      return res.status(400).send("Register Success, But Wallet Already exists");
    }
    let wallet = await new Wallet({
      walletName: username + phone,
      password: password,
      owner: _id,
    });
    await wallet.save(async (err, data) => {
      if (err) {
        res.status(401).send("Can not Create Wallet!, " + err)

      } else {
        console.log(data);
        await User.findOneAndUpdate(
          { _id: data.owner },
          { walletUser: data._id }
        );
        res.status(200).send("Register and Create Wallet Success!")
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!",);
  }
};

exports.readWalletById = async (req, res) => {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findOne({ _id: id}).select("-password").exec();
    console.log("wallet",wallet)
    res.status(200).send(wallet)
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");

  }
};
