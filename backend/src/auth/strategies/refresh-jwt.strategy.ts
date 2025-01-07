import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import refreshConfig from 'src/auth/config/refresh.config';
import { AuthJWTPayload } from 'src/auth/types/auth-jwtPayload';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      secretOrKey: refreshTokenConfig.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: AuthJWTPayload) {
    const accountId = payload.sub;
    const refreshToken = req.body.refresh;

    return this.authService.validateRefreshToken(accountId, refreshToken);
  }
}
