import express from 'express';
import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

export async function getMe(
  req: express.Request
): Promise<{ id: string } | undefined> {
  const accessToken = req.headers['authorization'];
  const refreshToken = req.cookies['refresh-token'];

  if (!accessToken && !refreshToken) return;

  try {
    if (accessToken) {
      const data = jwt.verify(
        accessToken,
        config.get('jwt.access.secret')
      ) as any;
      return { id: data.id } as { id: string };
    }
  } catch {
    if (!refreshToken)
      throw new AuthenticationError('Your session expired. Sign in again.');
  }
  // invalid access token (tell user to try and get access token again with
  // refresh token)
  // throw new AuthenticationError('Your session expired. Sign in again.');
}
