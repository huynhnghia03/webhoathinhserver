import { JwtService } from "@nestjs/jwt";
import { plainToInstance } from "class-transformer";
import { UserDtoProfile } from "dto/user.dto";

export function sendToken(userData: UserDtoProfile, jwtService: JwtService) {
    const payload = { email: userData.email, id: userData.id }
    const accessToken = jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '5m',
    })
    const refreshToken = jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: "3d"
    })
    return { userData: plainToInstance(UserDtoProfile, userData, { excludeExtraneousValues: true }), accessToken, refreshToken }
}
