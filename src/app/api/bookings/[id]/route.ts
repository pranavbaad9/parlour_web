import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { status } = await request.json();
        const { id } = await Promise.resolve(params); // Await params in Next.js 15+

        const booking = await prisma.booking.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(booking);
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await Promise.resolve(params);
        await prisma.booking.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
    }
}
