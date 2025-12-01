-- Seed Data for Whiteout Survival Database

-- Insert sample materials
INSERT INTO materials (material_name, material_type, quantity, rarity, description) VALUES
    ('Wood', 'Resource', 0, 'Common', 'Basic building material gathered from forests'),
    ('Stone', 'Resource', 0, 'Common', 'Essential construction resource mined from quarries'),
    ('Iron Ore', 'Resource', 0, 'Uncommon', 'Raw metal used for weapons and armor'),
    ('Steel', 'Resource', 0, 'Rare', 'Refined metal for advanced equipment'),
    ('Food', 'Resource', 0, 'Common', 'Essential supplies for troops and population'),
    ('Gold', 'Currency', 0, 'Uncommon', 'Primary currency for trading and upgrades'),
    ('Gems', 'Currency', 0, 'Rare', 'Premium currency for special items'),
    ('Coal', 'Fuel', 0, 'Common', 'Fuel source for heating and production'),
    ('Oil', 'Fuel', 0, 'Uncommon', 'Advanced fuel for machinery'),
    ('Leather', 'Material', 0, 'Uncommon', 'Material for armor and equipment'),
    ('Cloth', 'Material', 0, 'Common', 'Textile material for various uses'),
    ('Rope', 'Material', 0, 'Common', 'Utility material for construction'),
    ('Gunpowder', 'Material', 0, 'Rare', 'Explosive material for advanced weapons'),
    ('Medicine', 'Consumable', 0, 'Uncommon', 'Healing supplies for wounded troops'),
    ('Tools', 'Equipment', 0, 'Uncommon', 'Work tools for resource gathering'),
    ('Infantry Training Manual', 'Upgrade', 0, 'Rare', 'Specialized training material for infantry'),
    ('Lancer Combat Guide', 'Upgrade', 0, 'Rare', 'Advanced tactics for lancer units'),
    ('Marksman Precision Kit', 'Upgrade', 0, 'Rare', 'Equipment for marksman accuracy'),
    ('Blueprint: Barracks', 'Blueprint', 0, 'Epic', 'Construction plans for military barracks'),
    ('Blueprint: Armory', 'Blueprint', 0, 'Epic', 'Construction plans for weapon storage'),
    ('Ancient Relic', 'Special', 0, 'Legendary', 'Rare artifact with mysterious powers'),
    ('Frost Crystal', 'Special', 0, 'Epic', 'Magical crystal found in frozen regions');

-- Insert sample upgrade requirements for Infantry
INSERT INTO upgrade_requirements (upgrade_type, from_level, to_level, building_or_unit) VALUES
    ('Troop_Upgrade', 1, 2, 'Infantry'),
    ('Troop_Upgrade', 2, 3, 'Infantry'),
    ('Troop_Upgrade', 3, 4, 'Infantry'),
    ('Troop_Upgrade', 4, 5, 'Infantry');

-- Insert materials needed for Infantry upgrades
-- Level 1 to 2
INSERT INTO upgrade_materials (upgrade_requirement_id, material_id, quantity_required)
SELECT 1, id, quantity FROM (
    SELECT id, 100 as quantity FROM materials WHERE material_name = 'Wood'
    UNION SELECT id, 50 FROM materials WHERE material_name = 'Food'
    UNION SELECT id, 25 FROM materials WHERE material_name = 'Iron Ore'
);

-- Level 2 to 3
INSERT INTO upgrade_materials (upgrade_requirement_id, material_id, quantity_required)
SELECT 2, id, quantity FROM (
    SELECT id, 250 as quantity FROM materials WHERE material_name = 'Wood'
    UNION SELECT id, 150 FROM materials WHERE material_name = 'Food'
    UNION SELECT id, 75 FROM materials WHERE material_name = 'Iron Ore'
    UNION SELECT id, 50 FROM materials WHERE material_name = 'Leather'
    UNION SELECT id, 1000 FROM materials WHERE material_name = 'Gold'
);

-- Level 3 to 4
INSERT INTO upgrade_materials (upgrade_requirement_id, material_id, quantity_required)
SELECT 3, id, quantity FROM (
    SELECT id, 500 as quantity FROM materials WHERE material_name = 'Wood'
    UNION SELECT id, 300 FROM materials WHERE material_name = 'Food'
    UNION SELECT id, 150 FROM materials WHERE material_name = 'Steel'
    UNION SELECT id, 100 FROM materials WHERE material_name = 'Leather'
    UNION SELECT id, 2500 FROM materials WHERE material_name = 'Gold'
    UNION SELECT id, 1 FROM materials WHERE material_name = 'Infantry Training Manual'
);

-- Level 4 to 5
INSERT INTO upgrade_materials (upgrade_requirement_id, material_id, quantity_required)
SELECT 4, id, quantity FROM (
    SELECT id, 1000 as quantity FROM materials WHERE material_name = 'Wood'
    UNION SELECT id, 600 FROM materials WHERE material_name = 'Food'
    UNION SELECT id, 300 FROM materials WHERE material_name = 'Steel'
    UNION SELECT id, 200 FROM materials WHERE material_name = 'Leather'
    UNION SELECT id, 50 FROM materials WHERE material_name = 'Gunpowder'
    UNION SELECT id, 5000 FROM materials WHERE material_name = 'Gold'
    UNION SELECT id, 2 FROM materials WHERE material_name = 'Infantry Training Manual'
);

-- Insert upgrade requirements for Lancer
INSERT INTO upgrade_requirements (upgrade_type, from_level, to_level, building_or_unit) VALUES
    ('Troop_Upgrade', 1, 2, 'Lancer'),
    ('Troop_Upgrade', 2, 3, 'Lancer'),
    ('Troop_Upgrade', 3, 4, 'Lancer');

-- Insert materials needed for Lancer upgrades
-- Level 1 to 2
INSERT INTO upgrade_materials (upgrade_requirement_id, material_id, quantity_required)
SELECT 5, id, quantity FROM (
    SELECT id, 150 as quantity FROM materials WHERE material_name = 'Wood'
    UNION SELECT id, 75 FROM materials WHERE material_name = 'Food'
    UNION SELECT id, 50 FROM materials WHERE material_name = 'Iron Ore'
    UNION SELECT id, 25 FROM materials WHERE material_name = 'Leather'
);

-- Level 2 to 3
INSERT INTO upgrade_materials (upgrade_requirement_id, material_id, quantity_required)
SELECT 6, id, quantity FROM (
    SELECT id, 300 as quantity FROM materials WHERE material_name = 'Wood'
    UNION SELECT id, 200 FROM materials WHERE material_name = 'Food'
    UNION SELECT id, 100 FROM materials WHERE material_name = 'Steel'
    UNION SELECT id, 75 FROM materials WHERE material_name = 'Leather'
    UNION SELECT id, 1500 FROM materials WHERE material_name = 'Gold'
);

-- Level 3 to 4
INSERT INTO upgrade_materials (upgrade_requirement_id, material_id, quantity_required)
SELECT 7, id, quantity FROM (
    SELECT id, 750 as quantity FROM materials WHERE material_name = 'Wood'
    UNION SELECT id, 400 FROM materials WHERE material_name = 'Food'
    UNION SELECT id, 200 FROM materials WHERE material_name = 'Steel'
    UNION SELECT id, 150 FROM materials WHERE material_name = 'Leather'
    UNION SELECT id, 3500 FROM materials WHERE material_name = 'Gold'
    UNION SELECT id, 1 FROM materials WHERE material_name = 'Lancer Combat Guide'
);

-- Insert upgrade requirements for Marksman
INSERT INTO upgrade_requirements (upgrade_type, from_level, to_level, building_or_unit) VALUES
    ('Troop_Upgrade', 1, 2, 'Marksman'),
    ('Troop_Upgrade', 2, 3, 'Marksman'),
    ('Troop_Upgrade', 3, 4, 'Marksman');

-- Insert materials needed for Marksman upgrades
-- Level 1 to 2
INSERT INTO upgrade_materials (upgrade_requirement_id, material_id, quantity_required)
SELECT 8, id, quantity FROM (
    SELECT id, 125 as quantity FROM materials WHERE material_name = 'Wood'
    UNION SELECT id, 60 FROM materials WHERE material_name = 'Food'
    UNION SELECT id, 40 FROM materials WHERE material_name = 'Iron Ore'
    UNION SELECT id, 30 FROM materials WHERE material_name = 'Cloth'
);

-- Level 2 to 3
INSERT INTO upgrade_materials (upgrade_requirement_id, material_id, quantity_required)
SELECT 9, id, quantity FROM (
    SELECT id, 275 as quantity FROM materials WHERE material_name = 'Wood'
    UNION SELECT id, 175 FROM materials WHERE material_name = 'Food'
    UNION SELECT id, 90 FROM materials WHERE material_name = 'Iron Ore'
    UNION SELECT id, 60 FROM materials WHERE material_name = 'Cloth'
    UNION SELECT id, 1200 FROM materials WHERE material_name = 'Gold'
);

-- Level 3 to 4
INSERT INTO upgrade_materials (upgrade_requirement_id, material_id, quantity_required)
SELECT 10, id, quantity FROM (
    SELECT id, 600 as quantity FROM materials WHERE material_name = 'Wood'
    UNION SELECT id, 350 FROM materials WHERE material_name = 'Food'
    UNION SELECT id, 175 FROM materials WHERE material_name = 'Steel'
    UNION SELECT id, 125 FROM materials WHERE material_name = 'Cloth'
    UNION SELECT id, 3000 FROM materials WHERE material_name = 'Gold'
    UNION SELECT id, 1 FROM materials WHERE material_name = 'Marksman Precision Kit'
);

-- Insert default user settings
INSERT INTO user_settings (setting_key, setting_value) VALUES
    ('theme', 'dark'),
    ('notifications_enabled', 'true'),
    ('auto_save', 'true'),
    ('default_view', 'dashboard');
