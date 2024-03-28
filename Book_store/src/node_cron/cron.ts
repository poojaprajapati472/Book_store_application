// cronJob.ts

import cron from 'node-cron';
import { BookModel } from '../model/book.model';
import { UserModel } from '../model/user.model';
import { sendBulkEmails } from '../nodemailer/sendbulkemail';

let lastNotificationTime :Date | null= null; // Track the time of the last notification

export function setupCronJob() {
    console.log("cron is running every minute");
    cron.schedule('* * * * *', async () => {
        try {
            const currentTime = new Date();
            if (!lastNotificationTime || (currentTime.getTime() - lastNotificationTime.getTime()> 5 * 60 * 1000)) {
                const lastHour = new Date(currentTime.getTime() - 5 * 60 * 1000);
                const newBooks = await BookModel.find({ createdAt: { $gte: lastHour } });
                console.log(newBooks, "new books that have been released")
                if (newBooks.length > 0) {
                    const retailUsers = await UserModel.find({ userType: 'Retail User' });
                    if (retailUsers.length > 0) {
                        const emailContent = `New books have been released: ${newBooks.map(book => book.title).join(', ')}`;
                        await sendBulkEmails(retailUsers.map(user => user.email), 'New Book Releases', emailContent);
                        lastNotificationTime = currentTime;
                    }
                }
            }
        } catch (error) {
            console.error('Error in cron job:', error);
        }
    });
}

// export function setupCronJob() {
//     console.log("crone is running in every  second")
//   cron.schedule('* * * * *', async () => {
//     try {
//       const lastHour = new Date(Date.now() - 5 * 60 * 1000);
//       const newBooks = await BookModel.find({ createdAt: { $gte: lastHour } });
//       console.log(newBooks,"newbooks that has been realesd")
//       if (newBooks.length > 0) {
//         const retailUsers = await UserModel.find({ userType: 'Retail User' });

//         if (retailUsers.length > 0) {
//           const emailContent = `New books have been released: ${newBooks.map(book => book.title).join(', ')}`;
//           await sendBulkEmails(retailUsers.map(user => user.email), 'New Book Releases', emailContent);
//         }
//       }
//     } catch (error) {
//       console.error('Error in cron job:', error);
//     }
//   });
// }
