export type ServiceCategory = "Hair" | "Skin" | "Makeup" | "Body" | "Bridal";

export interface Service {
    id: string;
    name: string;
    category: ServiceCategory;
    priceStart: number;
    description: string;
    duration?: string;
    image?: string;
}

export const services: Service[] = [
    {
        id: "1",
        name: "Threading",
        category: "Skin",
        priceStart: 30,
        description: "Precise eyebrow shaping and facial hair removal.",
        duration: "15 min"
    },
    {
        id: "2",
        name: "Facial (All Types)",
        category: "Skin",
        priceStart: 500,
        description: "Rejuvenating facials including Fruit, Gold, Diamond, and Anti-aging.",
        duration: "60-90 min"
    },
    {
        id: "3",
        name: "Clean Up",
        category: "Skin",
        priceStart: 250,
        description: "Quick deep cleansing for instant glow.",
        duration: "30 min"
    },
    {
        id: "4",
        name: "Waxing",
        category: "Body",
        priceStart: 150,
        description: "Full body, arms, legs, and underarm waxing services.",
        duration: "30-60 min"
    },
    {
        id: "5",
        name: "Bleach",
        category: "Skin",
        priceStart: 200,
        description: "Face and body bleaching for skin brightening.",
        duration: "20 min"
    },
    {
        id: "6",
        name: "Bridal Makeup",
        category: "Bridal",
        priceStart: 5000,
        description: "Complete bridal makeover including hair, makeup, and draping. Trial available.",
        duration: "3-4 hours"
    },
    {
        id: "7",
        name: "Party Makeup",
        category: "Makeup",
        priceStart: 1500,
        description: "Glamorous makeup for parties and special occasions.",
        duration: "60-90 min"
    },
    {
        id: "8",
        name: "Haircuts",
        category: "Hair",
        priceStart: 200,
        description: "All types of haircuts: Layer, Bob, U-cut, V-cut, and more.",
        duration: "30-45 min"
    },
    {
        id: "9",
        name: "Hair Spa",
        category: "Hair",
        priceStart: 600,
        description: "Deep conditioning and relaxation for healthy hair.",
        duration: "60 min"
    },
    {
        id: "10",
        name: "Hair Coloring",
        category: "Hair",
        priceStart: 1000,
        description: "Global color, highlights, root touch-up, and fashion shades.",
        duration: "2-3 hours"
    },
    {
        id: "11",
        name: "Smoothing & Rebonding",
        category: "Hair",
        priceStart: 3000,
        description: "Permanent hair straightening and smoothing treatments.",
        duration: "4-6 hours"
    }
];
