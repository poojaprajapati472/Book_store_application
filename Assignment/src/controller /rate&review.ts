import { HttpStatusCode, STATUS_MSG } from "../constant/constant";
import { handler } from "../responsehandler/responsehandler";
import { Request,Response } from "express";
import { rating_service } from "../service/rate&review.service";
import { RatingRequest } from "../interfaces/interface";

class rate{
    // Rating of the book
        async rate(req:Request,res:Response){
        try {
            const data:RatingRequest =req.body;
            const result = await rating_service.rate(data)
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
                console.error("Error rating in book:", error);
                return res.status(500).json({ message: "Error rating in book", error: error.message });
            }
        }
        }      

}
export const rating_controller=new rate();