-- Whiteout Survival Database Schema

-- Troops Table
CREATE TABLE IF NOT EXISTS troops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    troop_type VARCHAR(50) NOT NULL CHECK(troop_type IN ('Infantry', 'Lancer', 'Marksman')),
    quantity INTEGER NOT NULL DEFAULT 0,
    tier INTEGER NOT NULL DEFAULT 1,
    power_level INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Materials Table (Dynamic materials system)
CREATE TABLE IF NOT EXISTS materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    material_name VARCHAR(100) NOT NULL UNIQUE,
    material_type VARCHAR(50),
    quantity INTEGER NOT NULL DEFAULT 0,
    rarity VARCHAR(20) CHECK(rarity IN ('Common', 'Uncommon', 'Rare', 'Epic', 'Legendary')),
    description TEXT,
    icon_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Upgrade Requirements Table
CREATE TABLE IF NOT EXISTS upgrade_requirements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    upgrade_type VARCHAR(50) NOT NULL,
    from_level INTEGER NOT NULL,
    to_level INTEGER NOT NULL,
    building_or_unit VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Upgrade Materials Junction Table
CREATE TABLE IF NOT EXISTS upgrade_materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    upgrade_requirement_id INTEGER NOT NULL,
    material_id INTEGER NOT NULL,
    quantity_required INTEGER NOT NULL,
    FOREIGN KEY (upgrade_requirement_id) REFERENCES upgrade_requirements(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE
);

-- Troop Logs (History tracking)
CREATE TABLE IF NOT EXISTS troop_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    troop_type VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL CHECK(action IN ('Trained', 'Lost', 'Healed', 'Upgraded')),
    quantity INTEGER NOT NULL,
    notes TEXT,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Material Logs (History tracking)
CREATE TABLE IF NOT EXISTS material_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    material_id INTEGER NOT NULL,
    action VARCHAR(50) NOT NULL CHECK(action IN ('Gained', 'Spent', 'Traded')),
    quantity INTEGER NOT NULL,
    notes TEXT,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE
);

-- User Settings/Preferences
CREATE TABLE IF NOT EXISTS user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_troops_type ON troops(troop_type);
CREATE INDEX IF NOT EXISTS idx_materials_name ON materials(material_name);
CREATE INDEX IF NOT EXISTS idx_materials_type ON materials(material_type);
CREATE INDEX IF NOT EXISTS idx_upgrade_req_type ON upgrade_requirements(upgrade_type);
CREATE INDEX IF NOT EXISTS idx_troop_logs_type ON troop_logs(troop_type);
CREATE INDEX IF NOT EXISTS idx_troop_logs_date ON troop_logs(logged_at);
CREATE INDEX IF NOT EXISTS idx_material_logs_date ON material_logs(logged_at);

-- Triggers to update timestamps
CREATE TRIGGER IF NOT EXISTS update_troops_timestamp
AFTER UPDATE ON troops
BEGIN
    UPDATE troops SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_materials_timestamp
AFTER UPDATE ON materials
BEGIN
    UPDATE materials SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_settings_timestamp
AFTER UPDATE ON user_settings
BEGIN
    UPDATE user_settings SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
