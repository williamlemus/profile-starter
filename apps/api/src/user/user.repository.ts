import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDeleteDto, UserDto } from 'src/webhook/schema/user.schema';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(user: UserDto) {
    const email = user.email_addresses.find(
      (address) => address.id === user.primary_email_address_id,
    )?.email_address;
    if (!email) {
      throw new Error('No email received!');
    }
    return this.prismaService.user.create({
      data: {
        id: user.id,
        email,
        profile: {
          create: {
            name: `${[user.first_name, user.last_name ?? ''].join(' ')}`,
          },
        },
      },
    });
  }
  async updateUser(user: UserDto) {
    const email = user.email_addresses.find(
      (address) => address.id === user.primary_email_address_id,
    )?.email_address;
    if (!email) {
      throw new Error('No email received!');
    }
    return this.prismaService.user.update({
      where: { id: user.id },
      data: {
        email,
        profile: {
          update: {
            name: `${[user.first_name, user.last_name ?? ''].join(' ')}`,
          },
        },
      },
    });
  }

  async deleteUser(user: UserDeleteDto) {
    return this.prismaService.user.update({
      where: { id: user.id },
      data: {
        deletedAt: new Date(),
        profile: {
          update: {
            name: null,
            bio: null,
            headline: null,
            photo: null,
            profileTags: {
              deleteMany: {},
            },
          },
        },
      },
    });
  }
}
