import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProfileService, ProfileRepository],
  controllers: [ProfileController],
  imports: [PrismaModule],
  exports: [ProfileService]
})
export class ProfileModule {}
