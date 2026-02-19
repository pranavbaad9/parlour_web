"use client";

import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-secondary/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-12">

                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">Visit Us</h2>
                        <p className="text-muted-foreground mb-8">
                            We are enhancing beauty in the heart of the city. Visit our parlour for a relaxing experience.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-foreground">Address</h3>
                                    <p className="text-muted-foreground">Shop No. 5, Dhanashree Heights, Main Road, City Name, 411001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-foreground">Contact</h3>
                                    <p className="text-muted-foreground">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-foreground">Email</h3>
                                    <p className="text-muted-foreground">contact@dhanashreebeauty.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <Button variant="outline" size="icon" asChild>
                                <Link href="#"><Instagram className="w-5 h-5" /></Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <Link href="#"><Facebook className="w-5 h-5" /></Link>
                            </Button>
                        </div>
                    </div>

                    <div className="md:w-1/2 h-[400px] bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.568466184852!2d73.8544!3d18.5029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzEwLjQiTiA3M8KwNTEnMTUuOCJF!5e0!3m2!1sen!2sin!4v1625641234567!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
