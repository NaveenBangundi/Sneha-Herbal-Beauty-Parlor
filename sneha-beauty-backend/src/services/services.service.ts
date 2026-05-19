import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>
  ) {}

  async onModuleInit() {
    // Drop and re-seed to ensure all 7 exact services and static IDs match perfectly!
    try {
      await this.serviceModel.deleteMany({});
      console.log('🌱 Syncing and seeding 7 beauty parlor services to MongoDB Atlas...');
      const defaultServices = [
        { _id: "6a0c69f2e1c0da69d33a0b14", name: "Hydra Facial", imageUrl: "/services/facial.png", description: "Deep cleansing and hydration for glowing skin.", price: 1500, durationInMinutes: 60 },
        { _id: "6a0c69f3e1c0da69d33a0b15", name: "Bridal Makeup", imageUrl: "/services/bridal.jpg", description: "Expert makeup to make you feel like a princess.", price: 5000, durationInMinutes: 120 },
        { _id: "6a0c69f3e1c0da69d33a0b16", name: "Mehandi", imageUrl: "/services/mehandi.jpg", description: "Beautiful and intricate mehandi designs.", price: 1000, durationInMinutes: 90 },
        { _id: "6a0c69f3e1c0da69d33a0b17", name: "Manicure", imageUrl: "/services/manicure.jpg", description: "Relaxing manicure sessions for elegant hands.", price: 800, durationInMinutes: 45 },
        { _id: "6a0c69f3e1c0da69d33a0b18", name: "Pedicure", imageUrl: "/services/pedicure.png", description: "Rejuvenating pedicure to soothe your feet.", price: 1000, durationInMinutes: 45 },
        { _id: "6a0c69f3e1c0da69d33a0b19", name: "Eyebrow", imageUrl: "/services/eyebrow.jpg", description: "Precision threading and shaping.", price: 150, durationInMinutes: 15 },
        { _id: "6a0c69f3e1c0da69d33a0b20", name: "Haircut", imageUrl: "/services/haircut.jpeg", description: "Trendy haircuts to match your style.", price: 500, durationInMinutes: 30 }
      ];

      for (const service of defaultServices) {
        const newService = new this.serviceModel(service);
        await newService.save();
      }
      console.log('✅ Successfully synced all 7 beauty services.');
    } catch (e) {
      if (e.code === 11000) {
        console.log('💡 Services already loaded or locked by active database session.');
      } else {
        console.error('❌ Database seeding error:', e.message);
      }
    }
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = new this.serviceModel(createServiceDto);
    return newService.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service #${id} not found`);
    }
    return service;
  }
}
