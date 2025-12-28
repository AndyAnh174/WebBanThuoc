import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { GetProductsQueryDto, ProductSortBy, SortOrder } from './dto';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) { }

    /**
     * Lấy danh sách sản phẩm với phân trang và filter
     */
    async findAll(query: GetProductsQueryDto) {
        const {
            page = 1,
            limit = 12,
            categoryId,
            manufacturerId,
            isFeatured,
            sortBy = ProductSortBy.CREATED_AT,
            sortOrder = SortOrder.DESC,
        } = query;

        const skip = (page - 1) * limit;

        // Build where clause
        const where: any = {
            isActive: true,
        };

        if (categoryId) {
            where.categoryId = categoryId;
        }

        if (manufacturerId) {
            where.manufacturerId = manufacturerId;
        }

        if (isFeatured === 'true') {
            where.isFeatured = true;
        }

        // Build orderBy
        const orderBy: any = {};
        orderBy[sortBy] = sortOrder;

        // Execute queries in parallel
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    sku: true,
                    price: true,
                    originalPrice: true,
                    unit: true,
                    thumbnailUrl: true,
                    isFeatured: true,
                    soldCount: true,
                    viewCount: true,
                    stockQuantity: true,
                    createdAt: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                    manufacturer: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
            }),
            this.prisma.product.count({ where }),
        ]);

        // Calculate pagination info
        const totalPages = Math.ceil(total / limit);

        return {
            items: products,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    }

    /**
     * Lấy chi tiết sản phẩm theo ID hoặc slug
     */
    async findOne(idOrSlug: string) {
        // Try to find by ID first, then by slug
        const product = await this.prisma.product.findFirst({
            where: {
                isActive: true,
                OR: [{ id: idOrSlug }, { slug: idOrSlug }],
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                manufacturer: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        logoUrl: true,
                    },
                },
                images: {
                    orderBy: { sortOrder: 'asc' },
                    select: {
                        id: true,
                        imageUrl: true,
                        sortOrder: true,
                    },
                },
            },
        });

        if (!product) {
            throw new NotFoundException('Sản phẩm không tồn tại');
        }

        // Increment view count (fire and forget)
        this.prisma.product
            .update({
                where: { id: product.id },
                data: { viewCount: { increment: 1 } },
            })
            .catch(() => {
                // Ignore errors
            });

        return product;
    }

    /**
     * Tìm kiếm sản phẩm với ILIKE
     */
    async search(keyword: string, page: number = 1, limit: number = 12) {
        const skip = (page - 1) * limit;

        // Search với ILIKE (case-insensitive)
        const where = {
            isActive: true,
            OR: [
                { name: { contains: keyword, mode: 'insensitive' as const } },
                { activeIngredient: { contains: keyword, mode: 'insensitive' as const } },
                { description: { contains: keyword, mode: 'insensitive' as const } },
                { sku: { contains: keyword, mode: 'insensitive' as const } },
            ],
        };

        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: [{ soldCount: 'desc' }, { createdAt: 'desc' }],
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    sku: true,
                    price: true,
                    originalPrice: true,
                    unit: true,
                    thumbnailUrl: true,
                    activeIngredient: true,
                    soldCount: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                    manufacturer: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            }),
            this.prisma.product.count({ where }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            keyword,
            items: products,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    }
}
