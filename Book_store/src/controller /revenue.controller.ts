import { BookModel } from "../model/book.model";
import { PurchaseHistoryModel } from "../model/purchase.model"
import { Request,Response } from "express";
import { UserModel } from "../model/user.model";
import { sendmailtoauthor } from "../nodemailer/mail.service";

class calculate_revenue{
    //generating reveneu of the perticular author whenevr book is purchased /we are calling this revenue function in revenue.crone.ts
    async revenue(req:Request,res:Response)
    {
        const purchase_history =await PurchaseHistoryModel.find();
        const groupedPurchaseHistory: Map<string, any[]> = new Map();
        for (const purchase of purchase_history) {
            const bookId = purchase.bookId.toString();
            if (!groupedPurchaseHistory.has(bookId)) {
                groupedPurchaseHistory.set(bookId, []);
            }
            groupedPurchaseHistory.get(bookId)?.push(purchase);
        }
        const revenueByUser: Map<string, number> = new Map();
        for (const [bookId, purchases] of groupedPurchaseHistory.entries()) {
            const book = await BookModel.findById(bookId);
            if (book) {
                const authors = book.authors;
                const price = book.price;
                const totalRevenueForBook = price * purchases.length;
                for (const author of authors) {
                    if (!revenueByUser.has(author)) {
                        revenueByUser.set(author, 0);
                    }
                    revenueByUser.set(author, revenueByUser.get(author)! + totalRevenueForBook);
                   
                }
            }
        }
        for (const [author, revenue] of revenueByUser.entries()) {
            const authorDetails = await UserModel.findOne({ userType: 'Author', username: author });
            if (authorDetails) {
                const authorEmail = authorDetails.email;
                sendmailtoauthor(authorEmail, author, revenue);
            }
        }
        res.status(200).json(Array.from(revenueByUser.entries()));
    }

}
export const revenue_controller=new calculate_revenue()