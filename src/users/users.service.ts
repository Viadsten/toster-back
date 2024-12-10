import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
  ){}

  public async create(createUserDto: CreateUserDto) {

    const userDB = this.userRepository.findOneBy({email: createUserDto.email})

    if(userDB) {
      throw new HttpException('Пользователь с такой почтой есть! Иди нахуй', HttpStatus.CONFLICT)
    }

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    const createUser = {...createUserDto , password: hashPassword}

    return await this.userRepository.save(createUser);

  }

  public async findById(id: number) {
    return await this.userRepository.findOneBy({id});
  }

  public async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({email})
  }

  public async updateUser(entity: UpdateUserDto) {

    if(!entity?.id) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return await this.userRepository.update(entity.id , entity)
  }

}
