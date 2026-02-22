import Link from "next/link";
import { Phone, Mail, MapPin, Sparkles, Instagram, Lock } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-foreground text-background relative overflow-hidden">
            {/* Top gold line */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <Sparkles className="w-3.5 h-3.5 text-white" />
                            </div>
                            <h3 className="text-xl font-serif text-primary font-bold">Dhanashree</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Dedicated to enhancing your natural beauty with premium services and expert care since 2019.
                        </p>
                        <div className="flex gap-3">
                            <Link href="https://wa.me/918857906308" target="_blank" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-colors group">
                                <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            </Link>
                            <Link href="https://instagram.com/sangita_makup_artists_shreepur" target="_blank" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-colors group">
                                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-5">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span> Home</Link></li>
                            <li><Link href="#services" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span> Services</Link></li>
                            <li><Link href="#gallery" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span> Gallery</Link></li>
                            <li><Link href="#reviews" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span> Reviews</Link></li>
                            <li><Link href="/book" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span> Book Now</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-5">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                    <Phone className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <Link href="tel:+918857906308" className="hover:text-primary transition-colors">
                                    +91 88579 06308
                                </Link>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                    <Mail className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <Link href="mailto:sangitabaad52@gmail.com" className="hover:text-primary transition-colors">
                                    sangitabaad52@gmail.com
                                </Link>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                                    <MapPin className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <span>R4X2+WHC, Shreepur,<br /> Maharashtra 413112</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-5">Opening Hours</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex justify-between">
                                <span>Monday - Saturday</span>
                                <span className="text-gray-300">10 AM – 8 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span className="text-gray-300">11 AM – 5 PM</span>
                            </li>
                        </ul>
                        <div className="mt-6 p-3 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-xs text-primary">Walk-ins welcome! For bridal appointments, please book in advance.</p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Dhanashree Beauty Parlour & Manasi Ladies Shoppy. All rights reserved.
                    </p>
                    <Link href="/admin/login" className="text-xs text-gray-600 hover:text-primary/60 transition-colors flex items-center gap-1 opacity-60 hover:opacity-100">
                        <Lock className="w-3 h-3" /> Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
