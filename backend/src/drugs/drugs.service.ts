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

  async getDrugDetailByName(name: string) {
    const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:%22${encodeURIComponent(name)}%22&limit=1`;
    const response = await fetch(url);
    const data: any = await response.json();
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        name,
        description: result.description?.[0] || null,
        indications_and_usage: result.indications_and_usage?.[0] || null,
        purpose: result.purpose?.[0] || null,
        warnings: result.warnings?.[0] || null,
        dosage_and_administration: result.dosage_and_administration?.[0] || null,
        adverse_reactions: result.adverse_reactions?.[0] || null,
        contraindications: result.contraindications?.[0] || null,
        active_ingredient: result.active_ingredient?.[0] || null,
        inactive_ingredient: result.inactive_ingredient?.[0] || null,
        precautions: result.precautions?.[0] || null,
        drug_interactions: result.drug_interactions?.[0] || null,
        overdosage: result.overdosage?.[0] || null,
        how_supplied: result.how_supplied?.[0] || null,
        storage_and_handling: result.storage_and_handling?.[0] || null,
        ...result,
      };
    }
    return { name, description: null };
  }
} 