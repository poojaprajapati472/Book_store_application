import slugify from "slugify";
import { BookModel } from "../model/book.model";
const cron = require('node-cron');
import  Jwt  from "jsonwebtoken";

class bookservice {
  //book service to add book to the database
  async aboutbook(data: any,token: any) {
    try {

    if (!token) {
        throw new Error('Token not provided');
    }
     const decodedToken: any = Jwt.verify(token, 'book');
     const id  = decodedToken.userId;
    if (!decodedToken.role || decodedToken.role !== 'Admin') {
        throw new Error('Admin does not have permission to create book');
    }
      const slugifiedTitle = slugify(data.title, { lower: true });
      const existingBook = await BookModel.findOne({ slug: slugifiedTitle });
      if (existingBook) {
        throw new Error('Title already exists');
      }
      const newBook = new BookModel({
        ...data,
        title: slugifiedTitle
      });
      const savedBook = await newBook.save();
      return savedBook;
    } catch (error) {
      throw error;
    }
  }
  //bookservice to search book by bookid
  async searchbyIds(bookId:any){

    try {
      return await BookModel.findById(bookId);
  } catch (error) {
      throw new Error('Failed to find book by ID');
  }

  }
 
}

export const bookdata = new bookservice();
