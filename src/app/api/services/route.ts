import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all services with their items
export async function GET() {
    try {
        const services = await prisma.service.findMany({
            include: { items: { orderBy: { price: 'asc' } } },
            orderBy: { createdAt: 'asc' },
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST: Create a new service (session)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, category, description, image } = body;

        if (!name || !category || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const service = await prisma.service.create({
            data: {
                name,
                category,
                description,
                image: image || null,
            },
            include: { items: true },
        });

        return NextResponse.json(service, { status: 201 });
    } catch (error) {
        console.error('Error creating service:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
