import { Controller, Get, Query } from '@nestjs/common';
import { DrugsService } from './drugs.service';

@Controller('drugs')
export class DrugsController {
  constructor(private readonly drugsService: DrugsService) {}

  @Get()
  async getDrugs(@Query('startsWith') startsWith: string) {
    return this.drugsService.getDrugsByFirstLetter(startsWith);
  }

  @Get('detail')
  async getDrugDetail(@Query('name') name: string) {
    return this.drugsService.getDrugDetailByName(name);
  }
} 