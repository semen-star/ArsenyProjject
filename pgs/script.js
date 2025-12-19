// ===== ОБЩАЯ ЛОГИКА (как на главной) =====

// Анимация появления при скролле
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Наблюдаем за всеми элементами с классами для анимации
document.querySelectorAll('.slide-up, .era-detail').forEach(el => {
    if (el) observer.observe(el);
});

// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
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
}

// Плавный скролл
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
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// ===== ЛОГИКА ДЛЯ СТРАНИЦЫ ГАЛЕРЕИ (two.html) =====
if (document.querySelector('.gallery-filter')) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Фильтрация галереи
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== ЛОГИКА ДЛЯ СТРАНИЦЫ КАРТЫ (three.html) =====
if (document.getElementById('fullMap')) {
    // Инициализация карты (заглушка - можно заменить на настоящую API)
    function initMap() {
        const mapElement = document.getElementById('fullMap');
        
        // Создаем стилизованную заглушку карты
        mapElement.innerHTML = `
            <div style="width:100%; height:100%; background:#f0f0f0; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#666;">
                <i class="fas fa-map-marked-alt" style="font-size:3rem; margin-bottom:20px; color:#e74c3c;"></i>
                <h3 style="margin-bottom:10px;">Интерактивная карта архитектурных объектов</h3>
                <p style="text-align:center; max-width:500px; margin-bottom:20px;">
                    Здесь будет отображена карта Орджоникидзевского района с метками всех архитектурных объектов.
                    Для реализации используйте API Яндекс.Карт или Google Maps.
                </p>
                <div style="display:flex; gap:20px; margin-top:20px;">
                    <div style="text-align:center;">
                        <div style="width:15px; height:15px; background:#e74c3c; border-radius:50%; margin:0 auto 5px;"></div>
                        <small>Сталинский ампир</small>
                    </div>
                    <div style="text-align:center;">
                        <div style="width:15px; height:15px; background:#3498db; border-radius:50%; margin:0 auto 5px;"></div>
                        <small>Конструктивизм</small>
                    </div>
                </div>
            </div>
        `;
        
        // Пример кода для реальной карты (раскомментировать при необходимости):
        /*
        if (typeof ymaps !== 'undefined') {
            const map = new ymaps.Map('fullMap', {
                center: [53.407, 58.979], // Координаты Магнитогорска
                zoom: 13
            });
            
            // Добавление меток
            const places = [
                {coords: [53.407, 58.979], title: 'Дворец культуры металлургов'},
                {coords: [53.410, 58.975], title: 'Проспект Металлургов'},
                {coords: [53.405, 58.985], title: 'Немецкий квартал'}
            ];
            
            places.forEach(place => {
                const marker = new ymaps.Placemark(place.coords, {
                    balloonContent: place.title
                });
                map.geoObjects.add(marker);
            });
        }
        */
    }
    
    // Инициализируем карту после загрузки страницы
    document.addEventListener('DOMContentLoaded', initMap);
    
    // Обработка кликов на элементы легенды
    document.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            alert(`Показаны объекты типа: ${type}\n(В реальной карте здесь будет фильтрация меток)`);
            
            // Добавляем/убираем активный класс
            document.querySelectorAll('.legend-item').forEach(el => {
                el.style.background = '';
            });
            this.style.background = '#f0f0f0';
        });
    });
}

// ===== ОБЩАЯ ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена и готова!');
    
    // Добавляем небольшую задержку для анимаций
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.animationDelay = '0.2s';
        });
    }, 100);
});