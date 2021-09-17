const express = require('express');
const router = express.Router();

router.use('/edt', require('./edt'));
router.use('/id', require('./id'));

module.exports = router;