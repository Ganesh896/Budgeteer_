export const toggleSidebarHandler = () => {
    const sidebarToggleEle = document.querySelector(".sidebar__toggle") as HTMLButtonElement;
    const sidebarEle = document.querySelector(".sidebar") as HTMLDivElement;
    const dashboardEle = document.querySelector(".dashboard") as HTMLDivElement;

    sidebarToggleEle.addEventListener("click", function () {
        console.log("sidebar toggle");
        sidebarEle.classList.toggle("close");
        dashboardEle.classList.toggle("open");
    });
};
