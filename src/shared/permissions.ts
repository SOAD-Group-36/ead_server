import {Request, Response} from "express";

function IsAuthenticated(req: Request,res: Response,next){
    if(req.){
        next();
    }else{
        next(new Error(401));
    }
}
