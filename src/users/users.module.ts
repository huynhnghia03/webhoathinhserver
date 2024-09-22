import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "entity/user.entity";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import { JwtModule } from "@nestjs/jwt";
import { ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
// import { JwtModule } from "@nestjs/jwt";
// import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
// import { APP_GUARD } from "@nestjs/core";
// import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [JwtModule.register({},),
  TypeOrmModule.forFeature([UsersEntity])
  ],
  controllers: [UserController],
  providers: [UserService

  ]
})
export class UserModule { }