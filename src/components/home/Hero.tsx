"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="relative w-full h-[80vh] flex items-center justify-center bg-gradient-to-br from-secondary/30 via-background to-secondary/20 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl md:text-2xl font-serif text-accent mb-4 tracking-widest uppercase">
                        Welcome to Dhanashree Beauty Parlour
                    </h2>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
                        Enhancing Your <br />
                        <span className="text-primary italic">Natural Beauty</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light">
                        Experience premium beauty treatments, bridal makeup, and relaxation in a luxurious environment tailored just for you.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="premium" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all" asChild>
                            <Link href="/book">Book Your Appointment</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/50 text-foreground hover:bg-primary/5" asChild>
                            <Link href="#services">Explore Services</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
