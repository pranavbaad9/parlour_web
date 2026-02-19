"use client";

import { services, ServiceCategory } from "@/data/services";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const categories: ServiceCategory[] = ["All", "Hair", "Skin", "Bridal", "Makeup", "Body"] as any;

const Services = () => {
    const [activeCategory, setActiveCategory] = useState<ServiceCategory | "All">("All");

    const filteredServices = activeCategory === "All"
        ? services
        : services.filter(service => service.category === activeCategory);

    return (
        <section id="services" className="py-20 bg-background text-foreground">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">Our Premium Services</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover a wide range of beauty treatments designed to help you look and feel your absolute best.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                                activeCategory === category
                                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                                    : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Service Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredServices.map((service) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={service.id}
                                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-secondary/30 p-2 rounded-full text-primary">
                                        {/* Icon placeholder or dynamic icon based on category */}
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="text-lg font-semibold text-primary">₹{service.priceStart}+</span>
                                </div>
                                <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{service.description}</p>
                                <div className="flex justify-between items-center text-xs text-muted-foreground/80">
                                    <span>{service.duration}</span>
                                    <span className="uppercase tracking-wider">{service.category}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
