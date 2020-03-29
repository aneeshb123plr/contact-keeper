const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");
const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator");

// @route GET /api/contacts
// @desc  Get all contacts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/contacts
// @desc  Create a new contact
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const { name, email, phone, type } = req.body;

      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT /api/contacts
// @desc  Update a contact
// @access Private
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, email, phone, type } = req.body;
    const contactDetails = {};
    if (name) contactDetails.name = name;
    if (email) contactDetails.email = email;
    if (phone) contactDetails.phone = phone;
    if (type) contactDetails.type = type;

    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not Authorised" });

    let updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      contactDetails,
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/contacts
// @desc  Delete a contact
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not Authorised" });

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: "Contact Removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
