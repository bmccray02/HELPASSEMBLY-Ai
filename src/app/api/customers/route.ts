import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/customers - List all customers
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const group = searchParams.get('group');
    const limit = searchParams.get('limit');
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { displayName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { mobile: { contains: search } },
        { company: { contains: search } }
      ];
    }
    
    if (status) {
      where.status = status;
    }
    
    if (group) {
      where.group = group;
    }
    
    const take = limit ? parseInt(limit) : undefined;
    
    const customers = await db.customer.findMany({
      where,
      include: {
        _count: {
          select: { bookings: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take
    });
    
    return NextResponse.json({ customers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

// POST /api/customers - Create a new customer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const customer = await db.customer.create({
      data: {
        firstName: body.firstName || null,
        lastName: body.lastName || null,
        displayName: body.displayName || null,
        email: body.email || null,
        phone: body.phone || null,
        mobile: body.mobile || null,
        company: body.company || null,
        street: body.street || null,
        unit: body.unit || null,
        city: body.city || null,
        state: body.state || null,
        zip: body.zip || null,
        notes: body.notes || null,
        group: body.group || null,
        source: body.source || null,
        status: body.status || 'Active',
        addedOn: body.addedOn || null
      }
    });
    
    return NextResponse.json({ customer });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}
