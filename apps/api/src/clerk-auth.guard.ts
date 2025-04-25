import { verifyToken } from '@clerk/backend';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  private readonly logger = new Logger();

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const secretKey = this.configService.get<string>('CLERK_SECRET_KEY');
    try {
      await verifyToken(request.headers.authorization.split(' ').pop(), {
        secretKey,
      });
    } catch (err) {
      this.logger.error(err);
      return false;
    }

    return true;
  }
}
