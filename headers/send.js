const amqplib = require('amqplib');

const headersName = "headers"
const args = process.argv.slice(2);
const msg = args[0] || "Different text"

const sendMessage = async () =>{
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange(headersName , "headers", { durable : false });
    await channel.publish(headersName,  "",  Buffer.from(msg) , {headers:{ account :'new' , method :'google'}});
    console.log('Sent message : ', msg)
    setTimeout(async () =>{
        process.exit(100)
    }, 500) 
   
}

sendMessage();