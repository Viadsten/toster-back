import { ApiProperty } from "@nestjs/swagger";

export class SendDto {
    @ApiProperty()
    email: string
}