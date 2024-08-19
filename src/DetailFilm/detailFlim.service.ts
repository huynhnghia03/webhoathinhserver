import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { HttpException, HttpStatus, Inject, Injectable, ParseIntPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import { EpisodenDTO } from "dto/episoden.dto";
import { TopicDTO } from "dto/topic.dto";
import { EpisodenEntity } from "entity/episoden.entity";
import { TopicEntity } from "entity/topic.entity";
import slugify from "slugify";
import { Repository } from "typeorm";

@Injectable()
export class EpisodenService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRepository(EpisodenEntity) private readonly episodenEntity: Repository<EpisodenEntity>,
        @InjectRepository(TopicEntity) private readonly topicEntity: Repository<TopicEntity>
    ) { }

    async getAllEpisodenByTopic(slug: string, episoden: string) {
        console.log(slug, episoden)
        let topic: TopicEntity = await this.cacheManager.get("episoden")
        if (topic) {
            if (topic.episodens[0]?.slug != episoden) {
                topic = await this.topicEntity.createQueryBuilder('topic')
                    .leftJoinAndSelect('topic.episodens', "episoden", "episoden.slug=:episoden", { episoden })
                    .where(`topic.slug=:slug`, { slug })
                    .getOne();
                // const episodens = [...topic.map((item) => item.episodens.filter((epi) => epi.slug == slug))]
                // console.log(topic)
                await this.cacheManager.set("episoden", topic, 360000)
            }
            return topic
        }
        topic = await this.topicEntity.createQueryBuilder('topic')
            .leftJoinAndSelect('topic.episodens', "episoden", "episoden.slug=:episoden", { episoden })
            .where(`topic.slug=:slug`, { slug })
            .getOne();
        // const episodens = [...topic.map((item) => item.episodens.filter((epi) => epi.slug == slug))]
        // console.log(topic)
        await this.cacheManager.set("episoden", topic, 360000)
        // console.log(topic)
        // const allEpiso = await this.episodenEntity.find({ relations: ["topic_id"] })
        return topic
    }
    async createEpisoden(id: string, episoden: EpisodenDTO) {
        const topic = await this.topicEntity.findOne({ where: { slug: id } })
        if (!topic) throw new HttpException("Topic not found", HttpStatus.NOT_FOUND)
        const episo = this.episodenEntity.create(episoden)
        episo.slug = slugify(episo.tiltle, { lower: true, strict: true }) + '.html'
        episo.topic_id = topic
        const newEpiso = await this.episodenEntity.save(episo)
        // const allEpiso = await this.episodenEntity.find({ where: { topic_id: topic } })
        topic.newEpiso = newEpiso.episoden
        topic.totalEpiso = '' + (parseInt(topic.totalEpiso) + 1)
        await this.topicEntity.save(topic)
        return newEpiso
    }

    async updateEpisoden(id: string, episoden: EpisodenDTO) {
        const existingEpisoden = await this.episodenEntity.findOne({ where: { id }, relations: ['topic_id'] });
        if (!existingEpisoden) {
            throw new HttpException('Episode not found', HttpStatus.NOT_FOUND);
        }
        const topic = existingEpisoden.topic_id;
        const isLatestEpisode = existingEpisoden.episoden === topic.newEpiso;
        // Update the existing episode's fields
        existingEpisoden.tiltle = episoden.tiltle || existingEpisoden.tiltle;
        existingEpisoden.slug = slugify(episoden.tiltle || existingEpisoden.tiltle, { lower: true, strict: true });
        existingEpisoden.description = episoden.description || existingEpisoden.description;
        existingEpisoden.episoden = episoden.episoden || existingEpisoden.episoden;
        existingEpisoden.thumbImg = episoden.thumbImg || existingEpisoden.thumbImg;
        existingEpisoden.urlVideo = episoden.urlVideo || existingEpisoden.urlVideo;
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
}