import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Column({ type: "text" })
    password: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
}
