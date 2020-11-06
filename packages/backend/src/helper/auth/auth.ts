import { Response } from 'express';
import ms from 'ms';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { User } from '../../models/User';

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    maxAge: ms(config.get('jwt.refresh.duration') as string),
    httpOnly: true,
    path: '/refresh_token'
  });
};

const createToken = (
  userId: string,
  secret: string,
  expiresIn: string
): string => {
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

export const createAccessToken = (user: User): string => {
  return createToken(
    user.id.toString(10),
    config.get('jwt.access.secret'),
    config.get('jwt.refresh.duration')
  );
};

export const createRefreshToken = (user: User): string => {
  return createToken(
    user.id.toString(10),
    config.get('jwt.access.secret'),
    config.get('jwt.refresh.duration')
  );
};
