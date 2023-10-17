const amqplib = require('amqplib')

const queueName = "Hello"

const recieveMessage = async () =>{
    const connection =  await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName )
    console.log(`${queueName} is ready to recieve messages`)
    await channel.consume(queueName , msg =>{
        console.log(" [x] Received %s", msg.content.toString())
    } , { noAck: true })
    console.log('Message is recieved')
   
}

recieveMessage()

//Method is consume recieves callback
