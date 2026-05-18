import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Hydra Facial', description: 'The name of the beauty service' })
  name: string;

  @ApiProperty({ example: 'Deep cleansing and hydration for glowing skin.', description: 'Description of the service' })
  description: string;

  @ApiProperty({ example: 1500, description: 'Price of the service in INR' })
  price: number;

  @ApiProperty({ example: 60, description: 'Duration of the service in minutes' })
  durationInMinutes: number;

  @ApiProperty({ example: 'https://cloudinary.com/image.png', required: false, description: 'URL of the service image' })
  imageUrl?: string;
}
