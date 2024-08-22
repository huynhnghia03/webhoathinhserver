import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TopicEntity } from "entity/topic.entity";
import { TopicFilmController } from "./topicFilm.controller";
import { TopicService } from "./topicFilm.service";
import { EpisodenEntity } from "entity/episoden.entity";
import { UsersEntity } from "entity/user.entity";
import { JwtService } from "@nestjs/jwt";
// import { AuthGuard } from "guards/auth.guards";
// import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([TopicEntity, EpisodenEntity, UsersEntity])],
    controllers: [TopicFilmController],
    providers: [TopicService, JwtService]
})

export class TopicFilmModule { }