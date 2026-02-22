"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    category: string;
}

const INITIAL_DISPLAY = 6;

const Gallery = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetch("/api/gallery")
            .then((r) => r.json())
            .then((data) => setImages(data))
            .catch((err) => console.error("Failed to fetch gallery:", err))
            .finally(() => setLoading(false));
    }, []);

    // Reset "show all" when switching categories
    useEffect(() => {
        setShowAll(false);
    }, [activeCategory]);

    // Derive unique categories from the images
    const categories = ["All", ...Array.from(new Set(images.map((img) => img.category)))];

    const filteredImages = activeCategory === "All"
        ? images
        : images.filter((img) => img.category === activeCategory);

    const displayedImages = showAll ? filteredImages : filteredImages.slice(0, INITIAL_DISPLAY);
    const hasMore = filteredImages.length > INITIAL_DISPLAY;

    return (
        <section id="gallery" className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
                            Our <span className="gradient-text">Work Gallery</span>
                        </h2>
                        <div className="section-divider mb-6"></div>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A glimpse into our artistry. From stunning bridal transformations to intricate tattoos.
                        </p>
                    </motion.div>
                </div>

                {/* Category Filter Tabs */}
                {!loading && images.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "px-5 md:px-7 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
                                    activeCategory === category
                                        ? "bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-md scale-105"
                                        : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary hover:shadow-sm"
                                )}
                            >
                                {category}
                                {category !== "All" && (
                                    <span className="ml-1.5 text-xs opacity-70">
                                        ({images.filter(i => i.category === category).length})
                                    </span>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}

                {loading ? (
                    <div className="text-center py-10">
                        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading gallery...</p>
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">No gallery images yet.</div>
                ) : (
                    <>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory + (showAll ? "-all" : "-limited")}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                            >
                                {displayedImages.map((image, index) => (
                                    <motion.div
                                        key={image.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.06, duration: 0.4 }}
                                        className="relative group aspect-[4/3] overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                                            <div className="p-6 w-full">
                                                <p className="text-lg font-serif font-bold text-white mb-1">{image.alt}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-8 h-0.5 bg-primary rounded-full"></span>
                                                    <span className="text-sm text-primary uppercase tracking-widest font-medium">{image.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/80 transition-all duration-500 rounded-tr-lg"></div>
                                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/80 transition-all duration-500 rounded-bl-lg"></div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* See More / Show Less */}
                        <div className="text-center mt-10">
                            {hasMore && !showAll && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={() => setShowAll(true)}
                                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    See More
                                    <ChevronDown className="w-4 h-4" />
                                </motion.button>
                            )}
                            {showAll && hasMore && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={() => setShowAll(false)}
                                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary/30 text-primary font-medium hover:bg-primary/5 transition-all duration-300"
                                >
                                    Show Less
                                </motion.button>
                            )}
                            <p className="text-sm text-muted-foreground mt-4">
                                Showing {displayedImages.length} of {filteredImages.length} photos
                            </p>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default Gallery;
