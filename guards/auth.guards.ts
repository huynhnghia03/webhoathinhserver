import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "entity/user.entity";
import { Repository } from "typeorm";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwt: JwtService,
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException("Invalid token");
        }

        try {
            // Verify the access token
            const payload = await this.jwt.verifyAsync(token, {
                secret: process.env.ACCESS_TOKEN_SECRET,
            });

            // Find the user associated with the token
            const checkToken = await this.userRepository.findOne({
                where: { refreshToken: token },
            });

            if (!checkToken) {
                throw new UnauthorizedException("Invalid token");
            }

            // Check if the token has expired
            const expiryDate = new Date(checkToken.expiryDate).getTime();
            if (Date.now() >= expiryDate) {
                throw new UnauthorizedException("Token has expired");
            }

            request['data'] = payload; // Attach payload to request
            return true;
        } catch (e) {
            Logger.error(e.message, e.stack);
            throw new UnauthorizedException("Invalid token");
        }
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.split(' ')[1];
        }
        Logger.error('Authorization header is not properly formatted');
        return undefined;
    }
}
