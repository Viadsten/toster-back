import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({id});
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({email})
  }

  async updateUser(entity: UpdateUserDto) {

    if(!entity?.id) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return await this.userRepository.update(entity.id , entity)
  }

}
