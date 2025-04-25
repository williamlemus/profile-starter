import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [WebhookController],
  imports: [UserModule],
})
export class WebhookModule {}
