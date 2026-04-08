import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtUser } from './interfaces/jwt-user.interface';
import { UserRole } from 'src/users/enums/user-role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev-secret-change-me',
    });
  }

  validate(payload: JwtPayload): JwtUser {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role ?? UserRole.USER,
    };
  }
}
