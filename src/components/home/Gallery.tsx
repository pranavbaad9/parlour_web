"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const galleryImages = [
    { id: 1, category: "Makeup", src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop", alt: "Bridal Makeup" },
    { id: 2, category: "Hair", src: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=600&auto=format&fit=crop", alt: "Hair Styling" },
    { id: 3, category: "Tattoo", src: "https://images.unsplash.com/photo-1590246294382-f9c5421297e1?q=80&w=600&auto=format&fit=crop", alt: "Artistic Tattoo" },
    { id: 4, category: "Skin", src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop", alt: "Facial Treatment" },
    { id: 5, category: "Makeup", src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop", alt: "Party Makeup" },
    { id: 6, category: "Hair", src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop", alt: "Hair Coloring" },
];

const Gallery = () => {
    return (
        <section id="gallery" className="py-20 bg-secondary/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">Our Work Gallery</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A glimpse into our artistry. From stunning bridal transformations to intricate tattoos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative group aspect-[4/3] overflow-hidden rounded-lg shadow-md cursor-pointer"
                        >
                            {/* Image Placeholder with real src */}
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <p className="text-lg font-serif font-bold">{image.alt}</p>
                                    <span className="text-sm text-primary uppercase tracking-widest">{image.category}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Gallery;
