import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async save(user: IUser) {
    const userValidate = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (userValidate)
      throw new InternalServerErrorException({
        message: 'This username is already in use',
      });

    await this.userRepository.insert(user);

    return await this.userRepository.findOneBy({ username: user.username });
  }

  async findByUsername(username: string) {
    const userValidate = await this.userRepository.findOneBy({
      username: username,
    });

    if (!userValidate)
      throw new NotFoundException({ message: 'User not found' });

    return userValidate;
  }

  async edit(id_user: number, user: IUser) {
    const userValidateById = await this.userRepository.findOneBy({ id_user });

    if (!userValidateById)
      throw new NotFoundException({ message: 'User not found' });

    const userValidateByUsername = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (userValidateByUsername)
      throw new InternalServerErrorException({
        message: 'This username is already in use',
      });

    await this.userRepository.update(id_user, { username: user.username });

    return await this.userRepository.findOneBy({ id_user });
  }

  async delete(id_user: number) {
    const userValidate = await this.userRepository.findOneBy({ id_user });

    if (!userValidate)
      throw new NotFoundException({ message: 'User not found' });

    await this.userRepository.delete(id_user);

    return { message: 'User deleted successfully' };
  }
}
