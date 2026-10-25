// Theme toggle: switches between dark (default) and light, and remembers the choice.
// This file is shared by every page, so each part checks that its elements exist.

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

// Set the theme on <html> and make the button label say what a click will do.
function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    }
}

// Save the choice in the browser. try/catch because storage can be blocked.
function saveTheme(theme) {
    try {
        localStorage.setItem("theme", theme);
    } catch (e) {}
}

// On load: use the theme the <head> script already applied, or fall back to dark.
applyTheme(root.getAttribute("data-theme") || "dark");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        saveTheme(nextTheme);
    });
}

// Mobile menu: the sidebar is a slide-in drawer on small screens.
// Only the main page has these elements, so project pages skip this part.

const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("backdrop");

if (menuToggle && sidebar && backdrop) {
    // Open or close the drawer, and keep the button's accessibility state in sync.
    function setMenu(open) {
        document.body.classList.toggle("menu-open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    menuToggle.addEventListener("click", () => {
        setMenu(!document.body.classList.contains("menu-open"));
    });

    // Tapping the dark overlay, choosing a section, or pressing Escape closes it.
    backdrop.addEventListener("click", () => setMenu(false));

    sidebar.querySelectorAll("nav a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMenu(false);
    });

    // If the window grows past the mobile breakpoint, reset the menu state.
    window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
        if (event.matches) setMenu(false);
    });
}
