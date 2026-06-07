import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Service } from '../../services/schemas/service.schema';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerPhone: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Service', required: true })
  serviceId: Service;

  @Prop({ required: true })
  appointmentDate: string; // YYYY-MM-DD

  @Prop({ required: true })
  appointmentTime: string; // HH:MM AM/PM

  @Prop({ default: 'pending', enum: ['pending', 'confirmed', 'completed', 'cancelled'] })
  status: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
