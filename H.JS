// Dynamically create 27 hospital card elements for layout testing
let newElements = [];

for (let i = 0; i < 27; i++) {
    let Z = document.createElement("div"); 
    Z.className = "HName";       
    Z.innerHTML = `
    <h4 class="name"><a href="#">مشفى ${i + 1}</a></h4>
    <a href="#" class="cta-btn">تفاصيل</a>
    <a href="#"><img src="Pin.webp" decoding="async" width="30px"> العنوان</a>
`;
    newElements.push(Z);
}
// Select the container element to append the generated hospital cards
const container = document.querySelector(".card"); 

newElements.forEach(element => {
    container.appendChild(element);
});
// Toggle navigation menu visibility on menu button click
const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('show-nav');
});
// Mobile menu toggle setup and submenu logic
document.addEventListener('DOMContentLoaded', function() {
    const mobileTrigger = document.querySelector('.mobile-menu-trigger');
    const body = document.body;
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
// Toggle mobile menu open/close when trigger is clicked
mobileTrigger.addEventListener('click', function() {
    body.classList.toggle('mobile-menu-open');
});  
    // Attach event listeners to submenu toggle buttons
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const parent = this.closest('.menu-item-has-children');
        const submenu = parent.querySelector('.submenu');
        
        // Expand or collapse the submenu on click
        if (submenu.style.display === 'block') {
            submenu.style.display = 'none';
            this.textContent = '+';
        } else {
            submenu.style.display = 'block';
            this.textContent = '-';
        }
    });
});  
    // Close mobile menu if a click occurs outside the menu or trigger
document.addEventListener('click', function(e) {
    if (!e.target.closest('.mobile-menu-container') && 
        !e.target.closest('.mobile-menu-trigger')) {
        body.classList.remove('mobile-menu-open');
}
});
});
 console.log("Starting hospital data fetch...");
        
        fetch('http://localhost:8000/api/hospitals/')
            .then(response => {
                console.log("Received response:", response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Successfully fetched hospitals:", data);
                const container = document.getElementById('card');
                
                if (data.length === 0) {
                    container.innerHTML = "<p>لا توجد مستشفيات مسجلة</p>";
                    return;
                }

                data.forEach(hospital => {
                    const Z = document.createElement('div');
                    Z.className = 'HName';
                    
                    Z.innerHTML = `
                        <h4 class='name'><a href='#'>${hospital.name}</a></h4>
                        <a href="#" class="cta-btn">تفاصيل</a>
                        <p>${hospital.address}</p>
                        ${hospital.location_link ? 
                            `<a href="${hospital.location_link}" 
                                target="_blank" 
                                class="map-link"
                                onclick="console.log('Clicked map link for ${hospital.name}')">
                                <img src="Pin.webp" decoding="async" width="30px"> العنوان
                            </a>` 
                            : ''}
                    `;
                    
                    container.appendChild(Z);
                });
            })
            .catch(error => {
                console.error("Error fetching hospitals:", error);
                document.getElementById('hospitals-container').innerHTML = 
                    `<p style="color: red">خطأ في تحميل البيانات: ${error.message}</p>`;
            });

