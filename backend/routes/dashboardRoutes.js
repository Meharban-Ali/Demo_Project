// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');


router.get(
  '/stats', // 100 requests per 15 minutes
  getDashboardStats
);

module.exports = router;