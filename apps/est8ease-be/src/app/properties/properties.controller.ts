import { Controller, Get, Query } from '@nestjs/common';
import { Property } from './interfaces/property.interfacet';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  // @Get()
  // async findAll(
  //   @Query('area') area: string,
  //   @Query('bedrooms') bedrooms: string,
  //   @Query('priceM2') priceM2: string,
  //   @Query('pctLower') pctLower: string
  // ): Promise<Property[]> {
  //   const x = await this.propertiesService.getProperties(
  //     area,
  //     parseFloat(priceM2),
  //     parseInt(bedrooms),
  //     parseFloat(pctLower)
  //   );
  //   return x;
  // }

  @Get()
  async findByCriteria(
    @Query() queryParams: Record<string, any> // Retrieve all query parameters
  ): Promise<Property[]> {
    const { area, bedrooms, size, ...rest } = queryParams;

    // Convert bedrooms to an array
    const parsedBedrooms = Array.isArray(bedrooms) ? bedrooms.map((b) => parseInt(b)) : [parseInt(bedrooms)];

    // Construct extraDetails object from remaining query params
    const extraDetails = Object.keys(rest).reduce((acc, key) => {
      acc[key] = rest[key];
      return acc;
    }, {} as Record<string, any>);

    // Call the service with parsed criteria
    return this.propertiesService.findPropertiesByCriteria(parsedBedrooms, area, extraDetails, parseFloat(size));
  }
}
