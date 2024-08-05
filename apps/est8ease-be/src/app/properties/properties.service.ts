import { Injectable } from '@nestjs/common';
import { Property } from './interfaces/property.interfacet';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel('Property') private readonly propertyModel: Model<Property>,
  ) {}

  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }

  async getProperties(
    area: string,
    pricePerSqm: number,
    numOfBedrooms: number,
    percentageLower: number,
  ): Promise<Property[]> {
    const query = {
      name_of_area: area,
      bedrooms: numOfBedrooms,
      price_m2: {
        $lt: pricePerSqm - pricePerSqm * percentageLower,
      },
    };
    console.log(query);
    // const q = query(
    //   propertiesRef,
    //   where('name_of_area', '==', area),
    //   where('num_of_bedrooms', '==', numOfBedrooms),
    //   where('price_per_m2', '<', pricePerSqm - pricePerSqm * percentageLower)
    // );
    return this.propertyModel.find(query);
  }
}
