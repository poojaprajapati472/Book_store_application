import { Document, Schema, model } from 'mongoose';

interface Book extends Document {
  bookId: string;
  authors: string[];
  sellCount: number;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
}

const bookSchema = new Schema<Book>({
  bookId: { type: String, unique: true, required: true },
  authors: [{ type: String, required: true }],
  sellCount: { type: Number, default: 0 },
  title: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 100, max: 1000 },
  createdAt: { type: Date, default: Date.now }
});

export const BookModel = model<Book>('Book', bookSchema);
