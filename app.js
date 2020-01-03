const express = require("express");
const path = require("path");
const app = express();
const homeRouter = require("./routes/home.route");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/auth.route");
const cartRouter = require("./routes/cart.route");
const adminRouter = require("./routes/admin.route");
//sessions stored on DB
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
var flash = require("connect-flash");
//set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//serve public static files
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
//establish session
const store = new SessionStore({
  uri: "mongodb://localhost:27017/online-shop",
  collection: "mySessions"
});
// Catch errors
store.on("error", function(error) {
  console.log(error);
});
app.use(
  session({
    secret: require("./config").secretKey,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store,
    saveUninitialized: false
  })
);
app.use(flash());
//serve routes
app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);

app.use((req, res, next) => {
  const err = new Error("Page not found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.status + " " + err.message);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server listens on port ${PORT}`);
});
