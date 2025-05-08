import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICES } from 'src/utilities/constant/microservice-constant';
import { successApiWrapper } from 'src/utilities/constant/response-constant';
import { BaseResponseDto } from 'src/utilities/swagger-responses/base-response';

@Injectable()
export class ServiceAService {
  constructor(
    @Inject(MICROSERVICES.SERVICE_B)
    private readonly serviceBClient: ClientProxy,
  ) {}

  async doubleNumber(num: number): Promise<BaseResponseDto<number>> {
    const result = await firstValueFrom(
      this.serviceBClient.send<number, number>('double_number', num),
    );
    return successApiWrapper(
      result,
      'Double number calculated successfully',
      HttpStatus.OK,
    );
  }
}
