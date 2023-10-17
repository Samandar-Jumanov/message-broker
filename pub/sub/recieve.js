const amqplib = require('amqplib')

const  exchangeName = "logs"

const publisMessage = async () =>{
    console.log(" [*] Waiting for messages. To exit press CTRL+C")
    const  connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName ,  "fanout", { durable : false })
    const q = await channel.assertQueue("", {exclusive : true })    
    await channel.bindQueue(q.queue, exchangeName , "")
    console.log(q.queue)
    channel.consume(q.queue, async (msg) => {
        if(msg.content){
            console.log(" [x] Received %s", msg.content.toString())
        }
    } , {noAck : true})
}

publisMessage()

