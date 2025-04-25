import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpsertProfileDto } from './schema/upsertProfile.schema';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getProfile(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
      include: {
        profileTags: {
          include: {
            tag: true,
          },
        },
        user: {
          select: { email: true },
        },
      },
    });
  }

  async getProfileByClerkId(id: string) {
    return this.prisma.profile.findUnique({
      where: { userId: id },
      include: {
        profileTags: {
          include: {
            tag: true,
          },
        },
        user: {
          select: { email: true },
        },
      },
    });
  }

  async updateProfile(data: UpsertProfileDto) {
    // check correct user and maybe string id from data(or make into another argument)
    const { id, tags, name, bio, headline, photo, user: { email } } = data;
    return this.prisma.profile.update({
      where: { id },
      data: {
        name,
        bio,
        headline,
        photo,
        user: {
          update: {  email }
        },
        profileTags: {
          deleteMany: {},
          createMany: {
            data: tags.map((tag) => ({ tagId: tag.id })),
            skipDuplicates: true,
          },
        },
      },
    });
  }

  // will be infiniteScroll or paginated
  async getProfiles(id: string) {
    // all except self
    return this.prisma.profile.findMany({
      where: {
        user: {
          id: { not: id },
        },
      },
      include: {
        profileTags: {
          include: {
            tag: true,
          },
        },
        user: {
          select: { email: true },
        },
      },
    });
  }
}
