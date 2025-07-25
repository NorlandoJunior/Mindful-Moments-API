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
 *   get:
 *     summary: Get an entry by ID
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entry data
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', entryController.getEntryById);

/**
 * @swagger
 * /api/entries/{id}:
 *   put:
 *     summary: Update an entry by ID
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mood:
 *                 type: string
 *               reflection:
 *                 type: string
 *               minutesMeditated:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Entry updated
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', entryController.updateEntry);

/**
 * @swagger
 * /api/entries/{id}:
 *   delete:
 *     summary: Delete an entry by ID
 *     tags: [Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the entry to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entry deleted successfully
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', entryController.deleteEntry);

module.exports = router;
