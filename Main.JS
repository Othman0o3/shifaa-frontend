const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('show-nav');
});
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileTrigger = document.querySelector('.mobile-menu-trigger');
    const body = document.body;
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

mobileTrigger.addEventListener('click', function() {
    body.classList.toggle('mobile-menu-open');
});  

    // Submenu toggles
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const parent = this.closest('.menu-item-has-children');
        const submenu = parent.querySelector('.submenu');
        
        // Toggle submenu
        if (submenu.style.display === 'block') {
            submenu.style.display = 'none';
            this.textContent = '+';
        } else {
            submenu.style.display = 'block';
            this.textContent = '-';
        }
    });
});  
    // Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.mobile-menu-container') && 
        !e.target.closest('.mobile-menu-trigger')) {
        body.classList.remove('mobile-menu-open');
}
});
});
// Slightly move the medical monitors based on cursor position (parallax effect)
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    document.querySelector('.medical-monitors').style.transform = 
      `translate(${x * 10}px, ${y * 10}px)`;
  });
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('medicalMonitors');
    const monitorCount = 10; // Adjust based on screen size
    
    //Create monitors with ECG waves
    for (let i = 0; i < monitorCount; i++) {
      const monitor = document.createElement('div');
      monitor.className = 'monitor';
      
      // Add ECG line
      const ecgLine = document.createElement('div');
      ecgLine.className = 'ecg-line';
      monitor.appendChild(ecgLine);
      
      container.appendChild(monitor);
    }
    
  });
  const criticalMonitor = document.createElement('div');
criticalMonitor.className = 'monitor critical';
const criticalECG = document.createElement('div');
criticalECG.className = 'ecg-line';
criticalMonitor.appendChild(criticalECG);
container.appendChild(criticalMonitor);
// Apply flexbox layout styles to position the monitors on the screen
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('medicalMonitors');
  container.style.display = 'flex'; // Force flex layout
  container.style.flexWrap = 'wrap';
  container.style.justifyContent = 'center';
  container.style.gap = '15px';

  // Create 7 normal monitors
  for (let i = 0; i < 7; i++) {
    const monitor = document.createElement('div');
    monitor.className = 'monitor';
    const ecgLine = document.createElement('div');
    ecgLine.className = 'ecg-line';
    monitor.appendChild(ecgLine);
    container.appendChild(monitor);
  }

  // Add 1 critical monitor (larger, with red pulse)
  const criticalMonitor = document.createElement('div');
  criticalMonitor.className = 'monitor critical';
  const criticalECG = document.createElement('div');
  criticalECG.className = 'ecg-line critical-line';
  criticalMonitor.appendChild(criticalECG);
  container.appendChild(criticalMonitor);
});
// Trigger a flatline animation on all ECG lines when no search results are found
function triggerFlatline() {
  const ecgLines = document.querySelectorAll('.ecg-line');
  ecgLines.forEach(line => line.classList.add('flatline'));
}


function restoreHeartbeat() {
  const ecgLines = document.querySelectorAll('.ecg-line');
  ecgLines.forEach(line => line.classList.remove('flatline'));
}

// Check if search results are found and update ECG animation accordingly
if (noSearchResults) { 
  triggerFlatline();  // Show emergency state
} else {
  restoreHeartbeat(); // Back to normal
}




