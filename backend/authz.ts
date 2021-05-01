import { Request, Response } from 'express';
import { apiConfig } from './api-config';
import * as jwt from 'jsonwebtoken';

export const handleAuthorization = (req: Request, res: Response, next) => {
    const token = extractToken(req)

    if (!token) {
        res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"')
        res.status(401).json({ message: 'Você precisa se autenticar.' })
    } else {
        jwt.verify(token, apiConfig.secret, (error, decoded) => {
            if (decoded) {
                next()
            } else {
                res.status(403).json({ message: 'Não autorizado.' })
            }
        })
    }
}

function extractToken(req: Request): string {
    let token = undefined;
    if (req.header && req.headers.authorization) {
        const parts: string[] = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}