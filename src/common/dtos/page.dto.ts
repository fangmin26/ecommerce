import { PageMetaDto } from "./page-meta.dto";

export class Page<T>{
    readonly data: T[]; //schema

    readonly meta: PageMetaDto;

    constructor(data:T[], meta: PageMetaDto) { 
        //return //exclude 대체 방법 , 원하는 데이터만 뽑고싶을떄 , java와 유사
        this.data = data;
        this.meta = meta;
    }
}