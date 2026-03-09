import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { readFileSync } from 'fs';
import { join } from 'path';

// GET /api/seed - Seed database with initial data
export async function GET() {
  try {
    // Create pricing config
    await db.pricingConfig.upsert({
      where: { id: 'default' },
      create: {},
      update: {}
    });

    // Create service categories
    const categories = await Promise.all([
      db.serviceCategory.upsert({
        where: { slug: 'installation' },
        create: { name: 'Installation', slug: 'installation', description: 'Professional installation services', color: '#3B82F6' },
        update: { name: 'Installation', slug: 'installation' }
      }),
      db.serviceCategory.upsert({
        where: { slug: 'furniture' },
        create: { name: 'Furniture Assembly', slug: 'furniture', description: 'Furniture assembly services', color: '#10B981' },
        update: { name: 'Furniture Assembly', slug: 'furniture' }
      }),
      db.serviceCategory.upsert({
        where: { slug: 'fitness' },
        create: { name: 'Fitness Equipment', slug: 'fitness', description: 'Gym and fitness equipment assembly', color: '#F59E0B' },
        update: { name: 'Fitness Equipment', slug: 'fitness' }
      }),
      db.serviceCategory.upsert({
        where: { slug: 'outdoor' },
        create: { name: 'Outdoor & Patio', slug: 'outdoor', description: 'Outdoor furniture and equipment', color: '#8B5CF6' },
        update: { name: 'Outdoor & Patio', slug: 'outdoor' }
      }),
      db.serviceCategory.upsert({
        where: { slug: 'electronics' },
        create: { name: 'Electronics', slug: 'electronics', description: 'TV mounting and electronics setup', color: '#EF4444' },
        update: { name: 'Electronics', slug: 'electronics' }
      }),
      db.serviceCategory.upsert({
        where: { slug: 'grill' },
        create: { name: 'Grill Assembly', slug: 'grill', description: 'Grill assembly and setup', color: '#F97316' },
        update: { name: 'Grill Assembly', slug: 'grill' }
      })
    ]);

    // Create services based on V3 pricing data
    const services = [
      // Grill Services
      { name: 'TV Mounting', slug: 'tv-mounting', categoryId: categories[4].id, basePrice: 99.00, shortDesc: 'Professional wall mounting service', includes: 'full mounting, wire concealment, hardware' },
      { name: 'Ninja FlexFlame PG301 Grill', slug: 'ninja-flexflame-grill', categoryId: categories[5].id, basePrice: 149.95, shortDesc: 'Full grill assembly service', includes: 'full assembly, unboxing, anchoring, disposal' },
      { name: 'Weber Genesis Gas Grill', slug: 'weber-genesis-grill', categoryId: categories[5].id, basePrice: 185.95, shortDesc: 'Weber Genesis assembly', includes: 'full assembly, unboxing, anchoring, disposal' },
      { name: 'Weber Spirit Gas Grill', slug: 'weber-spirit-grill', categoryId: categories[5].id, basePrice: 155.95, shortDesc: 'Weber Spirit assembly', includes: 'full assembly, unboxing, anchoring, disposal' },
      { name: 'Prestige Gas Grill', slug: 'prestige-gas-grill', categoryId: categories[5].id, basePrice: 195.95, shortDesc: 'Prestige grill assembly', includes: 'full assembly, unboxing, anchoring, disposal' },
      { name: 'Traeger Ironwood Pellet Grill', slug: 'traeger-ironwood-grill', categoryId: categories[5].id, basePrice: 285.95, shortDesc: 'Traeger Ironwood assembly', includes: 'full assembly, unboxing, anchoring, disposal' },
      // Fitness Services
      { name: 'Rogue Wall Mount Power Rack', slug: 'rogue-wall-mount-rack', categoryId: categories[2].id, basePrice: 700.95, shortDesc: 'Professional rack installation', includes: 'full assembly, unboxing, anchoring, disposal' },
      { name: 'Rogue FML-6 Functional Trainer', slug: 'rogue-fml6-trainer', categoryId: categories[2].id, basePrice: 965.95, shortDesc: 'Functional trainer assembly', includes: 'full assembly, unboxing, anchoring, disposal' },
      { name: 'Rogue FM-HR Twin Trainer', slug: 'rogue-fmhr-trainer', categoryId: categories[2].id, basePrice: 1185.95, shortDesc: 'Twin functional trainer assembly', includes: 'full assembly, unboxing, anchoring, disposal' },
      { name: 'Rogue Monster Rhino Trainer', slug: 'rogue-monster-rhino', categoryId: categories[2].id, basePrice: 1065.95, shortDesc: 'Monster Rhino assembly', includes: 'full assembly, unboxing, anchoring, disposal' },
      { name: 'Rogue RM-6 Monster Rack', slug: 'rogue-rm6-rack', categoryId: categories[2].id, basePrice: 685.95, shortDesc: 'Monster Rack 2.0 assembly', includes: 'full assembly, unboxing, anchoring, disposal' },
      // Furniture Services
      { name: 'Bed Assembly', slug: 'bed-assembly', categoryId: categories[1].id, basePrice: 109.00, shortDesc: 'Bed frame assembly service', includes: 'frame assembly, headboard attachment' },
      { name: 'Desk Assembly', slug: 'desk-assembly', categoryId: categories[1].id, basePrice: 89.00, shortDesc: 'Office desk assembly', includes: 'full assembly, drawer installation' },
      { name: 'Wardrobe Assembly', slug: 'wardrobe-assembly', categoryId: categories[1].id, basePrice: 149.00, shortDesc: 'Wardrobe/closet assembly', includes: 'full assembly, door adjustment' },
      { name: 'Dining Table Assembly', slug: 'dining-table-assembly', categoryId: categories[1].id, basePrice: 79.00, shortDesc: 'Dining table setup', includes: 'full assembly, leveling' },
      // Outdoor Services
      { name: 'Gazebo Assembly', slug: 'gazebo-assembly', categoryId: categories[3].id, basePrice: 350.00, shortDesc: 'Outdoor gazebo setup', includes: 'full assembly, anchoring' },
      { name: 'Pergola Installation', slug: 'pergola-installation', categoryId: categories[3].id, basePrice: 450.00, shortDesc: 'Pergola installation service', includes: 'full assembly, anchoring, securing' },
      { name: 'Playset Assembly', slug: 'playset-assembly', categoryId: categories[3].id, basePrice: 299.00, shortDesc: 'Children\'s playset assembly', includes: 'full assembly, safety check, anchoring' },
      { name: 'Shed Assembly', slug: 'shed-assembly', categoryId: categories[3].id, basePrice: 399.00, shortDesc: 'Outdoor shed assembly', includes: 'full assembly, door adjustment' },
      // Installation Services
      { name: 'Ceiling Fan Installation', slug: 'ceiling-fan-install', categoryId: categories[0].id, basePrice: 129.00, shortDesc: 'Ceiling fan mounting', includes: 'mounting, wiring, balance check' },
      { name: 'Light Fixture Installation', slug: 'light-fixture-install', categoryId: categories[0].id, basePrice: 89.00, shortDesc: 'Light fixture mounting', includes: 'mounting, wiring, testing' },
      { name: 'Shelf Installation', slug: 'shelf-install', categoryId: categories[0].id, basePrice: 69.00, shortDesc: 'Wall shelf mounting', includes: 'mounting, leveling, securing' },
      { name: 'Curtain Rod Installation', slug: 'curtain-rod-install', categoryId: categories[0].id, basePrice: 59.00, shortDesc: 'Curtain rod mounting', includes: 'mounting, leveling, hardware' }
    ];

    for (const service of services) {
      await db.service.upsert({
        where: { slug: service.slug },
        create: service,
        update: service
      });
    }

    // Create technicians
    const technicians = [
      { firstName: 'Mike', lastName: 'Johnson', phone: '404-555-0101', baseCity: 'Atlanta', baseState: 'GA', status: 'active' },
      { firstName: 'Sarah', lastName: 'Williams', phone: '404-555-0102', baseCity: 'Marietta', baseState: 'GA', status: 'active' },
      { firstName: 'James', lastName: 'Brown', phone: '813-555-0103', baseCity: 'Tampa', baseState: 'FL', status: 'active' },
      { firstName: 'Emily', lastName: 'Davis', phone: '404-555-0104', baseCity: 'Atlanta', baseState: 'GA', status: 'active' },
      { firstName: 'David', lastName: 'Martinez', phone: '813-555-0105', baseCity: 'Orlando', baseState: 'FL', status: 'active' }
    ];

    for (const tech of technicians) {
      const existing = await db.technician.findFirst({
        where: { firstName: tech.firstName, lastName: tech.lastName }
      });
      if (!existing) {
        await db.technician.create({ data: tech });
      }
    }

    // Seed customers from CSV
    let customersImported = 0;
    try {
      const csvPath = join(process.cwd(), 'upload', 'markate_customers.csv');
      const csvContent = readFileSync(csvPath, 'utf-8');
      const lines = csvContent.split('\n').slice(1); // Skip header
      
      for (const line of lines.slice(0, 100)) { // Import first 100 customers
        if (!line.trim()) continue;
        
        const fields = line.match(/("([^"]|"")*"|[^,]*)/g) || [];
        const cleanField = (f: string) => f?.replace(/^"|"$/g, '').replace(/""/g, '"').trim() || null;
        
        const displayName = cleanField(fields[0]);
        const firstName = cleanField(fields[1]);
        const lastName = cleanField(fields[2]);
        const email = cleanField(fields[4]);
        const mobile = cleanField(fields[5]);
        const phone = cleanField(fields[6]);
        const street = cleanField(fields[7]);
        const unit = cleanField(fields[8]);
        const city = cleanField(fields[9]);
        const state = cleanField(fields[10]);
        const zip = cleanField(fields[11]);
        const notes = cleanField(fields[12]);
        const group = cleanField(fields[13]);
        const source = cleanField(fields[14]);
        const status = cleanField(fields[15]) || 'Active';
        const addedOn = cleanField(fields[16]);

        if (!firstName && !lastName && !email && !mobile) continue;

        const existing = await db.customer.findFirst({
          where: {
            OR: [
              { email: email || undefined },
              { mobile: mobile || undefined },
              { phone: phone || undefined }
            ].filter(Boolean)
          }
        });

        if (!existing) {
          await db.customer.create({
            data: {
              displayName,
              firstName,
              lastName,
              email,
              mobile,
              phone,
              street,
              unit,
              city,
              state,
              zip,
              notes,
              group,
              source,
              status,
              addedOn
            }
          });
          customersImported++;
        }
      }
    } catch (csvError) {
      console.log('CSV import note:', csvError);
    }

    // Get counts
    const serviceCount = await db.service.count();
    const categoryCount = await db.serviceCategory.count();
    const customerCount = await db.customer.count();
    const technicianCount = await db.technician.count();

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      counts: {
        services: serviceCount,
        categories: categoryCount,
        customers: customerCount,
        technicians: technicianCount,
        customersImported
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database', details: String(error) }, { status: 500 });
  }
}
