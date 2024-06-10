const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { MONGODB_URL } = require("./config");

const app = express();

//middleware for json req
app.use(express.json());
// set the uploads folder as static path
app.use("/uploads", express.static("uploads"));

//setup cors policy IMPORTANT
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});

app.use(corsHandler);
mongoose
  .connect(MONGODB_URL + "autoease")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const vehicleRouter = require("./routes/vehicle");
const categoryRouter = require("./routes/category");
const bookingRoute = require("./routes/booking");
const paymentRoute = require("./routes/payment");
const imagesRoute = require("./routes/images");
const userRoute = require("./routes/user");
const dateRoute = require("./routes/date");

app.use("/vehicles", vehicleRouter);
app.use("/categories", categoryRouter);
app.use("/bookings", bookingRoute);
app.use("/payment", paymentRoute);
app.use("/images", imagesRoute);
app.use("/users", userRoute);
app.use("/dates", dateRoute);

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
