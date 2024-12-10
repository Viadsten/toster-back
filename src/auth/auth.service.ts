import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(email: string , password: string): Promise<Omit<User , "password">> {
        
        const user = await this.usersService.findOneByEmail(email);

        const passwordDB = user.password;

        const isMatch = await bcrypt.compare(password, passwordDB);

        if(user && isMatch) {
            
            const {password , ...result} = user;

            return result

        }

        return null

    }

    async register(dto: CreateUserDto , response: Response) {
        try {

            const userData = await this.usersService.create(dto)

            const jwtToken = this.jwtService.sign({id: userData.id})

            response.cookie('token', jwtToken, {httpOnly: true})

            return {
                token: jwtToken
            }

        } catch(err) {
            throw new ForbiddenException(err?.message ?? 'Registration fuck off')
        }
    }

    async login(user: User , response: Response) {

        const jwtToken = this.jwtService.sign({id: user.id})

        response.cookie('token', jwtToken, {httpOnly: true})

        return {
            token: jwtToken
        }
    }

}
