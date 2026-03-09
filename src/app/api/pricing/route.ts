import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/pricing - Get pricing configuration
export async function GET() {
  try {
    let config = await db.pricingConfig.findFirst();
    
    if (!config) {
      config = await db.pricingConfig.create({
        data: {}
      });
    }
    
    const priceRules = await db.priceRule.findMany({
      where: { isActive: true },
      include: { service: true },
      orderBy: { priority: 'desc' }
    });
    
    return NextResponse.json({ config, priceRules });
  } catch (error) {
    console.error('Error fetching pricing config:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing config' }, { status: 500 });
  }
}

// PUT /api/pricing - Update pricing configuration
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    let config = await db.pricingConfig.findFirst();
    
    if (!config) {
      config = await db.pricingConfig.create({
        data: {
          atlantaMultiplier: body.atlantaMultiplier ?? 1.10,
          tampaMultiplier: body.tampaMultiplier ?? 1.00,
          orlandoMultiplier: body.orlandoMultiplier ?? 1.00,
          sameDayUrgencyAdder: body.sameDayUrgencyAdder ?? 1.15,
          nextDayUrgencyAdder: body.nextDayUrgencyAdder ?? 1.08,
          baseDistanceMiles: body.baseDistanceMiles ?? 20,
          perMileRate: body.perMileRate ?? 1.50
        }
      });
    } else {
      config = await db.pricingConfig.update({
        where: { id: config.id },
        data: {
          atlantaMultiplier: body.atlantaMultiplier,
          tampaMultiplier: body.tampaMultiplier,
          orlandoMultiplier: body.orlandoMultiplier,
          sameDayUrgencyAdder: body.sameDayUrgencyAdder,
          nextDayUrgencyAdder: body.nextDayUrgencyAdder,
          baseDistanceMiles: body.baseDistanceMiles,
          perMileRate: body.perMileRate
        }
      });
    }
    
    return NextResponse.json({ config });
  } catch (error) {
    console.error('Error updating pricing config:', error);
    return NextResponse.json({ error: 'Failed to update pricing config' }, { status: 500 });
  }
}
