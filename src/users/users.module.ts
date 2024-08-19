import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "entity/user.entity";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import { JwtModule } from "@nestjs/jwt";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
// import { JwtModule } from "@nestjs/jwt";
// import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
// import { APP_GUARD } from "@nestjs/core";
// import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [JwtModule.register({},),
  TypeOrmModule.forFeature([UsersEntity]),
  ThrottlerModule.forRoot([
    {
      name: 'short',
      ttl: 10000,
      limit: 5,
    },
    {
      name: 'medium',
      ttl: 30000,
      limit: 20
    },
    {
      name: 'long',
      ttl: 60000,
      limit: 100
    }
  ]),
  ],
  controllers: [UserController],
  providers: [UserService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }

  ]
})
export class UserModule { }