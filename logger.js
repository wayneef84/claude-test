// Troops Logger JavaScript

// In-memory storage (simulating database until backend is implemented)
let troopsData = JSON.parse(localStorage.getItem('troopsData')) || [];
let activityLog = JSON.parse(localStorage.getItem('activityLog')) || [];
let nextId = parseInt(localStorage.getItem('nextTroopId')) || 1;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Troops Logger - Initializing...');

    loadTroops();
    updateStatsSummary();
    loadActivityLog();

    // Form submission
    document.getElementById('troop-form').addEventListener('submit', handleFormSubmit);

    // Clear form button
    document.getElementById('clear-form').addEventListener('click', clearForm);

    console.log('Troops Logger - Ready');
});

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const troopType = document.getElementById('troop-type').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const tier = parseInt(document.getElementById('tier').value);
    const powerLevel = parseInt(document.getElementById('power-level').value) || 0;
    const editId = document.getElementById('edit-id').value;

    if (!troopType || !quantity || !tier) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (editId) {
        // Update existing entry
        const index = troopsData.findIndex(t => t.id == editId);
        if (index !== -1) {
            const oldData = troopsData[index];
            troopsData[index] = {
                ...troopsData[index],
                troopType,
                quantity,
                tier,
                powerLevel,
                updatedAt: new Date().toISOString()
            };

            addActivityEntry(
                `Updated ${troopType} (Tier ${tier}) - Changed quantity from ${oldData.quantity} to ${quantity}`,
                'update'
            );

            showNotification('Troop entry updated successfully!', 'success');
        }
    } else {
        // Add new entry
        const newTroop = {
            id: nextId++,
            troopType,
            quantity,
            tier,
            powerLevel,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        troopsData.push(newTroop);
        localStorage.setItem('nextTroopId', nextId);

        addActivityEntry(
            `Added ${quantity}x ${troopType} (Tier ${tier})`,
            'add'
        );

        showNotification('Troop entry added successfully!', 'success');
    }

    saveData();
    loadTroops();
    updateStatsSummary();
    clearForm();
}

// Clear form
function clearForm() {
    document.getElementById('troop-form').reset();
    document.getElementById('edit-id').value = '';
    document.querySelector('.section-title .section-icon').textContent = '➕';
    document.querySelector('.section-title').childNodes[2].textContent = ' ADD TROOP ENTRY';
    document.querySelector('.form-button.primary .button-text').textContent = 'SAVE ENTRY';
}

// Load and display troops
function loadTroops() {
    const troopsList = document.getElementById('troops-list');
    const filterType = document.getElementById('filter-type')?.value || 'all';
    const filterTier = document.getElementById('filter-tier')?.value || 'all';

    // Filter troops
    let filteredTroops = troopsData;

    if (filterType !== 'all') {
        filteredTroops = filteredTroops.filter(t => t.troopType === filterType);
    }

    if (filterTier !== 'all') {
        filteredTroops = filteredTroops.filter(t => t.tier == filterTier);
    }

    if (filteredTroops.length === 0) {
        troopsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📦</div>
                <p>No troops found</p>
                <p class="empty-hint">Try adjusting your filters or add a new entry</p>
            </div>
        `;
        return;
    }

    troopsList.innerHTML = filteredTroops.map(troop => {
        const icon = getTroopIcon(troop.troopType);
        const date = new Date(troop.createdAt).toLocaleDateString();

        return `
            <div class="troop-card" data-id="${troop.id}">
                <div class="troop-info">
                    <div class="troop-icon">${icon}</div>
                    <div class="troop-details">
                        <div class="troop-type">${troop.troopType}</div>
                        <div class="troop-meta">
                            <span>📊 Qty: ${troop.quantity.toLocaleString()}</span>
                            <span>⭐ Tier: ${troop.tier}</span>
                            ${troop.powerLevel ? `<span>⚡ Power: ${troop.powerLevel.toLocaleString()}</span>` : ''}
                            <span>📅 ${date}</span>
                        </div>
                    </div>
                </div>
                <div class="troop-actions">
                    <button class="action-btn edit" onclick="editTroop(${troop.id})">
                        ✏️ Edit
                    </button>
                    <button class="action-btn delete" onclick="deleteTroop(${troop.id})">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Get troop icon
function getTroopIcon(type) {
    const icons = {
        'Infantry': '⚔',
        'Lancer': '🗡',
        'Marksman': '🏹'
    };
    return icons[type] || '🎯';
}

// Edit troop
function editTroop(id) {
    const troop = troopsData.find(t => t.id === id);
    if (!troop) return;

    document.getElementById('troop-type').value = troop.troopType;
    document.getElementById('quantity').value = troop.quantity;
    document.getElementById('tier').value = troop.tier;
    document.getElementById('power-level').value = troop.powerLevel || '';
    document.getElementById('edit-id').value = troop.id;

    // Update form title
    document.querySelector('.section-title .section-icon').textContent = '✏️';
    document.querySelector('.section-title').childNodes[2].textContent = ' EDIT TROOP ENTRY';
    document.querySelector('.form-button.primary .button-text').textContent = 'UPDATE ENTRY';

    // Scroll to form
    document.querySelector('.logger-form-section').scrollIntoView({ behavior: 'smooth' });

    showNotification('Editing troop entry...', 'info');
}

// Delete troop
function deleteTroop(id) {
    const troop = troopsData.find(t => t.id === id);
    if (!troop) return;

    if (confirm(`Are you sure you want to delete ${troop.quantity}x ${troop.troopType} (Tier ${troop.tier})?`)) {
        troopsData = troopsData.filter(t => t.id !== id);

        addActivityEntry(
            `Deleted ${troop.quantity}x ${troop.troopType} (Tier ${troop.tier})`,
            'delete'
        );

        saveData();
        loadTroops();
        updateStatsSummary();

        showNotification('Troop entry deleted', 'success');
    }
}

// Filter troops
function filterTroops() {
    loadTroops();
}

// Update stats summary
function updateStatsSummary() {
    const infantry = troopsData
        .filter(t => t.troopType === 'Infantry')
        .reduce((sum, t) => sum + t.quantity, 0);

    const lancer = troopsData
        .filter(t => t.troopType === 'Lancer')
        .reduce((sum, t) => sum + t.quantity, 0);

    const marksman = troopsData
        .filter(t => t.troopType === 'Marksman')
        .reduce((sum, t) => sum + t.quantity, 0);

    const totalPower = troopsData
        .reduce((sum, t) => sum + (t.powerLevel || 0), 0);

    // Animate values
    animateValue('total-infantry', 0, infantry, 1000);
    animateValue('total-lancer', 0, lancer, 1000);
    animateValue('total-marksman', 0, marksman, 1000);
    animateValue('total-power', 0, totalPower, 1000);
}

// Animate number counting
function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Activity log functions
function addActivityEntry(message, type = 'info') {
    const entry = {
        id: Date.now(),
        message,
        type,
        timestamp: new Date().toISOString()
    };

    activityLog.unshift(entry);

    // Keep only last 50 entries
    if (activityLog.length > 50) {
        activityLog = activityLog.slice(0, 50);
    }

    localStorage.setItem('activityLog', JSON.stringify(activityLog));
    loadActivityLog();
}

function loadActivityLog() {
    const logContainer = document.getElementById('activity-log');
    if (!logContainer) return;

    if (activityLog.length === 0) {
        logContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📜</div>
                <p>No activity yet</p>
            </div>
        `;
        return;
    }

    logContainer.innerHTML = activityLog.map(entry => {
        const time = new Date(entry.timestamp).toLocaleTimeString();
        const date = new Date(entry.timestamp).toLocaleDateString();

        return `
            <div class="activity-entry">
                <span class="activity-message">${entry.message}</span>
                <span class="activity-time">${date} ${time}</span>
            </div>
        `;
    }).join('');
}

function clearActivityLog() {
    if (confirm('Are you sure you want to clear the activity log?')) {
        activityLog = [];
        localStorage.setItem('activityLog', JSON.stringify(activityLog));
        loadActivityLog();
        showNotification('Activity log cleared', 'success');
    }
}

// Quick actions
function logTroopAction(action) {
    const troopType = document.getElementById('troop-type').value;
    const quantity = document.getElementById('quantity').value;

    if (!troopType || !quantity) {
        showNotification('Please select troop type and quantity first', 'error');
        return;
    }

    addActivityEntry(
        `${action}: ${quantity}x ${troopType}`,
        action.toLowerCase()
    );

    showNotification(`Logged action: ${action}`, 'success');
}

function exportData() {
    const dataStr = JSON.stringify(troopsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `whiteout-troops-${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);

    addActivityEntry('Exported troops data', 'export');
    showNotification('Data exported successfully!', 'success');
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('troopsData', JSON.stringify(troopsData));
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? 'rgba(0, 243, 255, 0.9)' :
                    type === 'error' ? 'rgba(255, 68, 68, 0.9)' :
                    'rgba(157, 0, 255, 0.9)',
        color: '#fff',
        borderRadius: '5px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        fontWeight: '600',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '400px'
    });

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Load sample data (for testing)
function loadSampleData() {
    if (troopsData.length === 0) {
        troopsData = [
            {
                id: nextId++,
                troopType: 'Infantry',
                quantity: 5000,
                tier: 3,
                powerLevel: 15000,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: nextId++,
                troopType: 'Lancer',
                quantity: 3000,
                tier: 2,
                powerLevel: 12000,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: nextId++,
                troopType: 'Marksman',
                quantity: 4000,
                tier: 4,
                powerLevel: 20000,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];

        localStorage.setItem('nextTroopId', nextId);
        saveData();
        loadTroops();
        updateStatsSummary();

        showNotification('Sample data loaded!', 'success');
    }
}

// Expose loadSampleData for console use
window.loadSampleData = loadSampleData;

console.log('Troops Logger Module Loaded');
console.log('Tip: Type loadSampleData() in console to add sample troops');
