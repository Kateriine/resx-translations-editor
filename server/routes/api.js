const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/assets/upload.php', (req, res) => {
  res.send('api works');
});

module.exports = router;
