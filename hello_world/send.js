const amqplib = require('amqplib')

const queueName = "Hello"
const msg =  "Thank you"

const sendMessages = async (mesage) =>{
    const connection =  await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()  
    await channel.assertQueue(queueName )
    await channel.sendToQueue(queueName, Buffer.from(msg))
    console.log(" [x] Sent %s", msg)
    setTimeout(async()=>{
        await channel.close()
        process.exit(100)
    })
    console.log("Channel is closed")
}
sendMessages()

//Steps i did 
//1 : Create a queue
//2 : Create a message 
//3 : Create a connection 
//4 : Create a channel 
//5 : assert queue 
//6 : send toQuee (it is have content : Buffer : so Buffer.from(msg)) 
//7 : close the connection 

//Method is sendToQueue

