import { Body, Controller, HttpCode, HttpStatus, Post , Request, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';
import { Response } from 'express';
import { MailerService } from 'src/mailer/mailer.service';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBody({type: CreateUserDto})
    @Post('login')
    login(
        @Request() req,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.login(req.user , response);
    }

    @Post("register")
    register(
        @Body() dto: CreateUserDto,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.register(dto , response)
    }

    @Post("logout")
    logout(
        @Res({ passthrough: true }) response: Response
    ){
        response.clearCookie('token')
        return true;
    }

}
