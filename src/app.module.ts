import { Module } from '@nestjs/common';
import { TopicFilmModule } from './TopicFilm/topicFilm.module';
import { DetailFilmModule } from './DetailFilm/detailFilm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from "dotenv"
import { TopicEntity } from 'entity/topic.entity';
import { EpisodenEntity } from 'entity/episoden.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';
import { BackupModule } from './backup/backup.module';
import { ScheduleModule } from '@nestjs/schedule';
dotenv.config()
@Module({
  imports: [CacheModule.register(
    {
      isGlobal: true,
    }
  ), TopicFilmModule, DetailFilmModule, UserModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    driver: require('mysql2'),
    host: process.env.PGHOST,
    port: parseInt(process.env.PORT),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
    database: process.env.PGDATABASE,
    entities: [
      TopicEntity, EpisodenEntity
    ],
    synchronize: true,
    autoLoadEntities: true
  })
  ],
  providers: [JwtService]

})
export class AppModule { }
