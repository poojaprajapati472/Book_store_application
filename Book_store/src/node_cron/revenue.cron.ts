import { revenue_controller } from "../controller /revenue.controller";
const cron = require('node-cron');
cron.schedule('59 23 L * *', async () => {
    try {
        console.log('Running revenue calculation and sending emails...');
        await revenue_controller.revenue
        console.log('Revenue calculation and email sending complete.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}, {
    scheduled: true,
    timezone: 'Asia/Kolkata'

});
