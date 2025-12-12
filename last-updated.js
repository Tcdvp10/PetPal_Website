document.addEventListener("DOMContentLoaded", () => {
    const footer = document.createElement("div");

    // Base styling
    footer.style.position = "fixed";
    footer.style.bottom = "0";
    footer.style.left = "0";
    footer.style.width = "100%";
    footer.style.textAlign = "center";
    footer.style.background = "#0a364e";
    footer.style.color = "#777"; // Change this to any color
    footer.style.fontFamily = "sans-serif";

    // Responsive function
    function applyResponsiveStyles() {
        const w = window.innerWidth;

        if (w < 400) {
            footer.style.fontSize = "10px";
            footer.style.padding = "4px 0";
        } else if (w < 800) {
            footer.style.fontSize = "12px";
            footer.style.padding = "6px 0";
        } else {
            footer.style.fontSize = "14px";
            footer.style.padding = "8px 0";
        }
    }

    // Apply on load
    applyResponsiveStyles();

    // Recalculate on window resize
    window.addEventListener("resize", applyResponsiveStyles);

    // Get last modified timestamp
    const lastUpdated = document.lastModified;
    footer.textContent = `Last Updated: ${lastUpdated}`;

    // Add padding to body bottom so content doesn't get covered
    document.body.style.paddingBottom = "40px";

    // Append footer
    document.body.appendChild(footer);
});
