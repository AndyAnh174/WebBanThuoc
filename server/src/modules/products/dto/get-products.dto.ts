import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum ProductSortBy {
    CREATED_AT = 'createdAt',
    PRICE = 'price',
    NAME = 'name',
    SOLD_COUNT = 'soldCount',
    VIEW_COUNT = 'viewCount',
}

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

/**
 * DTO cho query params lấy danh sách sản phẩm
 */
export class GetProductsQueryDto {
    @ApiPropertyOptional({
        description: 'Số trang (bắt đầu từ 1)',
        default: 1,
        minimum: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({
        description: 'Số sản phẩm mỗi trang',
        default: 12,
        minimum: 1,
        maximum: 100,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 12;

    @ApiPropertyOptional({
        description: 'Filter theo category ID',
        example: 'uuid-category-id',
    })
    @IsOptional()
    @IsString()
    categoryId?: string;

    @ApiPropertyOptional({
        description: 'Filter theo manufacturer ID',
        example: 'uuid-manufacturer-id',
    })
    @IsOptional()
    @IsString()
    manufacturerId?: string;

    @ApiPropertyOptional({
        description: 'Chỉ lấy sản phẩm nổi bật',
        example: 'true',
    })
    @IsOptional()
    @IsString()
    isFeatured?: string;

    @ApiPropertyOptional({
        description: 'Sắp xếp theo trường',
        enum: ProductSortBy,
        default: ProductSortBy.CREATED_AT,
    })
    @IsOptional()
    @IsEnum(ProductSortBy)
    sortBy?: ProductSortBy = ProductSortBy.CREATED_AT;

    @ApiPropertyOptional({
        description: 'Thứ tự sắp xếp',
        enum: SortOrder,
        default: SortOrder.DESC,
    })
    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder = SortOrder.DESC;
}
