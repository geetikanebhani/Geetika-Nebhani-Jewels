
const express = require("express");
const { protect, authorize } =
  require("../middleware/authMiddleware");

const router = express.Router();

// User and Admin
router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to the protected jewellery dashboard!",
    user: req.user
  });
});

// Admin only
router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Welcome to the Geetika Nebhani Jewels Admin Dashboard!"
    });
  }
);

module.exports = router;
