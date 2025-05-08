import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiRouting } from 'src/core/decorators/api-controller.decorator';
import { BaseResponseDto } from 'src/utilities/swagger-responses/base-response';
import { ServiceAService } from './service-a.service';

@ApiRouting({ tag: 'Service A', path: '/service-a' })
@Controller()
export class ServiceAController {
  constructor(private readonly serviceAService: ServiceAService) {}

  @Get('double/:num')
  @ApiResponse({ status: HttpStatus.OK, type: BaseResponseDto })
  async doubleNumber(
    @Param('num') num: number,
  ): Promise<BaseResponseDto<number>> {
    return await this.serviceAService.doubleNumber(+num);
  }
}
