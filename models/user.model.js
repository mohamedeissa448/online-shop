const mongoose = require("mongoose");
//to enforce unique values
var uniqueValidator = require("mongoose-unique-validator");
//to encrypt password
const bcrypt = require("bcryptjs");
const DB_URL = "mongodb://localhost:27017/online-shop";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
userSchema.plugin(uniqueValidator);

const User = mongoose.model("user", userSchema);
exports.createNewUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            var user = new User({ name: username, email, password: hash });
            user
              .save()
              .then(user => {
                mongoose.disconnect();
                resolve(user);
              })
              .catch(err => {
                console.log("\nxxx", err, "\n");
                mongoose.disconnect();
                reject(err);
              });
          });
        });
      })
      .catch(err => reject(err));
  });
};

exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        User.findOne({ email })
          .then(user => {
            if (user) {
              bcrypt.compare(password, user.password, function(err, res) {
                if (err) {
                  mongoose.disconnect();
                  return reject(err);
                }
                if (res) {
                  mongoose.disconnect();
                  resolve(user._id);
                } else {
                  mongoose.disconnect();
                  reject(new Error("Password incorrect|"));
                }
              });
            } else {
              mongoose.disconnect();
              reject(new Error("There is no user matching this email"));
            }
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
