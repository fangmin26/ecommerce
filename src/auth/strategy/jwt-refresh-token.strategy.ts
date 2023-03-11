import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "@root/user/user.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import {Request} from 'express'
import { TokenPayload } from "../tokenPayload.interface";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Refresh;
            }]),
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
        })
    }
    async validate(request: Request, payload: TokenPayload) {
        const refreshToken  = request.cookies?.Refresh;
        return this.userService.getUserInfoRefreshTokenMatches(refreshToken,payload.userId)
    }
}