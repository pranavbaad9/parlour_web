import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-foreground text-background py-12 border-t border-primary/20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-serif text-primary mb-4">Dhanashree Beauty Parlour</h3>
                        <p className="text-gray-400 text-sm">
                            Dedicated to enhancing your natural beauty with premium services and expert care.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="#services" className="hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="#gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                            <li><Link href="/book" className="hover:text-primary transition-colors">Book Now</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Mon - Sat: 10:00 AM - 8:00 PM</li>
                            <li>Sun: 11:00 AM - 5:00 PM</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center pt-8 border-t border-gray-800 text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Dhanashree Beauty Parlour & Manasi Ladies Shoppy. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
