// email.service.ts

import { newBookPublished } from "./mail.service";

// import { sendPurchaseEmail } from "./mail.service";

// import { sendPurchaseEmail } from './email';
export async function sendBulkEmails(emails: string[], subject: string, content: string) {
  try {
    // console.log(emails,"emails--------------------------")
    const maxEmailsPerMinute = 100;
    const chunkSize = Math.ceil(emails.length / maxEmailsPerMinute);
    
    for (let i = 0; i < chunkSize; i++) {
      const start = i * maxEmailsPerMinute;
      const end = (i + 1) * maxEmailsPerMinute;
      const chunkEmails = emails.slice(start, end);

      await Promise.all(chunkEmails.map(email => newBookPublished(email, content )));
    }
    
    console.log('Bulk emails sent successfully');
  } catch (error) {
    console.error('Error sending bulk emails:', error);
    throw error;
  }
}
