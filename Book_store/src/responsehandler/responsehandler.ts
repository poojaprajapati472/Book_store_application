
import { Response } from "express";
class ResponseHandler {
  async sendResponse(
    res: Response ,
    statusCode: number,
    success: boolean,
    message: string,
    data?: object,
  ) {
    const response = {
      statusCode: statusCode,
      success: success,
      message: message,
      data: data ? data : {},
    };
    res.status(statusCode).json(response);
  }

  async sendErrorResponse(
    res: Response ,
    statusCode: number,
    message: string,
    data?: object,
    type: string = 'BAD_REQUEST',
  ) {
    const response = {
      statusCode: statusCode,
      success: false,
      message: message,
      type: type,
    };
    throw Error
  }
}
export const handler =new ResponseHandler();
