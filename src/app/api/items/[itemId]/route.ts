import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT: Update a service item
export async function PUT(request: Request, { params }: { params: Promise<{ itemId: string }> }) {
    try {
        const { itemId } = await params;
        const body = await request.json();
        const { name, price, duration } = body;

        const item = await prisma.serviceItem.update({
            where: { id: itemId },
            data: {
                name,
                price: parseFloat(price),
                duration: duration || null,
            },
        });

        return NextResponse.json(item);
    } catch (error) {
        console.error('Error updating service item:', error);
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}

// DELETE: Delete a service item
export async function DELETE(_request: Request, { params }: { params: Promise<{ itemId: string }> }) {
    try {
        const { itemId } = await params;
        await prisma.serviceItem.delete({ where: { id: itemId } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting service item:', error);
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}
