// Анимация появления элементов при скролле
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Наблюдаем за всеми элементами с классом slide-up
document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));

// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Плавный скролл для всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Фиксация навигации при скролле
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Имитация загрузки карты (заглушка)
document.addEventListener('DOMContentLoaded', () => {
    const mapPlaceholder = document.getElementById('mapPlaceholder');
    
    // Пример добавления интерактивности для карты-заглушки
    mapPlaceholder.addEventListener('click', () => {
        alert('Здесь будет открыта полноценная интерактивная карта с объектами!');
    });
    
    // Анимация для кнопок карточек
    document.querySelectorAll('.btn-card').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    console.log('Сайт "Архитектурная Магнитка" загружен!');
});