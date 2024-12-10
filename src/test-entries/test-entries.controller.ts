import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestEntriesService } from './test-entries.service';
import { CreateTestEntryDto } from './dto/create-test-entry.dto';
import { UpdateTestEntryDto } from './dto/update-test-entry.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Test-Entries")
@Controller('test-entries')
export class TestEntriesController {
  constructor(private readonly testEntriesService: TestEntriesService) {}

  @Post()
  create(@Body() createTestEntryDto: CreateTestEntryDto) {
    return this.testEntriesService.create(createTestEntryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testEntriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestEntryDto: UpdateTestEntryDto) {
    return this.testEntriesService.update(+id, updateTestEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testEntriesService.remove(+id);
  }
}
