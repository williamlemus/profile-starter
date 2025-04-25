import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ZodValidationPipe } from 'src/pipes/validation/zodValidationPipe.pipe';
import { UpsertProfileDto, upsertProfileSchema } from './schema/upsertProfile.schema';
import { ClerkAuthGuard } from 'src/clerk-auth.guard';

@UseGuards(ClerkAuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService){}

    @Post()
    @UsePipes(new ZodValidationPipe(upsertProfileSchema))
    async updateProfile(@Body() upsertProfileDto: UpsertProfileDto) {
       return this.profileService.upsertProfile(upsertProfileDto)
    }

    @Get('/clerk/:id')
    async getProfileByClerk(@Param('id') id) {
        return this.profileService.getProfileByClerkId(id);
    }

    @Get('/:id')
    async getProfile(@Param('id') id) {
        return this.profileService.getProfile(id);
    }
}
