import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import { plainToInstance } from "class-transformer";
import { UserDtoRegister } from "dto/user.dto";

import { UsersEntity } from "entity/user.entity";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { comparePassword, encodePassword } from "utils/bcrypt";

// import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class UserService {
    constructor(
        private jwt: JwtService,
        @Inject(CACHE_MANAGER) private cacheManger: Cache,
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>
    ) {

    }
    async register(userDto: UserDtoRegister) {
        const user = await this.userRepository.findOne({ where: { email: userDto.email } })
        if (user) throw new HttpException("User existed", HttpStatus.BAD_REQUEST)
        const hashPw = encodePassword(userDto.password)
        const checkData = plainToInstance(UserDtoRegister, userDto, { excludeExtraneousValues: true })
        const newData = {
            ...checkData,
            password: hashPw
        }
        const saveUser = await this.userRepository.save(newData)
        if (!saveUser) throw new HttpException("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR)

        return {
            message: "Registered successfull",
            statusCode: "200"
        }
    }

    async Login(userDto: UserDtoRegister, res: Response) {
        const user = await this.userRepository.findOne({ where: { email: userDto.email } });
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        if (!comparePassword(userDto.password, user.password)) {
            throw new HttpException("Password incorrect", HttpStatus.UNAUTHORIZED);
        }

        const payload = { email: user.email, id: user.id };

        const token = await this.jwt.signAsync(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET, // Use environment variable
            expiresIn: '1h',
        });
        const accesstoken = await this.storeAccessToken(token, user)
        console.log(accesstoken)
        return res.json({
            user_token: accesstoken,
            message: "Login successful",
            statusCode: HttpStatus.OK,
        });
    }



    async logout(id: string, res: Response) {
        console.log(id)
        const userData = await this.userRepository.findOne({
            where: { id: id },
        });
        const user = {
            ...userData,
            refreshToken: '',
            expiryDate: null
        }
        await this.userRepository.save(user)
        return res.json({
            message: "Logout successful",
            statusCode: HttpStatus.OK,
        });
    }
    // async RefreshToken(refreshToken: string) {
    //     console.log(refreshToken["token"])
    //     const encodeToken = this.jwt.verify(refreshToken["token"], {
    //         secret: process.env.REFRESH_TOKEN_SECRET
    //     })
    //     console.log(encodeToken)
    //     const token = await this.userRepository.findOne({
    //         where: {
    //             refreshToken: encodeToken["refreshToken"],
    //             expiryDate: MoreThanOrEqual(new Date())
    //         }
    //     })
    //     if (!token) throw new HttpException("Refresh token incorrect", HttpStatus.BAD_REQUEST)
    //     return this.generateUserTokens(token)
    // }

    // async generateUserTokens(userData: UsersEntity) {
    //     const payload = { email: userData.email, id: userData.id }
    //     const accessToken = this.jwt.sign(payload, {
    //         secret: process.env.ACCESS_TOKEN_SECRET,
    //         expiresIn: '1h',
    //     })
    //     // const saveRefreshToken = await this.storeRefreshToken(uuidv4(), userData)

    //     // const refreshToken = this.jwt.sign({ refreshToken: saveRefreshToken }, {
    //     //     secret: process.env.REFRESH_TOKEN_SECRET,
    //     //     expiresIn: '3d',
    //     // })
    //     return {
    //         dataUser: plainToInstance(UserDtoProfile, userData, { excludeExtraneousValues: true }),
    //         accessToken,
    //         refreshToken
    //     }
    // }
    async storeAccessToken(token: string, userData: UsersEntity) {
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1)
        const user = {
            ...userData,
            refreshToken: token,
            expiryDate: expiryDate
        }
        const refreshToken = await this.userRepository.save(user)
        return refreshToken.refreshToken
    }

}