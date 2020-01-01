const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/online-shop";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});
const Product = mongoose.model("product", productSchema);
exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Product.find()
          .then(products => {
            mongoose.disconnect();
            resolve(products);
          })
          .catch(err => {
            mongoose.disconnect();
            reject(err);
          });
      })
      .catch(err => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getProductsByFilter = category => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Product.find({ category })
          .then(products => {
            mongoose.disconnect();
            resolve(products);
          })
          .catch(err => {
            mongoose.disconnect();
            reject(err);
          });
      })
      .catch(err => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getProductById = id => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Product.findById(id)
          .then(product => {
            mongoose.disconnect();
            resolve(product);
          })
          .catch(err => {
            mongoose.disconnect();
            reject(err);
          });
      })
      .catch(err => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getFirstProductInDB = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        Product.findOne()
          .then(product => {
            mongoose.disconnect();
            resolve(product);
          })
          .catch(err => {
            mongoose.disconnect();
            reject(err);
          });
      })
      .catch(err => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
