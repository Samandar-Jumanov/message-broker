const amqp = require('amqplib');

async function rpcClient() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Create a temporary callback queue for receiving the response
    const  queue  = await channel.assertQueue('', { exclusive: true });

    // Generate a unique correlation ID for this request
    const correlationId = generateUuid();

    // Set up a consumer to listen for the response
    const responsePromise = await channel.consume(queue.queue, msg => {
        if (msg.properties.correlationId === correlationId) {
         console.log('Received response:', msg.content.toString());
          return;
        }
      });
  
    const request = 'Hello, RPC server!';
    channel.sendToQueue('rpc',    Buffer.from(request.toString()), {
      correlationId,
      replyTo: queue.queue.toString()
    });

    // Wait for the response
    const response = await responsePromise;
    console.log('Response:', response);

  } catch (error) {
    console.error('Error:', error);
  }
}

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}

rpcClient()
