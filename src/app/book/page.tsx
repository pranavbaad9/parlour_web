"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, Clock, IndianRupee, Sparkles, CheckCircle, ArrowLeft, ChevronDown } from "lucide-react";

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

const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
];

export default function BookingPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [selectedItemId, setSelectedItemId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetchingServices, setFetchingServices] = useState(true);

    useEffect(() => {
        fetch("/api/services")
            .then((r) => r.json())
            .then((data) => setServices(data))
            .catch((err) => console.error("Failed to fetch services:", err))
            .finally(() => setFetchingServices(false));
    }, []);

    const selectedService = services.find((s) => s.id === selectedServiceId);
    const selectedItem = selectedService?.items.find((i) => i.id === selectedItemId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName: name,
                    customerPhone: phone,
                    serviceItemId: selectedItemId,
                    date,
                    timeSlot,
                }),
            });
            if (res.ok) {
                setSuccess(true);
            }
        } catch (err) {
            console.error("Booking failed:", err);
        } finally {
            setLoading(false);
        }
    };

    // Get today's date for min constraint
    const today = new Date().toISOString().split("T")[0];

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/30 via-background to-muted/40 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-card rounded-2xl shadow-xl border border-border p-10 max-w-md w-full text-center"
                >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Booking Confirmed!</h2>
                    <p className="text-muted-foreground mb-2">
                        Thank you, <strong className="text-foreground">{name}</strong>!
                    </p>
                    <div className="bg-muted/40 rounded-xl p-4 mb-6 text-sm space-y-1">
                        <p className="text-foreground font-medium">{selectedItem?.name}</p>
                        <p className="text-muted-foreground">{date} at {timeSlot}</p>
                        {selectedItem && (
                            <p className="text-primary font-semibold">₹{selectedItem.price}</p>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-6">We&apos;ll confirm your appointment shortly via phone.</p>
                    <Button variant="premium" className="rounded-full px-8" asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-muted/30 py-12 px-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto max-w-2xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                        Book Your <span className="gradient-text">Appointment</span>
                    </h1>
                    <div className="section-divider mb-4"></div>
                    <p className="text-muted-foreground text-sm">Select your service, pick a time, and we&apos;ll take care of the rest.</p>
                </motion.div>

                {/* Booking Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8"
                >
                    {fetchingServices ? (
                        <div className="text-center py-10">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-muted-foreground text-sm">Loading services...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Service Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Select Service
                                </label>
                                <div className="relative">
                                    <select
                                        required
                                        value={selectedServiceId}
                                        onChange={(e) => { setSelectedServiceId(e.target.value); setSelectedItemId(""); }}
                                        className="w-full p-3 pr-10 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
                                    >
                                        <option value="">Choose a service category…</option>
                                        {services.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.category})</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                </div>
                            </div>

                            {/* Service Item Selection */}
                            {selectedService && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="space-y-2"
                                >
                                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                        <IndianRupee className="w-3.5 h-3.5 text-primary" /> Select Type
                                    </label>
                                    <div className="relative">
                                        <select
                                            required
                                            value={selectedItemId}
                                            onChange={(e) => setSelectedItemId(e.target.value)}
                                            className="w-full p-3 pr-10 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
                                        >
                                            <option value="">Choose a specific type…</option>
                                            {selectedService.items.map(item => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name} — ₹{item.price} {item.duration ? `(${item.duration})` : ''}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                    </div>
                                </motion.div>
                            )}

                            {/* Selected Item Info */}
                            {selectedItem && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-primary/5 rounded-xl p-4 border border-primary/15 flex items-center justify-between"
                                >
                                    <div>
                                        <p className="font-medium text-foreground text-sm">{selectedItem.name}</p>
                                        {selectedItem.duration && (
                                            <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                                <Clock className="w-3 h-3" /> {selectedItem.duration}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-lg font-bold text-primary">₹{selectedItem.price}</span>
                                </motion.div>
                            )}

                            <div className="h-px bg-border"></div>

                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your phone number"
                                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                        <CalendarDays className="w-3.5 h-3.5 text-primary" /> Date
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        min={today}
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-primary" /> Time Slot
                                    </label>
                                    <div className="relative">
                                        <select
                                            required
                                            value={timeSlot}
                                            onChange={(e) => setTimeSlot(e.target.value)}
                                            className="w-full p-3 pr-10 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
                                        >
                                            <option value="">Select a time</option>
                                            {timeSlots.map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="premium"
                                className="w-full py-6 rounded-full text-base shadow-md hover:shadow-lg transition-all mt-2"
                                disabled={loading || !selectedItemId}
                            >
                                {loading ? "Booking..." : "Confirm Booking"}
                            </Button>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
