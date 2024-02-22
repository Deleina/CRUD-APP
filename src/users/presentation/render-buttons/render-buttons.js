import usersStore from "../../store/users-store";
import { renderTable } from "../render-table/render-table";
import "./render-buttons.css";
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = (element) => {
    const nexButton = document.createElement('button');
    nexButton.innerHTML = ` Next >`;

    const prevButton = document.createElement('button');
    prevButton.innerHTML = ` Prev >`;


    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page'
    currentPageLabel.innerHTML = usersStore.getCurrentPage();

    element.append(prevButton, currentPageLabel, nexButton);

    nexButton.addEventListener('click', async () => {
        await usersStore.loadNextPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable(element);
    })

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable(element)
    })
}
