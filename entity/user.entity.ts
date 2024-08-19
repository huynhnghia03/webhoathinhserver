import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({
    name: "users"
})
export class UsersEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()

    email: string
    @Column()
    password: string

    @Column({ default: "admin" })
    role: string;

    @Column({ nullable: true })
    refreshToken: string

    @Column({ nullable: true })
    expiryDate: Date

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;


}
