import { UserModel } from "../model/user.model";
import { sendPurchaseEmail } from "../nodemailer/mail.service";
const amqp = require('amqplib');

async function consumePurchaseNotifications() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'purchase_notifications';
        await channel.assertQueue(queue, { durable: false });

        channel.consume(queue, async (message:any) => {
            const purchaseData = JSON.parse(message.content.toString());
            console.log(`Received purchase notification: ${JSON.stringify(purchaseData)}`);

            const userData = await UserModel.findById(purchaseData.userId);
            if (userData && userData.email) { 
                const email = userData.email;
                sendPurchaseEmail(email, purchaseData);
            } else {
                console.error('User data not found or email not available.');
            }

        }, { noAck: true });
    } catch (error) {
        console.error('Error consuming purchase notifications:', error);
    }
}

export { consumePurchaseNotifications };






