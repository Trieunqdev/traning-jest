import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InputUserDto } from './dto/input-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  async save(@Body() createUserDto: InputUserDto) {
    return this.userService.save(createUserDto);
  }

  @Get('/:username')
  async findByUsername(@Param('username') username: string) {
    await this.userService.findByUsername(username);
  }

  @Put('/:id_user')
  async edit(
    @Param('id_user') id_user: number,
    @Body() editUserDto: InputUserDto,
  ) {
    return await this.userService.edit(id_user, editUserDto);
  }

  @Delete('/:id_user')
  async delete(@Param('id_user') id_user: number) {
    return this.userService.delete(id_user);
  }
}
