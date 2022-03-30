import { Column, CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class RootEntity {

    @PrimaryGeneratedColumn('uuid')
    @Index({
        unique: true
    })
    public id!: string

    @UpdateDateColumn({
        nullable: false,
        type: 'timestamp',
        name: 'updated_at',
        select: true
    })
    @Index()
    public updatedAt!: Date

    @CreateDateColumn({
        nullable: false,
        type: 'timestamp',
        name: 'created_at',
        select: true
    })
    @Index()
    public createdAt!: Date

    @Column({
        name: 'deleted_at',
        type: 'timestamp',
        select: false,
        nullable: true
    })
    public deletedAt!: Date
}