import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Click } from './schemas/clicks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClickDto } from './dtos/create-click.dto';

@Injectable()
export class ClicksService {
  constructor(
    @InjectModel('Click') private readonly clicktModel: Model<Click>
  ) {}

  async create(createClickDto: CreateClickDto): Promise<Click> {
    const createdClick = new this.clicktModel(createClickDto);
    return createdClick.save();
  }
}
