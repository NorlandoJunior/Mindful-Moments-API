const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/entries:
 *   get:
 *     summary: Get all entries for the authenticated user
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of entries
 *       500:
 *         description: Internal server error
 */
router.get('/', entryController.getEntries);

/**
 * @swagger
 * /api/entries:
 *   post:
 *     summary: Create a new entry
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mood
 *             properties:
 *               mood:
 *                 type: string
 *                 example: Happy
 *               reflection:
 *                 type: string
 *                 example: Today was a very peaceful day.
 *               minutesMeditated:
 *                 type: number
 *                 example: 15
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["gratitude", "focus"]
 *     responses:
 *       201:
 *         description: Entry created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', entryController.createEntry);

/**
 * @swagger
 * /api/entries/{id}:
 *   delete:
