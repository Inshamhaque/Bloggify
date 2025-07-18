import { Request, Response, NextFunction } from 'express'
export const validateApiKey = (req:Request, res:Response, next:NextFunction) => {
  const providedKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  
  if (providedKey !== process.env.BLOCKNOTE_AI_SERVER_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};