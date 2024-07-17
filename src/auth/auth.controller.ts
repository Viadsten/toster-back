import { Body, Controller, HttpCode, HttpStatus, Post , Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiBody({type: CreateUserDto})
    async login(@Request() req) {
        return this.authService.login(req.user as User);
    }

    @Post("register")
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto)
    }

}
