import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
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
                secret: process.env.ACCESS_TOKEN_SECRET,
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
            const authHeader = req.headers.authorization;
            if (typeof authHeader === 'string') {
                const parts = authHeader.split(' ');
                if (parts.length === 2 && parts[0] === 'Bearer') {
                    return parts[1];
                }
            }
            console.log('Authorization header is not properly formatted');
            return undefined;

        } catch (e) {
            Logger.error(e);
            throw new UnauthorizedException("Token not found");
        }

    }
}
