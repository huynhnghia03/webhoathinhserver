import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EpisodenEntity } from "./episoden.entity";

@Entity('topic')
export class TopicEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: "" })
    name: string;

    @Column({ default: "" })
    description: string;

    @Column({ default: "" })
    image: string;

    @Column({ unique: true })
    slug: string;

    @Column({ default: false })
    finish: boolean;

    @Column({ default: "" })
    category: string;

    @Column({ default: "" })
    newEpiso: string;

    @Column({ default: "" })
    time: string;

    @Column({ default: "0" })
    totalEpiso: string;

    @Column({ default: "" })
    schedule: string;

    @Column({ default: false })
    moreInteres: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => EpisodenEntity, (episo) => episo.topic_id)
    episodens: EpisodenEntity[];
}
