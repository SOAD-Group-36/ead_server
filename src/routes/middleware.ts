import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { UserRoles } from '@entities/User';
import { cookieProps } from '@shared/constants';
import { JwtService } from '@shared/JwtService';



const jwtService = new JwtService();
const { UNAUTHORIZED } = StatusCodes;


// Middleware to verify if user is an admin
export const adminMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get json-web-token
        let jwt = req.signedCookies[cookieProps.key];
        if (!jwt) {
            jwt = req.headers.authorization;
        }
        if (!jwt) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an admin
        const clientData = await jwtService.decodeJwt(jwt);
        if (clientData.role === UserRoles.Admin) {
            res.locals.userId = clientData.id;
            next();
        } else {
            throw Error('JWT not present in signed cookie.');
        }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
};

// Middleware to verify if user is an Seller
export const SellerMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get json-web-token
        let jwt;
        // if (!jwt) {
            console.log(req.headers)
            jwt = req.headers['authorization'];
            console.log(jwt)
        // }
        if (jwt == undefined || jwt == null) {
            throw Error('JWT not present in signed cookie.');
        }
        // Make sure user role is an Seller
        const clientData = await jwtService.decodeJwt(jwt);
        if (clientData.role === UserRoles.Seller) {
            console.log(res.locals)
            console.log(clientData)
            res.locals.userId = clientData.id;
            next();
        } else {
            // throw Error('JWT not present in signed cookie.');
            next()
        }
    } catch (err) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
};
