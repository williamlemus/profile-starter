import { Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(private repository: TagRepository) {}

  async getTags() {
    return this.repository.getTags();
  }

  async createTag(params) {
    return this.repository.createTag(params);
  }
}
