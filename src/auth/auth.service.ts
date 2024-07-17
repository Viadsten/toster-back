import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(email: string , password: string): Promise<Omit<User , "password">> {
        
        const user = await this.usersService.findOneByEmail(email)

        if(user && (await user).password === password) {
            
            const {password , ...result} = user;

            return result

        }

        return null

    }

    async register(dto: CreateUserDto) {
        try {

            const userData = await this.usersService.create(dto)

            return {
                token: this.jwtService.sign({id: userData.id})
            }

        } catch(err) {
            throw new ForbiddenException("Ошибка регистрации")
        }
    }

    async login(user: User) {
        return {
            token: this.jwtService.sign({id: user.id})
        }
    }

}
