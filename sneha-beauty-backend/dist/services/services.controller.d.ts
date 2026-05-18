import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): Promise<import("./schemas/service.schema").Service>;
    findAll(): Promise<import("./schemas/service.schema").Service[]>;
}
