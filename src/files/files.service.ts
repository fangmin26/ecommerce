import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { PublicFile } from './entities/file.entity';
import {v4 as uuid} from 'uuid'//기존 uuid 기능에 추가적 기능이 필요해서 설치

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFileRepo:Repository<PublicFile>,
    private readonly configService:ConfigService
  ){}

  // async uploadPublicFile(dataBuffer:Buffer, filename:string){
  //   const s3 = new S3()
  //   const uploadResult = await s3.upload({
  //     Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
  //     Body: dataBuffer,
  //     Key: `${uuid}-${filename}`
  //   }).promise()

  //   const newFile =  this.publicFileRepo.create({
  //     key:uploadResult.Key,
  //     url: uploadResult.Location
  //   })
  //   await this.publicFileRepo.save(newFile)
  //   return newFile;
  // }

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3()
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    }).promise()

    const newFile = this.publicFileRepo.create({
      key: uploadResult.Key,
      url: uploadResult.Location
    })
    await this.publicFileRepo.save(newFile)
    return newFile;
  }

  async deleteAvatar(id:string){
    try {
      console.log(id,"!!!!")
      if(id){
        await this.publicFileRepo.delete({id})
      }else{
        throw new HttpException('no id', HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

