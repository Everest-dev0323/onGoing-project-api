const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const roleRoute = require("./routes/role");
const addressRoute = require("./routes/address");
const zipcodeRoute = require("./routes/zipcode");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const brandRoute = require("./routes/brand");
const attributeRoute = require("./routes/attribute");
const contactusRoute = require("./routes/contactus");
const contactinfoRoute = require("./routes/contactinfo");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const allergensRoute = require("./routes/allergens");
const dishRoute = require("./routes/dish");
const groceryRoute = require("./routes/grocery");
const driverRoute =  require("./routes/driver");
const vendorRoute = require("./routes/vendor");
const categoriesRoute = require("./routes/categories");
const subCategoriesRoute = require("./routes/subCagtegories");
const orderstatusRoute = require("./routes/orderstatus");
const localeRoute = require("./routes/locale");
const pagecatRoute = require("./routes/pagecat");
const pageRoute = require("./routes/page");
const helpRoute = require("./routes/help");
const testimonialRoute = require("./routes/testimonial");
const orderpaymentRoute = require("./routes/orderpayment");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
//.connect("mongodb+srv://aaronsoftech:aaron1616@pranaa.tzpq9.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors())

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/role", roleRoute);
app.use("/api/address", addressRoute);
app.use("/api/zipcode", zipcodeRoute);
app.use("/api/products", productRoute);
app.use("/api/brand", brandRoute);
app.use("/api/attribute", attributeRoute);
app.use("/api/contactus", contactusRoute);
app.use("/api/contactinfo", contactinfoRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/allergens", allergensRoute);
app.use("/api/dish", dishRoute);
app.use("/api/grocery", groceryRoute);
app.use("/api/driver", driverRoute);
app.use("/api/vendor", vendorRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/subCategories", subCategoriesRoute);
app.use("/api/orderstatus", orderstatusRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/locale", localeRoute);
app.use("/api/page", pageRoute);
app.use("/api/help", helpRoute);
app.use("/api/testimonial", testimonialRoute);
app.use("/api/orderpayment", orderpaymentRoute);
app.use("/api/pagecat", pagecatRoute);

app.listen(process.env.PORT || 5001, () => {
  console.log("Backend server is running!");
});
