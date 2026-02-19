"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

const TattooSection = () => {
    return (
        <section className="py-20 bg-foreground text-background relative overflow-hidden">
            {/* Decorative patterns */}
            <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat"></div> {/* Placeholder for pattern */}

            <div className="container mx-auto px-4 z-10 relative">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    <div className="lg:w-1/2">
                        <div className="border-[1px] border-primary/30 p-8 rounded-lg bg-background/5 backdrop-blur-sm">
                            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">Artistic Tattoos</h2>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Express yourself with our custom tattoo designs. From minimalist line art to intricate patterns,
                                we bring your vision to life with precision and hygiene.
                            </p>

                            <div className="bg-primary/20 border border-primary/40 rounded-lg p-6 mb-8">
                                <h3 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
                                    <span className="bg-primary rounded-full p-1 text-background">!</span> Booking Notice
                                </h3>
                                <p className="text-gray-200">
                                    For Tattoo Booking, Please Contact the Parlour Directly. Consultations are required for custom designs.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none" asChild>
                                    <Link href="https://wa.me/919876543210" target="_blank">
                                        <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background" asChild>
                                    <Link href="tel:+919876543210">
                                        <Phone className="mr-2 h-5 w-5" /> Call Now
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                        {/* Placeholders for Tattoo images - In a real app, use next/image */}
                        <div className="bg-gray-800 rounded-lg aspect-square flex items-center justify-center text-gray-500 hover:text-primary transition-colors border border-gray-700">Tattoo Art 1</div>
                        <div className="bg-gray-800 rounded-lg aspect-square translate-y-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors border border-gray-700">Tattoo Art 2</div>
                        <div className="bg-gray-800 rounded-lg aspect-square flex items-center justify-center text-gray-500 hover:text-primary transition-colors border border-gray-700">Tattoo Art 3</div>
                        <div className="bg-gray-800 rounded-lg aspect-square translate-y-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors border border-gray-700">Tattoo Art 4</div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TattooSection;
