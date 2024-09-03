import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TopicEntity } from "./topic.entity";

@Entity('episoden')
export class EpisodenEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    tiltle: string
    @Column('text')
    description: string
    @Column()
    episoden: string
    @Column({ default: "" })
    thumbImg: string
    @Column()
    slug: string;
    @Column('text')
    urlVideo: string
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @DeleteDateColumn()
    deleted_at: Date;
    @ManyToOne(() => TopicEntity, (topic) => topic.episodens)
    topic_id: TopicEntity
}