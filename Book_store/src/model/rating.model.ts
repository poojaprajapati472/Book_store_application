import { Document, Schema, Types, model } from 'mongoose';

interface Review extends Document {
  userId: Types.ObjectId; // Assuming user ID is stored as a string
  bookId: Types.ObjectId; // Assuming book ID is stored as a string
  rating: number;
  reviewText: string;
  createdAt: Date;
}

const reviewSchema = new Schema<Review>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ReviewModel = model<Review>('Review', reviewSchema);
