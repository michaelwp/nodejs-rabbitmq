const amqp = require('amqplib/callback_api');
const url = process.env.RABBITMQ_URL

class RabbitMQ {
    static send(req, res) {
        amqp.connect(url, function (err1, connection) {
            if (err1) {
                res.status(500).json({
                   message: err1.message
                });
                return;
            }

            connection.createChannel(function (err2, channel) {
                if (err2) {
                    res.status(500).json({
                        message: err2.message
                    });
                    return;
                }

                const to = '0123456';
                const text = '123456';

                const message = `{"from":"Kanggo","to":"${to}","text":"${text}"}`

                const queue = 'otp';
                const msg = message;

                channel.assertQueue(queue, {
                    durable: false
                });

                channel.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
            });

            setTimeout(function () {
                connection.close();
                // process.exit(0);
            }, 500);

            res.status(200).json({
                message: "send !"
            })
        });
    }
}

module.exports = RabbitMQ
