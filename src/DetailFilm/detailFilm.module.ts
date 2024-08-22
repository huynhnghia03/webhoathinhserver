import { Module } from "@nestjs/common";
import { DetailFilmController } from "./detailFilm.controller";
import { TopicEntity } from "entity/topic.entity";
import { EpisodenEntity } from "entity/episoden.entity";
import { EpisodenService } from "./detailFlim.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard } from "@nestjs/throttler";
import { JwtService } from "@nestjs/jwt";
import { UsersEntity } from "entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TopicEntity, EpisodenEntity, UsersEntity])],
    controllers: [DetailFilmController],
    providers: [EpisodenService, JwtService, {
        provide: APP_GUARD,
        useClass: ThrottlerGuard
    }
    ]
})
export class DetailFilmModule { }