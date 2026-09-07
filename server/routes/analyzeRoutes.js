const express = require("express");

const {
  analyzeRepository,
} = require("../controllers/analyzeController");

const router = express.Router();

router.post("/analyze", analyzeRepository);

console.log("ANALYZE ROUTES LOADED");

module.exports = router;