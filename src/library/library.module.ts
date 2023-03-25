import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from './entities/library.entity';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[
    HttpModule,
    TypeOrmModule.forFeature([Library]),
    ConfigModule.forRoot({
      isGlobal:true,
      cache: true,
      expandVariables: true
    }),
  ],
  controllers: [LibraryController],
  providers: [LibraryService]
})
export class LibraryModule {}
