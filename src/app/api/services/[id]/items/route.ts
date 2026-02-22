import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST: Add an item to a service
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: serviceId } = await params;
        const body = await request.json();
        const { name, price, duration } = body;

        if (!name || price === undefined) {
            return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
        }

        const item = await prisma.serviceItem.create({
            data: {
                name,
                price: parseFloat(price),
                duration: duration || null,
                serviceId,
            },
        });

        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        console.error('Error creating service item:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
