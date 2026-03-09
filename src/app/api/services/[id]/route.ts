import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/services/[id] - Get a single service
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const service = await db.service.findUnique({
      where: { id },
      include: {
        category: true,
        addOns: {
          orderBy: { sortOrder: 'asc' }
        },
        priceRules: {
          where: { isActive: true }
        }
      }
    });
    
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    return NextResponse.json({ service });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

// PUT /api/services/[id] - Update a service
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const service = await db.service.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        categoryId: body.categoryId || null,
        basePrice: body.basePrice !== undefined ? parseFloat(body.basePrice) : undefined,
        priceType: body.priceType,
        minPrice: body.minPrice !== undefined ? (body.minPrice ? parseFloat(body.minPrice) : null) : undefined,
        maxPrice: body.maxPrice !== undefined ? (body.maxPrice ? parseFloat(body.maxPrice) : null) : undefined,
        description: body.description,
        shortDesc: body.shortDesc,
        includes: body.includes,
        duration: body.duration !== undefined ? (body.duration ? parseInt(body.duration) : null) : undefined,
        imageUrl: body.imageUrl,
        imageAlt: body.imageAlt,
        isActive: body.isActive,
        isFeatured: body.isFeatured,
        sortOrder: body.sortOrder
      },
      include: {
        category: true,
        addOns: true
      }
    });
    
    return NextResponse.json({ service });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

// DELETE /api/services/[id] - Delete a service
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await db.service.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
