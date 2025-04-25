import {
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { verifyWebhook } from '@clerk/backend/webhooks';
import { UserService } from 'src/user/user.service';
import { userDeleteSchema, userSchema } from './schema/user.schema';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger();

  @Post()
  async processWebHook(@Req() req: RawBodyRequest<Request>) {
    try {
      // For some reason the req from nextjs is not working with clerk's verify token
      const urlReq = new Request(new URL(req.url, `https://clerk-dummy`), {
        method: req.method,
        headers: new Headers(req.headers),
      });
      const clonedRequest = new Request(urlReq, {
        body: req.rawBody,
      });
      const evt = await verifyWebhook(clonedRequest);

      // Do something with payload
      // For this guide, log payload to console
      const { id } = evt.data;
      const eventType = evt.type;
      console.log(
        `Received webhook with ID ${id} and event type of ${eventType}`,
      );

      if (evt.type === 'user.created') {
        const userData = userSchema.parse(evt.data);
        const result = await this.userService.createUser(userData);
        this.logger.log(result);
      }

      if (evt.type === 'user.updated') {
        const userData = userSchema.parse(evt.data);
        const result = await this.userService.updateUser(userData);
        this.logger.log(result);
      }

      if (evt.type === 'user.deleted') {
        const userData = userDeleteSchema.parse(evt.data);
        const result = await this.userService.deleteUser(userData);
        this.logger.log(result);
      }
      return 'Webhook received';
    } catch (err) {
      console.error('Error verifying webhook:', err);
      throw new HttpException(
        'Error verifying webhook',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
