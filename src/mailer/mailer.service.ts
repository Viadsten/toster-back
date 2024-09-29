import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';


@Injectable()
export class MailerService {


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

    public async sendEmail(dto: any) {

        const transport = this.mailTransport()

        const options: Mail.Options = {
            from: {
                name: "Toster Tosterovich",
                address: "tosterovichtoster@yandex.ru"
            },
            to: dto?.recipients,
            subject: dto?.subject,
            html: dto?.html
        }

        try {
            const result = await transport.sendMail(options)

            return result
        } catch(e) {
            console.log(e)
        }

    }

}
