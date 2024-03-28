import { Document, Schema, Types, model } from 'mongoose';
interface Revenue extends Document {
    authorId: Types.ObjectId;
    month: number;
    year: number; 
    totalRevenue: number; 
}
const revenueSchema = new Schema<Revenue>({
    authorId: { type: Schema.Types.ObjectId, ref: 'Author', required: true }, 
    month: { type: Number, required: true },
    year: { type: Number, required: true },
    totalRevenue: { type: Number, required: true },
});


export const RevenueModel = model<Revenue>('Revenue', revenueSchema);
