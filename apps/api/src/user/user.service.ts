import { Injectable } from '@nestjs/common';
import { UserDeleteDto, UserDto } from 'src/webhook/schema/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository){}
    async createUser(user: UserDto){
        return this.userRepository.createUser(user);
    }

    async updateUser(user: UserDto){
        return this.userRepository.updateUser(user);
    }


    async deleteUser(user: UserDeleteDto) {
        return this.userRepository.deleteUser(user);
    }
}
