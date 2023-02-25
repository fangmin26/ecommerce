import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDtoPrameters } from "../interface/page-meta.dto-parameters.dto";

export class PageMetaDto{
    @ApiProperty()
    readonly page: number;

    @ApiProperty()
    readonly take: number;

    @ApiProperty()
    readonly itemcount: number;

    @ApiProperty()
    readonly pagecount: number;

    @ApiProperty()
    readonly hasPreviousPage: boolean;

    @ApiProperty()
    readonly hasNextPage: boolean;

    constructor({pageOptionDto,itemCount}:PageMetaDtoPrameters){
        this.page = pageOptionDto.page;
        this.take = pageOptionDto.take;
        this.itemcount = itemCount;
        this.pagecount = Math.ceil(this.itemcount/this.take);
        this.hasPreviousPage = this.page>1;
        this.hasNextPage = this.page < this.pagecount

    }
}