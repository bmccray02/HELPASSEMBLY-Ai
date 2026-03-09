import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/technicians - List all technicians
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    
    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    const technicians = await db.technician.findMany({
      where,
      include: {
        _count: {
          select: { bookings: true }
        }
      },
      orderBy: { firstName: 'asc' }
    });
    
    return NextResponse.json({ technicians });
  } catch (error) {
    console.error('Error fetching technicians:', error);
    return NextResponse.json({ error: 'Failed to fetch technicians' }, { status: 500 });
  }
}

// POST /api/technicians - Create a new technician
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const technician = await db.technician.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email || null,
        phone: body.phone || null,
        status: body.status || 'active',
        isActive: body.isActive ?? true,
        baseCity: body.baseCity || null,
        baseState: body.baseState || null,
        serviceRadius: body.serviceRadius ? parseInt(body.serviceRadius) : null,
        availability: body.availability || null
      }
    });
    
    return NextResponse.json({ technician });
  } catch (error) {
    console.error('Error creating technician:', error);
    return NextResponse.json({ error: 'Failed to create technician' }, { status: 500 });
  }
}
