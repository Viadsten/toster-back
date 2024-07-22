import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { UserId } from "src/decorators/user-id.decorators";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@Controller('currentUser')
@ApiTags("currentUser")
@ApiBearerAuth()
export class UserController {

    constructor(private readonly usersService: UsersService) {}

    @Get("")
    @UseGuards(JwtAuthGuard)
    getCurrentUser(@UserId() id: number) {
        return this.usersService.findById(id)
    }
}