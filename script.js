// Initialize the map
const map = L.map('map').setView([27.5059, 79.4001], 16);

// Add satellite tile layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

// Add farm marker
const farmMarker = L.circle([27.5059, 79.4001], {
    color: 'red',
    fillColor: '#ff0000',
    fillOpacity: 0.3,
    radius: 100
}).addTo(map);

farmMarker.bindPopup('<b>Your Farm</b><br>Lat: 27.5059°<br>Lng: 79.4001°<br>NDVI: 0.74');

// Show loading screen
document.getElementById('loading').style.display = 'block';
document.getElementById('dashboard').style.display = 'none';

// Simulate loading and show dashboard after 3 seconds
setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('dashboard').style.display = 'grid';
    
    animateValue('ndvi-value', 0, 0.74, 2000);
    updateCropHealth(0.74);
}, 3000);

// Function to animate NDVI value
function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (range * progress);
        element.textContent = current.toFixed(3);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Function to update crop health based on NDVI value
function updateCropHealth(ndvi) {
    const healthElement = document.getElementById('crop-health');
    const statusElement = document.getElementById('ndvi-status');
    let health, status, color;
    
    if (ndvi >= 0.7) {
        health = 'EXCELLENT';
        status = 'Excellent Crop Health';
        color = '#27ae60';
    } else if (ndvi >= 0.5) {
        health = 'GOOD';
        status = 'Good Crop Health';
        color = '#2ecc71';
    } else if (ndvi >= 0.3) {
        health = 'MODERATE';
        status = 'Moderate Crop Health';
        color = '#f39c12';
    } else if (ndvi >= 0.1) {
        health = 'POOR';
        status = 'Poor Crop Health';
        color = '#e67e22';
    } else {
        health = 'CRITICAL';
        status = 'Critical Crop Health';
        color = '#e74c3c';
    }
    
    healthElement.textContent = health;
    healthElement.style.color = color;
    statusElement.textContent = status;
}

// Add NDVI layer after 4 seconds
setTimeout(() => {
    const ndviLayer = L.rectangle([
        [27.5049, 79.3991],
        [27.5069, 79.4011]
    ], {
        color: '#00ff00',
        fillColor: '#00ff00',
        fillOpacity: 0.4,
        weight: 2
    }).addTo(map);
    
    ndviLayer.bindPopup('<b>NDVI Layer</b><br>High vegetation density<br>Value: 0.74-0.82');
}, 4000);
