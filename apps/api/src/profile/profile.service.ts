import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { UpsertProfileDto } from './schema/upsertProfile.schema';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async upsertProfile(data: UpsertProfileDto) {
    return this.profileRepository.updateProfile(data);
  }

  async getProfile(id: string) {
    return this.profileRepository.getProfile(id);
  }

  async getProfiles(id: string) {
    return this.profileRepository.getProfiles(id);
  }


  async getProfileByClerkId(id: string) {
    return this.profileRepository.getProfileByClerkId(id);
  }
  
}
