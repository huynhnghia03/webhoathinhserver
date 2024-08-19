import { Module } from "@nestjs/common";
import { DetailFilmController } from "./detailFilm.controller";
import { TopicEntity } from "entity/topic.entity";
import { EpisodenEntity } from "entity/episoden.entity";
import { EpisodenService } from "./detailFlim.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([TopicEntity, EpisodenEntity])],
    controllers: [DetailFilmController],
    providers: [EpisodenService, JwtService]
})
export class DetailFilmModule { }