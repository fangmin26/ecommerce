import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import {Strategy,Profile} from "passport-facebook"
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
          clientID: "1545942545779682",
          clientSecret: "5b3472a02ebfeeb15295d6c403eea92a",
          callbackURL: "http://localhost:3000/facebook/callback",
          scope: "email",
          profileFields: ["emails", "name"],
        });
      }
    // constructor() {
    //     super({
    //         clientId:"1545942545779682", //샘거
    //         clientSecret:"5b3472a02ebfeeb15295d6c403eea92a",
    //         callbackURL:"http://localhost:3000/facebook/callback",//http가 안먹힘
    //         scope:"email",
    //         profileFields: ["emails","name"]
    //     })
    // }

    async validate(
        accessToken: string,
        refreshToken:string,
        profile: Profile,
        done: (error:any,user:any, info?:any) =>void
    ):Promise<any> {
        // const {name, emails } = profile;

    }
}