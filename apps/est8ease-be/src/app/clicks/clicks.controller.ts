import { Body, Controller, Post } from '@nestjs/common';
import { CreateClickDto } from './dtos/create-click.dto';
import { Click } from './schemas/clicks.schema';
import { ClicksService } from './clicks.service';

@Controller('clicks')
export class ClicksController {
  constructor(private readonly clickService: ClicksService) {}
  @Post('')
  async create(@Body() createClickDto: CreateClickDto): Promise<Click> {
    return this.clickService.create(createClickDto);
  }
}
