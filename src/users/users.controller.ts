
import { Body, Controller, Post, Req, Res, UseGuards, ValidationPipe, } from "@nestjs/common";
import { UserService } from "./users.service";
import { Request, Response } from "express";
// import { CacheInterceptor } from "@nestjs/cache-manager";
import { UserDtoProfile, UserDtoRegister } from "dto/user.dto";
import { AuthGuard } from "guards/auth.guards";

@Controller('api/admin')
export class UserController {
    constructor(private readonly UserService: UserService) { }

    @Post('register')
    Register(@Body() userDto: UserDtoRegister) {
        console.log("ok")
        return this.UserService.register(userDto);
    }
    @Post('login')
    Login(@Body() userDto: UserDtoRegister, @Res() res: Response) {
        // console.log("ip" + req.ip)

        return this.UserService.Login(userDto, res)
        // return plainToInstance(UserDto, this.UserService.Login(userDto), { excludeExtraneousValues: true });
    }
    @Post('logout')
    @UseGuards(AuthGuard)
    logout(@Req() req: Request, @Res() res: Response) {
        console.log(req['data'].id)
        return this.UserService.logout(req['data'].id, res)
    }



    // @Post('refresh')
    // RefreshToken(@Body() token: string) {
    //     return this.UserService.RefreshToken(token);

    // }
}
