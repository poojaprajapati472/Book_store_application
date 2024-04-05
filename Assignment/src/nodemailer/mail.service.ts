import appConfig from "../common/config";

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, 
    auth: {
        user: 'siddhis01472@gmail.com', 
        pass: 'poccmbtfxzgfzwqt' 
    }
});


function sendPurchaseEmail(email:string, purchaseData:any) {
    const mailOptions = {
        from: 'siddhis01472@gmail.com',
        to: email,
        subject: 'New Purchase Notification',
        html: `
            <div style="background-color: #f0f0f0; padding: 20px;">
                <h2 style="color: #333;">Congratulations! You've successfully purchased a book from our app.</h2>
                <div style="margin-top: 20px;">
                    <h3 style="color: #666;">Purchase Details:</h3>
                    <ul>
                        <li><strong>Book ID:</strong> ${purchaseData.bookId}</li>
                        <li><strong>User ID:</strong> ${purchaseData.userId}</li>
                        <li><strong>Purchase Date:</strong> ${purchaseData.purchaseDate}</li>
                        <li><strong>Price:</strong> $${purchaseData.price}</li>
                    </ul>
                </div>
            </div>
        `
    };
    transporter.sendMail(mailOptions, (error: any, info: { response: any; }) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email notification sent:', info.response);
        }
    });
}
function newBookPublished(email: string, bookTitle: string) {
    const mailOptions = {
        from: 'siddhis01472@gmail.com',
        to: email,
        subject: 'New Book Release Notification',
        html: `
            <div style="background-color: #f0f0f0; padding: 20px;">
                <h2 style="color: #333;">Exciting News! A New Book has been Released!</h2>
                <div style="margin-top: 20px;">
                    <p style="color: #666;">Dear Reader,</p>
                    <p style="color: #666;">We are thrilled to announce the release of a new book: <strong>${bookTitle}</strong>.</p>
                    <p style="color: #666;">Make sure to check it out and enjoy your reading!</p>
                    <p style="color: #666;">Happy reading!</p>
                </div>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error: any, info: { response: any; }) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email notification sent:', info.response);
        }
    });
}
    function sendmailtoauthor(authoremail:string,author:string ,revenue:any)
    {
         const mailOptions = {
                    from: 'siddhis01472@gmail.com',
                    to: authoremail,
                    subject: 'Updated Revenue Information',
                    text: `Dear ${author}, your revenue has been updated of  month is ${revenue}.`
                };
    transporter.sendMail(mailOptions, (error:any, info:{ response: any; }) => {
        if (error) {
            console.log('Error occurred while sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}
export { sendPurchaseEmail ,newBookPublished,sendmailtoauthor};
