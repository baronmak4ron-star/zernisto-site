document.addEventListener('DOMContentLoaded', () => {
    // 1. Мобильное бургер-меню
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Закрывать меню при клике на ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    // 2. Переключение вкладок меню (Фильтрация напитков и десертов)
    const tabs = document.querySelectorAll('.menu__tab');
    const cards = document.querySelectorAll('.menu-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Убираем активный класс со всех кнопок
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });

            // Делаем активной нажатую кнопку
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const category = tab.getAttribute('data-category');

            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 3. Живой статус работы кофейни по времени Сочи (МСК, с 08:00 до 21:00)
    const statusBadge = document.querySelector('.badge--accent');
    if (statusBadge) {
        const now = new Date();
        // Переводим текущее время в часовой пояс Москвы/Сочи
        const mskTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
        const hours = mskTime.getHours();

        if (hours >= 8 && hours < 21) {
            statusBadge.textContent = '🟢 Сейчас открыто · до 21:00';
        } else {
            statusBadge.textContent = '🌙 Сейчас закрыто · ждём с 08:00';
        }
    }
});
