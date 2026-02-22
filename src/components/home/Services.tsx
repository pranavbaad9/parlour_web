"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown, Clock, IndianRupee, Sparkles } from "lucide-react";

interface ServiceItem {
    id: string;
    name: string;
    price: number;
    duration: string | null;
}

interface Service {
    id: string;
    name: string;
    category: string;
    description: string;
    items: ServiceItem[];
}

const categories = ["All", "Hair", "Skin", "Bridal", "Makeup", "Body"];

const Services = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch("/api/services");
                if (res.ok) {
                    const data = await res.json();
                    setServices(data);
                }
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const filteredServices = activeCategory === "All"
        ? services
        : services.filter(s => s.category === activeCategory);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="services" className="py-24 bg-background text-foreground relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
                            Our <span className="gradient-text">Premium Services</span>
                        </h2>
                        <div className="section-divider mb-6"></div>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Discover a wide range of beauty treatments designed to help you look and feel your absolute best.
                        </p>
                    </motion.div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14">
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
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-16">
                        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading services...</p>
                    </div>
                ) : filteredServices.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">No services found in this category.</div>
                ) : (
                    <div className="max-w-4xl mx-auto space-y-4">
                        {filteredServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.4 }}
                                className={cn(
                                    "bg-card border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden",
                                    expandedId === service.id ? "border-primary/30 shadow-md" : "border-border"
                                )}
                            >
                                {/* Session Header */}
                                <button
                                    onClick={() => toggleExpand(service.id)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                                            <Sparkles className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                <h3 className="text-lg md:text-xl font-serif font-semibold group-hover:text-primary transition-colors">
                                                    {service.name}
                                                </h3>
                                                <span className="text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                                                    {service.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                                            {service.items.length > 0 && (
                                                <p className="text-xs text-primary mt-2 font-medium">
                                                    {service.items.length} option{service.items.length > 1 ? "s" : ""}
                                                    {" · "}Starting ₹{Math.min(...service.items.map(i => i.price))}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-3 transition-all duration-300",
                                        expandedId === service.id
                                            ? "bg-primary/10 rotate-180"
                                            : "bg-muted/50 group-hover:bg-primary/5"
                                    )}>
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                </button>

                                {/* Expanded Items */}
                                {expandedId === service.id && service.items.length > 0 && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-border/50"
                                    >
                                        <div className="divide-y divide-border/30">
                                            {service.items.map((item, i) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.04 }}
                                                    className="flex items-center justify-between px-6 md:px-8 py-4 hover:bg-primary/5 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3 flex-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></span>
                                                        <span className="font-medium text-foreground text-sm md:text-base">{item.name}</span>
                                                        {item.duration && (
                                                            <span className="text-xs text-muted-foreground inline-flex items-center gap-1 bg-muted/50 px-2 py-0.5 rounded-full">
                                                                <Clock className="w-3 h-3" /> {item.duration}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center text-primary font-bold text-sm md:text-base">
                                                        <IndianRupee className="w-3.5 h-3.5" />
                                                        {item.price}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {expandedId === service.id && service.items.length === 0 && (
                                    <div className="border-t border-border/50 px-6 py-5 text-sm text-muted-foreground italic text-center">
                                        Contact us for pricing details.
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;
