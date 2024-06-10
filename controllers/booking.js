const axios = require("axios");
const Booking = require("../models/Booking");
const {
  BILLPLZ_API_URL,
  BILLPLZ_API_KEY,
  BILLPLZ_COLLECTION_ID,
  FRONTEND_URL,
} = require("../config");

const getBookings = async (user) => {
  try {
    let filters = {};
    // only filter by customerEmail if the user is a normal user
    if (user && user.role === "user") {
      filters.customerEmail = user.email;
    }
    const bookings = await Booking.find(filters).sort({ _id: -1 });
    return bookings;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//get 1 booking
const getBooking = async (id) => {
  const booking = await Booking.findById(id);
  return booking;
};

const addNewBooking = async (
  customerName,
  customerEmail,
  vehicles,
  totalPrice,
  status,
  startDate,
  endDate
) => {
  // 1. create a bill in billplz
  const billplz = await axios({
    method: "POST",
    url: BILLPLZ_API_URL + "v3/bills",
    auth: {
      username: BILLPLZ_API_KEY,
      password: "",
    },
    data: {
      collection_id: BILLPLZ_COLLECTION_ID,
      email: customerEmail,
      name: customerName,
      amount: parseFloat(totalPrice) * 100,
      description: "Payment for booking",
      callback_url: "http://localhost:3000/verify-payment",
      redirect_url: "http://localhost:3000/verify-payment",
    },
  });

  // 2. retrieve the bill_url and bill id
  const billplz_id = billplz.data.id;
  const billplz_url = billplz.data.url;

  // 3. create a new booking
  const newBooking = new Booking({
    customerName,
    customerEmail,
    vehicles,
    totalPrice,
    status,
    billplz_id: billplz_id,
    startDate,
    endDate,
  });
  await newBooking.save();
  // 4. return back new booking with the bill_url
  return { ...newBooking._doc, billplz_url };
};

const updateBooking = async (
  booking_id,
  customerName,
  customerEmail,
  vehicles,
  totalPrice,
  status,
  billplz_id,
  paid_at,
  startDate,
  endDate
) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      booking_id,
      {
        customerName,
        customerEmail,
        vehicles,
        totalPrice,
        status,
        billplz_id,
        paid_at,
        startDate,
        endDate,
      },
      {
        new: true,
      }
    );
    return updatedBooking;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteBooking = async (id) => {
  try {
    await Booking.findByIdAndDelete(id);
    return true;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getBookings,
  getBooking,
  addNewBooking,
  updateBooking,
  deleteBooking,
};
