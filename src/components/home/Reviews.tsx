"use client";

import { Star } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        comment: "Absolutely loved the bridal makeup! The team was so professional and made me look perfect for my big day.",
        date: "2 days ago"
    },
    {
        id: 2,
        name: "Sneha Patil",
        rating: 5,
        comment: "Great experience with the hair spa. My hair feels so soft and manageable now. Highly recommend!",
        date: "1 week ago"
    },
    {
        id: 3,
        name: "Anjali Gupta",
        rating: 4,
        comment: "Very clean and hygienic place. The facial was relaxing. Good service at reasonable prices.",
        date: "2 weeks ago"
    }
];

const Reviews = () => {
    return (
        <section id="reviews" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">Happy Customers</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        See what our lovely clients have to say about their experience with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex gap-1 text-primary mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
                                ))}
                            </div>
                            <p className="text-foreground/80 italic mb-6">"{review.comment}"</p>
                            <div className="flex justify-between items-center border-t pt-4">
                                <span className="font-semibold">{review.name}</span>
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
