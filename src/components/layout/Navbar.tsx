"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "#services" },
        { name: "Gallery", href: "#gallery" },
        { name: "Reviews", href: "#reviews" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled
                ? "glass shadow-lg shadow-primary/5 border-b border-border/50"
                : "bg-transparent border-b border-transparent"
            }`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-18">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-serif text-xl md:text-2xl font-bold tracking-tight">
                            <span className="gradient-text">Dhanashree</span>
                            <span className="text-foreground/60 font-normal ml-1">Beauty</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300 rounded-lg hover:bg-primary/5 group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                            </Link>
                        ))}
                        <div className="ml-3">
                            <Button variant="premium" size="sm" asChild className="rounded-full px-6 shadow-md hover:shadow-lg transition-all">
                                <Link href="/book">Book Now</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-foreground rounded-lg hover:bg-primary/5 transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden glass border-t border-border/50 animate-fade-in-up">
                    <div className="flex flex-col space-y-1 px-4 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-foreground/80 hover:text-primary px-4 py-3 rounded-lg hover:bg-primary/5 transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-2">
                            <Button variant="premium" className="w-full rounded-full" asChild onClick={() => setIsOpen(false)}>
                                <Link href="/book">Book Appointment</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
