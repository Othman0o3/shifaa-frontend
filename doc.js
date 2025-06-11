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

        // Fetch hospitals and log the process
        console.log("Starting doctors data fetch...");
        console.log("Calling:", window.location.href);
                    fetch('http://localhost:8000/api/doctors/')
            .then(response => {
                console.log("Received response:", response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Successfully fetched doctors:", data);
                const container = document.getElementById('card');
                
                if (data.length === 0) {
                    container.innerHTML = "<p>لا يوجد دكاترة مسجلة</p>";
                    return;
                }

                data.forEach(doctors => {
                    const Z = document.createElement('div');
                    Z.className = 'DNameI';
                    
                    Z.innerHTML = `
      <h4 class="name">${doctors.name}</h4>
      <button class="cta-btn">احجز الأن</button>
      <p>${doctors.available_from}  ${doctors.available_to}</p>
      <h5>${doctors.speciality}</h5>
      ${
          doctors.hospital && doctors.hospital.location_link
              ? `<a href="${doctors.hospital.location_link}" target="_blank"><img src="Pin.webp" decoding="async" width="30px" height="30px">
 ${doctors.hospital.name}</a>`
              : ` <img src="Pin.webp" decoding="async" width="30px" height="30px"> <p>لا يوجد موقع للمستشفى</p>`
      }
  `;
                    
                    container.appendChild(Z);
                });
            })
            .catch(error => {
                console.error("Error fetching hospitals:", error);
                document.getElementById('container').innerHTML = 
                    `<p style="color: red">خطأ في تحميل البيانات: ${error.message}</p>`;
            });


