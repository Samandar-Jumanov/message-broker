const amqplib = require('amqplib')


const exchangeName = "directExchange"


const consumeDirectMessage = async () => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, "direct",  { durable : false })
    const queue = await channel.assertQueue('', { exclusive: true })
    await channel.bindQueue(queue.queue, exchangeName, "error")
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue.queue)
    channel.consume(queue.queue, (msg) => {
        console.log(" [x] Received %s", msg.content.toString())
        channel.ack(msg)
    }, { noAck: false })
}

consumeDirectMessage()