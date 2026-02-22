"use client";

import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-muted/20 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
                            Get in <span className="gradient-text">Touch</span>
                        </h2>
                        <div className="section-divider mb-6"></div>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Visit our parlour or reach out to us for appointments and inquiries.
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2 space-y-6"
                    >
                        {/* Contact Cards */}
                        <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Our Location</h3>
                                <p className="text-muted-foreground text-sm">R4X2+WHC, Shreepur, Maharashtra 413112</p>
                            </div>
                        </div>

                        <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                                <Link href="tel:+918857906308" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    +91 88579 06308
                                </Link>
                            </div>
                        </div>

                        <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                                <Link href="mailto:sangitabaad52@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    sangitabaad52@gmail.com
                                </Link>
                            </div>
                        </div>

                        <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Opening Hours</h3>
                                <p className="text-muted-foreground text-sm">Mon-Sat: 10 AM – 8 PM</p>
                                <p className="text-muted-foreground text-sm">Sun: 11 AM – 5 PM</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <Button variant="premium" className="gap-2 rounded-full flex-1 shadow-md" asChild>
                                <Link href="https://wa.me/918857906308" target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="w-4 h-4" /> WhatsApp
                                </Link>
                            </Button>
                            <Button variant="outline" className="gap-2 rounded-full flex-1 border-primary/30 hover:bg-primary/5" asChild>
                                <Link href="tel:+918857906308">
                                    <Phone className="w-4 h-4" /> Call Now
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2 h-[500px] rounded-2xl overflow-hidden shadow-xl border border-border"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.0!2d75.0!3d18.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUjRYMitXSEMsIFNocmVlcHVyLCBNYWhhcmFzaHRyYSA0MTMxMTI!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
