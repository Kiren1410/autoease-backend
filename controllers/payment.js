const crypto = require("crypto");
const { BILLPLZ_X_SIGNATURE } = require("../config");
const Booking = require("../models/Booking");

const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  // verify the signature
  const billplz_string = `billplzid${billplz_id}|billplzpaid_at${billplz_paid_at}|billplzpaid${billplz_paid}`;
  const x_signature = crypto
    .createHmac("sha256", BILLPLZ_X_SIGNATURE)
    .update(billplz_string)
    .digest("hex");
  // compare the x signature with the one from billplz
  if (x_signature !== billplz_x_signature) {
    throw new Error("Signature not valid");
  } else {
    // if signature is correct, update the order status and also payment date

    //find the order using billplz id
    const selectedBooking = await Booking.findOne({ billplz_id: billplz_id });

    // check if Booking exists
    if (!selectedBooking) {
      // if Booking not found, throw error
      throw new Error("Booking not found");
    } else {
      // if Booking is found, update the Booking
      selectedBooking.status = billplz_paid === "true" ? "paid" : "failed";
      selectedBooking.paid_at = billplz_paid_at;

      // save the Booking
      const updatedBooking = await selectedBooking.save();
      return updatedBooking;
    }
  }
};

module.exports = {
  verifyPayment,
};
