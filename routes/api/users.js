const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const User = require("../../models/User");

/**
 * @route   GET
 * @desc    Get all users
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route   GET
 * @desc    Get User
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ errors: [{ error: "User Not Found" }] });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @route   POST
 * @desc    Add User
 * @access  Public
 */
router.post(
  "/",
  [
    check("firstname", "First Name is required").not().isEmpty(),
    check("middlename", "Middle Name is required").not().isEmpty(),
    check("lastname", "Last Name is required").not().isEmpty(),
    check("gender", "Gender is required").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check("phone", "Phone number is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return rez
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      }

      user = new User(req.body);

      await user.save();

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route   PUT
 * @desc    Edit User
 * @access  Public
 */
router.put(
  "/edit/:id",
  [
    check("firstname", "First Name is required").not().isEmpty(),
    check("middlename", "Middle Name is required").not().isEmpty(),
    check("lastname", "Last Name is required").not().isEmpty(),
    check("gender", "Gender is required").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check("phone", "Phone number is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newData = {
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      gender: req.body.gender,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    };

    try {
      const user = await User.findByIdAndUpdate(req.params.id, newData, {
        new: true,
      });

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @route   DELETE
 * @desc    Delete User
 * @access  Public
 */
router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
