import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/customers/[id] - Get a single customer
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const customer = await db.customer.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            service: true
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        addresses: true
      }
    });
    
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }
    
    return NextResponse.json({ customer });
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}

// PUT /api/customers/[id] - Update a customer
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const customer = await db.customer.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        displayName: body.displayName,
        email: body.email,
        phone: body.phone,
        mobile: body.mobile,
        company: body.company,
        street: body.street,
        unit: body.unit,
        city: body.city,
        state: body.state,
        zip: body.zip,
        notes: body.notes,
        group: body.group,
        source: body.source,
        status: body.status,
        totalSpent: body.totalSpent,
        totalBookings: body.totalBookings,
        lastServiceDate: body.lastServiceDate ? new Date(body.lastServiceDate) : null
      }
    });
    
    return NextResponse.json({ customer });
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}

// DELETE /api/customers/[id] - Delete a customer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await db.customer.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}
