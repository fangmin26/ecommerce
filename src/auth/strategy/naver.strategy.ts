import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Source } from "@root/user/entities/source.enum";
import { Profile, Strategy } from "passport-naver";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, Source.NAVER) {
    constructor(
        private readonly configService: ConfigService
    ){
        super({
            clientID: configService.get('NAVER_CLIENT_ID'),
            clientSecret: configService.get('NAVER_CLIENT_SECRET'),
            callbackURL: configService.get('NAVER_CALLBACK_URL'),
            scope: ["email","name","birthday","nickname","age"]
        })
    }
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: any
    ): Promise<any>{
        return profile;
    }
}