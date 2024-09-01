
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import { EpisodenDTO } from "dto/episoden.dto";
import { TopicDTO } from "dto/topic.dto";
import { EpisodenEntity } from "entity/episoden.entity";
import { TopicEntity } from "entity/topic.entity";
import slugify from "slugify";
import { In, Repository } from 'typeorm';

@Injectable()
export class TopicService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRepository(TopicEntity) private readonly topicEntity: Repository<TopicEntity>,
        @InjectRepository(EpisodenEntity) private readonly episodenEntity: Repository<EpisodenEntity>
    ) { }
    async getAllTopic(page: number) {
        // // const topicCaches = await this.cacheManager.get("key")
        // // if (topicCaches) {
        // //     console.log("cache")
        // //     return topicCaches
        // // }
        // console.log("all")
        // const limit = 12
        // const skip = (page - 1) * limit;
        // const [datas, total] = await this.topicEntity.findAndCount({
        //     order: {
        //         updated_at: "DESC"
        //     },
        //     skip: skip,
        //     take: limit,
        // });
        // // await this.cacheManager.set("key", datas, 10000)
        // return {
        //     datas,
        //     total,
        //     page,
        //     limit: limit,
        //     totalPage: Math.ceil(total / limit)
        // }
        const cacheKey = `topics_page_${page}`;
        const topicCaches = await this.cacheManager.get(cacheKey);

        if (topicCaches) {
            console.log("cache");
            return topicCaches;
        }

        console.log("all");
        const limit = 12;
        const skip = (page - 1) * limit;

        const [datas, total] = await this.topicEntity.findAndCount({
            order: {
                updated_at: "DESC"
            },
            skip: skip,
            take: limit,
        });

        const response = {
            datas,
            total,
            page,
            limit: limit,
            totalPage: Math.ceil(total / limit)
        };

        // Cache the result for 10 seconds (10000 milliseconds)
        await this.cacheManager.set(cacheKey, response, 60000);

        return response;


    }
    async getSchedules() {
        let topicCaches = await this.cacheManager.get("key")
        if (topicCaches) {
            console.log("cache")
            return topicCaches
        }
        topicCaches = await this.topicEntity.find({
        });

        await this.cacheManager.set("key", topicCaches, 60000 * 60 * 24)
        return topicCaches
    }
    async getDetailTopic(slug: string) {
        let movie: TopicDTO = await this.cacheManager.get("detail")
        console.log("call")
        if (movie) {
            console.log(movie.slug != slug)
            if (movie.slug != slug) {
                console.log("cache")
                this.cacheManager.del("detail")
                movie = await this.topicEntity.findOne({
                    where: {
                        slug
                    },
                    relations: ["episodens"]
                })
                if (!movie) {
                    throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
                }
                await this.cacheManager.set("detail", movie, 360000)
                return movie
            }
            return movie
        }
        movie = await this.topicEntity.findOne({
            where: {
                slug
            }
        })
        if (!movie) {
            throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
        }
        await this.cacheManager.set("detail", movie, 360000)
        return movie
    }
    async getDetialTopicWithRelation(slug: string) {
        let movie: TopicDTO = await this.cacheManager.get("detail")

        if (movie) {
            if (movie.slug != slug) {
                this.cacheManager.del("detail")
                movie = await this.topicEntity.findOne({
                    where: {
                        slug
                    },
                    relations: ['episodens']
                })
                if (!movie) {
                    throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
                }
                await this.cacheManager.set("detail", movie, 60000)
            }
            return movie
        }
        movie = await this.topicEntity.findOne({
            where: {
                slug
            },
            relations: ['episodens']
        })
        if (!movie) {
            throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
        }
        // await this.cacheManager.set("detail", movie, 360000)
        return movie
    }
    async getHotTopics() {
        let hotCache = await this.cacheManager.get('hot')
        if (hotCache) {
            return hotCache
        }
        hotCache = await this.topicEntity.find({
            where: {
                moreInteres: true
            }
        });
        await this.cacheManager.set('hot', hotCache, 60000 * 60 * 24)
        return hotCache
    }
    async createTopic(topic: TopicDTO, file: string) {

        topic.slug = this.createSlug(topic.name)
        topic.image = file
        if (topic.finish.toString() == 'false') {
            topic.finish = false
        } else {
            topic.finish = true
        }
        if (topic.moreInteres.toString() == 'false') {
            topic.moreInteres = false
        } else {
            topic.moreInteres = true
        }
        await this.ensureSlugIsUnique(topic);
        return this.topicEntity.save(topic);
    }
    async createFile(id: string, file: Express.Multer.File) {
        return "ok"
    }

    async updateTopic(id: string, topic: TopicDTO, file: string) {
        const findTopic = await this.topicEntity.findOne({ where: { id: id } })
        console.log(findTopic)
        if (!findTopic) {
            throw new HttpException('Topic not found', HttpStatus.NOT_FOUND)
        }
        if (findTopic.name != topic.name && topic.name) {
            findTopic.slug = this.createSlug(topic.name)
            await this.ensureSlugIsUnique(findTopic);
        }
        findTopic.description = topic.description || findTopic.description;
        findTopic.name = topic.name || findTopic.name;
        if (file) {
            findTopic.image = file
        } else {
            findTopic.image = topic.image || findTopic.image;
        }
        if (topic.finish.toString() == 'false') {
            findTopic.finish = false
        } else {
            findTopic.finish = true
        }

        findTopic.category = topic.category || findTopic.category;
        findTopic.newEpiso = topic.newEpiso || findTopic.newEpiso;
        if (topic.moreInteres.toString() == 'false') {
            findTopic.moreInteres = false
        } else {
            findTopic.moreInteres = true
        }
        findTopic.schedule = topic.schedule || findTopic.schedule;
        findTopic.time = topic.time || findTopic.time;
        findTopic.totalEpiso = topic.totalEpiso || findTopic.totalEpiso;
        console.log(findTopic)
        return this.topicEntity.save(findTopic);
    }

    async deleteTopic(id: string) {
        // Find the topic with its associated episodes
        const topic = await this.topicEntity.findOne({
            where: { id },
            relations: ["episodens"]
        });

        if (!topic) {
            throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
        }

        // Check if the topic has any episodes
        if (topic.episodens && topic.episodens.length > 0) {
            // Delete all episodes associated with the topic
            const episodeIds = topic.episodens.map(episo => episo.id);
            if (episodeIds.length > 0) {
                await this.episodenEntity.delete({ id: In(episodeIds) });
            }
        }

        // Delete the topic itself
        return this.topicEntity.delete(id);
    }

    private async ensureSlugIsUnique(topic: Partial<TopicEntity>) {
        let slugExists = await this.topicEntity.findOne({ where: { slug: topic.slug } });
        let count = 1;
        while (slugExists) {
            topic.slug = `${this.createSlug(topic.name)}-${count}`;
            slugExists = await this.topicEntity.findOne({ where: { slug: topic.slug } });
            count++;
        }
    }
    private createSlug(name: string) {
        return slugify(name, { lower: true, strict: true })
    }
}