import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'Naveen', description: 'Name of the customer' })
  customerName: string;

  @ApiProperty({ example: '+91 9876543210', description: 'Phone number of the customer' })
  customerPhone: string;

  @ApiProperty({ example: '60a2b8... (MongoDB ObjectId)', description: 'ID of the requested service' })
  serviceId: string;

  @ApiProperty({ example: '2026-05-20', description: 'Requested date for the appointment' })
  appointmentDate: string;

  @ApiProperty({ example: '10:30 AM', description: 'Requested time for the appointment' })
  appointmentTime: string;
}
