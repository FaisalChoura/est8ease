import { Controller, Get, Query } from '@nestjs/common';
import { Property } from './interfaces/property.interfacet';
import { PropertiesService } from './properties.service';
import { PropertiesResponseInterface } from './interfaces/properties-response.interface';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  async findByCriteria(
    @Query() queryParams: Record<string, any> // Retrieve all query parameters
  ): Promise<PropertiesResponseInterface> {
    const { area, bedrooms, minSize, maxSize, page, ...rest } = queryParams;

    // Convert bedrooms to an array
    const parsedBedrooms = Array.isArray(bedrooms) ? bedrooms.map((b) => parseInt(b)) : [parseInt(bedrooms)];

    // Construct extraDetails object from remaining query params
    const extraDetails = Object.keys(rest).reduce((acc, key) => {
      acc[key] = rest[key];
      return acc;
    }, {} as Record<string, any>);

    // Call the service with parsed criteria
    return this.propertiesService.findPropertiesByCriteria(parsedBedrooms, area, extraDetails, parseFloat(minSize), parseFloat(maxSize), parseInt(page) );
  }
}
