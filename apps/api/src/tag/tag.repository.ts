import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagRepository {
  constructor(private prisma: PrismaService) {}

  async createTag(params: { name: string }) {
    // Add zod validation to make line below cleaner
    return this.prisma.tag.create({ data: { name: params.name } });
  }

  async getTags() {
    return this.prisma.tag.findMany();
  }

  // TODO: search by name
}
