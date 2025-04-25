import { Controller, Get, Headers, Param, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { ClerkAuthGuard } from 'src/clerk-auth.guard';
import jwt from 'jsonwebtoken';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  async getFeed(@Headers('authorization') token: string | null) {
    // get user id
    const key = (token || '').split(' ').pop() || '';

    const decoded = jwt.decode(key)?.sub || '';
    const userId = decoded.toString()
    return this.feedService.getFeed(userId);
  }
}
