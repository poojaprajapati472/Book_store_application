import { Request, Response } from "express";
import { userservice } from "../service/user.service";
import { HttpStatusCode, STATUS_MSG } from "../constant/constant";
import { handler } from "../responsehandler/responsehandler";
import { LoginCredentials, signup } from "../interfaces/interface";


class user{
    // Retial user/Admin /Author signup 
    async signup(req:Request,res:Response){
        try {
            const data:signup=req.body;
            const result = await userservice.signupUser(data);
            return await handler.sendResponse(
                res,
                HttpStatusCode.Ok,
                true,
                STATUS_MSG.SUCCESS.message,
                result
              );
        } catch (error:any) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
                return await handler.sendErrorResponse(
                    res,
                    HttpStatusCode.BadRequest,
                    error?.message,
                    error?.errors,
                  );
            } else {
                console.error("Error signing up user:", error);
                return res.status(500).json({ message: "Error signing up user", error: error.message });
            }
        }             
    }
    // Retial user/Admin /Author login
    async login(req: Request, res: Response) {
        try {
            const { email, password } :LoginCredentials= req.body;
            const result = await userservice.loginuser(email,password)
            return await handler.sendResponse(
                res,
                HttpStatusCode.Ok,
                true,
                STATUS_MSG.SUCCESS.message,
                result
              );
        } catch (error:any) {
            return await handler.sendErrorResponse(
                res,
                HttpStatusCode.InternalServerError,
                error?.message,
                error?.errors,
              );
        }
    }
    //Retial user/Admin /Author profile data
    async getProfile(req:Request,res:Response){
        try{
            const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authentication token missing' });
        }
        const result= await userservice.getUserProfile(token);
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }
        return await handler.sendResponse(
            res,
            HttpStatusCode.Ok,
            true,
            STATUS_MSG.SUCCESS.message,
            result
        );
        } catch (error:any)
       {
        return await handler.sendErrorResponse(
            res,
            HttpStatusCode.InternalServerError,
            error?.message,
            error?.errors,
          );
        }
    }

}
export const getdata=new user()