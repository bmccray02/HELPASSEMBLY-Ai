import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/technicians/[id] - Get a single technician
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const technician = await db.technician.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            customer: true,
            service: true
          },
          orderBy: { bookingDate: 'desc' },
          take: 10
        },
        _count: {
          select: { bookings: true }
        }
      }
    });
    
    if (!technician) {
      return NextResponse.json({ error: 'Technician not found' }, { status: 404 });
    }
    
    return NextResponse.json({ technician });
  } catch (error) {
    console.error('Error fetching technician:', error);
    return NextResponse.json({ error: 'Failed to fetch technician' }, { status: 500 });
  }
}

// PUT /api/technicians/[id] - Update a technician
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const technician = await db.technician.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        status: body.status,
        isActive: body.isActive,
        baseCity: body.baseCity,
        baseState: body.baseState,
        serviceRadius: body.serviceRadius ? parseInt(body.serviceRadius) : null,
        availability: body.availability,
        rating: body.rating !== undefined ? parseFloat(body.rating) : undefined,
        totalJobs: body.totalJobs
      }
    });
    
    return NextResponse.json({ technician });
  } catch (error) {
    console.error('Error updating technician:', error);
    return NextResponse.json({ error: 'Failed to update technician' }, { status: 500 });
  }
}

// DELETE /api/technicians/[id] - Delete a technician
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await db.technician.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting technician:', error);
    return NextResponse.json({ error: 'Failed to delete technician' }, { status: 500 });
  }
}
