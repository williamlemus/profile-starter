import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { ProfileModule } from 'src/profile/profile.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [FeedService],
  controllers: [FeedController],
  imports: [ProfileModule, ConfigModule],
})
export class FeedModule {}
