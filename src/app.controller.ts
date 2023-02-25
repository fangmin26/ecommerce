import { Controller, Get } from '@nestjs/common';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly healthCheckService: HealthCheckService,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly diskHealthIndicator:DiskHealthIndicator
    ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  //healthcheck
  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      ()=> this.typeOrmHealthIndicator.pingCheck('database'),
      ()=> this.memoryHealthIndicator.checkHeap('memory heap', 300*1024*1024),
      ()=> this.memoryHealthIndicator.checkRSS('memory RSS',300*1024*1024)
    ])
  }
  
}
