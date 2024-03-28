import { Request, Response } from "express";
import { bookdata } from "../service/book.service";
import { handler } from "../responsehandler/responsehandler";
import { HttpStatusCode, STATUS_MSG } from "../constant/constant";
import { Book } from "../interfaces/interface";
import { BookModel } from "../model/book.model";

class book {
// adding the book to the database
  async booksdata(req: Request, res: Response) {
    try {
      const data: Book = req.body;
      const token = req.headers.authorization?.split(" ")[1];
      const booksdata = await bookdata.aboutbook(data, token);
      return await handler.sendResponse(
        res,
        HttpStatusCode.Ok,
        true,
        STATUS_MSG.SUCCESS.message,
        booksdata
      );
    } catch (error: any) {
      return await handler.sendErrorResponse(
        res,
        HttpStatusCode.BadRequest,
        error?.message,
        error?.errors
      );
    }
  }
  //seraching  book by id
  async searchbyId(req: Request, res: Response) {
    try {
      const bookId: string = req.params.bookId;
      const book = await bookdata.searchbyIds(bookId);
      if (!book) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({ message: "Book not found" });
      }
      return await handler.sendResponse(
        res,
        HttpStatusCode.Ok,
        true,
        STATUS_MSG.SUCCESS.message,
        book
      );
    } catch (error: any) {
      return await handler.sendErrorResponse(
        res,
        HttpStatusCode.BadRequest,
        error?.message,
        error?.errors
      );
    }
}
}
export const book_controller = new book();
