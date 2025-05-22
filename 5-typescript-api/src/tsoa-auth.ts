import { Request } from 'express';
import { verifyToken } from '@utils/jwt';

export const expressAuthentication = async (
  request: Request,
  securityName: string
): Promise<object> => {
  if (securityName === 'bearerAuth') {
    const authHeader = request.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('No or invalid token');
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      throw new Error('Invalid or expired token');
    }
    return decoded;
  }
  throw new Error(`Unknown security: ${securityName}`);
};
