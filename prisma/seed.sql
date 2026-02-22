-- SQL Seed Data for Parlour Web (Supabase)

-- Insert Services
INSERT INTO "Service" (id, name, category, description, "updatedAt") VALUES
('haircuts-1', 'Haircuts', 'Hair', 'All types of haircuts: Layer, Bob, U-cut, V-cut, and more.', NOW()),
('facials-1', 'Facials', 'Skin', 'Rejuvenating facials for glowing, healthy skin.', NOW()),
('cleanup-1', 'Clean Up', 'Skin', 'Quick deep cleansing for instant glow.', NOW()),
('threading-1', 'Threading', 'Skin', 'Precise eyebrow shaping and facial hair removal.', NOW()),
('waxing-1', 'Waxing', 'Body', 'Full body, arms, legs, and underarm waxing services.', NOW());

-- Insert Service Items
INSERT INTO "ServiceItem" (id, name, price, duration, "serviceId", "updatedAt") VALUES
('item-1', 'Layer Cut', 200, '30 min', 'haircuts-1', NOW()),
('item-2', 'Bob Cut', 250, '30 min', 'haircuts-1', NOW()),
('item-3', 'Fruit Facial', 500, '60 min', 'facials-1', NOW()),
('item-4', 'Gold Facial', 800, '60 min', 'facials-1', NOW()),
('item-5', 'Basic Clean Up', 250, '30 min', 'cleanup-1', NOW()),
('item-6', 'Eyebrow Threading', 30, '10 min', 'threading-1', NOW()),
('item-7', 'Full Arms Wax', 150, '20 min', 'waxing-1', NOW());

-- Insert Sample Reviews
INSERT INTO "Review" (id, "customerName", rating, comment, service, status) VALUES
('rev-1', 'Priya Sharma', 5, 'Amazing bridal makeup!', 'Bridal Makeup', 'APPROVED'),
('rev-2', 'Neha Patil', 5, 'Best hair spa experience!', 'Hair Spa', 'APPROVED');

-- Insert Sample Gallery Images
INSERT INTO "GalleryImage" (id, src, alt, category, "updatedAt") VALUES
('gal-1', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600', 'Bridal Makeup Transformation', 'Bridal', NOW()),
('gal-2', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', 'Hair Coloring & Highlights', 'Hair', NOW());
