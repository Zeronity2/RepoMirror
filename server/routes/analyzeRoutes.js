const express = require("express");

const {
  analyzeRepository,
} = require("../controllers/analyzeController");

const router = express.Router();

router.post("/analyze", analyzeRepository);

module.exports = router;