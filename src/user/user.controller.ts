import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  async save(@Body() createUserDto: CreateUserDto) {
    return this.userService.save(createUserDto);
  }

  @Get('/:username')
  async findByUsername(@Param('username') username: string) {
    await this.userService.findByUsername(username);
  }

  @Put('/:id_user')
  async edit(
    @Param('id_user') id_user: number,
    @Body() editUserDto: CreateUserDto,
  ) {
    return await this.userService.edit(id_user, editUserDto);
  }

  @Delete('/:id_user')
  async delete(@Param('id_user') id_user: number) {
    return this.userService.delete(id_user);
  }
}
