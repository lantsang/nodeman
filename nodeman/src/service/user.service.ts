import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findOneByEmail(email): Promise<User> {
        return await this.userRepository.findOne({ Email: email });
    }

    async findOne(email, password): Promise<User> {
        return await this.userRepository.findOne({ Email: email, Password: password });
    }

    async ensureUserExist(): Promise<boolean> {
        let email = 'admin@restmesh.com';
        var user = await this.userRepository.findOne({ Email: email });
        if (user == null) {
            console.log('try to create one user ' + email);
            let user = new User();
            user.Username = 'admin';
            user.Email = email;
            user.Password = '123qwe';
            await this.userRepository.save(user);
        }
        else {
            console.log('user exist');
        }
        return await true;
    }
}