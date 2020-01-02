const mongoose = require("mongoose");
//to enforce unique values
var uniqueValidator = require("mongoose-unique-validator");
//to encrypt password
const DB_URL = "mongodb://localhost:27017/online-shop";
const cartSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    default: 1
  },
  userId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});
const Cart = mongoose.model("cart", cartSchema);
exports.addNewItem = data => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL, err => {
        if (err) return reject(err);
        const item = new Cart(data);
        return item.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch(err => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getItemsByUserId = userId => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL, err => {
      if (err) {
        return reject(err);
      }

      Cart.find({ userId }, {}, { sort: { timestamp: 1 } })
        .then(carts => {
          mongoose.disconnect();
          resolve(carts);
        })
        .catch(err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
};
exports.editCart = (cartId, updatedData) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL, err => {
      if (err) {
        return reject(err);
      }

      Cart.update({ _id: cartId }, { $set: updatedData })
        .then(result => {
          mongoose.disconnect();
          resolve();
        })
        .catch(err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
};

exports.deleteCart = cartId => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL, err => {
      if (err) {
        return reject(err);
      }
      Cart.deleteOne({ _id: cartId })
        .then(result => {
          mongoose.disconnect();
          resolve();
        })
        .catch(err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
};

exports.deleteAllCarts = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL, err => {
      if (err) {
        return reject(err);
      }
      Cart.deleteMany({})
        .then(result => {
          mongoose.disconnect();
          resolve();
        })
        .catch(err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
};
