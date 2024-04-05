import Redis from "ioredis";
import { UserModel } from "../model/user.model";
const bcrypt=require('bcrypt')
import jwt from 'jsonwebtoken';
import appConfig from "../common/config";
const client = new Redis({
    host: '0.0.0.0', 
    port: 6379,
});

class UserService {
    
    async signupUser(userData: any) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
            const newUser = new UserModel({
               ...userData,password:hashedPassword
            });
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw error
        }
    }
    async loginuser(email :string,password:string){
        const userData= await UserModel.findOne({email})
        if (!userData) {
            throw new Error('Authentication failed. User not found.');
        }
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
            throw new Error('Authentication failed. Incorrect password.');
        }
        const token = jwt.sign(
            { userId: userData._id,email: userData.email, role: userData.userType },
         'book',
            { expiresIn: '2h' } 
        );
        await client.set(`session:${userData.email}`, JSON.stringify({ userData, token }), 'EX', 7200);
        return {userData,token};
    }
    async getUserProfile(token: string | undefined) {
        if (!token) {
            throw new Error('Authentication token missing');
        }

        const decodedToken: any = jwt.verify(token, 'book');
        const userEmail = decodedToken.email;
        const user = await UserModel.findOne({ email: userEmail });
        
        return user;
    }
}
export const userservice=new UserService ();
