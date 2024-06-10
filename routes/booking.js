const express = require("express");
const {
  getBookings,
  getBooking,
  addNewBooking,
  updateBooking,
  deleteBooking,
  updateSelectedDates,
} = require("../controllers/booking");

const router = express.Router();
const { isUserValid, isAdmin } = require("../middleware/auth");

router.put("/:id/selectedDates", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;
  try {
    const updatedBooking = await updateSelectedDates(id, startDate, endDate);
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get bookings
router.get("/", isUserValid, async (req, res) => {
  try {
    const bookings = await getBookings(req.user);
    res.status(200).send(bookings);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/:id", isUserValid, async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await getBooking(id);
    res.status(200).send(booking);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", isUserValid, async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      vehicles,
      totalPrice,
      status,
      startDate,
      endDate,
    } = req.body;
    const newBooking = await addNewBooking(
      customerName,
      customerEmail,
      vehicles,
      totalPrice,
      status,
      startDate,
      endDate
    );
    res.status(200).send(newBooking);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      vehicles,
      totalPrice,
      status,
      billplz_id,
      paid_at,
      startDate,
      endDate,
    } = req.body;
    const updatedBooking = await updateBooking(
      req.params.id,
      customerName,
      customerEmail,
      vehicles,
      totalPrice,
      status,
      billplz_id,
      paid_at,
      startDate,
      endDate
    );
    res.status(200).send(updatedBooking);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await getBooking(id);
    if (booking) {
      await deleteBooking(id);
      res.status(200).send("Deleted");
    } else {
      res.status(404).send("Booking not found");
    }
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
