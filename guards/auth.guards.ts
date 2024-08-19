import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwt: JwtService) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        console.log(token)
        if (!token) {
            throw new UnauthorizedException("Invalid token");
        }

        try {
            const payload = await this.jwt.verifyAsync(token, {
                secret: "process.env.JWT_SECRET",
            });
            request['data'] = payload;
            return true;
        } catch (e) {
            Logger.error(e);
            throw new UnauthorizedException("Invalid token");
        }
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        try {
            console.log(req.cookies)
            return req.cookies['user_token'];
        } catch (e) {
            Logger.error(e);
            throw new UnauthorizedException("Token not found");
        }

    }
}
