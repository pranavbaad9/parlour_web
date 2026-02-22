-- COMPREHENSIVE SQL SEED DATA FOR PARLOUR WEB (SUPABASE)
-- Run this in the Supabase SQL Editor AFTER running the table creation queries.

-- 1. Services
INSERT INTO "Service" (id, name, category, description, "updatedAt") VALUES
('haircuts', 'Haircuts', 'Hair', 'All types of haircuts: Layer, Bob, U-cut, V-cut, and more.', NOW()),
('facials', 'Facials', 'Skin', 'Rejuvenating facials for glowing, healthy skin.', NOW()),
('cleanup', 'Clean Up', 'Skin', 'Quick deep cleansing for instant glow.', NOW()),
('threading', 'Threading', 'Skin', 'Precise eyebrow shaping and facial hair removal.', NOW()),
('waxing', 'Waxing', 'Body', 'Full body, arms, legs, and underarm waxing services.', NOW()),
('bleach', 'Bleach', 'Skin', 'Face and body bleaching for skin brightening.', NOW()),
('hairspa', 'Hair Spa', 'Hair', 'Deep conditioning and relaxation for healthy hair.', NOW()),
('haircolor', 'Hair Coloring', 'Hair', 'Global color, highlights, root touch-up, and fashion shades.', NOW()),
('smoothing', 'Smoothing & Rebonding', 'Hair', 'Permanent hair straightening and smoothing treatments.', NOW()),
('bridal', 'Bridal Makeup', 'Bridal', 'Complete bridal makeover including hair, makeup, and draping.', NOW()),
('partymakeup', 'Party Makeup', 'Makeup', 'Glamorous makeup for parties and special occasions.', NOW());

-- 2. Service Items
INSERT INTO "ServiceItem" (id, name, price, duration, "serviceId", "updatedAt") VALUES
(gen_random_uuid()::text, 'Layer Cut', 200, '30 min', 'haircuts', NOW()),
(gen_random_uuid()::text, 'Bob Cut', 250, '30 min', 'haircuts', NOW()),
(gen_random_uuid()::text, 'Step Cut', 250, '30 min', 'haircuts', NOW()),
(gen_random_uuid()::text, 'Trimming', 100, '15 min', 'haircuts', NOW()),
(gen_random_uuid()::text, 'Fruit Facial', 500, '60 min', 'facials', NOW()),
(gen_random_uuid()::text, 'Gold Facial', 800, '60 min', 'facials', NOW()),
(gen_random_uuid()::text, 'Diamond Facial', 1200, '75 min', 'facials', NOW()),
(gen_random_uuid()::text, 'Pearl Facial', 1000, '60 min', 'facials', NOW()),
(gen_random_uuid()::text, 'Basic Clean Up', 250, '30 min', 'cleanup', NOW()),
(gen_random_uuid()::text, 'Deep Cleansing', 400, '40 min', 'cleanup', NOW()),
(gen_random_uuid()::text, 'Eyebrow Threading', 30, '10 min', 'threading', NOW()),
(gen_random_uuid()::text, 'Full Arms Wax', 150, '20 min', 'waxing', NOW()),
(gen_random_uuid()::text, 'Full Legs Wax', 200, '25 min', 'waxing', NOW()),
(gen_random_uuid()::text, 'Keratin Hair Spa', 1000, '60 min', 'hairspa', NOW()),
(gen_random_uuid()::text, 'Global Hair Color', 1000, '90 min', 'haircolor', NOW()),
(gen_random_uuid()::text, 'Bridal Package (HD)', 5000, '3 hours', 'bridal', NOW());

-- 3. Reviews
INSERT INTO "Review" (id, "customerName", rating, comment, service, status, "createdAt") VALUES
(gen_random_uuid()::text, 'Priya Sharma', 5, 'Amazing bridal makeup! Everyone loved my look.', 'Bridal Makeup', 'APPROVED', NOW()),
(gen_random_uuid()::text, 'Neha Patil', 5, 'Best hair spa experience! My hair feels so soft.', 'Hair Spa', 'APPROVED', NOW()),
(gen_random_uuid()::text, 'Anjali Deshmukh', 4, 'Great facial treatment. My skin is glowing!', 'Gold Facial', 'APPROVED', NOW());

-- 4. Gallery Images
INSERT INTO "GalleryImage" (id, src, alt, category, "updatedAt") VALUES
(gen_random_uuid()::text, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600', 'Bridal Makeup Transformation', 'Bridal', NOW()),
(gen_random_uuid()::text, 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', 'Hair Coloring & Highlights', 'Hair', NOW()),
(gen_random_uuid()::text, 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600', 'Glamour Makeup Look', 'Makeup', NOW());
