import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { src, alt, category } = body;

        const image = await prisma.galleryImage.update({
            where: { id },
            data: { src, alt, category },
        });

        return NextResponse.json(image);
    } catch (error) {
        console.error("Error updating gallery image:", error);
        return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.galleryImage.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting gallery image:", error);
        return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
    }
}
