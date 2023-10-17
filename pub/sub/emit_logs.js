const amqplib = require('amqplib')

const  exchangeName = "logs"
const msg = process.argv.slice(2).join(" ") || "Hello World"

const publisMessage = async () =>{
    const  connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName , "fanout",  { durable : false })
    await channel.publish(exchangeName , "" , Buffer.from(msg), )
    console.log(" [x] Sent %s", msg)
    setTimeout(async()=>{
        await channel.close()
        process.exit(100)
    } , 500)
}

publisMessage()

