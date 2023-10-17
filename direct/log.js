const amqplib = require('amqplib')

const exchangeName = "directExchange"
const args = process.argv.slice(2)
const msg = args[1]
const logType = args[0]


const sendDirectMessage = async () =>{
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName, "direct",  { durable : false })
    await channel.publish(exchangeName, logType, Buffer.from(msg))
    console.log(" [x] Sent %s", msg)
    setTimeout(async()=>{
        await channel.close()
        process.exit(100)
    }, 500)

}

sendDirectMessage();

module.exports = logType;