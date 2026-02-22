import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST: Create a new booking
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, customerPhone, serviceItemId, date, timeSlot } = body;

        if (!customerName || !customerPhone || !serviceItemId || !date || !timeSlot) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const booking = await prisma.booking.create({
            data: {
                customerName,
                customerPhone,
                serviceItemId,
                date: new Date(date),
                timeSlot,
                status: "PENDING"
            },
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// GET: Fetch all bookings
export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                serviceItem: {
                    include: { service: true }
                }
            }
        });
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
