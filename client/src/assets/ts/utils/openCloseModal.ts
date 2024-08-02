export const openCloseModal = (openModalButtonEle: HTMLButtonElement, modalContainerEle: HTMLDivElement) => {
    const closeModal = document.querySelectorAll(".close__modal");
    const overlay = document.querySelector(".overlay") as HTMLDivElement;
    const htmlBodyEle = document.querySelector("body") as HTMLBodyElement;

    openModalButtonEle?.addEventListener("click", () => {
        overlay.classList.add("show");
        modalContainerEle.classList.add("show");
        htmlBodyEle.classList.add("overflowHidden");
    });

    closeModal.forEach((button) => {
        button?.addEventListener("click", () => {
            overlay.classList.remove("show");
            modalContainerEle.classList.remove("show");
            htmlBodyEle.classList.remove("overflowHidden");
        });
    });
};
