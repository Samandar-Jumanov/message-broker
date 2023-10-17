const amqp = require('amqplib')

const queueName = "task"
const message = process.argv.slice(2).join(" ") || "Hello World"

const sendTask = async () =>{
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName , { durable : true })
    await  channel.sendToQueue(queueName , Buffer.from(message) , { persistent : true })
    console.log(" [x] Sent %s", message)
    setTimeout(async ()=>{
        await channel.close()
        process.exit(100)
    } , 500)
}

sendTask()