"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateServiceDto {
    name;
    description;
    price;
    durationInMinutes;
    imageUrl;
}
exports.CreateServiceDto = CreateServiceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hydra Facial', description: 'The name of the beauty service' }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deep cleansing and hydration for glowing skin.', description: 'Description of the service' }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500, description: 'Price of the service in INR' }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60, description: 'Duration of the service in minutes' }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "durationInMinutes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://cloudinary.com/image.png', required: false, description: 'URL of the service image' }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "imageUrl", void 0);
//# sourceMappingURL=create-service.dto.js.map