import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from './interfaces/property.interfacet';
import { PropertiesResponseInterface } from './interfaces/properties-response.interface';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel('Property') private readonly propertyModel: Model<Property>
  ) {}

  async findAll(): Promise<Property[]> {
    return this.propertyModel.find().exec();
  }

  async findPropertiesByCriteria(
    numOfBedrooms: number[],
    nameOfArea: string,
    extraDetails: object,
    minSize: number,
    maxSize: number,
    minPrice: number,
    maxPrice: number,
    sortOption: string,
    sortOrder: string,
    page = 1, // default to page 1
    limit = 25 // default to 10 items per page
  ): Promise<PropertiesResponseInterface> {
    const extraDetailsKey = 'extra_details';
    const transformed = this.spreadObjectToDotNotation(extraDetails, extraDetailsKey);

    const sizeQuery = {
      $gte: minSize ? minSize : 0,
      $lte: maxSize ? maxSize : Infinity,
    };

    const priceQuery = {
      $gte: minPrice ? minPrice : 0,
      $lte: maxPrice ? maxPrice : Infinity,
    };

    const query = {
      name_of_area: nameOfArea,
      bedrooms: { $in: numOfBedrooms },
      soft_delete: false,
      size: sizeQuery,
      price: priceQuery,
      ...(Object.keys(transformed).length && transformed),
    };
    let sort: { [key: string]: 1 | -1 } = { [sortOption]: sortOrder === 'desc' ? -1 : 1 };

    if (sortOption && sortOption.length === 0) {
      sort = {}
    }

    const total = await this.propertyModel.countDocuments(query).exec(); // Total count of matching documents
    const data = await this.propertyModel
      .find(query)
      .sort(sort) // Apply sorting
      .skip((page - 1) * limit) // Calculate the number of documents to skip
      .limit(limit) // Limit the number of documents returned
      .exec();

    // Calculate average cost per sqm
    const avgCostPerSqmResult = await this.propertyModel
      .aggregate([
        { $match: query }, // Apply the same filters
        {
          $match: {
            price: { $type: 'number', $gte: 0 }, // Ensure cost is numeric and non-negative
            size: { $type: 'number', $gte: 1 }, // Ensure size is numeric and positive
          },
        },
        {
          $group: {
            _id: null,
            avgCostPerSqm: { $avg: { $divide: ['$price', '$size'] } }, // Calculate average
          },
        },
      ])
      .exec();

    const avgCostPerSqm = Math.round(avgCostPerSqmResult[0]?.avgCostPerSqm || 0);

    return {
      data,
      total,
      page,
      limit,
      avgCostPerSqm,
    };
  }


  private spreadObjectToDotNotation(obj, parentKey = '') {
    if (obj === undefined) {
      return {};
    }

    const result = {};
    const entries = Object.entries(obj);

    for (const [key, value] of entries) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      result[newKey] = value === 'true' ? true : value === 'false' ? false : value;
    }

    return result;
  }
}
