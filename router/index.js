const router = require('express').Router();
const rabbitMq = require('./rabbitMq');

router.use("/", rabbitMq);

module.exports = router;
