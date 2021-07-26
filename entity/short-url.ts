import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ShortUrl {
    @PrimaryColumn()
    shortCode: string;

    @Column()
    url: string;

    @Column()
    createdTime: Date;

    @Column({ default: 0 })
    clickCount: number;
}
