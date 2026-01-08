// =============================================
// SEED DATA SCRIPT - WebBanThuoc
// =============================================
// Run: pnpm prisma:seed
// =============================================

import { PrismaClient, UserRole, UserStatus, Gender, Category, Manufacturer } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';

// Khởi tạo Prisma với adapter
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Số vòng lặp hash password
const SALT_ROUNDS = 10;

// =============================================
// DATA DEFINITIONS
// =============================================

// 1 Admin mặc định
const adminData = {
  email: 'admin@webbanthuoc.com',
  phone: '0901234567',
  password: 'Admin@123',
  fullName: 'Quản Trị Viên',
  role: UserRole.ADMIN,
  status: UserStatus.ACTIVE,
  gender: Gender.MALE,
};

// 10 Danh mục sản phẩm
const categoriesData = [
  { name: 'Thuốc kháng sinh', slug: 'thuoc-khang-sinh', description: 'Các loại thuốc kháng sinh điều trị nhiễm khuẩn', sortOrder: 1 },
  { name: 'Thuốc giảm đau', slug: 'thuoc-giam-dau', description: 'Thuốc giảm đau, hạ sốt, chống viêm', sortOrder: 2 },
  { name: 'Thuốc ho - cảm cúm', slug: 'thuoc-ho-cam-cum', description: 'Thuốc điều trị ho, cảm cúm, sổ mũi', sortOrder: 3 },
  { name: 'Thuốc tiêu hóa', slug: 'thuoc-tieu-hoa', description: 'Thuốc điều trị các bệnh về đường tiêu hóa', sortOrder: 4 },
  { name: 'Thuốc tim mạch', slug: 'thuoc-tim-mach', description: 'Thuốc điều trị bệnh tim mạch, huyết áp', sortOrder: 5 },
  { name: 'Thuốc thần kinh', slug: 'thuoc-than-kinh', description: 'Thuốc an thần, chống trầm cảm, động kinh', sortOrder: 6 },
  { name: 'Thuốc da liễu', slug: 'thuoc-da-lieu', description: 'Thuốc điều trị các bệnh về da', sortOrder: 7 },
  { name: 'Vitamin & Thực phẩm chức năng', slug: 'vitamin-thuc-pham-chuc-nang', description: 'Vitamin, khoáng chất và thực phẩm bổ sung', sortOrder: 8 },
  { name: 'Thuốc mắt - tai - mũi', slug: 'thuoc-mat-tai-mui', description: 'Thuốc nhỏ mắt, nhỏ tai, xịt mũi', sortOrder: 9 },
  { name: 'Thuốc xương khớp', slug: 'thuoc-xuong-khop', description: 'Thuốc điều trị viêm khớp, loãng xương', sortOrder: 10 },
];

// 5 Nhà sản xuất
const manufacturersData = [
  { name: 'KHAPHARCO', slug: 'khapharco', description: 'Công ty Dược phẩm Khánh Hòa', website: 'https://khapharco.com.vn' },
  { name: 'TIPHARCO', slug: 'tipharco', description: 'Công ty Cổ phần Dược phẩm Tiền Giang', website: 'https://tipharco.com.vn' },
  { name: 'DHG Pharma', slug: 'dhg-pharma', description: 'Công ty Cổ phần Dược Hậu Giang', website: 'https://dhgpharma.com.vn' },
  { name: 'Imexpharm', slug: 'imexpharm', description: 'Công ty Cổ phần Dược phẩm Imexpharm', website: 'https://imexpharm.com' },
  { name: 'Traphaco', slug: 'traphaco', description: 'Công ty Cổ phần Traphaco', website: 'https://traphaco.com.vn' },
];

// 50 Sản phẩm thuốc
const productsData = [
  // Thuốc kháng sinh (index 0) - 5 sản phẩm
  { name: 'Amoxicillin 500mg', slug: 'amoxicillin-500mg', sku: 'AMO500', price: 45000, unit: 'hộp', activeIngredient: 'Amoxicillin', packaging: 'Hộp 2 vỉ x 10 viên', categoryIndex: 0, manufacturerIndex: 0 },
  { name: 'Augmentin 625mg', slug: 'augmentin-625mg', sku: 'AUG625', price: 185000, unit: 'hộp', activeIngredient: 'Amoxicillin + Acid clavulanic', packaging: 'Hộp 2 vỉ x 7 viên', categoryIndex: 0, manufacturerIndex: 2 },
  { name: 'Cefixime 200mg', slug: 'cefixime-200mg', sku: 'CEF200', price: 120000, unit: 'hộp', activeIngredient: 'Cefixime', packaging: 'Hộp 1 vỉ x 10 viên', categoryIndex: 0, manufacturerIndex: 3 },
  { name: 'Azithromycin 250mg', slug: 'azithromycin-250mg', sku: 'AZI250', price: 85000, unit: 'hộp', activeIngredient: 'Azithromycin', packaging: 'Hộp 1 vỉ x 6 viên', categoryIndex: 0, manufacturerIndex: 1 },
  { name: 'Ciprofloxacin 500mg', slug: 'ciprofloxacin-500mg', sku: 'CIP500', price: 55000, unit: 'hộp', activeIngredient: 'Ciprofloxacin', packaging: 'Hộp 2 vỉ x 10 viên', categoryIndex: 0, manufacturerIndex: 0 },

  // Thuốc giảm đau (index 1) - 5 sản phẩm
  { name: 'Paracetamol 500mg', slug: 'paracetamol-500mg', sku: 'PAR500', price: 15000, unit: 'hộp', activeIngredient: 'Paracetamol', packaging: 'Hộp 10 vỉ x 10 viên', categoryIndex: 1, manufacturerIndex: 2 },
  { name: 'Ibuprofen 400mg', slug: 'ibuprofen-400mg', sku: 'IBU400', price: 35000, unit: 'hộp', activeIngredient: 'Ibuprofen', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 1, manufacturerIndex: 3 },
  { name: 'Efferalgan Codein', slug: 'efferalgan-codein', sku: 'EFF001', price: 95000, unit: 'hộp', activeIngredient: 'Paracetamol + Codein', packaging: 'Hộp 4 vỉ x 4 viên sủi', categoryIndex: 1, manufacturerIndex: 2 },
  { name: 'Diclofenac 50mg', slug: 'diclofenac-50mg', sku: 'DIC050', price: 28000, unit: 'hộp', activeIngredient: 'Diclofenac', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 1, manufacturerIndex: 1 },
  { name: 'Meloxicam 7.5mg', slug: 'meloxicam-75mg', sku: 'MEL075', price: 42000, unit: 'hộp', activeIngredient: 'Meloxicam', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 1, manufacturerIndex: 0 },

  // Thuốc ho - cảm cúm (index 2) - 5 sản phẩm
  { name: 'Decolgen Forte', slug: 'decolgen-forte', sku: 'DEC001', price: 48000, unit: 'hộp', activeIngredient: 'Paracetamol + Phenylephrine + Chlorpheniramine', packaging: 'Hộp 25 vỉ x 4 viên', categoryIndex: 2, manufacturerIndex: 2 },
  { name: 'Tiffy Dey', slug: 'tiffy-dey', sku: 'TIF001', price: 35000, unit: 'hộp', activeIngredient: 'Paracetamol + Phenylephrine + Chlorpheniramine', packaging: 'Hộp 25 gói', categoryIndex: 2, manufacturerIndex: 4 },
  { name: 'Prospan Syrup', slug: 'prospan-syrup', sku: 'PRO001', price: 125000, unit: 'chai', activeIngredient: 'Cao lá thường xuân', packaging: 'Chai 100ml', categoryIndex: 2, manufacturerIndex: 4 },
  { name: 'Ambroxol 30mg', slug: 'ambroxol-30mg', sku: 'AMB030', price: 25000, unit: 'hộp', activeIngredient: 'Ambroxol', packaging: 'Hộp 2 vỉ x 10 viên', categoryIndex: 2, manufacturerIndex: 1 },
  { name: 'Acetylcysteine 200mg', slug: 'acetylcysteine-200mg', sku: 'ACE200', price: 65000, unit: 'hộp', activeIngredient: 'Acetylcysteine', packaging: 'Hộp 30 gói', categoryIndex: 2, manufacturerIndex: 3 },

  // Thuốc tiêu hóa (index 3) - 5 sản phẩm
  { name: 'Omeprazole 20mg', slug: 'omeprazole-20mg', sku: 'OME020', price: 38000, unit: 'hộp', activeIngredient: 'Omeprazole', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 3, manufacturerIndex: 2 },
  { name: 'Esomeprazole 40mg', slug: 'esomeprazole-40mg', sku: 'ESO040', price: 95000, unit: 'hộp', activeIngredient: 'Esomeprazole', packaging: 'Hộp 2 vỉ x 14 viên', categoryIndex: 3, manufacturerIndex: 3 },
  { name: 'Domperidone 10mg', slug: 'domperidone-10mg', sku: 'DOM010', price: 22000, unit: 'hộp', activeIngredient: 'Domperidone', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 3, manufacturerIndex: 1 },
  { name: 'Smecta', slug: 'smecta', sku: 'SME001', price: 75000, unit: 'hộp', activeIngredient: 'Diosmectite', packaging: 'Hộp 30 gói', categoryIndex: 3, manufacturerIndex: 2 },
  { name: 'Phosphalugel', slug: 'phosphalugel', sku: 'PHO001', price: 85000, unit: 'hộp', activeIngredient: 'Aluminium phosphate', packaging: 'Hộp 26 gói', categoryIndex: 3, manufacturerIndex: 2 },

  // Thuốc tim mạch (index 4) - 5 sản phẩm
  { name: 'Amlodipine 5mg', slug: 'amlodipine-5mg', sku: 'AML005', price: 45000, unit: 'hộp', activeIngredient: 'Amlodipine', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 4, manufacturerIndex: 0 },
  { name: 'Losartan 50mg', slug: 'losartan-50mg', sku: 'LOS050', price: 68000, unit: 'hộp', activeIngredient: 'Losartan', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 4, manufacturerIndex: 3 },
  { name: 'Atorvastatin 20mg', slug: 'atorvastatin-20mg', sku: 'ATO020', price: 125000, unit: 'hộp', activeIngredient: 'Atorvastatin', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 4, manufacturerIndex: 2 },
  { name: 'Bisoprolol 5mg', slug: 'bisoprolol-5mg', sku: 'BIS005', price: 55000, unit: 'hộp', activeIngredient: 'Bisoprolol', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 4, manufacturerIndex: 1 },
  { name: 'Clopidogrel 75mg', slug: 'clopidogrel-75mg', sku: 'CLO075', price: 185000, unit: 'hộp', activeIngredient: 'Clopidogrel', packaging: 'Hộp 2 vỉ x 14 viên', categoryIndex: 4, manufacturerIndex: 3 },

  // Thuốc thần kinh (index 5) - 5 sản phẩm
  { name: 'Diazepam 5mg', slug: 'diazepam-5mg', sku: 'DIA005', price: 35000, unit: 'hộp', activeIngredient: 'Diazepam', packaging: 'Hộp 2 vỉ x 10 viên', categoryIndex: 5, manufacturerIndex: 0 },
  { name: 'Alprazolam 0.5mg', slug: 'alprazolam-05mg', sku: 'ALP005', price: 42000, unit: 'hộp', activeIngredient: 'Alprazolam', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 5, manufacturerIndex: 1 },
  { name: 'Amitriptyline 25mg', slug: 'amitriptyline-25mg', sku: 'AMI025', price: 28000, unit: 'hộp', activeIngredient: 'Amitriptyline', packaging: 'Hộp 5 vỉ x 10 viên', categoryIndex: 5, manufacturerIndex: 2 },
  { name: 'Gabapentin 300mg', slug: 'gabapentin-300mg', sku: 'GAB300', price: 165000, unit: 'hộp', activeIngredient: 'Gabapentin', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 5, manufacturerIndex: 3 },
  { name: 'Pregabalin 75mg', slug: 'pregabalin-75mg', sku: 'PRE075', price: 195000, unit: 'hộp', activeIngredient: 'Pregabalin', packaging: 'Hộp 2 vỉ x 14 viên', categoryIndex: 5, manufacturerIndex: 4 },

  // Thuốc da liễu (index 6) - 5 sản phẩm
  { name: 'Clotrimazole Cream', slug: 'clotrimazole-cream', sku: 'CLT001', price: 25000, unit: 'tuýp', activeIngredient: 'Clotrimazole', packaging: 'Tuýp 10g', categoryIndex: 6, manufacturerIndex: 0 },
  { name: 'Betamethasone Cream', slug: 'betamethasone-cream', sku: 'BET001', price: 35000, unit: 'tuýp', activeIngredient: 'Betamethasone', packaging: 'Tuýp 15g', categoryIndex: 6, manufacturerIndex: 1 },
  { name: 'Acyclovir Cream', slug: 'acyclovir-cream', sku: 'ACY001', price: 45000, unit: 'tuýp', activeIngredient: 'Acyclovir', packaging: 'Tuýp 5g', categoryIndex: 6, manufacturerIndex: 2 },
  { name: 'Ketoconazole Shampoo', slug: 'ketoconazole-shampoo', sku: 'KET001', price: 85000, unit: 'chai', activeIngredient: 'Ketoconazole', packaging: 'Chai 100ml', categoryIndex: 6, manufacturerIndex: 3 },
  { name: 'Mupirocin Ointment', slug: 'mupirocin-ointment', sku: 'MUP001', price: 65000, unit: 'tuýp', activeIngredient: 'Mupirocin', packaging: 'Tuýp 15g', categoryIndex: 6, manufacturerIndex: 4 },

  // Vitamin & TPCN (index 7) - 5 sản phẩm
  { name: 'Vitamin C 1000mg', slug: 'vitamin-c-1000mg', sku: 'VTC001', price: 125000, unit: 'hộp', activeIngredient: 'Acid ascorbic', packaging: 'Hộp 100 viên', categoryIndex: 7, manufacturerIndex: 4 },
  { name: 'Vitamin E 400IU', slug: 'vitamin-e-400iu', sku: 'VTE001', price: 95000, unit: 'hộp', activeIngredient: 'Tocopherol', packaging: 'Hộp 100 viên', categoryIndex: 7, manufacturerIndex: 4 },
  { name: 'Calcium D3', slug: 'calcium-d3', sku: 'CAD001', price: 145000, unit: 'hộp', activeIngredient: 'Calcium + Vitamin D3', packaging: 'Hộp 60 viên', categoryIndex: 7, manufacturerIndex: 2 },
  { name: 'Fish Oil Omega-3', slug: 'fish-oil-omega3', sku: 'FIS001', price: 185000, unit: 'hộp', activeIngredient: 'Omega-3 fatty acids', packaging: 'Hộp 100 viên', categoryIndex: 7, manufacturerIndex: 4 },
  { name: 'Multivitamin Daily', slug: 'multivitamin-daily', sku: 'MUL001', price: 165000, unit: 'hộp', activeIngredient: 'Đa vitamin và khoáng chất', packaging: 'Hộp 60 viên', categoryIndex: 7, manufacturerIndex: 4 },

  // Thuốc mắt - tai - mũi (index 8) - 5 sản phẩm
  { name: 'Natri Clorid 0.9%', slug: 'natri-clorid-09', sku: 'NAT001', price: 12000, unit: 'chai', activeIngredient: 'Natri Clorid', packaging: 'Chai 10ml', categoryIndex: 8, manufacturerIndex: 0 },
  { name: 'Tobramycin Eye Drops', slug: 'tobramycin-eye-drops', sku: 'TOB001', price: 45000, unit: 'chai', activeIngredient: 'Tobramycin', packaging: 'Chai 5ml', categoryIndex: 8, manufacturerIndex: 1 },
  { name: 'Ofloxacin Eye Drops', slug: 'ofloxacin-eye-drops', sku: 'OFL001', price: 38000, unit: 'chai', activeIngredient: 'Ofloxacin', packaging: 'Chai 5ml', categoryIndex: 8, manufacturerIndex: 2 },
  { name: 'Otipax Ear Drops', slug: 'otipax-ear-drops', sku: 'OTI001', price: 85000, unit: 'chai', activeIngredient: 'Phenazone + Lidocaine', packaging: 'Chai 15ml', categoryIndex: 8, manufacturerIndex: 3 },
  { name: 'Xylometazoline Nasal', slug: 'xylometazoline-nasal', sku: 'XYL001', price: 32000, unit: 'chai', activeIngredient: 'Xylometazoline', packaging: 'Chai 10ml', categoryIndex: 8, manufacturerIndex: 4 },

  // Thuốc xương khớp (index 9) - 5 sản phẩm
  { name: 'Glucosamine 1500mg', slug: 'glucosamine-1500mg', sku: 'GLU001', price: 285000, unit: 'hộp', activeIngredient: 'Glucosamine sulfate', packaging: 'Hộp 30 gói', categoryIndex: 9, manufacturerIndex: 4 },
  { name: 'Chondroitin 400mg', slug: 'chondroitin-400mg', sku: 'CHO001', price: 245000, unit: 'hộp', activeIngredient: 'Chondroitin sulfate', packaging: 'Hộp 60 viên', categoryIndex: 9, manufacturerIndex: 4 },
  { name: 'Celecoxib 200mg', slug: 'celecoxib-200mg', sku: 'CEL001', price: 125000, unit: 'hộp', activeIngredient: 'Celecoxib', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 9, manufacturerIndex: 2 },
  { name: 'Diacerein 50mg', slug: 'diacerein-50mg', sku: 'DIA050', price: 185000, unit: 'hộp', activeIngredient: 'Diacerein', packaging: 'Hộp 3 vỉ x 10 viên', categoryIndex: 9, manufacturerIndex: 3 },
  { name: 'Etoricoxib 60mg', slug: 'etoricoxib-60mg', sku: 'ETO060', price: 145000, unit: 'hộp', activeIngredient: 'Etoricoxib', packaging: 'Hộp 2 vỉ x 7 viên', categoryIndex: 9, manufacturerIndex: 1 },
];

// =============================================
// SEED FUNCTIONS
// =============================================

async function seedAdmin() {
  console.log('🔐 Seeding Admin user...');
  
  const passwordHash = await bcrypt.hash(adminData.password, SALT_ROUNDS);
  
  const admin = await prisma.user.upsert({
    where: { email: adminData.email },
    update: {},
    create: {
      email: adminData.email,
      phone: adminData.phone,
      passwordHash,
      fullName: adminData.fullName,
      role: adminData.role,
      status: adminData.status,
      gender: adminData.gender,
    },
  });
  
  console.log(`   ✅ Admin created: ${admin.email}`);
  return admin;
}

async function seedCategories() {
  console.log('📁 Seeding Categories...');
  
  const categories: Category[] = [];
  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        sortOrder: cat.sortOrder,
        isActive: true,
      },
    });
    categories.push(category);
    console.log(`   ✅ Category: ${category.name}`);
  }
  
  return categories;
}

async function seedManufacturers() {
  console.log('🏭 Seeding Manufacturers...');
  
  const manufacturers: Manufacturer[] = [];
  for (const mfr of manufacturersData) {
    const manufacturer = await prisma.manufacturer.upsert({
      where: { slug: mfr.slug },
      update: {},
      create: {
        name: mfr.name,
        slug: mfr.slug,
        description: mfr.description,
        website: mfr.website,
        isActive: true,
      },
    });
    manufacturers.push(manufacturer);
    console.log(`   ✅ Manufacturer: ${manufacturer.name}`);
  }
  
  return manufacturers;
}

async function seedProducts(categories: Category[], manufacturers: Manufacturer[]) {
  console.log('💊 Seeding Products...');
  
  let count = 0;
  for (const prod of productsData) {
    const category = categories[prod.categoryIndex];
    const manufacturer = manufacturers[prod.manufacturerIndex];
    
    // Generate description
    const description = `${prod.name} - ${prod.activeIngredient}. Quy cách đóng gói: ${prod.packaging}. Nhà sản xuất: ${manufacturer.name}.`;
    
    // Random featured products (khoảng 20%)
    const isFeatured = Math.random() < 0.2;
    
    // Random original price (15-25% higher than price)
    const hasDiscount = Math.random() < 0.3;
    const originalPrice = hasDiscount 
      ? Math.round(prod.price * (1 + Math.random() * 0.1 + 0.15))
      : null;
    
    // Random stock quantity (50-500)
    const stockQuantity = Math.floor(Math.random() * 450) + 50;
    
    // Random sold count (0-200)
    const soldCount = Math.floor(Math.random() * 200);
    
    // Random view count (soldCount * 3-10)
    const viewCount = soldCount * (Math.floor(Math.random() * 7) + 3);
    
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        name: prod.name,
        slug: prod.slug,
        sku: prod.sku,
        price: prod.price,
        originalPrice,
        unit: prod.unit,
        activeIngredient: prod.activeIngredient,
        packaging: prod.packaging,
        description,
        usageInstructions: 'Sử dụng theo chỉ định của bác sĩ hoặc dược sĩ.',
        storageInstructions: 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh sáng trực tiếp. Nhiệt độ dưới 30°C.',
        stockQuantity,
        isFeatured,
        soldCount,
        viewCount,
        isActive: true,
        categoryId: category.id,
        manufacturerId: manufacturer.id,
      },
    });
    
    count++;
    if (count % 10 === 0) {
      console.log(`   📦 Created ${count}/${productsData.length} products...`);
    }
  }
  
  console.log(`   ✅ Total products created: ${count}`);
}

// =============================================
// MAIN SEED FUNCTION
// =============================================

async function main() {
  console.log('');
  console.log('🌱 ========================================');
  console.log('   WEBBANHUOC - SEED DATA SCRIPT');
  console.log('🌱 ========================================');
  console.log('');
  
  try {
    // 1. Seed Admin
    await seedAdmin();
    console.log('');
    
    // 2. Seed Categories
    const categories = await seedCategories();
    console.log('');
    
    // 3. Seed Manufacturers
    const manufacturers = await seedManufacturers();
    console.log('');
    
    // 4. Seed Products
    await seedProducts(categories, manufacturers);
    console.log('');
    
    console.log('🎉 ========================================');
    console.log('   SEED COMPLETED SUCCESSFULLY!');
    console.log('🎉 ========================================');
    console.log('');
    console.log('📊 Summary:');
    console.log('   - 1 Admin user');
    console.log('   - 10 Categories');
    console.log('   - 5 Manufacturers');
    console.log('   - 50 Products');
    console.log('');
    console.log('🔐 Admin login:');
    console.log(`   - Email: ${adminData.email}`);
    console.log(`   - Password: ${adminData.password}`);
    console.log('');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

// Run seed
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
