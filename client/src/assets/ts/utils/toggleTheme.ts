export const toggleThemeHandler = () => {
    //changing theme
    const themeCheckbox = document.getElementById("checkbox") as HTMLInputElement;
    const themeButton = document.querySelector(".theme__button") as HTMLDivElement;

    // saving theme on localStorage
    const setTheme = function (): void {
        localStorage.removeItem("theme");
        if (themeCheckbox.checked) {
            localStorage.setItem("theme", "dark__theme");
        } else {
            localStorage.setItem("theme", "light__theme");
        }
    };

    // adding theme from localStorage
    const changeTheme = function (): void {
        setTheme();
        const theme = localStorage.getItem("theme") || "light__theme";
        document.body.classList.toggle(theme);
    };

    // setting default theme
    document.body.classList.toggle(localStorage.getItem("theme") || "light__theme");
    themeButton.addEventListener("click", changeTheme); //changing theme on nav toggle button

    // retaining the toggle button state on refresh
    themeCheckbox.checked = localStorage.getItem("theme") === "dark__theme";
};
