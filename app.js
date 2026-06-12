require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");

const connectDB = require("./config/db");
const songRoutes = require("./routes/songRoutes");
const authRoutes = require("./routes/authRoutes");
const licenseRoutes = require("./routes/licenseRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use("/", authRoutes);
app.use("/songs", songRoutes);
app.use("/requests", licenseRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.redirect("/songs");
});

app.listen(PORT, () => {
  console.log(`Server běží na adrese http://localhost:${PORT}`);
});
