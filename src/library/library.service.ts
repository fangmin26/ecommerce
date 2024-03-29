import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { Library } from './entities/library.entity';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    public readonly libaryRepo: Repository<Library>,
    private readonly httpService: HttpService,
    private readonly configServce: ConfigService
  ){}
  async create(){
    const {data, status}=   await this.httpService.get(this.configServce.get('LIBRARY_ADDRESS')).toPromise()

    if(status === 200){
      const datas = data.data
      const librarydata = [];
      datas?.map(data => ( 
        librarydata.push({
          bookname: data['도서명'],
          libraryname:data['자료실명'],
          writer:data['저자명'],
          publisher:data['출판사명'],
        })

      ))
      return await this.libaryRepo.save(librarydata)
    }
  }
}
