import {NextFunction, Request, Response} from 'express';
import {JsonWebTokenError, TokenExpiredError, verify} from 'jsonwebtoken';

// const options: StrategyOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey:
//     '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt3p6Y4epRUSWsLMpS9esdtvCelMJx3MnHUMIAFgB4vB+oU3Eb1uDDlRuTMYhzOb2abQJSfYQUdQCo1qBwZMqvxkJ3ws+N89uPjGLGaPVuH8cTlFXWH/r1f+6bfol1NcpPoS0Bd7hsbcJWDUxLQ+5L6ZKFutTTOIy/T2YNkYr/sJ23PPYge2gYk4kKkFEhqQjK7yZQgy8dedmHvexNBZSWrYgBexy3LMhaLzyqI9okecrO0It0Y/I2RDskAzVUWujB/ElDzoomlipEb/M5kfrUpDwJcuaqh629zNqpZPSeR/8VE7T/8ZLeRGH2sWcaqkJWcqAawBKqrSwBHgRLfR5UQIDAQAB\n-----END PUBLIC KEY-----',
// };

const SECRET_KEY =
  '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt3p6Y4epRUSWsLMpS9esdtvCelMJx3MnHUMIAFgB4vB+oU3Eb1uDDlRuTMYhzOb2abQJSfYQUdQCo1qBwZMqvxkJ3ws+N89uPjGLGaPVuH8cTlFXWH/r1f+6bfol1NcpPoS0Bd7hsbcJWDUxLQ+5L6ZKFutTTOIy/T2YNkYr/sJ23PPYge2gYk4kKkFEhqQjK7yZQgy8dedmHvexNBZSWrYgBexy3LMhaLzyqI9okecrO0It0Y/I2RDskAzVUWujB/ElDzoomlipEb/M5kfrUpDwJcuaqh629zNqpZPSeR/8VE7T/8ZLeRGH2sWcaqkJWcqAawBKqrSwBHgRLfR5UQIDAQAB\n-----END PUBLIC KEY-----';

interface Root {
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

      const result: Root = {
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

// export default new JwtStrategy(options, async (payload, done) => {
//   try {
//     const response = {
//       name: payload.name,
//       username: payload.preferred_username,
//       email: payload.email,
//     };
//     return done(response);
//   } catch (e) {
//     return done(e);
//   }
// });
