"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "#services" },
        { name: "Gallery", href: "#gallery" },
        { name: "Pricing", href: "#pricing" },
        { name: "Reviews", href: "#reviews" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-primary">
                        Dhanashree<span className="text-secondary-foreground">Beauty</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button variant="premium" size="sm" asChild>
                            <Link href="/book">Book Appointment</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-foreground focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-background border-t">
                    <div className="flex flex-col space-y-4 px-4 py-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-foreground hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button variant="premium" className="w-full" asChild onClick={() => setIsOpen(false)}>
                            <Link href="/book">Book Appointment</Link>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
