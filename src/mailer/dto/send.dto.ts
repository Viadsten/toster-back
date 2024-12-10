import { ApiProperty } from "@nestjs/swagger";

export class SendMailerDto {
    @ApiProperty()
    email: string
}