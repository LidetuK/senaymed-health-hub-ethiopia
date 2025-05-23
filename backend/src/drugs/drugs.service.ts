import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Drug } from './entities/drug.entity';

@Injectable()
export class DrugsService {
  constructor(
    @InjectRepository(Drug)
    private drugRepository: Repository<Drug>,
  ) {}

  async getDrugsByFirstLetter(letter: string) {
    // 1. Check local DB
    const cached = await this.drugRepository.find({
      where: { name: ILike(`${letter}%`) },
      order: { name: 'ASC' }
    });
    if (cached.length > 0) {
      return cached.map(d => d.name);
    }

    // 2. Fetch from OpenFDA
    const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${letter}*&limit=20`;
    const response = await fetch(url);
    const data: any = await response.json();
    const drugs = data.results?.flatMap((item: any) => item.openfda.brand_name || []) || [];
    const uniqueDrugs = Array.from(new Set(drugs)).sort();

    // 3. Save to DB (only strings)
    await this.drugRepository.save(
      uniqueDrugs.filter((name): name is string => typeof name === 'string').map(name => ({ name }))
    );

    return uniqueDrugs;
  }
} 