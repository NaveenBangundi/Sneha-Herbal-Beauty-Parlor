import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = new this.serviceModel(createServiceDto);
    return newService.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }
}
