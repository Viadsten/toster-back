import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/users/users.service';
import { VerifyDto } from './dto/verify.dto';
import { SendMailerDto } from './dto/send.dto';

@Controller('mailer')
@ApiTags("MailVerification")
export class MailerController {

  constructor(private readonly mailerService: MailerService) {}


  @Post("send")
  @ApiBody({ type: SendMailerDto })
  async sendMail(@Body() body: SendMailerDto) {

    const isSend = await this.mailerService.sendEmail(body)

    if(!isSend) {
      throw new HttpException("Ошибка отправки кода" , HttpStatus.BAD_REQUEST)
    }

    return { message: 'Код отправлен на почту' };
  }


  @Post("verify")
  @ApiBody({ type: VerifyDto })
  async verifyCode(@Body() body: VerifyDto) {
    return await this.mailerService.verifyCode(body);
  }


}
