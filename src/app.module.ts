import { Module } from '@nestjs/common';
import { TopicFilmModule } from './TopicFilm/topicFilm.module';
import { DetailFilmModule } from './DetailFilm/detailFilm.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as Joi from '@hapi/joi';
// import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from "dotenv"
import { TopicEntity } from 'entity/topic.entity';
import { EpisodenEntity } from 'entity/episoden.entity';
import { CacheModule } from '@nestjs/cache-manager';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
dotenv.config()
@Module({
  imports: [CacheModule.register(
    {
      isGlobal: true,
    }
  ), TopicFilmModule, DetailFilmModule, UserModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.PGHOST,
    port: parseInt(process.env.PORT) || 5432,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
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
