import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: returns approved reviews for public display
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const all = searchParams.get("all");

        const reviews = await prisma.review.findMany({
            where: all === "true" ? {} : { status: "APPROVED" },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST: customer submits a review (status = PENDING)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customerName, rating, comment, service } = body;

        if (!customerName || !rating || !comment) {
            return NextResponse.json({ error: "Name, rating, and comment are required" }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                customerName,
                rating: parseInt(rating),
                comment,
                service: service || null,
                status: "PENDING",
            },
        });

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
