import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Interest } from './schemas/interests.schema';
import { CreateInterestDto } from './dtos/create-interest.dto';
import { InterestsService } from './interests.service';

@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Post()
  async create(
    @Body() createInterestDto: CreateInterestDto,
  ): Promise<Interest> {
    return this.interestsService.create(createInterestDto);
  }

  @Get()
  async findAll(
    @Query('email') email: string,
    @Query('size') size: string,
    @Query('numOfBedrooms') numOfBedrooms: string,
    @Query('maxPrice') maxPrice: string,
    @Query('minPrice') minPrice: string,
    @Query('nameOfArea') nameOfArea: string,
  ): Promise<Interest[]> {
    console.log(minPrice);
    return this.interestsService.findExistingInterest(
      email,
      parseFloat(size),
      parseFloat(numOfBedrooms),
      parseFloat(maxPrice),
      parseFloat(minPrice),
      nameOfArea,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createInterestDto: CreateInterestDto,
  ): Promise<Interest> {
    return this.interestsService.update(id, createInterestDto);
  }
}
