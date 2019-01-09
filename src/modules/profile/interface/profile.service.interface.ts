import { Profile } from "../profile.entity";

export interface IProfileService {
    findAll():Promise<Profile[]>;
    insert(profile: Profile): Promise<Profile>
}