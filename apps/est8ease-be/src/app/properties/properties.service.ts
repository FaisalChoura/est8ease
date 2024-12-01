import { Injectable } from '@nestjs/common';
import { Property } from './interfaces/property.interfacet';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel('Property') private readonly propertyModel: Model<Property>
  ) {}

  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }

  async getProperties(
    area: string,
    pricePerSqm: number,
    numOfBedrooms: number,
    percentageLower: number
  ): Promise<Property[]> {
    if (percentageLower === 0) {
      const query = {
        name_of_area: area,
        bedrooms: numOfBedrooms,
      };
      return this.propertyModel.find(query);
    }

    const query = {
      name_of_area: area,
      bedrooms: numOfBedrooms,
      price_m2: {
        $lt: pricePerSqm - pricePerSqm * percentageLower,
      },
    };
    // const q = query(
    //   propertiesRef,
    //   where('name_of_area', '==', area),
    //   where('num_of_bedrooms', '==', numOfBedrooms),
    //   where('price_per_m2', '<', pricePerSqm - pricePerSqm * percentageLower)
    // );
    return this.propertyModel.find(query);
  }

  async findPropertiesByCriteria(
    numOfBedrooms: number[],
    nameOfArea: string,
    extraDetails: object,
    size: number
  ): Promise<Property[]> {
    const extraDetailsKey = 'extra_details';
    const transformed = this.spreadObjectToDotNotation(extraDetails, extraDetailsKey);

    const query = {
      name_of_area: nameOfArea,
      bedrooms: { $in: numOfBedrooms },
      soft_delete: false,
      size: size ? { $gte: size } : { $gte: 0 },
      ...(Object.keys(transformed).length && transformed),
    };
    return this.propertyModel.find(query).exec();
  }

  private spreadObjectToDotNotation(obj, parentKey = '') {
    if (obj === undefined) {
      return {};
    }

    const result = {};
    const entries = Object.entries(obj)

    for (const [key, value] of entries) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
        result[newKey] = value == 'true' ? true : value == 'false' ? false : value;
    }

    return result;
  }
}
