import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken';

const SECRET_KEY = process.env.PUBLIC_KEY || '';

interface PayloadResponse {
  username: string;
  email: string;
  resource_access: ResourceAccess;
}

type ResourceAccess = {
  pgm_manager: PgmManager;
};

type PgmManager = {
  roles: string[];
};

export function AuthMiddleware(userRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.headers['x-access-token'] as string;

    if (!access_token) {
      return res
        .status(401)
        .json({ message: 'Usuário não logado. Acesso não autorizado' });
    }

    const token = access_token.substring(7).trim();

    verify(token, SECRET_KEY, (error, payload: any) => {
      if (error instanceof TokenExpiredError) {
        return res
          .status(403)
          .json({ message: 'Token expirado. Acesso negado' });
      }

      if (error instanceof JsonWebTokenError) {
        return res
          .status(403)
          .json({ message: 'Token inválido. Acesso negado' });
      }

      const result: PayloadResponse = {
        username: payload.preferred_username,
        email: payload.email,
        resource_access: payload.resource_access,
      };

      const { email, username } = result;

      const rolesExistis = result.resource_access.pgm_manager.roles.some(
        (role) => userRoles.includes(role),
      );

      if (rolesExistis) {
        // @ts-ignore
        req.user = {
          username,
          email,
        };
        next();
      } else {
        res.status(403).json({
          message: 'Usuário não tem permissão para acessar esse recurso',
        });
      }
    });
  };
}
