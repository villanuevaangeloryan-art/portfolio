// Theme toggle: switches between dark (default) and light, and remembers the choice.

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

// Set the theme on <html> and make the button label say what a click will do.
function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

// Save the choice in the browser. try/catch because storage can be blocked.
function saveTheme(theme) {
    try {
        localStorage.setItem("theme", theme);
    } catch (e) {}
}

// On load: use the theme the <head> script already applied, or fall back to dark.
applyTheme(root.getAttribute("data-theme") || "dark");

themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
});
