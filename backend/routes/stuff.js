const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffController.createThing);

router.get('/:id', auth, stuffController.getThing);

router.get('/', auth, stuffController.getThings);

router.put('/:id', auth, multer, stuffController.modifyThing);

router.delete('/:id', auth, stuffController.deleteThing);

module.exports = router;
