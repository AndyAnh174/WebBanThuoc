import { Controller, Get, Param, Query } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { GetProductsQueryDto } from './dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    /**
     * Lấy danh sách sản phẩm
     */
    @Get()
    @ApiOperation({
        summary: 'Lấy danh sách sản phẩm',
        description:
            'Lấy danh sách sản phẩm với phân trang, filter theo danh mục, nhà sản xuất, sản phẩm nổi bật',
    })
    @ApiResponse({
        status: 200,
        description: 'Danh sách sản phẩm',
        schema: {
            example: {
                items: [
                    {
                        id: 'uuid',
                        name: 'Panadol Extra',
                        slug: 'panadol-extra',
                        sku: 'PAN001',
                        price: 45000,
                        originalPrice: 50000,
                        unit: 'hộp',
                        thumbnailUrl: 'http://...',
                        isFeatured: true,
                        soldCount: 150,
                        viewCount: 1200,
                        stockQuantity: 50,
                        createdAt: '2024-01-01T00:00:00.000Z',
                        category: { id: 'uuid', name: 'Thuốc giảm đau', slug: 'thuoc-giam-dau' },
                        manufacturer: { id: 'uuid', name: 'GSK', slug: 'gsk' },
                    },
                ],
                pagination: {
                    page: 1,
                    limit: 12,
                    total: 100,
                    totalPages: 9,
                    hasNext: true,
                    hasPrev: false,
                },
            },
        },
    })
    async findAll(@Query() query: GetProductsQueryDto) {
        return this.productsService.findAll(query);
    }

    /**
     * Tìm kiếm sản phẩm
     */
    @Get('search')
    @ApiOperation({
        summary: 'Tìm kiếm sản phẩm',
        description: 'Tìm kiếm sản phẩm theo tên, hoạt chất, mô tả, mã SKU (case-insensitive)',
    })
    @ApiQuery({
        name: 'q',
        required: true,
        description: 'Từ khóa tìm kiếm',
        example: 'panadol',
    })
    @ApiQuery({
        name: 'page',
        required: false,
        description: 'Số trang',
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Số kết quả mỗi trang',
        example: 12,
    })
    @ApiResponse({
        status: 200,
        description: 'Kết quả tìm kiếm',
        schema: {
            example: {
                keyword: 'panadol',
                items: [
                    {
                        id: 'uuid',
                        name: 'Panadol Extra',
                        slug: 'panadol-extra',
                        price: 45000,
                        thumbnailUrl: 'http://...',
                        activeIngredient: 'Paracetamol, Caffeine',
                    },
                ],
                pagination: {
                    page: 1,
                    limit: 12,
                    total: 5,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: false,
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Thiếu từ khóa tìm kiếm' })
    async search(
        @Query('q') keyword: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        if (!keyword || keyword.trim() === '') {
            return {
                keyword: '',
                items: [],
                pagination: {
                    page: 1,
                    limit: 12,
                    total: 0,
                    totalPages: 0,
                    hasNext: false,
                    hasPrev: false,
                },
            };
        }

        return this.productsService.search(
            keyword.trim(),
            page ? parseInt(page, 10) : 1,
            limit ? parseInt(limit, 10) : 12,
        );
    }

    /**
     * Lấy chi tiết sản phẩm
     */
    @Get(':idOrSlug')
    @ApiOperation({
        summary: 'Lấy chi tiết sản phẩm',
        description: 'Lấy thông tin chi tiết sản phẩm theo ID hoặc slug. Tự động tăng lượt xem.',
    })
    @ApiParam({
        name: 'idOrSlug',
        description: 'ID hoặc slug của sản phẩm',
        example: 'panadol-extra',
    })
    @ApiResponse({
        status: 200,
        description: 'Chi tiết sản phẩm',
        schema: {
            example: {
                id: 'uuid',
                name: 'Panadol Extra',
                slug: 'panadol-extra',
                sku: 'PAN001',
                price: 45000,
                originalPrice: 50000,
                stockQuantity: 50,
                unit: 'hộp',
                activeIngredient: 'Paracetamol 500mg, Caffeine 65mg',
                packaging: 'Hộp 12 vỉ x 10 viên',
                description: 'Thuốc giảm đau, hạ sốt...',
                usageInstructions: 'Uống 1-2 viên/lần...',
                storageInstructions: 'Bảo quản nơi khô ráo...',
                thumbnailUrl: 'http://...',
                isFeatured: true,
                soldCount: 150,
                viewCount: 1201,
                category: {
                    id: 'uuid',
                    name: 'Thuốc giảm đau',
                    slug: 'thuoc-giam-dau',
                },
                manufacturer: {
                    id: 'uuid',
                    name: 'GSK',
                    slug: 'gsk',
                    logoUrl: 'http://...',
                },
                images: [
                    { id: 'uuid', imageUrl: 'http://...', sortOrder: 0 },
                    { id: 'uuid', imageUrl: 'http://...', sortOrder: 1 },
                ],
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Sản phẩm không tồn tại' })
    async findOne(@Param('idOrSlug') idOrSlug: string) {
        return this.productsService.findOne(idOrSlug);
    }
}
