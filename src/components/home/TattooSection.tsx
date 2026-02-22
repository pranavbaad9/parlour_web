"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const TattooSection = () => {
    return (
        <section className="py-24 bg-foreground text-background relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-40 h-40 border border-primary rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-60 h-60 border border-primary rounded-full"></div>
                <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-primary/50 rounded-full"></div>
            </div>

            <div className="container mx-auto px-4 z-10 relative">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:w-1/2"
                    >
                        <div className="border border-primary/20 p-8 md:p-10 rounded-2xl bg-white/5 backdrop-blur-sm">
                            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6 leading-tight">Artistic Tattoos</h2>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Express yourself with our custom tattoo designs. From minimalist line art to intricate patterns,
                                we bring your vision to life with precision and hygiene.
                            </p>

                            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-8">
                                <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm text-background font-bold">!</span>
                                    Booking Notice
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    For Tattoo Booking, please contact the parlour directly. Consultations are required for custom designs.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none rounded-full px-8 shadow-lg hover:shadow-xl transition-all" asChild>
                                    <Link href="https://wa.me/918857906308" target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background rounded-full px-8 transition-all duration-300" asChild>
                                    <Link href="tel:+918857906308">
                                        <Phone className="mr-2 h-5 w-5" /> Call Now
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:w-1/2 grid grid-cols-2 gap-4"
                    >
                        {[
                            { label: "Minimalist", img: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=400&auto=format&fit=crop" },
                            { label: "Floral", img: "https://images.unsplash.com/photo-1590246294382-f9c5421297e1?q=80&w=400&auto=format&fit=crop" },
                            { label: "Traditional", img: "https://images.unsplash.com/photo-1598371839696-5c5bb1c12e39?q=80&w=400&auto=format&fit=crop" },
                            { label: "Custom", img: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?q=80&w=400&auto=format&fit=crop" },
                        ].map((item, i) => (
                            <div
                                key={item.label}
                                className={`relative group overflow-hidden rounded-2xl aspect-square shadow-lg border border-white/10 ${i % 2 === 1 ? "translate-y-8" : ""}`}
                            >
                                <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                                    <span className="text-white font-serif text-lg">{item.label}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default TattooSection;
