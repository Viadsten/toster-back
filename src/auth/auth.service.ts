import { ForbiddenException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailerService: MailerService
    ){}

    async validateUser(email: string , password: string): Promise<Omit<User , "password">> {
        
        const user = await this.usersService.findOneByEmail(email);

        if(!user) {
            throw new HttpException("Неверный логин или пароль" , HttpStatus.NOT_FOUND);
        }

        const passwordDB = user.password;

        const isMatch = await bcrypt.compare(password, passwordDB);

        if(user && isMatch) {
            
            const {password , ...result} = user;

            return result

        }

        return null

    }

    async register(user: CreateUserDto , response: Response) {
        try {

            const userData = await this.usersService.create(user)

            const jwtToken = this.jwtService.sign({id: userData.id})

            response.cookie('token', jwtToken, {httpOnly: true})

            return {
                token: jwtToken
            }

        } catch(err) {
            throw new ForbiddenException("Ошибка регистрации")
        }
    }

    async login(user: User , response: Response) {

        const jwtToken = this.jwtService.sign({id: user.id})

        response.cookie('token', jwtToken, {httpOnly: true})

        return {
            token: jwtToken,
            user
        }
    }

}
