const express = require('express');
const router = express.Router();

// @route GET api/users/test
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

module.exports = router;