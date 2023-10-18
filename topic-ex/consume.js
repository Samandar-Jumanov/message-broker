const amqplib = require('amqplib');

const topicName = 'topicName';

const consumeTopicMessage = async (routingKey) => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(topicName, 'topic');
  const queue = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(queue.queue, topicName, routingKey);
  console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue.queue);
  channel.consume(queue.queue, (msg) => {
    console.log(' [x] Received %s', msg.content.toString());
    channel.ack(msg);
  }, { noAck: false });
};

const routingKey = process.argv[2]; // Read the routing key from command line arguments

if (!routingKey) {
  console.error('Please provide a routing key');
  process.exit(1);
}

consumeTopicMessage(routingKey)
  .catch((error) => {
    console.error('An error occurred:', error);
    process.exit(1);
  });
  