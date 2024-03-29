import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Source } from "@root/user/entities/source.enum";

@Injectable()
export class LocalAuthGuard extends AuthGuard(Source.LOCAL) {} //Google extends AuthGuard('google')