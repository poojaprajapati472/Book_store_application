import { Document, Schema, model } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  userType: 'Author' | 'Admin' | 'Retail User';
}

const userSchema = new Schema<User>({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  userType: { type: String, enum: ['Author', 'Admin', 'Retail User'] }
});

export const UserModel = model<User>('User', userSchema);
