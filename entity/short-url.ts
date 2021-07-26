import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ShortUrl {
    @PrimaryColumn()
    shortCode: string;

    @Column()
    url: string;

    @Column()
    createdTime: Date;
}
