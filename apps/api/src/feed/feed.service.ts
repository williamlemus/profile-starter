import { Injectable } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class FeedService {
    constructor(private readonly profileService: ProfileService){}
    getFeed(id: string) {
        return  this.profileService.getProfiles(id);
    }
}
