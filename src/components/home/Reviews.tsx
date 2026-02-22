"use client";

import { useState, useEffect } from "react";
import { Star, Quote, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Review {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    service: string | null;
    createdAt: string;
}

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [service, setService] = useState("");
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        fetch("/api/reviews")
            .then((r) => r.json())
            .then((data) => setReviews(data))
            .catch((err) => console.error("Failed to fetch reviews:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ customerName: name, rating, comment, service }),
            });
            if (res.ok) {
                setSubmitted(true);
                setName("");
                setComment("");
                setService("");
                setRating(5);
            }
        } catch (err) {
            console.error("Failed to submit review:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="reviews" className="py-24 bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
                            What Our <span className="gradient-text">Clients Say</span>
                        </h2>
                        <div className="section-divider mb-6"></div>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            See what our lovely clients have to say about their experience with us.
                        </p>
                    </motion.div>
                </div>

                {/* Reviews Grid */}
                {loading ? (
                    <div className="text-center py-10">
                        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading reviews...</p>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground mb-8">No reviews yet. Be the first to share your experience!</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 group relative"
                            >
                                <div className="absolute -top-3 -right-2 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Quote className="w-3.5 h-3.5 text-primary" />
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-border"}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">
                                    &quot;{review.comment}&quot;
                                </p>

                                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shadow-sm">
                                        {review.customerName.charAt(0)}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-foreground text-sm block">{review.customerName}</span>
                                        {review.service && (
                                            <span className="text-xs text-primary/80">{review.service}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Write a Review Section */}
                <div className="max-w-lg mx-auto">
                    {!showForm && !submitted && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <Button
                                onClick={() => setShowForm(true)}
                                variant="premium"
                                className="rounded-full px-8 py-6 text-base shadow-md hover:shadow-lg gap-2"
                            >
                                <Send className="w-4 h-4" /> Write a Review
                            </Button>
                        </motion.div>
                    )}

                    {submitted && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center bg-card border border-border rounded-2xl p-8 shadow-md"
                        >
                            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-foreground mb-2">Thank You!</h3>
                            <p className="text-muted-foreground text-sm">Your review has been submitted and will appear after approval.</p>
                        </motion.div>
                    )}

                    {showForm && !submitted && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg"
                        >
                            <h3 className="font-serif text-xl font-bold text-foreground mb-6 text-center">Share Your Experience</h3>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Service (optional)</label>
                                    <input
                                        type="text"
                                        value={service}
                                        onChange={(e) => setService(e.target.value)}
                                        placeholder="e.g., Bridal Makeup, Hair Spa"
                                        className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`w-8 h-8 transition-colors ${star <= (hoverRating || rating)
                                                        ? "fill-primary text-primary"
                                                        : "text-border"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Your Review</label>
                                    <textarea
                                        required
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Tell us about your experience..."
                                        rows={4}
                                        className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 rounded-full"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="premium"
                                        className="flex-1 rounded-full shadow-md"
                                        disabled={submitting}
                                    >
                                        {submitting ? "Submitting..." : "Submit Review"}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
