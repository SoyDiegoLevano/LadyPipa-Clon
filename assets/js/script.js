
/* Scroll Navbar */
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-link");

let timeout;

function closeAllModals() {
    const openModals = document.querySelectorAll('.modal.open');
    openModals.forEach((modal) => {
        modal.classList.remove('open');
    });
}

if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500 ) {
            header.classList.add("sticky", "modal-backgraund");
        } else {
            const anyModalOpen = document.querySelector('.modal.open');
            if (!anyModalOpen) {
                header.classList.remove("sticky", "modal-backgraund");
            }
        }
    });
} else {

    header.classList.add("sticky", "modal-backgraund");
}

/* Modal Menú */
navLinks.forEach((navLink) => {
    const modalId = navLink.dataset.target;
    const modal = document.querySelector(`#${modalId}`);

    if (!modal) return;

    let isClosing = false;

    navLink.addEventListener('mouseenter', () => {
        if (isClosing) {
            clearTimeout(timeout);
            isClosing = false;
        } else {
            closeAllModals();
            modal.classList.add('open');
            header.classList.add("modal-backgraund");
            if (window.scrollY < 500) {
                header.classList.add("sticky");
            }
        }
    });

    navLink.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            modal.classList.remove('open');
            isClosing = false;
            if (!document.querySelector('.modal.open') && window.location.pathname === "/index.html") {
                header.classList.remove("modal-backgraund");
            }
        }, 400);
        isClosing = true;
    });
});


/* Carrusel */

function initializeCarousel({
    carouselSelector,
    itemSelector,
    dotSelector,
    btnSelector,
    activeClass,
}) {
    const carousel = document.querySelector(carouselSelector);
    const carouselItems = document.querySelectorAll(itemSelector);
    const dots = document.querySelectorAll(dotSelector);
    const btnMore = document.querySelectorAll(btnSelector);

    let currentIndex = 0;

    function updateCarousel(index) {
        carouselItems.forEach((item) => item.classList.remove(activeClass));
        dots.forEach((dot) => dot.classList.remove(activeClass));
        btnMore.forEach((btn) => btn.classList.remove(activeClass));

        console.log(`Se pasó el index ${index}`);

        carouselItems[index].classList.add(activeClass);
        dots[index].classList.add(activeClass);
        btnMore[index].classList.add(activeClass);
    }

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index, 10);
            updateCarousel(currentIndex);
        });
    });

    carousel.addEventListener('click', (event) => {
        const rect = carousel.getBoundingClientRect();
        const clickX = event.clientX - rect.left;

        if (clickX < rect.width / 2) {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        } else {
            currentIndex = (currentIndex + 1) % carouselItems.length;
        }
        updateCarousel(currentIndex);
    });

    updateCarousel(currentIndex);
}

initializeCarousel({
    carouselSelector: '.carousel',
    itemSelector: '.carousel-item',
    dotSelector: '.dot',
    btnSelector: '.btn-carousel',
    activeClass: 'active',
});

initializeCarousel({
    carouselSelector: '.carousel-2',
    itemSelector: '.carousel-item-2',
    dotSelector: '.dot-2',
    btnSelector: '.btn-carousel-2',
    activeClass: 'active-2',
});

/* Modales */

const triggers = document.querySelectorAll('[data-target]');
const modals = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.btn-close');

triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-target');
        const modal = document.getElementById(targetId);
        if (modal) {
            modal.classList.add('show');
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.popup').classList.remove('show');
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});