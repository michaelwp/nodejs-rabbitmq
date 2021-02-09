const router = require("express").Router();
const rabbitMq = require("../controller/rabbitMq");

router.get("/send", rabbitMq.send);

module.exports = router
