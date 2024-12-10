import { PartialType } from '@nestjs/swagger';
import { CreateTestEntryDto } from './create-test-entry.dto';

export class UpdateTestEntryDto extends PartialType(CreateTestEntryDto) {}
