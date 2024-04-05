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






// import { UserModel } from "../model/user.model";

// const amqp = require('amqplib');
// const nodemailer = require('nodemailer');

// async function consumePurchaseNotifications() {
//     try {
//         const connection = await amqp.connect('amqp://localhost');
//         const channel = await connection.createChannel();
//         const queue = 'purchase_notifications';
//         await channel.assertQueue(queue, { durable: false });
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             port: 587,
//             secure: false, 
//             auth: {
//                 user: 'siddhis01472@gmail.com', 
//                 pass: 'poccmbtfxzgfzwqt' 
//             }
//         });
//         channel.consume(queue, async (message:any) => {
//             const purchaseData = JSON.parse(message.content.toString());
//             console.log(`Received purchase notification: ${JSON.stringify(purchaseData)}`);
//         const data =await UserModel.findById(purchaseData.userId)
//         if (data && data.email) { 
//             const email = data.email;
//             const mailOptions = {
//                 from: 'siddhis01472@gmail.com',
//                 to: email,
//                 subject: 'New Purchase Notification',
//                 html: `
//                     <div style="background-color: #f0f0f0; padding: 20px;">
//                         <h2 style="color: #333;">Congratulations! You've successfully purchased a book from our app.</h2>
//                         <div style="margin-top: 20px;">
//                             <h3 style="color: #666;">Purchase Details:</h3>
//                             <ul>
//                                 <li><strong>Book ID:</strong> ${purchaseData.bookId}</li>
//                                 <li><strong>User ID:</strong> ${purchaseData.userId}</li>
//                                 <li><strong>Purchase Date:</strong> ${purchaseData.purchaseDate}</li>
//                                 <li><strong>Price:</strong> $${purchaseData.price}</li>
//                             </ul>
//                         </div>
//                     </div>
//                 `
//             };
//             transporter.sendMail(mailOptions, (error: any, info: any) => {
//                 if (error) {
//                     console.error('Error sending email:', error);
//                 } else {
//                     console.log('Email notification sent:', info.response);
//                 }
//             });
//         }else{
//             console.error('User data not found or email not available.');
//         }
//         }, { noAck: true });
//     } catch (error) {
//         console.error('Error consuming purchase notifications:', error);
//     }
// }

// export {consumePurchaseNotifications};