import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken
} from './auth';
import { config } from '../../config';
import { User } from '../../models/User';

export const refreshAuth = async (req: Request, res: Response) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: '' });
  }

  let payload: any = null;
  try {
    payload = verify(token, config.get('jwt.refresh.secret'));
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: '' });
  }

  const repository = getConnection().getRepository(User);

  // Token is valid and we can now send back an access token
  const user = await repository.findOne({ id: payload.userId });

  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }

  if (user.count !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: '' });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
};
