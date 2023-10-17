const amqplib = require('amqplib')


const queueName = "task"

const recieveTask = async () => {
   const connection = await amqplib.connect('amqp://localhost')
   const channel = await connection.createChannel()
   await channel.assertQueue(queueName, { durable : true })
   channel.prefetch(1)
   console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName)
   channel.consume(queueName, (msg) => {
       console.log(" [x] %s", msg.content.toString())
    channel.ack(msg)
    console.log(" [x] Done")

   } , { noAck : false })

   channel.on('error', (err) => {
       console.log(err)
   })

   channel.on('close', () => {
       console.log(" [x] Connection closed")
   })
}


recieveTask()