import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAController } from './service-a.controller';
import { ServiceAService } from './service-a.service';

describe('ServiceAController', () => {
    let controller: ServiceAController;
    let service: ServiceAService;

    const mockService = {
        doubleNumber: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ServiceAController],
            providers: [{ provide: ServiceAService, useValue: mockService }],
        }).compile();

        controller = module.get<ServiceAController>(ServiceAController);
        service = module.get<ServiceAService>(ServiceAService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call service and return doubled number', async () => {
        const num = 5;
        const result = { data: 10, message: 'Double number calculated successfully', statusCode: 200 };

        mockService.doubleNumber.mockResolvedValue(result);

        expect(await controller.doubleNumber(num)).toBe(result);
        expect(mockService.doubleNumber).toHaveBeenCalledWith(num);
    });
});
