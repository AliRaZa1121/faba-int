import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { MICROSERVICES } from 'src/utilities/constant/microservice-constant';
import { ServiceAService } from './service-a.service';

describe('ServiceAService', () => {
    let service: ServiceAService;
    let serviceBClient: ClientProxy;

    const mockClientProxy = {
        send: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ServiceAService,
                { provide: MICROSERVICES.SERVICE_B, useValue: mockClientProxy },
            ],
        }).compile();

        service = module.get<ServiceAService>(ServiceAService);
        serviceBClient = module.get<ClientProxy>(MICROSERVICES.SERVICE_B);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should double a number', async () => {
        const num = 5;
        const result = 10;

        mockClientProxy.send.mockReturnValue(of(result));

        const response = await service.doubleNumber(num);

        expect(response.data).toStrictEqual(result);
    });
});
