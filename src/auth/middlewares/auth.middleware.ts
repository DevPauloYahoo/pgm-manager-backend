import {NextFunction, Request, Response} from 'express';
import {JsonWebTokenError, TokenExpiredError, verify} from 'jsonwebtoken';

const SECRET_KEY =
  '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjFalxwZAg6Vy0GJ6h2Gl7b3OJcKkWPZtaovbTMogEcjQE0mCj/pUjQzZq//zfg4Ch63p9eglIXxiCKY0JjdMTY8YTtIqHGH7G+Z8yeK8BlOmqEPzy8x9bEPNIAcQHb3mhp2BsI4tOm7dSkXYVGcwLbNKUBE/DzNpHG2AS3f89DFRu81k/99yGu7BxVytVtE0HmCTg18PDsgKqBJ++aIUYBjHmKhFUBZzVLLSCRIdqoIt5Nxnedy+TzjvCp9/nNL74R2GlpMKPb/oBesrJK/blq1Ti3r+PZHicz6yuQLnsWpX87iUHiH0lJ0n0Z43LrKIUh9a59zR0qW3/SrT3lq/6wIDAQAB\n-----END PUBLIC KEY-----';

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
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({ message: 'Usuário não logado. Acesso não autorizado' });
    }

    const token = authorization.substring(7).trim();

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
