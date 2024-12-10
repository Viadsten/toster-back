import { Module } from '@nestjs/common';
import { TestEntriesService } from './test-entries.service';
import { TestEntriesController } from './test-entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntry } from './entities/test-entry.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestEntry]),
  ],
  controllers: [TestEntriesController],
  providers: [TestEntriesService],
})
export class TestEntriesModule {}
