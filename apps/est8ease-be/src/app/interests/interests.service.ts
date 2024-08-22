import { Injectable } from '@nestjs/common';
import { Interest } from './schemas/interests.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInterestDto } from './dtos/create-interest.dto';

@Injectable()
export class InterestsService {
  constructor(
    @InjectModel('Interest') private readonly interestModel: Model<Interest>
  ) {}

  async findByEmail(email: string): Promise<Interest[]> {
    return this.interestModel
      .find({
        email: email,
      })
      .exec();
  }

  async findExistingInterest(
    email: string,
    size: number,
    numOfBedrooms: number,
    maxPrice: number,
    minPrice: number,
    nameOfArea: string
  ): Promise<Interest[]> {
    const query = {
      email: email,
      number_of_bedrooms: numOfBedrooms,
      max_price: maxPrice,
      min_price: minPrice,
      size: {
        $lte: size + size * 0.05,
        $gte: size - size * 0.05,
      },
      name_of_area: nameOfArea,
    };
    return this.interestModel.find(query);
  }

  async create(createInterestDto: CreateInterestDto): Promise<Interest> {
    console.log(createInterestDto);
    const createdInterest = new this.interestModel(createInterestDto);
    return createdInterest.save();
  }

  async update(
    id: string,
    createInterestDto: CreateInterestDto
  ): Promise<Interest> {
    return this.interestModel
      .findByIdAndUpdate(id, createInterestDto, { new: true })
      .exec();
  }
}
