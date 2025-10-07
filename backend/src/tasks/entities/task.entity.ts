import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.PENDING,
    })
    status: TaskStatus;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
}
