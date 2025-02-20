const express = require('express');
const router = express.Router();
const questionController = require('../controller/questions');

router.post('/', questionController.create);
router.get('/', questionController.show);
router.delete('/:id', questionController.delete);
router.put('/:id' , questionController.update)

module.exports = router;
