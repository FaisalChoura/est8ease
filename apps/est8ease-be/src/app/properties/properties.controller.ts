import { Controller, Get, Query } from '@nestjs/common';
import { Property } from './interfaces/property.interfacet';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  async findAll(
    @Query('area') area: string,
    @Query('bedrooms') bedrooms: string,
    @Query('priceM2') priceM2: string,
    @Query('pctLower') pctLower: string
  ): Promise<Property[]> {
    const x = await this.propertiesService.getProperties(
      area,
      parseFloat(priceM2),
      parseInt(bedrooms),
      parseFloat(pctLower)
    );
    return x;
  }
}
