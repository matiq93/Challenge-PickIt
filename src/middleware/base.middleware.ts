import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Middleware } from "express-validator/src/base";

export class BaseMiddleware{

    public validateFields(req: Request, resp: Response, next:any){ 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return resp.status(400).json({ errors: errors.array()});
        }
        next();
    }
}