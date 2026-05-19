import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Service, ServiceDocument } from '../services/schemas/service.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    // Explicitly cast serviceId string to Mongoose Types.ObjectId to prevent string query mismatch
    let serviceObjectId: Types.ObjectId;
    try {
      serviceObjectId = new Types.ObjectId(createBookingDto.serviceId);
    } catch (e) {
      serviceObjectId = createBookingDto.serviceId as any;
    }

    // Load the service details to find name and duration
    const service = await this.serviceModel.findById(serviceObjectId).exec();
    const serviceName = service ? service.name : 'Service';

    // 1. Find active bookings ONLY for the requested service on this specific date
    const existingBookings = await this.bookingModel
      .find({
        appointmentDate: createBookingDto.appointmentDate,
        serviceId: serviceObjectId as any,
        status: { $ne: 'cancelled' },
      })
      .exec();

    // 2. Generate a sequential token number with a service-specific prefix (e.g. BM-001, MN-001)
    const serviceNameLower = serviceName.toLowerCase();
    let prefix = 'TK';
    if (serviceNameLower.includes('facial') || serviceNameLower.includes('face')) prefix = 'HF';
    else if (serviceNameLower.includes('bridal') || serviceNameLower.includes('makeup')) prefix = 'BM';
    else if (serviceNameLower.includes('mehandi') || serviceNameLower.includes('renewal')) prefix = 'MH';
    else if (serviceNameLower.includes('manicure') || serviceNameLower.includes('shine')) prefix = 'MN';
    else if (serviceNameLower.includes('pedicure')) prefix = 'PD';
    else if (serviceNameLower.includes('eyebrow')) prefix = 'EB';
    else if (serviceNameLower.includes('haircut') || serviceNameLower.includes('head')) prefix = 'HC';

    const tokenSeq = existingBookings.length + 1;
    const tokenNumber = `${prefix}-${String(tokenSeq).padStart(3, '0')}`;

    // 3. Sum up durations of previous appointments in this specific queue to estimate wait time
    const duration = service?.durationInMinutes || 30; // default to 30 mins
    const totalWaitMinutes = existingBookings.length * duration;

    let waitingTime = 'Direct Entry (No queue)';
    const peopleAhead = existingBookings.length;
    if (peopleAhead > 0) {
      const hours = Math.floor(totalWaitMinutes / 60);
      const mins = totalWaitMinutes % 60;
      const timeStr = hours > 0
        ? `${hours} hr ${mins > 0 ? `${mins} min` : ''}`
        : `${mins} min`;
      waitingTime = `Approx. ${timeStr} (${peopleAhead} ${peopleAhead === 1 ? 'person' : 'people'} ahead)`;
    }

    // 4. Save the booking with its unique service token and wait time
    const newBooking = new this.bookingModel({
      ...createBookingDto,
      tokenNumber,
      waitingTime,
    });

    return newBooking.save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().populate('serviceId').exec();
  }
}
