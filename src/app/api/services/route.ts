import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/services - List all services
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const active = searchParams.get('active');
    
    const where: any = {};
    
    if (category) {
      where.categoryId = category;
    }
    
    if (active !== null) {
      where.isActive = active === 'true';
    }
    
    const services = await db.service.findMany({
      where,
      include: {
        category: true,
        addOns: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        }
      },
      orderBy: [
        { sortOrder: 'asc' },
        { name: 'asc' }
      ]
    });
    
    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const service = await db.service.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
        categoryId: body.categoryId || null,
        basePrice: parseFloat(body.basePrice) || 0,
        priceType: body.priceType || 'fixed',
        minPrice: body.minPrice ? parseFloat(body.minPrice) : null,
        maxPrice: body.maxPrice ? parseFloat(body.maxPrice) : null,
        description: body.description || null,
        shortDesc: body.shortDesc || null,
        includes: body.includes || null,
        duration: body.duration ? parseInt(body.duration) : null,
        imageUrl: body.imageUrl || null,
        imageAlt: body.imageAlt || null,
        isActive: body.isActive ?? true,
        isFeatured: body.isFeatured ?? false,
        sortOrder: body.sortOrder || 0
      },
      include: {
        category: true,
        addOns: true
      }
    });
    
    return NextResponse.json({ service });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
