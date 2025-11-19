document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        htmlElement.setAttribute('data-theme', currentTheme);
        updateButtonIcon(currentTheme);
    }

    toggleButton.addEventListener('click', () => {
        let theme = htmlElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            theme = 'light';
        } else {
            theme = 'dark';
        }

        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme); // Save preference
        updateButtonIcon(theme);
    });

    function updateButtonIcon(theme) {
        toggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
});