import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new beauty service' })
  @ApiResponse({ status: 201, description: 'The service has been successfully created.' })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all beauty services' })
  @ApiResponse({ status: 200, description: 'Return all services.' })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get('seed')
  @ApiOperation({ summary: 'Seed default beauty services in MongoDB' })
  @ApiResponse({ status: 200, description: 'Database successfully seeded.' })
  async seed() {
    await this.servicesService.onModuleInit();
    return {
      message: 'Seeding executed successfully!',
      services: await this.servicesService.findAll()
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific beauty service by id' })
  @ApiParam({ name: 'id', description: 'The ID of the service to fetch' })
  @ApiResponse({ status: 200, description: 'Return the requested service.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }
}
