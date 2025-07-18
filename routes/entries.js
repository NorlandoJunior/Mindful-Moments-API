const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all routes
router.use(authMiddleware);

// Other routes
router.get('/', entryController.getEntries);
router.post('/', entryController.createEntry);

// Delete route:
router.delete('/:id', entryController.deleteEntry);

module.exports = router;

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
