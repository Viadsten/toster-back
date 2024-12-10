import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';
import { UsersService } from 'src/users/users.service';
import { SendMailerDto } from './dto/send.dto';
import * as NodeCache from 'node-cache';
import { VerifyDto } from './dto/verify.dto';


@Injectable()
export class MailerService {

    test(params:number): number {
        return params
    }

    private readonly codeCache: NodeCache;

    constructor(
        private readonly usersService: UsersService
    ){
        this.codeCache = new NodeCache({ stdTTL: 600 });
        const t = this.test(300)
    }

    public async sendEmail(sendMailerDto: SendMailerDto): Promise<boolean> {

        const isCurrentUserAccess = (await this.usersService.findOneByEmail(sendMailerDto.email)).isAccess

        if(isCurrentUserAccess) {
            throw new HttpException('Пользователь верефицирован!', HttpStatus.FOUND);
        }

        let code = '';

        for(let i = 0; i < 6; i++) {
        code += Math.round(Math.random() * 10).toString()
        }

        const mailerDTO = {
            recipients: sendMailerDto.email,
            subject: "Toaster",
            html: `<p>Ваш код активации: <strong>${code}</strong></p>`
        }

        this.codeCache.set(sendMailerDto.email, code);

        const transport = this.mailTransport()

        const options: Mail.Options = {
            from: {
                name: "Toster Tosterovich",
                address: "tosterovichtoster@yandex.ru"
            },
            to: mailerDTO?.recipients,
            subject: mailerDTO?.subject,
            html: mailerDTO?.html
        }

        try {
        
            const result = await transport.sendMail(options);

            return result ? true : false;
        
        } catch(e) {
            return false;
        }

    }

    public async verifyCode(verifyDto: VerifyDto) {

        const { email, code } = verifyDto;

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

    private mailTransport() {
        const transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
              user: "tosterovichtoster", 
              pass: "mlritzebjdjnrsbg" 
            }
          });

        return transporter
    }

}
