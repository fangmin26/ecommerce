import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Source } from "@root/user/entities/source.enum";

@Injectable()
export class FacebookGuard extends AuthGuard(Source.FACEBOOK) {}