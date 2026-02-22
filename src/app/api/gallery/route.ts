import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const images = await prisma.galleryImage.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(images);
    } catch (error) {
        console.error("Error fetching gallery:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { src, alt, category } = body;

        if (!src || !alt || !category) {
            return NextResponse.json({ error: "src, alt, and category are required" }, { status: 400 });
        }

        const image = await prisma.galleryImage.create({
            data: { src, alt, category },
        });

        return NextResponse.json(image, { status: 201 });
    } catch (error) {
        console.error("Error creating gallery image:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
