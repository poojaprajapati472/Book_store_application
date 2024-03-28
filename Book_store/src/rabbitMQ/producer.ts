const amqp = require('amqplib');

async function sendPurchaseNotification(purchaseData: any) {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'purchase_notifications';
        const message = JSON.stringify(purchaseData);
        await channel.assertQueue(queue, { durable: false });
        await channel.sendToQueue(queue, Buffer.from(message));
        console.log(`Purchase notification sent: ${message}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error sending purchase notification:', error);
    }
}

export { sendPurchaseNotification };
