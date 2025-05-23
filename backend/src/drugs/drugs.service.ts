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
    console.log(`Fetching drugs starting with letter: ${letter}`);
    
    // 1. Check local DB
    const cached = await this.drugRepository.find({
      where: { name: ILike(`${letter}%`) },
      order: { name: 'ASC' }
    });
    console.log(`Found ${cached.length} drugs in cache`);
    
    if (cached.length > 0) {
      console.log('Returning cached drugs:', cached.map(d => d.name));
      return cached.map(d => d.name);
    }

    // 2. Fetch from OpenFDA with increased limit
    const brandNameUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${letter}*&limit=100`;
    const genericNameUrl = `https://api.fda.gov/drug/label.json?search=openfda.generic_name:${letter}*&limit=100`;
    
    console.log(`Fetching brand names from OpenFDA: ${brandNameUrl}`);
    console.log(`Fetching generic names from OpenFDA: ${genericNameUrl}`);
    
    try {
      const [brandResponse, genericResponse] = await Promise.all([
        fetch(brandNameUrl),
        fetch(genericNameUrl)
      ]);
      
      if (!brandResponse.ok || !genericResponse.ok) {
        console.error('OpenFDA API error:', {
          brandStatus: brandResponse.status,
          genericStatus: genericResponse.status
        });
        throw new Error('Failed to fetch from OpenFDA API');
      }
      
      const [brandData, genericData] = await Promise.all([
        brandResponse.json(),
        genericResponse.json()
      ]);
      
      console.log(`Brand names response status: ${brandResponse.status}`);
      console.log(`Generic names response status: ${genericResponse.status}`);
      console.log(`Number of brand name results: ${brandData.results?.length || 0}`);
      console.log(`Number of generic name results: ${genericData.results?.length || 0}`);
      
      // Get all brand names and generic names
      const brandDrugs = brandData.results?.flatMap((item: any) => {
        const brandNames = item.openfda.brand_name || [];
        const genericNames = item.openfda.generic_name || [];
        return [...brandNames, ...genericNames];
      }) || [];
      
      const genericDrugs = genericData.results?.flatMap((item: any) => {
        const brandNames = item.openfda.brand_name || [];
        const genericNames = item.openfda.generic_name || [];
        return [...brandNames, ...genericNames];
      }) || [];
      
      const allDrugs = [...brandDrugs, ...genericDrugs];
      console.log(`Total drugs before deduplication: ${allDrugs.length}`);
      console.log('Sample of drugs before deduplication:', allDrugs.slice(0, 5));
      
      // Remove duplicates and sort
      const uniqueDrugs = Array.from(new Set(allDrugs))
        .filter((name): name is string => {
          // Filter out null, undefined, and empty strings
          if (!name || typeof name !== 'string' || name.trim() === '') {
            return false;
          }
          // Filter out non-drug names (like "Attitude Diaper Cream")
          if (name.toLowerCase().includes('cream') || 
              name.toLowerCase().includes('diaper') || 
              name.toLowerCase().includes('lotion') ||
              name.toLowerCase().includes('shampoo') ||
              name.toLowerCase().includes('soap')) {
            return false;
          }
          return true;
        })
        .map(name => name.trim()) // Trim whitespace
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })); // Case-insensitive sort

      console.log(`Total unique drugs after deduplication: ${uniqueDrugs.length}`);
      console.log('First few drugs after deduplication:', uniqueDrugs.slice(0, 5));

      // 3. Save to DB
      await this.drugRepository.save(
        uniqueDrugs.map(name => ({ name }))
      );

      return uniqueDrugs;
    } catch (error) {
      console.error('Error fetching drugs:', error);
      throw error;
    }
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