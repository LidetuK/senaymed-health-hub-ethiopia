
import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { DrugsService } from './drugs.service';

@Controller('drugs')
export class DrugsController {
  constructor(private readonly drugsService: DrugsService) {}

  @Get()
  async getDrugs(@Query('startsWith') startsWith: string) {
    try {
      if (!startsWith) {
        throw new HttpException('Missing startsWith query parameter', HttpStatus.BAD_REQUEST);
      }
      return await this.drugsService.getDrugsByFirstLetter(startsWith);
    } catch (error) {
      console.error(`Error getting drugs starting with ${startsWith}:`, error);
      throw new HttpException(
        error.message || 'Failed to fetch drugs', 
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('detail')
  async getDrugDetail(@Query('name') name: string) {
    try {
      if (!name) {
        throw new HttpException('Missing name query parameter', HttpStatus.BAD_REQUEST);
      }
      return await this.drugsService.getDrugDetailByName(name);
    } catch (error) {
      console.error(`Error getting drug detail for ${name}:`, error);
      throw new HttpException(
        error.message || 'Failed to fetch drug detail', 
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 
