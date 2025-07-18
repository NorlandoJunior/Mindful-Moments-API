const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all routes
router.use(authMiddleware);

router.get('/', entryController.getEntries);
router.post('/', entryController.createEntry);

module.exports = router;
