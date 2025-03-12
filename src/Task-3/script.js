// DOM elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Function to set theme
function setTheme(isDark) {
    if (isDark) {
        body.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    } else {
        body.removeAttribute('data-theme');
        themeToggle.checked = false;
    }
}

// Function to save theme preference to localStorage
function saveThemePreference(isDark) {
    localStorage.setItem('darkMode', isDark);
}

// Event listener for theme toggle
themeToggle.addEventListener('change', function() {
    // Toggle the theme based on checkbox state
    setTheme(this.checked);
    
    // Save the preference
    saveThemePreference(this.checked);
    
    // Log the theme change (can be removed in production)
    console.log('Theme changed to:', this.checked ? 'dark' : 'light');
});

// Initialize theme based on saved preference or system preference
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has a saved preference
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode !== null) {
        // Use saved preference
        setTheme(savedDarkMode === 'true');
    } else {
        // If no saved preference, check system preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDarkMode);
        saveThemePreference(prefersDarkMode);
    }
});

// Listen for changes in system color scheme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    // Only update if the user hasn't set a preference
    if (localStorage.getItem('darkMode') === null) {
        const isDark = e.matches;
        setTheme(isDark);
        saveThemePreference(isDark);
    }
});