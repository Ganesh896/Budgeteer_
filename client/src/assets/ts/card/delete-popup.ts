export const DeletePopupCard = (itemName: string) => {
    return `
        <div class="deletePopup__header">
            <i class='bx bx-trash'></i>
        </div>
        <div class="deletePopup__body">
            <h3>You are about to delete a ${itemName}</h3>
            <p>This will delete your ${itemName} permanently</p>
            <p>Are you sure?</p>
        </div>
        <div class="deletePopup__footer">
            <button class="deletePopup__footer--cancel" id="cancelDelete">Cancel</button>
            <button class="deletePopup__footer--delete" id="confirmDelete">Delete</button>
        </div>
    `;
};
