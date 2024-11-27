import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import * as NodeCache from 'node-cache';
import { UsersService } from 'src/users/users.service';
import { VerifyDto } from './dto/verify.dto';
import { SendDto } from './dto/send.dto';

@Controller('mailer')
@ApiTags("MailVerification")
export class MailerController {

  private readonly codeCache: NodeCache;

  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService) 
  {
      this.codeCache = new NodeCache({ stdTTL: 600 });
  }


  @Post("send")
  @ApiBody({ type: SendDto })
  async sendMail(@Body() body: SendDto) {

    let code = '';

    for(let i = 0; i < 6; i++) {
      code += Math.round(Math.random() * 10).toString()
    }

    const isCurrentUserAccess = (await this.usersService.findOneByEmail(body.email)).isAccess

    if(isCurrentUserAccess) {
      throw new HttpException('Пользователь верефицирован!', HttpStatus.FOUND);
    }

    const dto = {
      recipients: body.email,
      subject: "Toaster",
      html: `<p>Ваш код активации: <strong>${code}</strong></p>`
    }

    this.codeCache.set(body.email, code);

    await this.mailerService.sendEmail(dto)

    return { message: 'Код отправлен на почту' };
  }


  @Post("verify")
  @ApiBody({ type: VerifyDto })
  async verifyCode(@Body() body: VerifyDto) {

    const { email, code } = body;

    const cachedCode = this.codeCache.get(email);

    if (cachedCode !== code) {
      throw new HttpException('Неверный код', HttpStatus.BAD_REQUEST);
    }

    const currentUserVerifyed = await this.usersService.findOneByEmail(email)

    currentUserVerifyed.isAccess = true;

    this.codeCache.del(email);

    const updatedUser = await this.usersService.updateUser(currentUserVerifyed)

    return { message: 'Верификация прошла успешно!' , updatedUser };
  }


}
