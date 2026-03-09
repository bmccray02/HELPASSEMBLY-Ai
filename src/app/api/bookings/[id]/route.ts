import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/bookings/[id] - Get a single booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const booking = await db.booking.findUnique({
      where: { id },
      include: {
        customer: {
          include: { addresses: true }
        },
        service: {
          include: { category: true, addOns: true }
        },
        technician: true
      }
    });
    
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    
    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 });
  }
}

// PUT /api/bookings/[id] - Update a booking
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const booking = await db.booking.update({
      where: { id },
      data: {
        customerId: body.customerId,
        serviceId: body.serviceId,
        technicianId: body.technicianId,
        bookingDate: body.bookingDate ? new Date(body.bookingDate) : null,
        status: body.status,
        address: body.address,
        city: body.city,
        state: body.state,
        zip: body.zip,
        basePrice: body.basePrice !== undefined ? parseFloat(body.basePrice) : undefined,
        addonsTotal: body.addonsTotal !== undefined ? parseFloat(body.addonsTotal) : undefined,
        distanceFee: body.distanceFee !== undefined ? parseFloat(body.distanceFee) : undefined,
        urgencyFee: body.urgencyFee !== undefined ? parseFloat(body.urgencyFee) : undefined,
        discount: body.discount !== undefined ? parseFloat(body.discount) : undefined,
        totalPrice: body.totalPrice !== undefined ? parseFloat(body.totalPrice) : undefined,
        customerNotes: body.customerNotes,
        internalNotes: body.internalNotes,
        completedAt: body.status === 'completed' ? new Date() : null
      },
      include: {
        customer: true,
        service: true,
        technician: true
      }
    });
    
    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

// DELETE /api/bookings/[id] - Delete a booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await db.booking.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
