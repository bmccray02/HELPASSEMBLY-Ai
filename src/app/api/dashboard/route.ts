import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/dashboard - Get dashboard statistics
export async function GET() {
  try {
    // Get counts
    const [
      totalServices,
      activeServices,
      totalCustomers,
      activeCustomers,
      totalBookings,
      pendingBookings,
      completedBookings,
      todayBookings,
      totalTechnicians,
      activeTechnicians,
      recentBookings,
      revenueData,
      topServices
    ] = await Promise.all([
      db.service.count(),
      db.service.count({ where: { isActive: true } }),
      db.customer.count(),
      db.customer.count({ where: { status: 'Active' } }),
      db.booking.count(),
      db.booking.count({ where: { status: 'pending' } }),
      db.booking.count({ where: { status: 'completed' } }),
      db.booking.count({
        where: {
          bookingDate: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999))
          }
        }
      }),
      db.technician.count(),
      db.technician.count({ where: { isActive: true } }),
      db.booking.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: true,
          service: true,
          technician: true
        }
      }),
      db.booking.aggregate({
        _sum: { totalPrice: true },
        where: { status: 'completed' }
      }),
      db.service.findMany({
        take: 5,
        include: {
          _count: { select: { bookings: true } }
        },
        orderBy: { bookings: { _count: 'desc' } }
      })
    ]);
    
    // Get this month's revenue
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const monthlyRevenue = await db.booking.aggregate({
      _sum: { totalPrice: true },
      _count: true,
      where: {
        status: 'completed',
        completedAt: { gte: startOfMonth }
      }
    });
    
    // Get status breakdown
    const statusBreakdown = await db.booking.groupBy({
      by: ['status'],
      _count: true
    });
    
    // Get customer groups
    const customerGroups = await db.customer.groupBy({
      by: ['group'],
      _count: true,
      where: { group: { not: null } }
    });
    
    return NextResponse.json({
      stats: {
        totalServices,
        activeServices,
        totalCustomers,
        activeCustomers,
        totalBookings,
        pendingBookings,
        completedBookings,
        todayBookings,
        totalTechnicians,
        activeTechnicians
      },
      revenue: {
        total: revenueData._sum.totalPrice || 0,
        thisMonth: monthlyRevenue._sum.totalPrice || 0,
        bookingsThisMonth: monthlyRevenue._count
      },
      recentBookings,
      topServices,
      statusBreakdown: statusBreakdown.reduce((acc, item) => {
        acc[item.status] = item._count;
        return acc;
      }, {} as Record<string, number>),
      customerGroups: customerGroups.filter(g => g.group).map(g => ({
        name: g.group,
        count: g._count
      }))
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
