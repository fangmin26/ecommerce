import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwtAuth.guard";
import { RequestWithUserInterface } from "src/auth/requestWithUser.interface";
import { Role } from "../entities/role.enum";

export const RoleGuard = (role:Role) : Type<CanActivate> =>{
    class RoleGuardMixin extends JwtAuthGuard{
        async canActivate(context: ExecutionContext){
            await super.canActivate(context)
            const request = 
            context.switchToHttp().getRequest<RequestWithUserInterface>();
            const user = request.user;
            return user?.userrole.includes(role)
        }
    }
    return mixin(RoleGuardMixin)
}