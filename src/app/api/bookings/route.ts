import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/bookings - List all bookings
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const technicianId = searchParams.get('technicianId');
    const limit = searchParams.get('limit');
    
    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (date) {
      const dateObj = new Date(date);
      const nextDay = new Date(dateObj);
      nextDay.setDate(nextDay.getDate() + 1);
      where.bookingDate = {
        gte: dateObj,
        lt: nextDay
      };
    }
    
    if (technicianId) {
      where.technicianId = technicianId;
    }
    
    const take = limit ? parseInt(limit) : 50;
    
    const bookings = await db.booking.findMany({
      where,
      include: {
        customer: true,
        service: {
          include: { category: true }
        },
        technician: true
      },
      orderBy: { bookingDate: 'desc' },
      take
    });
    
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const booking = await db.booking.create({
      data: {
        customerId: body.customerId || null,
        serviceId: body.serviceId || null,
        technicianId: body.technicianId || null,
        bookingDate: body.bookingDate ? new Date(body.bookingDate) : null,
        status: body.status || 'pending',
        address: body.address || null,
        city: body.city || null,
        state: body.state || null,
        zip: body.zip || null,
        basePrice: parseFloat(body.basePrice) || 0,
        addonsTotal: parseFloat(body.addonsTotal) || 0,
        distanceFee: parseFloat(body.distanceFee) || 0,
        urgencyFee: parseFloat(body.urgencyFee) || 0,
        discount: parseFloat(body.discount) || 0,
        totalPrice: parseFloat(body.totalPrice) || 0,
        customerNotes: body.customerNotes || null,
        internalNotes: body.internalNotes || null
      },
      include: {
        customer: true,
        service: true,
        technician: true
      }
    });
    
    // Update customer stats if customer exists
    if (body.customerId) {
      await db.customer.update({
        where: { id: body.customerId },
        data: {
          totalBookings: { increment: 1 },
          totalSpent: { increment: parseFloat(body.totalPrice) || 0 },
          lastServiceDate: new Date()
        }
      });
    }
    
    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
