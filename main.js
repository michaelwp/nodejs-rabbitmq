const express = require('express');
const app = express();
const port = 3000;
const rabbitMq = require('./rabbitMq');

app.get('/send', rabbitMq.send);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
