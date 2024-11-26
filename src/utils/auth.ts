import { sign, verify } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function generateToken(user: { id: number; email: string }) {
  return sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  try {
    return verify(token, JWT_SECRET) as { id: number; email: string };
  } catch {
    throw new AuthenticationError('Invalid or expired token');
  }
}