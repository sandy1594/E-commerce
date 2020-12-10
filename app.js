const express = require("express");

const app = express();

var methodOverride = require("method-override");

const cookieParser = require("cookie-parser");

// Handlebars
const exphbs = require("express-handlebars");

app.use(methodOverride("_method"));

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    // handlebars: allowInsecurePrototypeAccess(exphbs),
  })
);

app.set("view engine", "handlebars");

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(express.static(__dirname + "/controllers"));

PORT = process.env.PORT || 3000;

const db = require("./config/database");

async function connectionToPostgres() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connectionToPostgres();

var session = require("express-session");

var Sequelize = require("sequelize");

var PostgreSqlStore = require("connect-pg-simple")(session);

app.use(
  session({
    store: new PostgreSqlStore({
      conString: "postgres://naren713:naren713@localhost:5432/ecommerce",
    }),
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use("/", require("./controllers/homePage"));
app.use("/", require("./controllers/viewProduct"));
app.use("/", require("./controllers/Cart"));
app.use("/", require("./controllers/Delete"));
app.use("/", require("./controllers/Login"));
app.use("/", require("./controllers/Register"));
app.use("/", require("./controllers/index"));
app.use("/", require("./controllers/PlaceOrder"));
app.use("/", require("./controllers/MyOrders"));
app.use("/", require("./controllers/Categories"));

app.listen(PORT, () => console.log("Server Started"));
