import { Injectable } from '@nestjs/common';
import { CreateTestEntryDto } from './dto/create-test-entry.dto';
import { UpdateTestEntryDto } from './dto/update-test-entry.dto';
import { TestEntry } from './entities/test-entry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TestEntriesService {

  constructor(
    @InjectRepository(TestEntry) 
    private testEntryRepository: Repository<TestEntry>,
  ){}

  public async create(createTestEntryDto: CreateTestEntryDto) {
    console.log("createTestEntryDto" , createTestEntryDto)
    return await this.testEntryRepository.save(createTestEntryDto);
  }

  public async findOne(id: number) {
    return await this.testEntryRepository.findOneBy({id});
  }

  public async update(id: number, updateTestEntryDto: UpdateTestEntryDto) {
    return this.testEntryRepository.update(id , updateTestEntryDto);
  }

  public async remove(id: number) {
    return await this.testEntryRepository.delete({id});
  }
}
