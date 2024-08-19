
import { Body, Controller, Post, Res, ValidationPipe, } from "@nestjs/common";
import { UserService } from "./users.service";
import { Response } from "express";
// import { CacheInterceptor } from "@nestjs/cache-manager";
import { UserDtoRegister } from "dto/user.dto";

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
    logout(@Res() res: Response) {

        return this.UserService.logout(res)
    }



    // @Post('refresh')
    // RefreshToken(@Body() token: string) {
    //     return this.UserService.RefreshToken(token);

    // }
}
