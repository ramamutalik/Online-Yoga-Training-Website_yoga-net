const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = process.env.PORT || 3000;
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const MongoDbStore = require("connect-mongo");

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

let mongoStore = new MongoDbStore({
  mongoUrl: process.env.MONGODB_URI,
  collection: "sessions",
});

//session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24HOUR
  })
);
app.use(flash());

//passport config
const passportInit = require("./server/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const routes = require("./server/routes/YogaRoute.js");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
