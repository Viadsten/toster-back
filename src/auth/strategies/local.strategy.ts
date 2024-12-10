import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/users/entities/user.entity";
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService){
        super({
            usernameField: "email"
        })
    }

    async validate(email: string , password: string): Promise<Omit<User, "password">> {

        const user = await this.authService.validateUser(email , password)

        if(!user) {
            throw new HttpException("Неверный логин или пароль" , HttpStatus.NOT_FOUND)
        }

        return user

    }

}