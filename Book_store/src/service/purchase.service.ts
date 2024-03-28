import { BookModel } from "../model/book.model";
import { PurchaseHistoryModel } from "../model/purchase.model";
import Jwt from "jsonwebtoken";
import { sendPurchaseNotification } from "../rabbitMQ/producer";
import Stripe from "stripe";
import { createPaymentIntent } from "../global/global.funtion";
import appConfig from "../common/config";

const stripe = new Stripe(
 appConfig.env.SECRET_KEY_s
);


class PurchaseService {
  //Buybook function is used to buy book by a user
  async buyBook(data: any) {
    try {
      const book = await BookModel.findById(data.bookId);
      if (!book) {
        throw new Error("Book not found.");
      }
      if (data.price !== book.price) {
        throw new Error("Purchasing price must match the book price.");
      }
      const paymentIntent = await createPaymentIntent(data);
      const purchase = new PurchaseHistoryModel({
        bookId: data.bookId,
        userId: data.userId,
        purchaseDate: data.purchaseDate,
        price: data.price,
        chargeId: paymentIntent.id,
      });
      const savedPurchase = await purchase.save();
      await BookModel.updateOne(
        { _id: data.bookId },
        { $inc: { sellCount: 1 } }
      );
      await sendPurchaseNotification(savedPurchase);
      return savedPurchase;
    } catch (error) {
      console.error("Error in buyBook:", error);
      throw error;
    }
  }
  //viewhsitory function is used to view history by retial users
  async viewHistory(token: string | undefined) {
    try{
      if (!token) {
        throw new Error("Token not provided");
      }
      const decodedToken: any = Jwt.verify(token, "book");
      const id = decodedToken.userId;
      if (!decodedToken.role || decodedToken.role !== "Retail User") {
        throw new Error("User does not have permission to view purchase history");
      }
      const history = await PurchaseHistoryModel.find({ userId: id });
      return history;
    }
    catch(error)
    {
      console.log(error,"error=============")
    }
  }
}

export const purchaseService = new PurchaseService();
