const amqp = require('amqplib');

async function rpcServer() {
    try {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
  
      const queue = 'rpc';
      await channel.assertQueue(queue, { durable: false });
  
      console.log('Awaiting RPC requests...');
  
      channel.consume(queue, async msg => {
        const content = msg.content.toString();
        console.log('Received request:', content);
  
        const response = `RPC Server says: ${content.toUpperCase()}`;
  
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(response.toString()), {
          correlationId: msg.properties.correlationId
        });
  
        channel.ack(msg);
      } , { noAck : false });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  rpcServer();
  