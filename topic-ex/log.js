const amqb = require('amqplib')

const topicName = "topicName"
const args = process.argv.slice(2) 
const msg  = args[1] || "hello  world "
const key = args[0]

const sendTopic = async () =>{
   
    const connection = await amqb.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertExchange(topicName, "topic", { durable : true })
    await  channel.publish(topicName,key , Buffer.from(msg), { persistent : true })
    console.log(" [x] Sent %s", msg)

    setTimeout(async ()=>{
        await channel.close()
        process.exit(100)
    }, 500)
} 

sendTopic()
 
