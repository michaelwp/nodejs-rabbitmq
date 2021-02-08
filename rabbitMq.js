const amqp = require('amqplib/callback_api');
const url = 'amqps://rvwestek:WtBNOsIVUGDiHe_Y02FANnqkFenJRg0A@barnacle.rmq.cloudamqp.com/rvwestek'
// const url = 'amqp://guest:guest@localhost:15672/'

class RabbitMQ {
    static send(req, res) {
        amqp.connect(url, function (err1, connection) {
            if (err1) {
                res.status(500).json({
                   message: err1.message
                });
                return;
            }

            connection.createChannel(function (error1, channel) {
                if (error1) throw error1;

                const queue = 'hello';
                const msg = 'Hello world';

                channel.assertQueue(queue, {
                    durable: false
                });

                channel.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
            });

            setTimeout(function () {
                connection.close();
                process.exit(0);
            }, 500);
        });
    }
}

module.exports = RabbitMQ
