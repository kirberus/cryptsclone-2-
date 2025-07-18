document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 255, 0, 0.2)';
            navbar.style.borderBottom = '1px solid rgba(0, 255, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 0, 0.1)';
            navbar.style.borderBottom = '1px solid rgba(0, 255, 0, 0.2)';
        }
    });

    const events = {
        '2025-08-04': [{ name: 'IHE Kernel 3.0', classes: 'Classes 6–8', type: 'Offline' }],
        '2025-08-06': [{ name: 'IHE Kernel 3.0', classes: 'Classes 9–12', type: 'Offline' }],
        '2025-08-07': [
            { name: 'IHE CodeQuest', classes: 'Classes 11–12', type: 'Offline' },
            { name: 'Visual Wit (Meme Making - MEMETICS 3.0)', classes: 'Classes 6–12', type: 'Online (Submission Deadline: 11:59 PM)' }
        ],
        '2025-08-08': [
            { name: 'PixelPulse (Photography)', classes: 'Classes 8–12', type: 'Online (Submission Deadline: 11:59 PM)' },
            { name: 'CyberCanvas (Digital Poster by Parents)', classes: 'Parents', type: 'Online (Submission Deadline: 11:59 PM)' }
        ],
        '2025-08-11': [
            { name: 'Mission: Decrypt', classes: 'Classes 8–10, 11–12', type: 'Offline' },
            { name: 'Byte the Site (Website Design)', classes: 'Classes 6–12', type: 'Online (Submission Deadline: 11:59 PM)' }
        ],
        '2025-08-12': [
            { name: 'QWERTY 3.0 (Typing Race)', classes: 'Classes 6–8', type: 'Offline' },
            { name: 'IHE CinePrism (Filmmaking)', classes: 'Classes 8–12', type: 'Online (Submission Deadline: 11:59 PM)' }
        ],
        '2025-08-13': [
            { name: 'Portfolio Design', classes: 'Classes 11–12', type: 'Offline' },
            { name: 'Scratch Xplorers (Scratch Game Dev)', classes: 'Classes 4–5', type: 'Online (Submission Deadline: 11:59 PM)' }
        ]
    };

    const calendarGrid = document.querySelector('.calendar-grid');
    const eventInfoBox = document.querySelector('.event-info');
    const year = 2025;
    const month = 7;
    let hideTimeout;

    function generateCalendar(year, month) {
        calendarGrid.innerHTML = '';
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const numDays = lastDay.getDate();
        const startDayIndex = firstDay.getDay();

        for (let i = 0; i < startDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= numDays; day++) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            dayElement.dataset.date = dateString;

            if (events[dateString] && events[dateString].length > 0) {
                dayElement.classList.add('event-day');
                const indicator = document.createElement('span');
                indicator.classList.add('event-indicator');
                dayElement.appendChild(indicator);
            } else {
                dayElement.classList.add('no-event-day');
            }

            dayElement.addEventListener('mouseover', function () {
                clearTimeout(hideTimeout);
                if (this.classList.contains('event-day')) {
                    showEventDetails(this.dataset.date);
                } else {
                    eventInfoBox.classList.remove('visible');
                }
            });

            dayElement.addEventListener('mouseout', function () {
                hideTimeout = setTimeout(() => {
                    if (!eventInfoBox.matches(':hover')) {
                        eventInfoBox.classList.remove('visible');
                    }
                }, 300);
            });

            calendarGrid.appendChild(dayElement);
        }
    }

    function showEventDetails(dateString) {
        let detailsHtml = '';
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();

        if (events[dateString]) {
            detailsHtml += `<h3>Events on August ${day}, ${year}</h3>`;
            events[dateString].forEach(event => {
                detailsHtml += `<p><strong>${event.name}</strong><br><em>${event.type}</em><br>For: ${event.classes}</p>`;
            });
        } else {
            detailsHtml = `<p><strong>Date:</strong> August ${day}, ${year}</p><p>No specific events scheduled.</p>`;
        }

        eventInfoBox.classList.remove('visible');
        eventInfoBox.innerHTML = detailsHtml;
        void eventInfoBox.offsetWidth;
        setTimeout(() => {
            eventInfoBox.classList.add('visible');
        }, 50);
    }

    eventInfoBox.addEventListener('mouseover', function() {
        clearTimeout(hideTimeout);
    });

    eventInfoBox.addEventListener('mouseout', function () {
        hideTimeout = setTimeout(() => {
            if (!calendarGrid.matches(':hover') && !eventInfoBox.matches(':hover')) {
                eventInfoBox.classList.remove('visible');
            }
        }, 300);
    });

    generateCalendar(year, month);
    console.log('Loaded successfully');
});
