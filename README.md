# Whiteout Survival - Command Center

A modern web application for managing troops, materials, and upgrades in the Whiteout Survival game. Features a futuristic, cyberpunk-inspired interface reminiscent of the classic 2Advanced Studios Flash websites.

## Features

### Current Features
- **Modern Homepage**: Futuristic UI with animated elements
  - Cyberpunk-style banner with animated logo
  - Interactive navigation menu
  - Hero section with real-time stats
  - Animated hologram visual effects
  - Particle system background

- **Database Schema**: Comprehensive SQLite database structure
  - Troops tracking (Infantry, Lancer, Marksman)
  - Dynamic materials management
  - Upgrade requirements and dependencies
  - Historical logging for troops and materials
  - User settings and preferences

### Planned Features
- **Troops Logger**: Record and track troop counts
- **Materials Manager**: Monitor resource inventory
- **Upgrade Calculator**: Calculate materials needed for upgrades
- **Historical Analytics**: View trends and patterns

## Design Inspiration

This project draws inspiration from the legendary **2Advanced Studios** (founded 1999), known for creating the most influential Flash websites of the early 2000s. Key design elements include:

- Futuristic, cyberpunk aesthetic
- Sleek metallic textures with neon accents
- Fluid animations and transitions
- Interactive holographic elements
- Dynamic particle effects

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with CSS3 animations (no frameworks)
- **Database**: SQLite
- **Design Philosophy**: Modern interpretation of 2000s Flash design

## Project Structure

```
whiteout-survival/
├── index.html              # Main homepage
├── styles.css              # Futuristic styling and animations
├── script.js               # Interactive functionality
├── database/
│   ├── schema.sql          # Database schema definition
│   └── seed_data.sql       # Sample data and upgrade tables
└── README.md               # This file
```

## Database Schema

### Main Tables

1. **troops** - Track troop quantities and stats
2. **materials** - Manage dynamic resource inventory
3. **upgrade_requirements** - Define upgrade paths
4. **upgrade_materials** - Link upgrades to required materials
5. **troop_logs** - Historical troop activity
6. **material_logs** - Historical material transactions
7. **user_settings** - User preferences

### Sample Materials Included

- Basic Resources: Wood, Stone, Iron Ore, Steel
- Consumables: Food, Medicine
- Currency: Gold, Gems
- Special Items: Frost Crystals, Ancient Relics
- Training Materials: Combat guides and manuals

## Getting Started

### View the Homepage

Simply open `index.html` in a modern web browser to see the command center interface.

### Set Up the Database

```bash
# Create database and apply schema
sqlite3 whiteout_survival.db < database/schema.sql

# Load sample data
sqlite3 whiteout_survival.db < database/seed_data.sql
```

## Color Palette

- **Primary Cyan**: `#00f3ff` - Main accent color
- **Primary Blue**: `#0066ff` - Secondary accent
- **Accent Purple**: `#9d00ff` - Highlights
- **Neon Pink**: `#ff00ff` - Interactive states
- **Dark Background**: `#0a0e27` - Main background
- **Metallic**: `#1a1f3a` - UI elements

## Keyboard Shortcuts

- `Ctrl/Cmd + L` - Open Troops Logger
- `Ctrl/Cmd + D` - Open Database View

## Browser Compatibility

Tested on modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

- [ ] Complete troops logger interface
- [ ] Materials management dashboard
- [ ] Upgrade calculator tool
- [ ] Data export/import functionality
- [ ] Mobile responsive improvements
- [ ] Backend API integration
- [ ] Real-time data synchronization
- [ ] User authentication system

## Credits

**Design Inspiration**: 2Advanced Studios (1999-2010s)
- Pioneered futuristic web design aesthetics
- Created the most influential Flash websites of the era
- Defined the cyberpunk web design movement

## Sources

- [2Advanced Studios - Web Design Museum](https://www.webdesignmuseum.org/exhibitions/2advanced-studios)
- [The Death of 2Advanced (2017) - Malan Darras](https://www.malandarras.com/2advanced)
- [Blast from the Past: 2Advanced.com](https://webdesignerdepot.com/blast-from-the-past-2advanced-com/)

## License

This project is for personal use and game assistance purposes.

---

**Status**: SYSTEM ONLINE ⚡
**Version**: 1.0.0
**Last Updated**: December 2025
