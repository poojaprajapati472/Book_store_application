import { Request,Response } from "express";
import { purchaseService } from "../service/purchase.service";
import { handler } from "../responsehandler/responsehandler";
import { HttpStatusCode, STATUS_MSG } from "../constant/constant";
import { PurchaseData } from "../interfaces/interface";

class purchasecontroller{
    // Purchase a book and send the email to the Retail user
    async purchase_book(req:Request,res:Response){
        try{

        const data:PurchaseData= req.body;
        const result = await purchaseService.buyBook(data);
        return await handler.sendResponse(
            res,
            HttpStatusCode.Ok,
            true,
            STATUS_MSG.SUCCESS.message,
            result
          );
        }
        catch(error:any)
        {
            return await handler.sendErrorResponse(
                res,
                HttpStatusCode.BadRequest,
                error?.message,
                error?.errors,
              );
        }
    }
    //purchase history can be accessed by the users 
    async view_history(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1]; 
            const history = await purchaseService.viewHistory(token);
            return await handler.sendResponse(
                res,
                HttpStatusCode.Ok,
                true,
                STATUS_MSG.SUCCESS.message,
                history
              );
        } catch (error:any) {
            return await handler.sendErrorResponse(
                res,
                HttpStatusCode.BadRequest,
                error?.message,
                error?.errors,
              );
        }
    }
}
export const purchase_book= new purchasecontroller();