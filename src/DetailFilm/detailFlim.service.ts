import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import { EpisodenDTO } from "dto/episoden.dto";
import { EpisodenEntity } from "entity/episoden.entity";
import { TopicEntity } from "entity/topic.entity";
import { Request, Response } from "express";
import { createReadStream } from "fs";
import { join } from "path";
import slugify from "slugify";
import * as fs from 'fs';
import { Repository } from "typeorm";


@Injectable()
export class EpisodenService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRepository(EpisodenEntity) private readonly episodenEntity: Repository<EpisodenEntity>,
        @InjectRepository(TopicEntity) private readonly topicEntity: Repository<TopicEntity>
    ) {

    }

    async getAllEpisodenByTopic(slug: string, episoden: string) {
        console.log(slug, episoden)
        let topic: TopicEntity = await this.cacheManager.get(`${slug}-${episoden}`)
        if (topic) {
            return topic
        }
        topic = await this.topicEntity.createQueryBuilder('topic')
            .leftJoinAndSelect('topic.episodens', "episoden", "episoden.slug=:episoden", { episoden })
            .where(`topic.slug=:slug`, { slug })
            .getOne();
        await this.cacheManager.set(`${slug}-${episoden}`, topic, 60000)
        return topic
    }
    async createEpisoden(id: string, episoden: EpisodenDTO, video: string) {
        const topic = await this.topicEntity.findOne({ where: { slug: id } })
        if (!topic) throw new HttpException("Topic not found", HttpStatus.NOT_FOUND)
        const episo = this.episodenEntity.create(episoden)
        episo.slug = slugify(episo.tiltle, { lower: true, strict: true }) + '.html'
        episo.topic_id = topic
        if (episoden.urlVideo) {
            episo.urlVideo = episoden.urlVideo
        } else {
            episo.urlVideo = video
        }
        const newEpiso = await this.episodenEntity.save(episo)
        // const allEpiso = await this.episodenEntity.find({ where: { topic_id: topic } })
        topic.newEpiso = parseInt(topic.newEpiso) > parseInt(newEpiso.episoden) ? topic.newEpiso : newEpiso.episoden
        topic.totalEpiso = '' + (parseInt(topic.totalEpiso) + 1)
        await this.topicEntity.save(topic)
        return newEpiso
    }

    async updateEpisoden(id: string, episoden: EpisodenDTO, dest: string) {
        const existingEpisoden = await this.episodenEntity.findOne({ where: { id }, relations: ['topic_id'] });
        if (!existingEpisoden) {
            throw new HttpException('Episode not found', HttpStatus.NOT_FOUND);
        }
        const topic = existingEpisoden.topic_id;
        const isLatestEpisode = existingEpisoden.episoden === topic.newEpiso;
        // Update the existing episode's fields
        existingEpisoden.tiltle = episoden.tiltle || existingEpisoden.tiltle;
        existingEpisoden.slug = slugify(episoden.tiltle || existingEpisoden.tiltle, { lower: true, strict: true }) + '.html';
        existingEpisoden.description = episoden.description || existingEpisoden.description;
        existingEpisoden.episoden = episoden.episoden || existingEpisoden.episoden;
        existingEpisoden.thumbImg = episoden.thumbImg || existingEpisoden.thumbImg;
        if (episoden.urlVideo) {
            existingEpisoden.urlVideo = episoden.urlVideo
        } else {
            existingEpisoden.urlVideo = dest
        }
        // existingEpisoden.urlVideo = episoden.urlVideo || existingEpisoden.urlVideo;
        await this.episodenEntity.save(existingEpisoden);

        if (isLatestEpisode) {
            topic.newEpiso = existingEpisoden.episoden;
            await this.topicEntity.save(topic);
        }

        return existingEpisoden;
    }

    async deleteEpisoden(id: string) {
        const existingEpiso = await this.episodenEntity.findOne({ where: { id }, relations: ["topic_id"] });
        if (!existingEpiso) throw new HttpException("Episode not found", HttpStatus.NOT_FOUND);
        await this.episodenEntity.remove(existingEpiso);

        const topic = await this.topicEntity.findOne({ where: { id: existingEpiso.topic_id.id }, relations: ["episodens"] });
        topic.totalEpiso = '' + (parseInt(topic.totalEpiso) - 1);
        if (topic.newEpiso === existingEpiso.episoden) {
            if (topic.episodens.length > 0) {
                const newLatestEpiso = topic.episodens.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())[0];
                topic.newEpiso = newLatestEpiso.episoden;
            } else {
                topic.newEpiso = null;
            }

        }
        await this.topicEntity.save(topic);
        return { message: "Episode deleted successfully" };
    }
    streamVideo(date: string, slug: string, req: Request, res: Response) {
        const videoPath = join(__dirname, '..', '..', '..', 'upload', 'episoden', date, slug);
        console.log(videoPath)
        if (fs.existsSync(videoPath)) {
            const stat = fs.statSync(videoPath);
            const fileSize = stat.size;
            const range = req.headers.range;

            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunkSize = (end - start) + 1;
                const file = createReadStream(videoPath, { start, end });
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'video/mp4',
                    'Content-Disposition': 'inline', // Prevents download prompt
                    'Cache-Control': 'no-store', // Prevents caching by browsers
                };
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                    'Content-Disposition': 'inline', // Prevents download prompt
                    'Cache-Control': 'no-store', // Prevents caching by browsers
                };
                res.writeHead(200, head);
                createReadStream(videoPath).pipe(res);
            }
        } else {
            res.status(HttpStatus.NOT_FOUND).send('Video not found');
        }
    }


}