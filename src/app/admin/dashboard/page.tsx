"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    Check, X, Trash2, Plus, Pencil, LogOut, CalendarDays, Scissors,
    ChevronDown, ChevronRight, Image, Star, MessageSquare, LayoutDashboard,
    Users, IndianRupee, Clock, TrendingUp, Eye
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ServiceItem {
    id: string;
    name: string;
    price: number;
    duration: string | null;
    serviceId: string;
}

interface Service {
    id: string;
    name: string;
    category: string;
    description: string;
    items: ServiceItem[];
}

interface Booking {
    id: string;
    customerName: string;
    customerPhone: string;
    serviceItemId: string;
    serviceItem: ServiceItem & { service: Service };
    date: string;
    timeSlot: string;
    status: string;
    createdAt: string;
}

interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    category: string;
}

interface Review {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    service: string | null;
    status: string;
    createdAt: string;
}

const CATEGORIES = ["Hair", "Skin", "Makeup", "Body", "Bridal"];
const GALLERY_CATEGORIES = ["Makeup", "Hair", "Skin", "Tattoo", "Bridal", "Nails"];

type TabKey = "overview" | "bookings" | "services" | "gallery" | "reviews";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<TabKey>("overview");
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [loadingServices, setLoadingServices] = useState(true);
    const [loadingGallery, setLoadingGallery] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [expandedService, setExpandedService] = useState<string | null>(null);

    // Service form
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [serviceForm, setServiceForm] = useState({ name: "", category: "Hair", description: "" });

    // Item form
    const [showItemForm, setShowItemForm] = useState(false);
    const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
    const [itemServiceId, setItemServiceId] = useState<string>("");
    const [itemForm, setItemForm] = useState({ name: "", price: "", duration: "" });

    // Gallery form
    const [showGalleryForm, setShowGalleryForm] = useState(false);
    const [editingGallery, setEditingGallery] = useState<GalleryImage | null>(null);
    const [galleryForm, setGalleryForm] = useState({ src: "", alt: "", category: "" });
    const [customCategory, setCustomCategory] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const fetchBookings = useCallback(async () => {
        try {
            const res = await fetch("/api/bookings");
            if (res.ok) setBookings(await res.json());
        } catch (_e) { console.error("Failed to fetch bookings"); }
        finally { setLoadingBookings(false); }
    }, []);

    const fetchServices = useCallback(async () => {
        try {
            const res = await fetch("/api/services");
            if (res.ok) setServices(await res.json());
        } catch (_e) { console.error("Failed to fetch services"); }
        finally { setLoadingServices(false); }
    }, []);

    const fetchGallery = useCallback(async () => {
        try {
            const res = await fetch("/api/gallery");
            if (res.ok) setGallery(await res.json());
        } catch (_e) { console.error("Failed to fetch gallery"); }
        finally { setLoadingGallery(false); }
    }, []);

    const fetchReviews = useCallback(async () => {
        try {
            const res = await fetch("/api/reviews?all=true");
            if (res.ok) setReviews(await res.json());
        } catch (_e) { console.error("Failed to fetch reviews"); }
        finally { setLoadingReviews(false); }
    }, []);

    useEffect(() => { fetchBookings(); fetchServices(); fetchGallery(); fetchReviews(); }, [fetchBookings, fetchServices, fetchGallery, fetchReviews]);

    // ===== Computed Stats =====
    const pendingBookings = bookings.filter(b => b.status === "PENDING");
    const confirmedBookings = bookings.filter(b => b.status === "CONFIRMED");
    const completedBookings = bookings.filter(b => b.status === "COMPLETED");
    const pendingReviews = reviews.filter(r => r.status === "PENDING");
    const approvedReviews = reviews.filter(r => r.status === "APPROVED");
    const totalServiceItems = services.reduce((acc, s) => acc + s.items.length, 0);
    const avgRating = approvedReviews.length > 0
        ? (approvedReviews.reduce((acc, r) => acc + r.rating, 0) / approvedReviews.length).toFixed(1)
        : "—";

    const todayStr = new Date().toISOString().split("T")[0];
    const todayBookings = bookings.filter(b => {
        try { return new Date(b.date).toISOString().split("T")[0] === todayStr; }
        catch { return false; }
    });

    // ===== Bookings =====
    const updateStatus = async (id: string, status: string) => {
        await fetch(`/api/bookings/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
        fetchBookings();
    };

    const deleteBooking = async (id: string) => {
        if (!confirm("Delete this booking?")) return;
        await fetch(`/api/bookings/${id}`, { method: "DELETE" });
        fetchBookings();
    };

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    // ===== Service CRUD =====
    const openAddService = () => { setEditingService(null); setServiceForm({ name: "", category: "Hair", description: "" }); setShowServiceForm(true); };
    const openEditService = (s: Service) => { setEditingService(s); setServiceForm({ name: s.name, category: s.category, description: s.description }); setShowServiceForm(true); };

    const handleServiceSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSubmitting(true);
        try {
            if (editingService) { await fetch(`/api/services/${editingService.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(serviceForm) }); }
            else { await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(serviceForm) }); }
            setShowServiceForm(false); fetchServices();
        } catch (_e) { console.error("Failed to save service"); }
        finally { setSubmitting(false); }
    };

    const deleteService = async (id: string) => { if (!confirm("Delete this session and ALL its items?")) return; await fetch(`/api/services/${id}`, { method: "DELETE" }); fetchServices(); };

    // ===== Service Item CRUD =====
    const openAddItem = (serviceId: string) => { setEditingItem(null); setItemServiceId(serviceId); setItemForm({ name: "", price: "", duration: "" }); setShowItemForm(true); };
    const openEditItem = (item: ServiceItem) => { setEditingItem(item); setItemServiceId(item.serviceId); setItemForm({ name: item.name, price: String(item.price), duration: item.duration || "" }); setShowItemForm(true); };

    const handleItemSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSubmitting(true);
        try {
            if (editingItem) { await fetch(`/api/items/${editingItem.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(itemForm) }); }
            else { await fetch(`/api/services/${itemServiceId}/items`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(itemForm) }); }
            setShowItemForm(false); fetchServices();
        } catch (_e) { console.error("Failed to save item"); }
        finally { setSubmitting(false); }
    };

    const deleteItem = async (id: string) => { if (!confirm("Delete this item?")) return; await fetch(`/api/items/${id}`, { method: "DELETE" }); fetchServices(); };

    // ===== Gallery CRUD =====
    const openAddGallery = () => { setEditingGallery(null); setGalleryForm({ src: "", alt: "", category: "" }); setCustomCategory(""); setShowGalleryForm(true); };
    const openEditGallery = (img: GalleryImage) => { setEditingGallery(img); setGalleryForm({ src: img.src, alt: img.alt, category: img.category }); setCustomCategory(""); setShowGalleryForm(true); };

    const handleGallerySubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSubmitting(true);
        const finalCategory = customCategory.trim() || galleryForm.category;
        if (!finalCategory) { alert("Please select or enter a category."); setSubmitting(false); return; }
        const payload = { src: galleryForm.src, alt: galleryForm.alt, category: finalCategory };
        try {
            if (editingGallery) { await fetch(`/api/gallery/${editingGallery.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
            else { await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
            setShowGalleryForm(false); setCustomCategory(""); fetchGallery();
        } catch (_e) { console.error("Failed to save gallery image"); }
        finally { setSubmitting(false); }
    };

    const deleteGalleryImage = async (id: string) => { if (!confirm("Delete this gallery image?")) return; await fetch(`/api/gallery/${id}`, { method: "DELETE" }); fetchGallery(); };

    // ===== Reviews Moderation =====
    const approveReview = async (id: string) => { await fetch(`/api/reviews/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "APPROVED" }) }); fetchReviews(); };
    const rejectReview = async (id: string) => { await fetch(`/api/reviews/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "REJECTED" }) }); fetchReviews(); };
    const deleteReview = async (id: string) => { if (!confirm("Delete this review?")) return; await fetch(`/api/reviews/${id}`, { method: "DELETE" }); fetchReviews(); };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 z-40 hidden lg:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <span className="text-white text-xs font-bold">D</span>
                        </div>
                        Dhanashree
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {([
                        { key: "overview" as TabKey, label: "Overview", icon: LayoutDashboard },
                        { key: "bookings" as TabKey, label: "Bookings", icon: CalendarDays, badge: pendingBookings.length },
                        { key: "services" as TabKey, label: "Services", icon: Scissors },
                        { key: "gallery" as TabKey, label: "Gallery", icon: Image },
                        { key: "reviews" as TabKey, label: "Reviews", icon: MessageSquare, badge: pendingReviews.length, highlight: true },
                    ]).map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.key
                                ? "bg-primary/10 text-primary shadow-sm"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {tab.badge && tab.badge > 0 && (
                                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${tab.highlight ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"
                                    }`}>{tab.badge}</span>
                            )}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <Button variant="outline" onClick={handleLogout} className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50 text-sm">
                        <LogOut className="h-4 w-4" /> Logout
                    </Button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                    <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
                    <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1 text-red-600 border-red-200 hover:bg-red-50 text-xs">
                        <LogOut className="h-3.5 w-3.5" /> Logout
                    </Button>
                </div>
                <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1">
                    {([
                        { key: "overview" as TabKey, label: "Overview", icon: LayoutDashboard },
                        { key: "bookings" as TabKey, label: "Bookings", icon: CalendarDays },
                        { key: "services" as TabKey, label: "Services", icon: Scissors },
                        { key: "gallery" as TabKey, label: "Gallery", icon: Image },
                        { key: "reviews" as TabKey, label: "Reviews", icon: MessageSquare },
                    ]).map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeTab === tab.key
                                ? "bg-primary/10 text-primary"
                                : "text-gray-500 hover:bg-gray-100"
                                }`}
                        >
                            <tab.icon className="w-3.5 h-3.5" /> {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main className="lg:ml-64 p-4 md:p-6 lg:p-8 min-h-screen">

                {/* ==================== OVERVIEW TAB ==================== */}
                {activeTab === "overview" && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h2>
                            <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s happening with your parlour today.</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {[
                                { label: "Total Bookings", value: bookings.length, icon: CalendarDays, color: "bg-blue-500", lightColor: "bg-blue-50 text-blue-600" },
                                { label: "Pending Bookings", value: pendingBookings.length, icon: Clock, color: "bg-yellow-500", lightColor: "bg-yellow-50 text-yellow-600" },
                                { label: "Total Services", value: totalServiceItems, icon: Scissors, color: "bg-green-500", lightColor: "bg-green-50 text-green-600" },
                                { label: "Avg Rating", value: avgRating, icon: Star, color: "bg-purple-500", lightColor: "bg-purple-50 text-purple-600" },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-10 h-10 rounded-lg ${stat.lightColor} flex items-center justify-center`}>
                                            <stat.icon className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Two-column layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Today's Appointments */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                        <CalendarDays className="w-4 h-4 text-primary" /> Today&apos;s Appointments
                                    </h3>
                                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">{todayBookings.length}</span>
                                </div>
                                <div className="p-3 max-h-80 overflow-y-auto">
                                    {todayBookings.length === 0 ? (
                                        <p className="text-center text-gray-400 text-sm py-8">No appointments for today</p>
                                    ) : todayBookings.map((b) => (
                                        <div key={b.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                {b.customerName.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-800 text-sm truncate">{b.customerName}</p>
                                                <p className="text-xs text-gray-500">{b.serviceItem?.name || "Service"} · {b.timeSlot}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                b.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>{b.status}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-gray-100">
                                    <Button variant="outline" size="sm" className="w-full text-xs gap-1" onClick={() => setActiveTab("bookings")}>
                                        <Eye className="w-3.5 h-3.5" /> View All Bookings
                                    </Button>
                                </div>
                            </div>

                            {/* Recent Reviews */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-primary" /> Recent Reviews
                                    </h3>
                                    {pendingReviews.length > 0 && (
                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">{pendingReviews.length} pending</span>
                                    )}
                                </div>
                                <div className="p-3 max-h-80 overflow-y-auto">
                                    {reviews.length === 0 ? (
                                        <p className="text-center text-gray-400 text-sm py-8">No reviews yet</p>
                                    ) : reviews.slice(0, 5).map((r) => (
                                        <div key={r.id} className={`p-3 rounded-lg mb-1 border ${r.status === "PENDING" ? "border-yellow-200 bg-yellow-50/50" : "border-transparent hover:bg-gray-50"} transition-colors`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-800 text-sm">{r.customerName}</span>
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-3 h-3 ${i < r.rating ? "fill-primary text-primary" : "text-gray-200"}`} />
                                                    ))}
                                                </div>
                                                {r.status === "PENDING" && (
                                                    <span className="text-xs bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded font-medium ml-auto">PENDING</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2">{r.comment}</p>
                                            {r.status === "PENDING" && (
                                                <div className="flex gap-1 mt-2">
                                                    <Button size="sm" className="h-6 text-xs bg-green-500 hover:bg-green-600 px-2" onClick={() => approveReview(r.id)}>Approve</Button>
                                                    <Button size="sm" className="h-6 text-xs bg-red-500 hover:bg-red-600 px-2" onClick={() => rejectReview(r.id)}>Reject</Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-gray-100">
                                    <Button variant="outline" size="sm" className="w-full text-xs gap-1" onClick={() => setActiveTab("reviews")}>
                                        <Eye className="w-3.5 h-3.5" /> View All Reviews
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" /> Quick Actions
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { label: "Add Service", icon: Plus, action: () => { setActiveTab("services"); setTimeout(openAddService, 100); }, color: "text-green-600 bg-green-50 hover:bg-green-100 border-green-200" },
                                    { label: "Add Gallery Photo", icon: Image, action: () => { setActiveTab("gallery"); setTimeout(openAddGallery, 100); }, color: "text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200" },
                                    { label: "View Bookings", icon: CalendarDays, action: () => setActiveTab("bookings"), color: "text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200" },
                                    { label: "Moderate Reviews", icon: MessageSquare, action: () => setActiveTab("reviews"), color: "text-orange-600 bg-orange-50 hover:bg-orange-100 border-orange-200" },
                                ].map((action) => (
                                    <button key={action.label} onClick={action.action}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${action.color}`}>
                                        <action.icon className="w-5 h-5" />
                                        <span className="text-xs font-medium">{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Business Summary Row */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Users className="w-4 h-4 text-primary" />
                                    <h4 className="font-medium text-gray-700 text-sm">Booking Status</h4>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { label: "Pending", count: pendingBookings.length, color: "bg-yellow-400" },
                                        { label: "Confirmed", count: confirmedBookings.length, color: "bg-green-400" },
                                        { label: "Completed", count: completedBookings.length, color: "bg-blue-400" },
                                    ].map((s) => (
                                        <div key={s.label} className="flex items-center gap-3">
                                            <div className={`w-2.5 h-2.5 rounded-full ${s.color}`}></div>
                                            <span className="text-sm text-gray-600 flex-1">{s.label}</span>
                                            <span className="text-sm font-semibold text-gray-800">{s.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Scissors className="w-4 h-4 text-primary" />
                                    <h4 className="font-medium text-gray-700 text-sm">Services by Category</h4>
                                </div>
                                <div className="space-y-2">
                                    {CATEGORIES.map((cat) => {
                                        const count = services.filter(s => s.category === cat).length;
                                        return (
                                            <div key={cat} className="flex items-center gap-3">
                                                <span className="text-sm text-gray-600 flex-1">{cat}</span>
                                                <span className="text-sm font-semibold text-gray-800">{count}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <Image className="w-4 h-4 text-primary" />
                                    <h4 className="font-medium text-gray-700 text-sm">Gallery by Category</h4>
                                </div>
                                <div className="space-y-2">
                                    {Array.from(new Set(gallery.map(g => g.category))).map((cat) => {
                                        const count = gallery.filter(g => g.category === cat).length;
                                        return (
                                            <div key={cat} className="flex items-center gap-3">
                                                <span className="text-sm text-gray-600 flex-1">{cat}</span>
                                                <span className="text-sm font-semibold text-gray-800">{count}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==================== BOOKINGS TAB ==================== */}
                {activeTab === "bookings" && (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Bookings</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage all customer appointments</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">{pendingBookings.length} pending</span>
                                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">{confirmedBookings.length} confirmed</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                                        <tr>
                                            <th className="p-4">Customer</th>
                                            <th className="p-4">Service</th>
                                            <th className="p-4">Date/Time</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {loadingBookings ? (
                                            <tr><td colSpan={5} className="p-8 text-center text-gray-400">Loading bookings...</td></tr>
                                        ) : bookings.length === 0 ? (
                                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">No bookings found.</td></tr>
                                        ) : bookings.map((b) => (
                                            <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shrink-0">{b.customerName.charAt(0)}</div>
                                                        <div>
                                                            <div className="font-medium text-gray-900 text-sm">{b.customerName}</div>
                                                            <div className="text-xs text-gray-500">{b.customerPhone}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-medium text-sm">{b.serviceItem?.name || "Unknown"}</div>
                                                    <div className="text-xs text-gray-500">{b.serviceItem?.service?.name || ""}</div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-sm">{new Date(b.date).toLocaleDateString()}</div>
                                                    <div className="text-xs text-gray-500">{b.timeSlot}</div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${b.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                                        b.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                            b.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-red-100 text-red-800'
                                                        }`}>{b.status}</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        {b.status === 'PENDING' && (
                                                            <>
                                                                <Button size="icon" className="h-7 w-7 bg-green-500 hover:bg-green-600" onClick={() => updateStatus(b.id, 'CONFIRMED')}><Check className="h-3.5 w-3.5" /></Button>
                                                                <Button size="icon" className="h-7 w-7 bg-red-500 hover:bg-red-600" onClick={() => updateStatus(b.id, 'REJECTED')}><X className="h-3.5 w-3.5" /></Button>
                                                            </>
                                                        )}
                                                        {b.status === 'CONFIRMED' && (
                                                            <Button size="icon" className="h-7 w-7 bg-blue-500 hover:bg-blue-600" onClick={() => updateStatus(b.id, 'COMPLETED')}><Check className="h-3.5 w-3.5" /></Button>
                                                        )}
                                                        <Button size="icon" variant="destructive" className="h-7 w-7" onClick={() => deleteBooking(b.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==================== SERVICES TAB ==================== */}
                {activeTab === "services" && (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Services</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage service sessions and pricing</p>
                            </div>
                            <Button onClick={openAddService} className="gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                                <Plus className="h-4 w-4" /> Add Session
                            </Button>
                        </div>

                        {loadingServices ? (
                            <div className="text-center py-12 text-gray-500">Loading services...</div>
                        ) : services.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">No services yet.</div>
                        ) : (
                            <div className="space-y-3">
                                {services.map((service) => (
                                    <div key={service.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                                        <div className="flex items-center justify-between p-4 bg-gray-50/50">
                                            <button
                                                onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                                                className="flex items-center gap-3 flex-1 text-left"
                                            >
                                                {expandedService === service.id
                                                    ? <ChevronDown className="w-4 h-4 text-gray-500" />
                                                    : <ChevronRight className="w-4 h-4 text-gray-500" />}
                                                <div>
                                                    <span className="font-semibold text-gray-800">{service.name}</span>
                                                    <span className="ml-3 text-xs uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{service.category}</span>
                                                    <span className="ml-2 text-xs text-gray-400">{service.items.length} item{service.items.length !== 1 ? "s" : ""}</span>
                                                </div>
                                            </button>
                                            <div className="flex items-center gap-1">
                                                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => openEditService(service)}><Pencil className="h-3.5 w-3.5" /></Button>
                                                <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => deleteService(service.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 text-sm text-gray-500 border-t border-gray-100">{service.description}</div>
                                        {expandedService === service.id && (
                                            <div className="border-t border-gray-200">
                                                {service.items.length === 0 ? (
                                                    <div className="p-4 text-center text-sm text-gray-400 italic">No items added yet.</div>
                                                ) : (
                                                    <table className="w-full text-left">
                                                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                                            <tr>
                                                                <th className="px-4 py-2">Item Name</th>
                                                                <th className="px-4 py-2">Price (₹)</th>
                                                                <th className="px-4 py-2">Duration</th>
                                                                <th className="px-4 py-2 text-center">Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-100">
                                                            {service.items.map((item) => (
                                                                <tr key={item.id} className="hover:bg-gray-50">
                                                                    <td className="px-4 py-3 font-medium text-gray-800 text-sm">{item.name}</td>
                                                                    <td className="px-4 py-3 text-primary font-semibold text-sm">₹{item.price}</td>
                                                                    <td className="px-4 py-3 text-gray-500 text-sm">{item.duration || "—"}</td>
                                                                    <td className="px-4 py-3 text-center">
                                                                        <div className="flex items-center justify-center gap-1">
                                                                            <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => openEditItem(item)}><Pencil className="h-3 w-3" /></Button>
                                                                            <Button size="icon" variant="destructive" className="h-7 w-7" onClick={() => deleteItem(item.id)}><Trash2 className="h-3 w-3" /></Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                                <div className="p-3 border-t border-gray-100">
                                                    <Button variant="outline" size="sm" className="gap-1 text-green-600 border-green-200 hover:bg-green-50" onClick={() => openAddItem(service.id)}>
                                                        <Plus className="h-3.5 w-3.5" /> Add Item
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ==================== GALLERY TAB ==================== */}
                {activeTab === "gallery" && (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Gallery</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage gallery images displayed on the homepage</p>
                            </div>
                            <Button onClick={openAddGallery} className="gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                                <Plus className="h-4 w-4" /> Add Image
                            </Button>
                        </div>

                        {loadingGallery ? (
                            <div className="text-center py-12 text-gray-500">Loading gallery...</div>
                        ) : gallery.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">No gallery images yet.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {gallery.map((img) => (
                                    <div key={img.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 group">
                                        <div className="aspect-[4/3] overflow-hidden relative">
                                            <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button size="icon" variant="outline" className="h-8 w-8 bg-white/90 hover:bg-white" onClick={() => openEditGallery(img)}>
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => deleteGalleryImage(img.id)}>
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <p className="font-medium text-gray-800 text-sm">{img.alt}</p>
                                            <span className="text-xs uppercase tracking-wider text-primary font-medium">{img.category}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ==================== REVIEWS TAB ==================== */}
                {activeTab === "reviews" && (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Moderate customer reviews.
                                    {pendingReviews.length > 0 && <span className="ml-2 text-red-600 font-semibold">{pendingReviews.length} pending approval</span>}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">{approvedReviews.length} approved</span>
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">{pendingReviews.length} pending</span>
                            </div>
                        </div>

                        {loadingReviews ? (
                            <div className="text-center py-12 text-gray-500">Loading reviews...</div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">No reviews yet.</div>
                        ) : (
                            <div className="space-y-3">
                                {reviews.map((review) => (
                                    <div key={review.id} className={`bg-white rounded-xl shadow-sm p-5 border ${review.status === "PENDING" ? "border-yellow-200 bg-yellow-50/30" :
                                        review.status === "APPROVED" ? "border-green-100" : "border-red-100"
                                        }`}>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shrink-0">
                                                        {review.customerName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold text-gray-800">{review.customerName}</span>
                                                        {review.service && <span className="text-xs text-gray-500 ml-2">· {review.service}</span>}
                                                    </div>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ml-auto ${review.status === "APPROVED" ? "bg-green-100 text-green-800" :
                                                        review.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                                                            "bg-red-100 text-red-800"
                                                        }`}>{review.status}</span>
                                                </div>
                                                <div className="flex gap-0.5 mb-2 ml-12">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-gray-200"}`} />
                                                    ))}
                                                </div>
                                                <p className="text-gray-600 text-sm italic ml-12">&quot;{review.comment}&quot;</p>
                                                <p className="text-xs text-gray-400 mt-2 ml-12">{new Date(review.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex flex-col gap-1 shrink-0">
                                                {review.status === "PENDING" && (
                                                    <>
                                                        <Button size="icon" className="h-8 w-8 bg-green-500 hover:bg-green-600" onClick={() => approveReview(review.id)} title="Approve"><Check className="h-4 w-4" /></Button>
                                                        <Button size="icon" className="h-8 w-8 bg-red-500 hover:bg-red-600" onClick={() => rejectReview(review.id)} title="Reject"><X className="h-4 w-4" /></Button>
                                                    </>
                                                )}
                                                {review.status === "REJECTED" && (
                                                    <Button size="icon" className="h-8 w-8 bg-green-500 hover:bg-green-600" onClick={() => approveReview(review.id)} title="Approve"><Check className="h-4 w-4" /></Button>
                                                )}
                                                <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => deleteReview(review.id)} title="Delete"><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* ==================== SERVICE FORM MODAL ==================== */}
            {showServiceForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">{editingService ? "Edit Session" : "Add New Session"}</h2>
                            <form onSubmit={handleServiceSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Name *</label>
                                    <input type="text" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={serviceForm.name} onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })} placeholder="e.g. Haircuts, Facials, Waxing" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                    <select required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={serviceForm.category} onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}>
                                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                    <textarea required rows={3} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="Brief description..." />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={() => setShowServiceForm(false)}>Cancel</Button>
                                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 rounded-xl" disabled={submitting}>{submitting ? "Saving..." : (editingService ? "Update" : "Create")}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ==================== ITEM FORM MODAL ==================== */}
            {showItemForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">{editingItem ? "Edit Item" : "Add New Item"}</h2>
                            <form onSubmit={handleItemSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                                    <input type="text" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={itemForm.name} onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })} placeholder="e.g. Layer Cut, Gold Facial" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                                        <input type="number" required min="0" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={itemForm.price} onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })} placeholder="200" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                        <input type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={itemForm.duration} onChange={(e) => setItemForm({ ...itemForm, duration: e.target.value })} placeholder="30 min" />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={() => setShowItemForm(false)}>Cancel</Button>
                                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 rounded-xl" disabled={submitting}>{submitting ? "Saving..." : (editingItem ? "Update" : "Add")}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ==================== GALLERY FORM MODAL ==================== */}
            {showGalleryForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">{editingGallery ? "Edit Image" : "Add Gallery Image"}</h2>
                            <form onSubmit={handleGallerySubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                                    <input type="url" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={galleryForm.src} onChange={(e) => setGalleryForm({ ...galleryForm, src: e.target.value })} placeholder="https://example.com/image.jpg" />
                                    {galleryForm.src && (
                                        <div className="mt-2 aspect-video bg-gray-100 rounded-xl overflow-hidden">
                                            <img src={galleryForm.src} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title / Alt Text *</label>
                                    <input type="text" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={galleryForm.alt} onChange={(e) => setGalleryForm({ ...galleryForm, alt: e.target.value })} placeholder="e.g. Bridal Makeup, Hair Coloring" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                    <select className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={customCategory !== "" ? "__custom__" : galleryForm.category} onChange={(e) => { if (e.target.value === "__custom__") { setCustomCategory(" "); setGalleryForm({ ...galleryForm, category: "" }); } else { setCustomCategory(""); setGalleryForm({ ...galleryForm, category: e.target.value }); } }}>
                                        <option value="">Select a category…</option>
                                        {Array.from(new Set([...GALLERY_CATEGORIES, ...gallery.map(g => g.category)])).sort().map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                        <option value="__custom__">+ Add New Category</option>
                                    </select>
                                </div>
                                {customCategory !== "" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">New Category Name *</label>
                                        <input type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" value={customCategory.trim()} onChange={(e) => setCustomCategory(e.target.value || " ")} placeholder="e.g. Mehendi, Spa, Threading" autoFocus />
                                    </div>
                                )}
                                <div className="flex gap-3 pt-2">
                                    <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={() => setShowGalleryForm(false)}>Cancel</Button>
                                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 rounded-xl" disabled={submitting}>{submitting ? "Saving..." : (editingGallery ? "Update" : "Add Image")}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
