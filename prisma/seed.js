const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const servicesData = [
    {
        name: "Haircuts",
        category: "Hair",
        description: "All types of haircuts: Layer, Bob, U-cut, V-cut, and more.",
        items: [
            { name: "Layer Cut", price: 200, duration: "30 min" },
            { name: "Bob Cut", price: 250, duration: "30 min" },
            { name: "U-Cut", price: 200, duration: "30 min" },
            { name: "V-Cut", price: 200, duration: "30 min" },
            { name: "Step Cut", price: 250, duration: "30 min" },
            { name: "Trimming", price: 100, duration: "15 min" },
        ]
    },
    {
        name: "Facials",
        category: "Skin",
        description: "Rejuvenating facials for glowing, healthy skin.",
        items: [
            { name: "Fruit Facial", price: 500, duration: "60 min" },
            { name: "Gold Facial", price: 800, duration: "60 min" },
            { name: "Diamond Facial", price: 1200, duration: "75 min" },
            { name: "Pearl Facial", price: 1000, duration: "60 min" },
            { name: "Anti-Aging Facial", price: 1500, duration: "90 min" },
        ]
    },
    {
        name: "Clean Up",
        category: "Skin",
        description: "Quick deep cleansing for instant glow.",
        items: [
            { name: "Basic Clean Up", price: 250, duration: "30 min" },
            { name: "Deep Cleansing", price: 400, duration: "40 min" },
        ]
    },
    {
        name: "Threading",
        category: "Skin",
        description: "Precise eyebrow shaping and facial hair removal.",
        items: [
            { name: "Eyebrow Threading", price: 30, duration: "10 min" },
            { name: "Upper Lip", price: 20, duration: "5 min" },
            { name: "Forehead", price: 20, duration: "5 min" },
            { name: "Full Face Threading", price: 100, duration: "20 min" },
        ]
    },
    {
        name: "Waxing",
        category: "Body",
        description: "Full body, arms, legs, and underarm waxing services.",
        items: [
            { name: "Full Arms", price: 150, duration: "20 min" },
            { name: "Full Legs", price: 200, duration: "25 min" },
            { name: "Underarms", price: 50, duration: "10 min" },
            { name: "Full Body Wax", price: 800, duration: "60 min" },
            { name: "Chocolate Wax (Full Arms)", price: 300, duration: "25 min" },
        ]
    },
    {
        name: "Bleach",
        category: "Skin",
        description: "Face and body bleaching for skin brightening.",
        items: [
            { name: "Face Bleach", price: 200, duration: "20 min" },
            { name: "Full Arms Bleach", price: 250, duration: "25 min" },
            { name: "Full Body Bleach", price: 600, duration: "45 min" },
        ]
    },
    {
        name: "Hair Spa",
        category: "Hair",
        description: "Deep conditioning and relaxation for healthy hair.",
        items: [
            { name: "Regular Hair Spa", price: 600, duration: "45 min" },
            { name: "Keratin Hair Spa", price: 1000, duration: "60 min" },
            { name: "Deep Conditioning Treatment", price: 800, duration: "60 min" },
        ]
    },
    {
        name: "Hair Coloring",
        category: "Hair",
        description: "Global color, highlights, root touch-up, and fashion shades.",
        items: [
            { name: "Root Touch-Up", price: 500, duration: "60 min" },
            { name: "Global Hair Color", price: 1000, duration: "90 min" },
            { name: "Highlights", price: 1500, duration: "2 hours" },
            { name: "Fashion Shades", price: 2000, duration: "2 hours" },
        ]
    },
    {
        name: "Smoothing & Rebonding",
        category: "Hair",
        description: "Permanent hair straightening and smoothing treatments.",
        items: [
            { name: "Hair Smoothing", price: 3000, duration: "3-4 hours" },
            { name: "Rebonding", price: 3500, duration: "4-5 hours" },
            { name: "Keratin Treatment", price: 4000, duration: "3-4 hours" },
        ]
    },
    {
        name: "Bridal Makeup",
        category: "Bridal",
        description: "Complete bridal makeover including hair, makeup, and draping.",
        items: [
            { name: "Bridal Package (HD)", price: 5000, duration: "3 hours" },
            { name: "Bridal Package (Airbrush)", price: 8000, duration: "3-4 hours" },
            { name: "Engagement Makeup", price: 3000, duration: "2 hours" },
            { name: "Bridal Trial", price: 2000, duration: "2 hours" },
        ]
    },
    {
        name: "Party Makeup",
        category: "Makeup",
        description: "Glamorous makeup for parties and special occasions.",
        items: [
            { name: "Basic Party Makeup", price: 1500, duration: "60 min" },
            { name: "HD Party Makeup", price: 2500, duration: "90 min" },
            { name: "Saree Draping", price: 500, duration: "20 min" },
        ]
    },
];

async function main() {
    console.log("🌱 Seeding database with sessions and items...\n");

    // Check if services already exist
    const existingCount = await prisma.service.count();
    if (existingCount > 0) {
        console.log(`⚠️  Database already has ${existingCount} services.`);
        console.log("   Clearing existing data and re-seeding...\n");
        await prisma.serviceItem.deleteMany();
        await prisma.service.deleteMany();
    }

    for (const { items, ...serviceData } of servicesData) {
        const service = await prisma.service.create({ data: serviceData });
        console.log(`📁 Created session: ${service.name}`);

        for (const item of items) {
            await prisma.serviceItem.create({
                data: { ...item, serviceId: service.id }
            });
            console.log(`   └─ ${item.name} — ₹${item.price}`);
        }
    }

    const totalItems = servicesData.reduce((acc, s) => acc + s.items.length, 0);
    console.log(`\n🎉 Seeded ${servicesData.length} sessions with ${totalItems} items!`);

    // ===== Gallery Images =====
    console.log("\n🖼️  Seeding gallery images...");
    await prisma.galleryImage.deleteMany();

    const galleryImages = [
        // Bridal
        { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600", alt: "Bridal Makeup Transformation", category: "Bridal" },
        { src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600", alt: "Mehndi Art Design", category: "Bridal" },
        { src: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600", alt: "Bridal Hairstyle", category: "Bridal" },
        // Hair
        { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600", alt: "Hair Coloring & Highlights", category: "Hair" },
        { src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600", alt: "Stylish Hair Transformation", category: "Hair" },
        { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600", alt: "Layered Haircut", category: "Hair" },
        // Makeup
        { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600", alt: "Glamour Makeup Look", category: "Makeup" },
        { src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600", alt: "Party Makeup", category: "Makeup" },
        { src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600", alt: "Natural Glow Makeup", category: "Makeup" },
        // Skin
        { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600", alt: "Natural Glow Facial", category: "Skin" },
        { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600", alt: "Gold Facial Treatment", category: "Skin" },
        // Nails
        { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600", alt: "Nail Art Design", category: "Nails" },
        { src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600", alt: "Gel Nail Extensions", category: "Nails" },
        // Tattoo
        { src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600", alt: "Custom Tattoo Art", category: "Tattoo" },
        { src: "https://images.unsplash.com/photo-1590246815117-c3737a44eb20?w=600", alt: "Minimalist Tattoo Design", category: "Tattoo" },
    ];

    for (const img of galleryImages) {
        await prisma.galleryImage.create({ data: img });
        console.log(`   ✅ ${img.alt}`);
    }

    // ===== Reviews =====
    console.log("\n⭐ Seeding reviews...");
    await prisma.review.deleteMany();

    const reviews = [
        { customerName: "Priya Sharma", rating: 5, comment: "Amazing bridal makeup! Everyone loved my look. Sangita ma'am is truly talented.", service: "Bridal Makeup", status: "APPROVED" },
        { customerName: "Neha Patil", rating: 5, comment: "Best hair spa experience! My hair feels so soft and healthy now.", service: "Hair Spa", status: "APPROVED" },
        { customerName: "Anjali Deshmukh", rating: 4, comment: "Great facial treatment. My skin is glowing! Will definitely come back.", service: "Gold Facial", status: "APPROVED" },
        { customerName: "Pooja Kulkarni", rating: 5, comment: "Perfect party makeup. Got so many compliments! Very professional service.", service: "Party Makeup", status: "APPROVED" },
    ];

    for (const review of reviews) {
        await prisma.review.create({ data: review });
        console.log(`   ⭐ ${review.customerName} — ${review.rating}/5`);
    }

    console.log("\n✅ All seed data created successfully!");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
