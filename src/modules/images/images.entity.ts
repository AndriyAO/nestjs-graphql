import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Profile } from "../profile/profile.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column()
    status: string;

    @ManyToOne(type => Profile, profile => profile.images, { onDelete: 'CASCADE' })
    @JoinColumn()
    public profile: Profile;

}